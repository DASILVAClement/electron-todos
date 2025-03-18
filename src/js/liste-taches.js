const taches = document.querySelector('#liste-tache')
const boutonRafraichir = document.querySelector('#rafraichir')

async function lesTaches() {
    // Appel de la fonction getVersions exposée par le preload
    const v = await window.todosAPI.getAll()

    console.log(v)

    taches.innerHTML = v.length!==0 ? v.map(tache => {
        const date = new Date(tache.created_at).toLocaleString("fr-FR")
        return `<div class="container">
                <ul class="list-group">
                  <li class="list-group-item d-flex justify-content-between align-items-start">
                    <div class="ms-2 me-auto">
                      <div class="fw-bold">${tache.titre}</div>
                      ${date}
                    </div>
                    <span class="badge text-bg-${tache.termine===1 ? 'success' : 'danger'} rounded-pill">${tache.termine===1 ? 'Terminée' : 'En cours'}</span>
                  </li>
                </ul>
                </div>`
    }).join('') : `<div class="alert alert-warning" role="alert">Aucune tâche enregistrée</div>`

    boutonRafraichir.innerHTML = `<button type="button" class="btn btn-outline-primary btn-sm mt-2 text-dark" onclick="window.location.reload()">Rafraîchir</button>`
}

lesTaches()