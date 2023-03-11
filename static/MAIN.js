
//////////////////////////////////////////////////////////////
// MAIN
// initialisation des variables
init_variable(true)

canvas = document.getElementById("canvas")
canvas.width  = window.innerWidth;
canvas.height = window.innerHeight;
ctx = canvas.getContext("2d")

init_data()
// action
animate()

//////////////////////////////////////////////////////////////
function init_variable(premier_appel){
    ///////////////////////////////////////////////////////
    ///////////////////////////////////////////////////////
    // CE QUE L'ON RECUPERE A LA FIN
    // dictionnaire avec les choix pour TOUS les mesh
    choix = {}
    // dictionnaire avec les checkbox pour TOUS les mesh
    checkbox_clicked = {}
    ///////////////////////////////////////////////////////
    ///////////////////////////////////////////////////////

    // SOURIS
    // gestion de la souris : pour savoir si on a clické et sur quelle image on a clické
    clicked = false
    which_clicked_bouton = -1
    which_clicked_fleche = -1
    bouton_raz_clicked = false

    // Au premier appel on init : les interactions
    if (premier_appel){interactions = [{"time" : new Date().getTime(), "type": "start"}]}

    // Couleur
    alpha_survol = 0.3

    // DATA github
    indice_mesh = 0 // indice du premier mesh à visionner
    mesh_courant = "nope" // nom des mesh 
    // nombre de mesh a visionner AU TOTAL
    nb_mesh = 4 //3
    // random nom mesh 
    obj_file = shuffle(['dragon_update_user_study_normed.obj', 'camel_update_user_study_normed.obj', 'gorgoile_update_user_study_centered_normed.obj', 'horse_update_user_study_normed.obj'])
    
    // nb analyse demandé
    nb_analyse_demande = 3
    list_idx_tache =[]
    for (let p=0; p<nb_mesh; p++){list_idx_tache.push(p+1)}
    list_idx_tache = shuffle(list_idx_tache)

    // Choix des N poses demandé pour les mesh courant
    choix_courant = {}
    // Angles des poses init choisies pour le mesh courant
    liste_poses = []
    // Nb init courant de pose choisies
    nb_choix_fait = 0
    // nombre de pose qu'on demande de choisir pour chaque mesh visualisé
    nb_choix_demande = 3
    // Numero init de la tache courant --> il y en a autant que de mesh à voir
    num_tache = 1

    // Texte
    texte_temporaire = {}
    // temps de pop des messages
    temps_pop = 2000
    // text qui correspond à des erreurs de bouton 
    longueur_max_error = 700
    // text 
    longueur_max_recap = 350

    // Fenetre 3D
    scale_W_3D=0.6
    scale_H_3D=0.7
    W_3D = window.innerWidth*scale_W_3D
    H_3D = window.innerHeight*scale_H_3D

    // Rayon pour les cameras
    R = 2.5

    // Enchainement des pages
    page_contexte = true
    page_inscription = false // true
    page_explication = false
    page_explication_bis = false
    page_vues = false // false
    page_analyse = false

    // Pour afiicher les recap dans la partie analys,e on les conserve tous
    all_ctxMins = {}
    all_canvasMins = {}

    // pour initialiser les claviers à chaque page
    premier_tour_page_contexte = true
    premier_tour_page_inscription = true 
    premier_tour_page_explications = true
    premier_tour_page_vues = true
    premier_tour_page_analyse = true 

    // message de fin 
    message_fin = "> Sending data in progress ..."
    envoie_termine = false

}

////////////////////////////////////////
////////////////////////////////////////
//            3D

