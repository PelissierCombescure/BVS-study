async function main() {
    // Imports et constantes.
    const fs = require('fs').promises;
    const express = require('express');
    const uuid = require('uuid').v4;
    const bodyParser = require('body-parser')
    const ip = '0.0.0.0';
    const port = 8000;

    const app = express();

    const HTML_BEGINNING = await fs.readFile(__dirname + '/html/index3D-beginning.html');
    const HTML_END = await fs.readFile(__dirname + '/html/index3D-end.html');

    //let id = 1;

    // Permet de récupérer les données venant du client.
    app.use(bodyParser.urlencoded({ extended: true }));
    app.use(bodyParser.json());

    // Page d'accueil.
    app.get('/', async function(req, res) {
        // On envoie le contenu du fichier index.html avec le uuid généré par le server.
        let uuidScript = '<script>window.uuid = "' + uuid() + '";</script>';
        return res.send(HTML_BEGINNING + uuidScript + HTML_END);
    });

    // Route de récupération des données.
    app.post('/outputs', async function(req, res) {
        // Ouverture du fichier en mode append.
        let file = await fs.open(__dirname + '/outputs/' + req.body.uuid + '.json', 'w');

        // Ajout d'une ligne.
        await file.write(JSON.stringify(req.body, undefined, 4));

        // Fermeture du fichier
        await file.close();

        // Envoi de la réponse pour terminer la requête.
        res.send('Enregistrement terminé.');
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
