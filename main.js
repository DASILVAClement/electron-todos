//Processus principal

const {app, BrowserWindow, ipcMain, Menu, dialog} = require("electron")
const path = require("path");
const mysql = require('mysql2/promise')


//Fenêtre principale
let window

//Configuration de l'accès à la BDD
const dbConfig = {
    host: 'localhost',
    port: 3306,
    user: 'root',
    password: '',
    database: 'db_todos',
    connectionLimit: 10, //Nombre maximal de connexions simultanées dans le pool
    waitForConnections: true,
    queueLimit: 0
}


//Créer le pool de connexion
const pool = mysql.createPool(dbConfig);


//Tester la connexion
async function testConnexion() {
    try{
        //Demander une connexion au pool
        const connexion = await pool.getConnection();
        console.log('Connexion avec la BDD établis');
        connexion.release() //rend la connexion disponible dans le pool

    }catch(error){
        console.error('Erreur de connexion à la BDD')
    }
}

testConnexion()


//Créer la fenêtre principale
function createWindow() {
     window = new BrowserWindow({
        width: 800,
        height: 600,
        webPreferences: {
            nodeIntegration: false, //Accès aux API node depuis le processus de rendu
            contextIsolation: true,
            sandbox: true,
            preload: path.join(__dirname, 'src/js/preload.js')
        }
    })

    window.webContents.openDevTools();


    //Création du menu
    createMenu()


    window.loadFile('src/pages/index.html')
}


//Fonctions permettant de créer un menu personnalisé
function createMenu() {

    //Créer un tableau qui va représenter le menu -> structure
    const template = [
        {
            label: 'App',
            submenu: [
                {
                    label: 'Versions',
                    click: () => window.loadFile('src/pages/index.html'),
                },
                {
                    type: 'separator',
                },
                {
                    label: 'Quitter',
                    accelerator: process.platform === 'darwin' ? 'Cmd+Q' : 'Ctrl+Q',
                    click: () => app.quit()
                }
            ]
        },
        {
            label: 'Tâches',
            submenu: [
                {
                    label: 'Lister',
                    click: () => window.loadFile('src/pages/liste-taches.html'),
                },
                {
                    label: 'Ajouer',
                    click: () => window.loadFile('src/pages/ajout-tache.html'),
                }
            ]
        }
    ]


    //Créer un menu à partir du modèle
    const menu = Menu.buildFromTemplate(template)
    //Définir le menu comme étant le menu de l'application
    Menu.setApplicationMenu(menu)

}


//Attendre l'initialisation de l'application au démarrage
app.whenReady().then( () => {

    console.log("Application initialisé")
    createWindow()

    app.on('activate', () => {
      if (BrowserWindow.getAllWindows().length === 0) {
          createWindow()
      }
    })

})



app.on('window-all-closed', () => {
    if (process.platform !== 'darwin') {
        app.quit()
    }
})



//Ecouter sur le canal "get-versions"
ipcMain.handle('get-versions', () => {
    //Renvoyer un objet contenant les versions des outils
    return {
        electron: process.versions.electron,
        node: process.versions.node,
        chromium: process.versions.chrome
    }
})

async function getAllTodos() {
    try {
        const resultat = await pool.query('SELECT * FROM todos ORDER BY created_at DESC')
        return resultat[0]  //Retourne une promesse avec le résultat
    }catch (error) {
        console.error('Erreur lors de la récupération des tâches')
        throw error; //Retourner une promesse non résolue

    }
}


//Ecouter sur le canal "todos:getAll"
ipcMain.handle('todos:getAll', async () => {
    //Récupérer la liste des tâches dans la BDD avec mysql
    try {
        return await getAllTodos()  //Retourne le résultat
    }catch (error) {
        dialog.showErrorBox('Erreur technique', 'Impossible de récupérer la liste des tâches')
        return []; //Retourne le résultat avec un tableau vide
    }
})


