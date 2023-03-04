
//////////////////////////////////////////////////////////////
// MAIN
// initialisation des variables
init_variable(true)
// initialisation du canvas : load des images
//setUp_3D(indice_mesh)

canvas = document.getElementById("canvas")
canvas.width  = window.innerWidth;
canvas.height = window.innerHeight;
ctx = canvas.getContext("2d")

init_data()
//init_clavier()
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

    // TEMPS
    // pour avoir un délai après le click
    //time_click = new Date().getTime()
    if (premier_appel){interactions = [{"time" : new Date().getTime(), "type": "start"}]}

    // Couleur
    alpha_survol = 0.3

    // DATA github
    indice_mesh = 0 // indice du premier mesh à visionner
    mesh_courant = "nope" // nom des mesh 
    // nombre de mesh a visionner AU TOTAL
    nb_mesh = 2 //3

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
    temps_pop = 1000
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
    page_vues = false // false
    page_analyse = false

    // Pour afiicher les recap dans la partie analys,e on les conserve tous
    all_ctxMins = {}
    all_canvasMins = {}

    // pour initialiser les claviers à chaque page
    premier_tour_page_contexte = true
    premier_tour_page_inscription = true 
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
function setUp_3D(idx_mesh){
    // Randommiser la première vue quand oon loed le mesh, pour éviter d'avoir de l'influence
    idx_i_init = Math.floor(Math.random()*8)
    idx_j_init = Math.floor(Math.random()*5)
    theta_init = 2*Math.PI * ( (2/8)*(idx_j_init==0) + (1/8)*(idx_j_init==1) + (-1/8)*(idx_j_init==3) + (-2/8)*(idx_j_init==4))
    delta_init = 2*Math.PI * (idx_i_init/8)

    // initialisation 
    idx_i = idx_i_init
    idx_j = idx_j_init

      // Caméra
    camera = new THREE.PerspectiveCamera( 70, window.innerWidth / window.innerHeight, 0.01, 1000 );
    camera.position.x = 2;
    camera.position.y = 0;
    camera.position.z = 0;
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
        c.width = 200
        c.heigth = 200
        let ctx_c = c.getContext("2d")
        canvasMins.push(c)
        ctxMins.push(ctx_c)
    }

    setUp_light(R)

    // Data 3D
    obj_file = ['dragon_update_user_study.obj', 'camel_update_user_study_normed.obj', 'gorgoile_update_user_study_centered_normed.obj']
    const objLoader = new THREE.OBJLoader2();
    objLoader.load('https://raw.githubusercontent.com/PelissierCombescure/User_study/main/3DMesh/'+obj_file[idx_mesh], (event) => {
        const root = event.detail.loaderRootNode;
        scene.add(root);
    });
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
//            CLAVIER

function action_clavier_contexte(event){
    switch (event.key){
        // selectionner pose
        case ' ' :
            action_bouton_commencer_contexte('clavier')
        break;
        // valider
        case  'Enter':
            action_bouton_commencer_contexte('clavier')          
        break;
    }
}

function action_clavier_inscription(event){
    switch (event.key){
        // selectionner pose
        case ' ' :
            if (champs_remplis_correctment()){
            action_bouton_commencer('clavier')}
            break;
        // valider
        case  'Enter':
            if (champs_remplis_correctment()){
            action_bouton_commencer('clavier')}            
            break;
    }
}

function action_clavier_vues(event){
    switch (event.key){
        case  'ArrowLeft':
            console.log("deplacement K-G")
            action_fleche_gauche()
            //idx_i = (idx_i+1)%8
            break;
        case 'ArrowRight' :
            console.log("deplacement K-D")
            action_fleche_droite()
            //idx_i = (idx_i+7)%8
            break;
        case 'ArrowDown' :
            console.log("deplacement K-B")
            action_fleche_bas()
            //idx_j = Math.min(idx_j+1,4)
            break;
        case 'ArrowUp' :
            console.log("deplacement K-H")
            action_fleche_haut()
            //idx_j = Math.max(idx_j-1,0)
            break;
        // selectionner pose
        case ' ' :
            action_bouton_pose()
            break;
        // retirer
        case 'Backspace':
            action_bouton_retirer()
            break;
        // reintialiser
        case 'Delete':
            action_bouton_reinitialiser()
            break;
        // valider
        case  'Enter':
            action_bouton_valider()             
            break;
    }
}

