//Ce script sera exécuter avant le chargement de la page
//Accès aux API node et Electron

const { contextBridge, ipcRenderer } = require('electron');

contextBridge.exposeInMainWorld('versions', {
    //Fonction qui récupère les versions via IPC
    getVersions: () => ipcRenderer.invoke('get-versions'),
})

console.log("Preload chargé avec success")