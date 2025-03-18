const formulaire = document.querySelector('#ajout-tache')

async function leFormulaire() {

    formulaire.innerHTML = `
<div class="container">
    <form>
        <div class="mb-3">
            <label for="exampleInputEmail1" class="form-label">Titre tâche</label>
            <input type="email" class="form-control" id="exampleInputEmail1" aria-describedby="emailHelp">
            <div id="emailHelp" class="form-text"></div>
        </div>
 
        <div class="mb-3 form-check">
            <input type="checkbox" class="form-check-input" id="exampleCheck1">
            <label class="form-check-label" for="exampleCheck1">Terminer</label>
        </div>
        <button type="submit" class="btn btn-primary">Envoyer</button>
    </form>
</div>`
}

leFormulaire()