//Ce script sera exécuter avant le chargement de la page
//Accès aux API node et Electron

const { contextBridge, ipcRenderer } = require('electron');

contextBridge.exposeInMainWorld('versions', {
    //Fonction qui récupère les versions via IPC
    getVersions: () => ipcRenderer.invoke('get-versions'),
})


contextBridge.exposeInMainWorld('todosAPI', {
    //Fonction qui récupère la liste des tâches via IPC
    getAll: () => ipcRenderer.invoke('todos:getAll'),
    add: (title) => ipcRenderer.invoke('todos:all', title)
})


console.log("Preload chargé avec success")