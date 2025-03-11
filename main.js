//Processus principal

const {app, BrowserWindow, ipcMain, Menu} = require("electron")
const path = require("path");

let window

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