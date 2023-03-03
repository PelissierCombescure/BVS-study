// On récupère l'élément HTML dont l'id est username (champ que l'utilisateur va remplir).
let usernameInput = document.getElementById('username');

// On récupère l'élément HTML dont l'id est button (bouton à cliquer pour valider la requête).
let button = document.getElementById('button');

// Ajout du listener pour déclencher le traitement lorsque le bouton est cliqué.
button.addEventListener('click', function() {

    // Création de la requête HTTP à envoyer au serveur.
    let xhr = new XMLHttpRequest();

    // Préparation de la requête pour l'envoi en POST vers l'url.
    xhr.open('POST', '/data');

    // Si on envoie les données de manière classique, il faut configurer le header de cette façon.
    xhr.setRequestHeader("Content-Type", "application/x-www-form-urlencoded");

    // Ajout du listener pour déclencer la suite lorsque la requête sera terminée.
    xhr.onreadystatechange = function() {

        // Si la requête est terminée, et que la réponse n'est pas une erreur.
        if (xhr.readyState === XMLHttpRequest.DONE && xhr.status === 200) {

            console.log(xhr.responseText);

        }

    }

    // Envoi de la requête vers le serveur, avec les données.
    xhr.send('username=' + usernameInput.value);
});
