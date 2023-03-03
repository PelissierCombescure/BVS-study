async function main() {
    // Imports et constantes.
    const fs = require('fs').promises;
    const express = require('express');
    const uuid = require('uuid').v4;
    const bodyParser = require('body-parser')
    const ip = '0.0.0.0';
    const port = 8000;

    const app = express();

    //let id = 1;

    // Permet de récupérer les données venant du client.
    app.use(bodyParser.urlencoded({ extended: true }));
    app.use(bodyParser.json());

    // Page d'accueil.
    app.get('/', function(req, res) {
        // On envoie le contenu du fichier index.html.
        return res.sendFile(__dirname + '/html/index3D.html');
    });

    // Route de récupération des données.
    app.post('/outputs', async function(req, res) {
        let id = uuid();

        // Ouverture du fichier en mode append.
        let file = await fs.open(__dirname + '/outputs/' + id + '.json', 'a');

        // Ajout d'une ligne.
        file.write(JSON.stringify(req.body, undefined, 4));

        // Envoi de la réponse pour terminer la requête.
        res.send('Ok');
    });

    // Création du dossier où les données seront stockées.
    try {

        await fs.mkdir(__dirname + '/outputs');

    } catch (err) {
        // Si une erreur existe autre que "le dossier existe déjà", on stoppe le serveur.
        if (err !== null && (err.errno !== -17 || err.code !== 'EEXIST')) {
            throw err;
        }
    }

    // Envoi des fichiers statiques (js, css)
    app.use('/static', express.static('static'));

    // On démarre le serveur, puis on peut y accéder dans le navigateur en allant sur http://localhost:8000
    app.listen(port, ip, function() {
        console.log('Started listening on ' + port);
    });

}

main();