function setUp_light(rayon){
    const color = 0xFFFFFF;
    const intensity = 0.22;
    // Light
    const light1 = new THREE.AmbientLight( 0x404040 ); // soft white light
    scene.add( light1 );    
    const dir_light1 = new THREE.DirectionalLight(color, intensity);   
    dir_light1.position.set(rayon, 0, 0);
    scene.add(dir_light1);

    const light2 = new THREE.AmbientLight( 0x404040 ); // soft white light
    scene.add( light2 );    
    const dir_light2 = new THREE.DirectionalLight(color, intensity);   
    dir_light2.position.set(-rayon, 0, -0);
    scene.add(dir_light2);

    const light3 = new THREE.AmbientLight( 0x404040 ); // soft white light
    scene.add( light3 );    
    const dir_light3 = new THREE.DirectionalLight(color, intensity);   
    dir_light3.position.set(0, -rayon, 0);
    scene.add(dir_light3);

    const light4 = new THREE.AmbientLight( 0x404040 ); // soft white light
    scene.add( light4 );    
    const dir_light4 = new THREE.DirectionalLight(color, intensity);   
    dir_light4.position.set(0, rayon, -0);
    scene.add(dir_light4);
 
}

// idx_mesh : position du premier mesh a visuionner --> version aléatoire ???
function setUp_3D(idx_mesh, idx_i_init, idx_j_init, explication=false){
    // Randommiser la première vue quand oon loed le mesh, pour éviter d'avoir de l'influence
    // idx_i_init = Math.floor(Math.random()*8)
    // idx_j_init = Math.floor(Math.random()*5)
    theta_init = 2*Math.PI * ( (2/8)*(idx_j_init==0) + (1/8)*(idx_j_init==1) + (-1/8)*(idx_j_init==3) + (-2/8)*(idx_j_init==4))
    delta_init = 2*Math.PI * (idx_i_init/8)

    // initialisation 
    idx_i = idx_i_init
    idx_j = idx_j_init

      // Caméra
    camera = new THREE.PerspectiveCamera( 70, window.innerWidth / window.innerHeight, 0.01, 1000 );
    // camera.position.x = 2;
    // camera.position.y = 0;
    // camera.position.z = 0;
    camera.position.set(R*Math.cos(delta_init)*Math.cos(theta_init), R*Math.sin(theta_init), R*Math.sin(delta_init)*Math.cos(theta_init)) // repère JS
    camera.lookAt(0, 0, 0)
    //camera.lookAt (new THREE.Vector3(0,0,0))
    scene = new THREE.Scene();
    scene.add(camera)
    renderer = new THREE.WebGLRenderer( {
        antialias: true,
        preserveDrawingBuffer: true } );

    renderer.setSize(W_3D , H_3D);
    
    old_renderer = document.getElementById('renderer')
    if (old_renderer!=  null){
        old_renderer.parentElement.removeChild(old_renderer)
    }

    renderer.domElement.id = 'renderer'

    renderer.domElement.style.marginTop = (H_3D*0.04)+"px"; // même valeur que h_progress_bar dans fonction_choix_vues
    document.body.appendChild( renderer.domElement );
    controls = new THREE.OrbitControls( camera );
    controls.enableZoom = false;
    controls.keys = {}
    controls.mouseButtons = {}
    controls.update();


    canvasRenderer = document.getElementById("renderer")

    canvas = document.getElementById("canvas")
    canvas.width  = window.innerWidth;
    canvas.height = window.innerHeight;
    ctx = canvas.getContext("2d")

  
    // On crée autant de canvas que de choix demandé,
    // ces canvas seront vide tant qu'il n'y a pas de vue sélectionnée
    // puis updates en fonction des actions faites 
    canvasMins = []
    ctxMins = []
    for (let i = 0; i < nb_choix_demande; i++) {
        let c = document.createElement("canvas")
        c.setAttribute("width", 400);
        c.setAttribute("height", 400);
        let ctx_c = c.getContext("2d")
        canvasMins.push(c)
        ctxMins.push(ctx_c)
    }

    setUp_light(R)

    // Data 3D
    //obj_file = shuffle(['dragon_update_user_study_normed.obj', 'camel_update_user_study_normed.obj', 'gorgoile_update_user_study_centered_normed.obj', 'horse_update_user_study_normed.obj'])
    const objLoader = new THREE.OBJLoader2();

        // Si on load le mesh 3d dans les explicationq, on imporse que ce soit le dragon
    if (explication){
        objLoader.load('https://raw.githubusercontent.com/PelissierCombescure/BVS-study/main/graphics/3DMesh/dragon_update_user_study_normed.obj', (event) => {    
            const root = event.detail.loaderRootNode;
            scene.add(root);
        });
    // sinon on est dans l'étide dans on fait du random entre tous les mesh dispo sur le git
    } else {
        //objLoader.load('https://raw.githubusercontent.com/PelissierCombescure/User_study/main/3DMesh/'+obj_file[idx_mesh], (event) => {
        objLoader.load('https://raw.githubusercontent.com/PelissierCombescure/BVS-study/main/graphics/3DMesh/'+obj_file[idx_mesh], (event) => {    
            const root = event.detail.loaderRootNode;
            scene.add(root);
        });
    }
    mesh_courant = obj_file[idx_mesh].split('_')[0]
    choix_courant['obj_file'] = obj_file[idx_mesh]
    choix_courant['mesh'] = mesh_courant
    choix_courant['position_init_idx_i'] = idx_i_init
    choix_courant['position_init_idx_j'] =idx_j_init
    choix_courant['theta_init'] = theta_init
    choix_courant['delta_init'] = delta_init

    // pour savoir quel mesh on affiche
    interactions.push({"time": new Date().getTime(), "type": "Affichage Mesh random : "+mesh_courant+" en idx_i, idx_j : ("+idx_i_init+", "+idx_j_init+")"})
    interactions.push({"time": new Date().getTime(), "type": "Affichage Mesh random : "+mesh_courant+" en theta, delta : ("+theta_init+", "+delta_init+")"})
}

