//Ce script sera exécuter avant le chargement de la page
//Accès aux API node et Electron

const { contextBridge } = require('electron');

contextBridge.exposeInMainWorld('versions', {
    electron : process.versions.electron,
    node : process.versions.node,
    chromium : process.versions.chrome
})

console.log("Preload chargé avec success")