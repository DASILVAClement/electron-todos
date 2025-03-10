//Processus principal

const {app, BrowserWindow} = require("electron")

//Créer la fenêtre principale
function createWindow() {
    const window = new BrowserWindow({
        width: 800,
        height: 600,
        webPreferences: {
            nodeIntegration: true, //Accès aux API node depuis le processus de rendu
            contextIsolation: false
        }
    })

    window.loadFile('src/pages/index.html')
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