////////////////////////////////////////
////////////////////////////////////////

function init_data(){

    ctx.font = "  18pt Courier";
    ctx.strokeStyle = "rgb(255, 255, 255)" // Pour que le contour soit rouge
    ctx.fillStyle = "rgb(255, 255, 255)"
    // Data 2D
    imgs = {}
    imgs["droite"] = new_image('https://raw.githubusercontent.com/PelissierCombescure/BVS-study/main/graphics/Arrows/fleche_droite.png')
    imgs["gauche"] = new_image('https://raw.githubusercontent.com/PelissierCombescure/BVS-study/main/graphics/Arrows/fleche_gauche.png') 
    imgs["bas"] = new_image('https://raw.githubusercontent.com/PelissierCombescure/BVS-study/main/graphics/Arrows/fleche_bas.png')
    imgs["haut"] = new_image('https://raw.githubusercontent.com/PelissierCombescure/BVS-study/main/graphics/Arrows/fleche_haut.png')
    imgs["croix"] = new_image('https://raw.githubusercontent.com/PelissierCombescure/BVS-study/main/graphics/Choices/croix.png')
    imgs["check"] = new_image('https://raw.githubusercontent.com/PelissierCombescure/BVS-study/main/graphics/Choices/check.png')
    imgs["checkbox"] = new_image('https://raw.githubusercontent.com/PelissierCombescure/BVS-study/main/graphics/Choices/empty_checkbox.png')
    imgs["marie"] = new_image('https://raw.githubusercontent.com/PelissierCombescure/User_study/main/Autres/marie.png')
    imgs["clavier_vues"] = new_image('https://raw.githubusercontent.com/PelissierCombescure/BVS-study/main/graphics/Boutons/clavier_vues.png')
    imgs["clavier_enter"] = new_image('https://raw.githubusercontent.com/PelissierCombescure/BVS-study/main/graphics/Boutons/clavier_enter.png')
    imgs["exemple1"] = new_image('https://raw.githubusercontent.com/PelissierCombescure/BVS-study/main/graphics/Tutorial/exemple1.png')
    imgs["exemple2"] = new_image('https://raw.githubusercontent.com/PelissierCombescure/BVS-study/main/graphics/Tutorial/exemple2.png')
    imgs["recap1"] = new_image('https://raw.githubusercontent.com/PelissierCombescure/BVS-study/main/graphics/Tutorial/recap1.png')
    imgs["recap2"] = new_image('https://raw.githubusercontent.com/PelissierCombescure/BVS-study/main/graphics/Tutorial/recap2.png')
    imgs["recap3"] = new_image('https://raw.githubusercontent.com/PelissierCombescure/BVS-study/main/graphics/Tutorial/recap3.png')
    boutons = {}
    boutons["reinitialiser"] = new_image('https://raw.githubusercontent.com/PelissierCombescure/BVS-study/main/graphics/Boutons/bouton_reinitialiser.png')
    boutons["valider"] = new_image('https://raw.githubusercontent.com/PelissierCombescure/BVS-study/main/graphics/Boutons/bouton_valider.png')
    boutons["choix_pose"] = new_image('https://raw.githubusercontent.com/PelissierCombescure/BVS-study/main/graphics/Boutons/bouton_pose.png')
    boutons["retirer"] = new_image('https://raw.githubusercontent.com/PelissierCombescure/BVS-study/main/graphics/Boutons/bouton_retirer.png')
    boutons["commencer"] = new_image('https://raw.githubusercontent.com/PelissierCombescure/BVS-study/main/graphics/Boutons/bouton_commencer.png')
    boutons["commencer_choix"] = new_image('https://raw.githubusercontent.com/PelissierCombescure/BVS-study/main/graphics/Boutons/bouton_commencer_choix.png')
    boutons["commencer_tuto"] = new_image('https://raw.githubusercontent.com/PelissierCombescure/BVS-study/main/graphics/Boutons/bouton_commencer_tuto.png')
    boutons["commencer_inscription"] = new_image('https://raw.githubusercontent.com/PelissierCombescure/BVS-study/main/graphics/Boutons/bouton_commencer_inscription.png')
    boutons["raz"] = new_image('https://raw.githubusercontent.com/PelissierCombescure/BVS-study/main/graphics/Boutons/bouton_raz.png')
    boutons["suivant"] = new_image('https://raw.githubusercontent.com/PelissierCombescure/BVS-study/main/graphics/Boutons/bouton_suivant.png')
    boutons["suivant_grand"] = new_image('https://raw.githubusercontent.com/PelissierCombescure/BVS-study/main/graphics/Boutons/bouton_suivant_grand.png')
    boutons["avant"] = new_image('https://raw.githubusercontent.com/PelissierCombescure/BVS-study/main/graphics/Boutons/bouton_avant.png')
    boutons["raccourcis"] = new_image('https://raw.githubusercontent.com/PelissierCombescure/BVS-study/main/graphics/Boutons/bouton_raccourcis.png')

    // Mouse
    xyMouseMove = {"x": -1, "y": -1}
    xyMouseDown = {"x": -1, "y": -1}
    xyMouseUp = {"x": -1, "y": -1}

    canvas.addEventListener("mousemove", function(event) { xyMouseMove = getMousePos(canvas, event)}, false)
    canvas.addEventListener("mousedown", function(event) {
        xyMouseDown = getMousePos(canvas, event)
        clicked = true }, false)
    canvas.addEventListener("mouseup", function(event) { xyMouseUp = getMousePos(canvas, event)}, false)

}