function action_clavier_analyse(event){
    switch (event.key){
        // selectionner pose
        // valider
        case  'Enter':
            action_bouton_valider_analyse()             
            break;
        case  '1':
            check_ou_decheck(0)           
            break;
        case  '2':
            check_ou_decheck(1)           
            break;
        case  '3':
            check_ou_decheck(2)           
            break;
        case  '4':
            check_ou_decheck(3)           
            break;
        case  '5':
            check_ou_decheck(4)           
            break;
    }
}

function init_clavier_contexte(){
    document.addEventListener("keydown", action_clavier_contexte)
}

function init_clavier_inscription(){
    document.addEventListener("keydown", action_clavier_inscription)
}

function init_clavier_vues(){
    document.addEventListener("keydown", action_clavier_vues)
}

function init_clavier_analyse(){
    document.addEventListener("keydown", action_clavier_analyse)
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
    boutons = {}
    boutons["reinitialiser"] = new_image('https://raw.githubusercontent.com/PelissierCombescure/BVS-study/main/graphics/Boutons/bouton_reinitialiser.png')
    boutons["valider"] = new_image('https://raw.githubusercontent.com/PelissierCombescure/BVS-study/main/graphics/Boutons/bouton_valider.png')
    boutons["choix_pose"] = new_image('https://raw.githubusercontent.com/PelissierCombescure/BVS-study/main/graphics/Boutons/bouton_pose.png')
    boutons["retirer"] = new_image('https://raw.githubusercontent.com/PelissierCombescure/BVS-study/main/graphics/Boutons/bouton_retirer.png')
    boutons["commencer"] = new_image('https://raw.githubusercontent.com/PelissierCombescure/BVS-study/main/graphics/Boutons/bouton_commencer.png')
    boutons["raz"] = new_image('https://raw.githubusercontent.com/PelissierCombescure/BVS-study/main/graphics/Boutons/bouton_raz.png')

    // Mouse
    xyMouseMove = {"x": -1, "y": -1}
    xyMouseDown = {"x": -1, "y": -1}
    xyMouseUp = {"x": -1, "y": -1}

    canvas.addEventListener("mousemove", function(event) { xyMouseMove = getMousePos(canvas, event)}, false)
    canvas.addEventListener("mousedown", function(event) {
        xyMouseDown = getMousePos(canvas, event)
        clicked = true }, false)
    canvas.addEventListener("mouseup", function(event) { xyMouseUp = getMousePos(canvas, event)}, false)

    console.log("fin init")
}


function animate() {
    // Temps à chaque animate
    time_animate = new Date().getTime()

    if (page_contexte){
        console.log("boucle contexte")
        //init touche clavier
        if (premier_tour_page_contexte){
            init_clavier_contexte()
            premier_tour_page_contexte = false
        }
        traitement_contexte()
    }

    // page inscription
    if (page_inscription){
        console.log("boucle inscription")
        // on enlève les touches du clavier associé à la page inscription
        document.removeEventListener("keydown", action_clavier_contexte)
        //init touche clavier
        if (premier_tour_page_inscription){
            init_clavier_inscription()
            afficher_champs_inscription()
            premier_tour_page_inscription=false}
        traitement_inscription()
    }

    // page de choix
    if (page_vues && num_tache <= nb_mesh){
        console.log("boucle choix")
        // on enlève les touches du clavier associé à la page inscription
        document.removeEventListener("keydown", action_clavier_inscription)
        //init touche clavier
        if(premier_tour_page_vues){
            //gestion des données personnelle de l'utilisateur
            gestion_donnees_personnelles()
            // init clavier pour les vues
            init_clavier_vues()
            // affichage ecran 3D
            setUp_3D(indice_mesh)
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
        progress_bar(num_tache, nb_mesh)
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
        // RAZ
        clicked = false
        which_clicked_fleche = -1
        which_clicked_bouton = -1 
    }
    // page analyse
    if (page_analyse){
        console.log("boucle analyse")
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
    // page fin
    if (!page_contexte && !page_inscription && !page_vues && !page_analyse){
        console.log("boucle fin")
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

    // Boucle sur animate
    requestAnimationFrame( animate );
    // RAZ
    clicked = false
    which_clicked_fleche = -1
    which_clicked_bouton = -1
}

