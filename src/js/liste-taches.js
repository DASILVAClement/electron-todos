const listeTache = document.querySelector("#liste-tache");

async function lesTaches () {
    const t = await  todosAPI.getAll()

    listeTache.innerHTML = t.map(tache => (
        `
   
<div class="card">
  <div class="card-body">
    ${tache.termine}
    ${tache.titre}
    ${tache.created_at}
  </div>
</div>
        `

    )).join("")


}

lesTaches()