function animate() {
    // Temps à chaque animate
    time_animate = new Date().getTime()
    // shorcut
    w_Bshortcut = 122
    h_Bshortcut = 40
    x_Bshortcut = 10
    y_Bshortcut = window.innerHeight-h_Bshortcut-10
////////////////////////////////////////////////////////////////////////////////
    if (page_contexte){
        //console.log("boucle contexte")
        //init touche clavier
        if (premier_tour_page_contexte){
            init_clavier_contexte()
            init_textes_contexte()
            premier_tour_page_contexte = false
        }
        traitement_contexte()  
    }
////////////////////////////////////////////////////////////////////////////////
    // page inscription
    if (page_inscription){
        //console.log("boucle inscription")
        // on enlève les touches du clavier associé à la page inscription
        document.removeEventListener("keydown", action_clavier_contexte)
        //init touche clavier
        if (premier_tour_page_inscription){
            init_clavier_inscription()
            afficher_champs_inscription()
            premier_tour_page_inscription=false}
        traitement_inscription()        
    }
////////////////////////////////////////////////////////////////////////////////
    if (page_explication){
        //console.log("boucle explication")
        // on enlève les touches du clavier associé à la page inscription
        document.removeEventListener("keydown", action_clavier_inscription)
        // Variable pour les fonctions
        init_variable_fonction(boutons, imgs)
        //init touche clavier
        if(premier_tour_page_explications){
            // init clavier pour les vues
            init_clavier_explication()
            //init_variable_fonction(boutons, imgs)
            init_explication()
            // affichage ecran 3D de manière aléatoire
            idx_i_explication = 4 , idx_j_explication = 1
            setUp_3D(indice_mesh, idx_i_explication, idx_j_explication, explication=true)
            premier_tour_page_explications = false
        }
        // Nettoyage 
        ctx.clearRect(0, 0, canvas.width, canvas.height)
        // Affichage bouton RAZ
        if (bouton_raz_clicked == true){action_bouton_raz()}
        // Affichage message pop
         if (Object.keys(texte_temporaire).length >0){
            if (time_animate > texte_temporaire.t_end){texte_temporaire = {}}
            else{print_text(handle_text(texte_temporaire.text, texte_temporaire.x, texte_temporaire.y, "  18pt Courier", longueur_max_error, "#118AB2"))}
        }
        // progress bar
        progress_bar(0, 1)
        // Affichage fleche
        afficher_fleche(imgs)
        // affichage de sboutons
        afficher_bouton(boutons)
        if (canvasRenderer === null) {canvasRenderer = document.getElementById("renderer")}
        // Les poses choisies sont grisées
        bloquer_pose(liste_poses)
        // traitement fleche (surval + click)
        traitement_explications(idx_i_explication, idx_j_explication)
        // affichage 3D
        renderer.render( scene, camera );
        // RAZ
        clicked = false
        which_clicked_fleche = -1
        which_clicked_bouton = -1 
    }
    // bouton entr ele tutorial et l'étude
    if (page_explication_bis){
        commencer_etude()
        ctx.clearRect(0, 0, canvas.width, canvas.height)
    }
////////////////////////////////////////////////////////////////////////////////
    // page de choix
    if (page_vues && num_tache <= nb_mesh){
        //console.log("boucle choix")
        // on enlève les touches du clavier associé à la page inscription
        document.removeEventListener("keydown", action_clavier_explication)
        //init touche clavier
        if(premier_tour_page_vues){
            // init clavier pour les vues
            init_clavier_vues()
            // affichage ecran 3D de manière aléatoire
            idx_i_init = Math.floor(Math.random()*8)
            idx_j_init = Math.floor(Math.random()*5)
            setUp_3D(indice_mesh, idx_i_init, idx_j_init)
            premier_tour_page_vues = false
        }
        // Variable pour les fonctions
        init_variable_fonction(boutons, imgs)
        // Nettoyage fleche
        ctx.clearRect(0, 0, canvas.width, canvas.height)
        // Affichage bouton RAZ
        if (bouton_raz_clicked == true){action_bouton_raz()}
        // Affichage message pop
         if (Object.keys(texte_temporaire).length >0){
            if (time_animate > texte_temporaire.t_end){texte_temporaire = {}}
            else{print_text(handle_text(texte_temporaire.text, texte_temporaire.x, texte_temporaire.y, "  18pt Courier", longueur_max_error, "#118AB2"))}
        }
        // progress bar
        progress_bar(num_tache-1, nb_mesh)
        // Affichage fleche
        afficher_fleche(imgs)
        // affichage de sboutons
        afficher_bouton(boutons)
        if (canvasRenderer === null) {canvasRenderer = document.getElementById("renderer")}
        // traitement fleche (surval + click)
        traitement_fleche()
        // traitement bouton : (survol + click)
        traitement_bouton() 
        // afficher + maj du recap de pose choisie : affichage des vue des poses
        afficher_recap()
        // Affichage texte recap
        for (p=0; p<liste_poses.length; p++){affichage_texte_recap(p)}
        // affichage 3D
        renderer.render( scene, camera );
        // Les poses choisies sont grisées
        bloquer_pose(liste_poses)
        // raccourcis
        // raccourcis bouton et fleche
        shortcuts(xyMouseMove, imgs['clavier_vues'], window.innerWidth/2 -(imgs['clavier_vues'].width/2), window.innerHeight/2 -(imgs['clavier_vues'].height/2), imgs['clavier_vues'].width, imgs['clavier_vues'].height, boutons['raccourcis'], x_Bshortcut, y_Bshortcut, w_Bshortcut, h_Bshortcut)

    }
////////////////////////////////////////////////////////////////////////////////
    // page analyse
    if (page_analyse){
        //console.log("boucle analyse")
        // on enlève les touches du clavier associé à la page vues
        document.removeEventListener("keydown", action_clavier_vues)
        // inti clavier
        if(premier_tour_page_analyse){
            interactions.push({"time": new Date().getTime(), "type": "Début analyse n°1"})
            init_clavier_analyse()
            premier_tour_page_analyse = false}
        init_variable_analyse()
        traitement_fin()
        
    }
////////////////////////////////////////////////////////////////////////////////
    // page fin
    if (!page_contexte && !page_inscription && !page_explication && !page_explication_bis && !page_vues && !page_analyse){
        //console.log("boucle fin")
        // on enlève les touches du clavier associé à la page vues
        document.removeEventListener("keydown", action_clavier_analyse)
        // clear la fenetre 
        ctx.clearRect(0, 0, window.innerWidth, window.innerHeight)
        draw_rectangle(0,0,canvas.width, canvas.height, "rgb(3, 26, 33)", 1)
        // Texte 
        affichage_texte_fin(message_fin, envoie_termine)
        // ECRITURE DES RESULTATS
        choix['Analyse'] = checkbox_clicked
        choix['Interactions'] = interactions
        // Création de la requête HTTP à envoyer au serveur.
        let xhr = new XMLHttpRequest();
        // Préparation de la requête pour l'envoi en POST vers l'url.
        xhr.open('POST', '/outputs');
        // Si on envoie les données de manière classique, il faut configurer le header de cette façon.
        xhr.setRequestHeader("Content-Type", "application/json;charset=UTF-8");
        // Ajout du listener pour déclencer la suite lorsque la requête sera terminée.
        xhr.onreadystatechange = function() {
            // Si la requête est terminée, et que la réponse n'est pas une erreur.
            if (xhr.readyState === XMLHttpRequest.DONE && xhr.status === 200) {
                console.log(xhr.responseText);
                message_fin = "> It's done."
                //print_text(handle_text(message_fin, (window.innerWidth/2)-450, innerHeight/2+150 , "26pt Courier", 1000))
                envoie_termine = true
                affichage_texte_fin(message_fin, envoie_termine)
                return;
            }
        }
        // Envoi de la requête vers le serveur, avec les données.
        xhr.send(JSON.stringify(choix));

        return

        
    }
////////////////////////////////////////////////////////////////////////////////
    // Boucle sur animate
    requestAnimationFrame( animate );
    // RAZ
    clicked = false
    which_clicked_fleche = -1
    which_clicked_bouton = -1
}

