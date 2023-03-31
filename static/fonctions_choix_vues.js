// Variable global
// bouton
function init_variable_fonction(dict_boutons, dict_imgs ){
    // fleche
    //scale_fleche = 0.065
    dy = 0.03*H_3D
    DY = 2*dy
    a = 0.05*window.innerHeight//scale_fleche*dict_imgs["gauche"].height
    ratio_fleche = a/dict_imgs["gauche"].height
    b = ratio_fleche*dict_imgs["gauche"].width

    // bouton
    //scale_bouton = 0.3
    h_bouton = 0.08*window.innerHeight//scale_bouton*dict_boutons["choix_pose"].height
    ratio = h_bouton/dict_boutons["choix_pose"].height
    w_bouton = ratio*dict_boutons["choix_pose"].width
    pos_bouton =  ((W_3D*0.2+a+b)/W_3D)+0.1
    ecart_bouton =  0.1*w_bouton

    // Couleur
    alpha_bloque = 0.6

    // progress bar
    x_progress_bar = 0
    y_progress_bar = 0
    w_progress_bar = window.innerWidth - W_3D*0.1
    h_progress_bar = H_3D*0.04  

    // image recap
    dx = 20
    ecart_recap  = 0.055*window.innerHeight
    y0_recap = (2*h_progress_bar + ecart_recap)
    
    // Message pop up
    x_pop_up = W_3D*pos_bouton+w_bouton*2+ecart_bouton+30
    y_pop_up = H_3D +dy*4
    ecart = 40

    // texte
    taille_texte = (0.01*window.innerWidth)
    
}


function bloquer_pose(L_poses){
    for (p=0; p<L_poses.length; p++){
        idx_i_p = L_poses[p][3].idx_i
        idx_j_p = L_poses[p][4].idx_j
        // Si on est en train de voir une pose déjà choisie
        if (idx_i== idx_i_p && idx_j==idx_j_p){
            draw_rectangle(0, h_progress_bar, W_3D, H_3D-h_progress_bar, "rgb(0, 0, 0)", alpha_bloque)
            print_text(handle_text("Viewpoint already selected", 10, H_3D, taille_texte+"pt Courier", H_3D, "#118AB2")) 
        }
    }
}

function pose_deja_choisie(L_poses, i_choix, j_choix){
    deja_choisie = false
    for (p=0; p<L_poses.length; p++){
        idx_i_p = L_poses[p][3].idx_i
        idx_j_p = L_poses[p][4].idx_j
        // Si on est en train de voir une pose déjà choisie
        if (i_choix == idx_i_p && j_choix==idx_j_p){
            deja_choisie = true
        }
    }
}

function show_consignes(){
    w_consigne = 0.02*window.innerWidth
    h_consigne = w_consigne
    x_titre_vue = W_3D + ((window.innerWidth-W_3D)/2)- (largeur/2) // Position de "Selected Viewpoints"
    x_consigne = W_3D + (x_titre_vue - W_3D)/2 - w_consigne/2
    y_consigne =  h_progress_bar + 10
    ctx.drawImage(boutons["consigne"], x_consigne, y_consigne, w_consigne, h_consigne)
    // survol
    if (is_inside(xyMouseMove, x_consigne, y_consigne, w_consigne, h_consigne)){
        x_ecran = W_3D 
        y_ecran =  0.15*window.innerHeight
        w_ecran = window.innerWidth-W_3D
        h_ecran = H_3D/2
        draw_rectangle(x_ecran, y_ecran, w_ecran, h_ecran, "rgb(255, 255, 255)", 1)
        // Texte
        //tt = {"t":"- You will be presented "+nb_mesh+" different objects."}
        //ff = {"t":"- For each of them, you will chose a viewpoint you find most representative of the given object. You will have to do this "+nb_choix_demande+" times."}
        print_text(handle_text(textes_contexte['texte13'].t,  x_ecran + 20, y_ecran+ 0.2*h_ecran, (0.01*window.innerWidth)+"pt Courier", w_ecran-20, "rgb(0,0,0)"))
        print_text(handle_text(textes_contexte['texte14'].t,  x_ecran + 20, y_ecran+0.4*h_ecran, (0.01*window.innerWidth)+"pt Courier", w_ecran-20, "rgb(0,0,0)"))
    }
}

///////////////////////////////////////////////////////////////
///////////////////// Recap 
function swapElements(arr, i1, i2) {
    // Step 1
    let temp = arr[i1];

    // Step 2
    arr[i1] = arr[i2];

    // Step 3
    arr[i2] = temp;
}

// legende des nb_demande recap
function affichage_texte_recap(pos){
    y_image = y0_recap+(20+ H_3D/3.5)*pos
    ctx.strokeStyle = "rgb(255, 255, 255)"; ctx.fillStyle = "rgb(255, 255, 255)"
    if (pos==0){print_text(handle_text("Best viewpoint:", W_3D+dx, (H_3D/3.5)*0.4 + y_image, 1.1*taille_texte+"pt Courier", longueur_max_recap))}
    if (pos==1){print_text(handle_text("2nd viewpoint:", W_3D+dx, (H_3D/3.5)*0.4 + y_image, 1.1*taille_texte+"pt Courier", longueur_max_recap))}
    if (pos==2){print_text(handle_text("3rd viewpoint:", W_3D+dx, (H_3D/3.5)*0.4 + y_image, 1.1*taille_texte+"pt Courier", longueur_max_recap))}
}

function afficher_recap(){
    w_recap = window.innerWidth-W_3D
    // fleche swap haut
    x_fleche_h = W_3D + w_recap/2 - 30 
    w_fleche_h = 20
    h_fleche_h = 20
    // fleche swap bas
    x_fleche_b = W_3D + w_recap/2 - 30 
    w_fleche_b = 20
    h_fleche_b = 20
    // croix
    x_croix = W_3D+ w_recap/2.5 + W_3D/3.5 +10
    w_croix = 20
    h_croix = 20
    // pour chaque recap
    for (let i = 0 ; i < canvasMins.length; i++) {
        // Draw les images des contextes
        y_image =  y0_recap + (10 + H_3D/3.5)*i
        ctx.drawImage(canvasMins[i], W_3D + w_recap/2, y_image, H_3D/3.5, H_3D/3.5)

        //Fleche pour Switch haut
        if (nb_choix_fait > 1 && i > 0 && i < nb_choix_fait) {
            y_fleche_h = (H_3D/3.5)*0.35 + y_image
            ctx.drawImage(imgs["haut"], x_fleche_h, y_fleche_h, w_fleche_h, h_fleche_h)
            if (clicked && click_inside(xyMouseDown, x_fleche_h, y_fleche_h, w_fleche_h, h_fleche_h)) {
                swapElements(canvasMins, i, i-1)
                swapElements(ctxMins, i, i-1)
                swapElements(liste_poses, i, i-1)
                liste_poses[i-1][0] = 'choix'+(i)
                liste_poses[i][0] = 'choix'+(i+1)
                interactions.push({"time": new Date().getTime(), "type": get_message('switch_haut_i', [num_tache, nb_choix_fait, i])})
                clicked = false
            }
        }
        // Fleche pour Switch bas
        if (nb_choix_fait > 1 && i < nb_choix_fait-1) {
            y_fleche_b =  (H_3D/3.5)*0.65 + y_image
            ctx.drawImage(imgs["bas"], x_fleche_b, y_fleche_b, w_fleche_b, h_fleche_b)
            if (clicked && click_inside(xyMouseDown, x_fleche_b, y_fleche_b, w_fleche_b, h_fleche_b)) {
                swapElements(canvasMins, i, i+1)
                swapElements(ctxMins, i, i+1)
                swapElements(liste_poses, i, i+1)
                liste_poses[i][0] = 'choix'+(i+1)
                liste_poses[i+1][0] = 'choix'+(i+2)
                interactions.push({"time": new Date().getTime(), "type": get_message('switch_bas_i', [num_tache, nb_choix_fait, i])})
                clicked = false
            }
        }
        // Croix
        if (i < nb_choix_fait) {
            // croix pour annuler
            y_croix = (H_3D/3.5)*0.4 + y_image
            ctx.drawImage(imgs["croix"], x_croix, y_croix, w_croix, h_croix)
            if (clicked && click_inside(xyMouseDown, x_croix, y_croix, w_croix, h_croix)) {
                liste_poses.splice(i, 1)
                nb_choix_fait = nb_choix_fait-1
                interactions.push({"time": new Date().getTime(), "type": get_message('supp_pose_i', [num_tache, nb_choix_fait,i])})
                ctxMins[i].clearRect(0, 0, canvasMins[i].width, canvasMins[i].height)
                for (let j = i; j < nb_choix_demande-1; j++) {
                    swapElements(canvasMins, j, j+1)
                    swapElements(ctxMins, j, j+1)
                }
                for (let j = i; j < liste_poses.length; j++) {
                    liste_poses[j][0] = 'choix'+(j+1)
                }
            }
        }
    }
}

///////////////////////////////////////////////////////////////
///////////////////// FLECHE
function afficher_fleche(dict_imgs){
    // image, posx, posy, W, H
    ctx.drawImage(dict_imgs["bas"], W_3D*0.2, H_3D+DY+b+a, a, b)
    ctx.drawImage(dict_imgs["haut"], W_3D*0.2, H_3D+DY, a, b)
    ctx.drawImage(dict_imgs["gauche"], W_3D*0.2-b, H_3D+DY+b, b, a)
    ctx.drawImage(dict_imgs["droite"], W_3D*0.2+a, H_3D+DY+b, b, a)

}

// afficher un rectangle autour des fleches quand la souris survol
function survol_fleche(){
    // Fleche GAUCHE
    if (xyMouseMove.x >= W_3D*0.2-b  && xyMouseMove.x <= W_3D*0.2 && xyMouseMove.y > H_3D+DY+b && xyMouseMove.y < H_3D+DY+b+a ){
        draw_contour(W_3D*0.2-b, H_3D+DY+b, b, a, "rgb(200, 200, 200)", alpha_survol)
    }
    // Fleche DROITE
    if (xyMouseMove.x >= W_3D*0.2+a  && xyMouseMove.x <= W_3D*0.2+a+b && xyMouseMove.y > H_3D+DY+b && xyMouseMove.y < H_3D+DY+b+a ){
        draw_contour(W_3D*0.2+a, H_3D+DY+b, b, a, "rgb(200, 200, 200)", alpha_survol)
    }
    // Fleche HAUT
    if (xyMouseMove.x >= W_3D*0.2  && xyMouseMove.x <= W_3D*0.2+a && xyMouseMove.y > H_3D+DY && xyMouseMove.y < H_3D+DY+b ){
        // l'image devient verte
        draw_contour(W_3D*0.2, H_3D+DY, a, b, "rgb(200, 200, 200)", alpha_survol)
    }
    // Fleche BAS
    if (xyMouseMove.x >=  W_3D*0.2  && xyMouseMove.x <=  W_3D*0.2+a && xyMouseMove.y > H_3D+DY+b+a && xyMouseMove.y < H_3D+DY+b+a+b ){
        // l'image devient verte
        draw_contour(W_3D*0.2, H_3D+DY+b+a, a, b, "rgb(200, 200, 200)", alpha_survol)
    }
}

// MAJ de which_clicked avec le nom de la fleche clickée
function get_clicked_fleche(){
    // Fleche GAUCHE
    if (clicked && xyMouseMove.x >= W_3D*0.2-b  && xyMouseMove.x <= W_3D*0.2 && xyMouseMove.y > H_3D+DY+b && xyMouseMove.y < H_3D+DY+b+a ){
        which_clicked_fleche = 'gauche'
    }
    // Fleche DROITE
    if (clicked && xyMouseMove.x >= W_3D*0.2+a  && xyMouseMove.x <= W_3D*0.2+a+b && xyMouseMove.y > H_3D+DY+b && xyMouseMove.y < H_3D+DY+b+a ){
        which_clicked_fleche = 'droite'
    }
    // Fleche HAUT
    if (clicked && xyMouseMove.x >= W_3D*0.2  && xyMouseMove.x <= W_3D*0.2+a && xyMouseMove.y > H_3D+DY && xyMouseMove.y < H_3D+DY+b ){
        // l'image devient verte
        which_clicked_fleche = 'haut'
    }
    // Fleche BAS
    if (clicked && xyMouseMove.x >=  W_3D*0.2  && xyMouseMove.x <=  W_3D*0.2+a && xyMouseMove.y > H_3D+DY+b+a && xyMouseMove.y < H_3D+DY+b+a+b ){
        // l'image devient verte
        which_clicked_fleche = 'bas'
    }
}

function traitement_fleche(){
    // Survol des fleches avec la souris
    survol_fleche()
    // click sur une fleche
    get_clicked_fleche()
    //console.log(which_clicked_fleche)
    switch (which_clicked_fleche){
        case'gauche' :
            //console.log("deplacement G")
            action_fleche_gauche()
            //idx_i = (idx_i+1)%8
            break;
        case 'droite' :
            //console.log("deplacement D")
            //idx_i = (idx_i+7)%8
            action_fleche_droite()
            break;
        case'haut' :
            //console.log("deplacement H")
            action_fleche_haut()
            //idx_j = Math.max(idx_j-1,0)
               //idx_j = Math.max(idx_j-1,1)
            break;
        case 'bas' :
            //console.log("deplacement B")
            action_fleche_bas()
            //idx_j = Math.min(idx_j+1,4)
                 //idx_j = Math.min(idx_j+1,3)
            break;
    }
    console.log(idx_i, idx_j)
    theta = 2*Math.PI * ( (2/8)*(idx_j==0) + (1/8)*(idx_j==1) + (-1/8)*(idx_j==3) + (-2/8)*(idx_j==4))
    delta = 2*Math.PI * (idx_i/8)
    //camera.position.set(R*Math.cos(theta)*Math.cos(delta), R*Math.sin(theta)*Math.cos(delta), R*Math.sin(delta)) // repère wiki
    camera.position.set(R*Math.cos(delta)*Math.cos(theta), R*Math.sin(theta), R*Math.sin(delta)*Math.cos(theta)) // repère JS
    camera.lookAt(0, 0, 0)
}

function action_fleche_gauche(){
    idx_i = (idx_i+1)%8
    interactions.push({"time": new Date().getTime(), "type": get_message('FG', [num_tache, nb_choix_fait, idx_i, idx_j])})}
function action_fleche_droite(){
    idx_i = (idx_i+7)%8
    interactions.push({"time": new Date().getTime(), "type": get_message('FD', [num_tache, nb_choix_fait, idx_i, idx_j])})}
function action_fleche_haut(){
    interactions.push({"time": new Date().getTime(), "type": get_message('FH', [num_tache, nb_choix_fait, idx_i, idx_j])})
    if (idx_j == 0){
        texte_temporaire = {"text": "You can't go any further, GO BACK DOWN.", "x": x_pop_up, "y": y_pop_up, "t_end": new Date().getTime()+temps_pop}
        interactions.push({"time": new Date().getTime(), "type": get_message("erreur_FH", [num_tache, nb_choix_fait]) })
    }
    idx_j = Math.max(idx_j-1,0)
    }
function action_fleche_bas(){
    interactions.push({"time": new Date().getTime(), "type": get_message('FB', [num_tache, nb_choix_fait, idx_i, idx_j])})
    if (idx_j == 4){
        texte_temporaire = {"text": "You can't go any further, GO UP.", "x": x_pop_up, "y": y_pop_up, "t_end": new Date().getTime()+temps_pop}
        interactions.push({"time": new Date().getTime(), "type": get_message("erreur_FB", [num_tache, nb_choix_fait]) })
    }
    idx_j = Math.min(idx_j+1,4)
    }

///////////////////////////////////////////////////////////////
///////////////////// BOUTON
function afficher_bouton(dict_boutons){
    // Partie selection vue
    ctx.strokeStyle = "rgb(255, 255, 255)" // Pour que le contour soit rouge
    ctx.fillStyle = "rgb(255, 255, 255)" // Pour que l'intérieur soit bleu
    ctx.font = 2*taille_texte+"pt Courier"
    texte = "Selected Viewpoints:"
    largeur = ctx.measureText(texte).width
    ctx.fillText(texte, W_3D + ((window.innerWidth-W_3D)/2)- (largeur/2), h_progress_bar + ecart_recap)
    //print_text(handle_text("Selected Viewpoints:",   W_3D +(window.innerWidth-W_3D)/5,  h_progress_bar + ecart_recap, 2*taille_texte+"pt Courier", 500))

    // BOUTONS
    // image, posx, posy, W, H
    ctx.drawImage(dict_boutons["choix_pose"], W_3D*pos_bouton, H_3D+dy*2, w_bouton, h_bouton)
    ctx.drawImage(dict_boutons["retirer"], W_3D*pos_bouton+w_bouton+ecart_bouton, H_3D+dy*2, w_bouton, h_bouton)
    ctx.drawImage(dict_boutons["reinitialiser"], W_3D*pos_bouton+w_bouton/2, H_3D+dy*2+h_bouton+ecart_bouton, w_bouton, h_bouton)    
    ctx.drawImage(dict_boutons["raz"], window.innerWidth-w_bouton-10, window.innerHeight-h_bouton-10, w_bouton, h_bouton)
    if (nb_choix_fait == nb_choix_demande){ 
        ctx.drawImage(dict_boutons["valider"], -(1.2*w_bouton)/4+W_3D, H_3D+dy*2+h_bouton, w_bouton*1.2, h_bouton*1.2)}
}

function survol_bouton(){
    // Choisir le pt de vue
    //if (xyMouseMove.x >= W_3D*0.2+a+2*b+ecart  && xyMouseMove.x <= W_3D*0.2+a+2*b+ecart+w_bouton && xyMouseMove.y > H_3D+dy && xyMouseMove.y < H_3D+dy+h_bouton ){
    if (is_inside(xyMouseMove, W_3D*pos_bouton, H_3D+dy*2, w_bouton, h_bouton)){
        draw_rectangle(W_3D*pos_bouton, H_3D+dy*2, w_bouton, h_bouton, "rgb(200, 200, 200)", 0.6)
    }
    // Retirer
    //if (xyMouseMove.x >= W_3D*0.2+a+2*b+ecart*7  && xyMouseMove.x <= W_3D*0.2+a+2*b+ecart*7+w_bouton && xyMouseMove.y > H_3D+dy+b && xyMouseMove.y < H_3D+dy+h_bouton ){
    else if (is_inside(xyMouseMove, W_3D*pos_bouton+w_bouton+ecart_bouton, H_3D+dy*2, w_bouton, h_bouton)){   
        draw_rectangle(W_3D*pos_bouton+w_bouton+ecart_bouton, H_3D+dy*2, w_bouton, h_bouton, "rgb(200, 200, 200)", 0.6)
    }
    // Reintialiser
    //if (xyMouseMove.x >= W_3D*0.2+a+2*b+ecart*7  && xyMouseMove.x <= W_3D*0.2+a+2*b+ecart*7+w_bouton && xyMouseMove.y > H_3D+dy+b+ecart*2 && xyMouseMove.y < H_3D+dy+b+ecart*2+h_bouton ){
    else if (is_inside(xyMouseMove, W_3D*pos_bouton+w_bouton/2, H_3D+dy*2+h_bouton+ecart_bouton, w_bouton, h_bouton)){
        draw_rectangle(W_3D*pos_bouton+w_bouton/2, H_3D+dy*2+h_bouton+ecart_bouton, w_bouton, h_bouton, "rgb(200, 200, 200)", 0.6)
    }
    // Valider
    //if (xyMouseMove.x >= W_3D*0.2+a+2*b+ecart  && xyMouseMove.x <= W_3D*0.2+a+2*b+ecart+w_bouton && xyMouseMove.y > H_3D+dy+b+ecart*2 && xyMouseMove.y < H_3D+dy+b+ecart*2+h_bouton ){
    else if (nb_choix_demande==nb_choix_fait && is_inside(xyMouseMove, -(1.2*w_bouton)/4+W_3D, H_3D+dy*2+h_bouton, w_bouton*1.2, h_bouton*1.2)) {    
        draw_rectangle(-(1.2*w_bouton)/4+W_3D, H_3D+dy*2+h_bouton, w_bouton*1.2, h_bouton*1.2, "rgb(200, 200, 200)", 0.6)
    }
    //RAZ
    else if (is_inside(xyMouseMove, window.innerWidth-w_bouton-10, window.innerHeight-h_bouton-10, w_bouton, h_bouton )) {    
        draw_rectangle(window.innerWidth-w_bouton-10, window.innerHeight-h_bouton-10, w_bouton, h_bouton, "rgb(200, 200, 200)", 0.6)
    }
}

function get_clicked_bouton(){
    //if (clicked && xyMouseMove.x >= W_3D*0.35+a+2*b+ecart  && xyMouseMove.x <= W_3D*0.35+a+2*b+ecart+w_bouton && xyMouseMove.y > H_3D+dy+b && xyMouseMove.y < H_3D+dy+b+h_bouton ){
    if (clicked && click_inside(xyMouseMove, W_3D*pos_bouton, H_3D+dy*2, w_bouton, h_bouton)){
        which_clicked_bouton = "bouton_pose"
    }
    //if (clicked && xyMouseMove.x >= W_3D*0.35+a+2*b+ecart*7  && xyMouseMove.x <= W_3D*0.35+a+2*b+ecart*7+w_bouton && xyMouseMove.y > H_3D+dy+b && xyMouseMove.y < H_3D+dy+b+h_bouton ){
    if (clicked && click_inside(xyMouseMove, W_3D*pos_bouton+w_bouton+ecart_bouton, H_3D+dy*2, w_bouton, h_bouton)){ 
        which_clicked_bouton = "bouton_retirer"
    }
    //if (clicked && xyMouseMove.x >= W_3D*0.35+a+2*b+ecart*7  && xyMouseMove.x <= W_3D*0.35+a+2*b+ecart*7+w_bouton && xyMouseMove.y > H_3D+dy+b+ecart*2 && xyMouseMove.y < H_3D+dy+b+ecart*2+h_bouton ){
    if (clicked && click_inside(xyMouseMove, W_3D*pos_bouton+w_bouton/2, H_3D+dy*2+h_bouton+ecart_bouton, w_bouton, h_bouton)){
        which_clicked_bouton = "bouton_reinitialiser"
    }
    //if (clicked && xyMouseMove.x >= W_3D*0.35+a+2*b+ecart  && xyMouseMove.x <= W_3D*0.35+a+2*b+ecart+w_bouton && xyMouseMove.y > H_3D+dy+b+ecart*2 && xyMouseMove.y < H_3D+dy+b+ecart*2+h_bouton ){
    if (nb_choix_demande==nb_choix_fait &&clicked && click_inside(xyMouseMove, -(1.2*w_bouton)/4+W_3D, H_3D+dy*2+h_bouton, w_bouton*1.2, h_bouton*1.2)) {      
        which_clicked_bouton = "bouton_valider"
    }
    if (clicked && click_inside(xyMouseMove, window.innerWidth-w_bouton-10, window.innerHeight-h_bouton-10, w_bouton, h_bouton)) {      
        which_clicked_bouton = "bouton_raz"
        interactions.push({"time": new Date().getTime(), "type": get_message("bouton_raz", [num_tache, nb_choix_fait])})
    }
}

function action_bouton_pose(){
    // on regarde si la pose sélectionnée n'a pas déjà été choisie avant
    pose_deja_choisie(liste_poses, idx_i, idx_j)

    if (deja_choisie && !(nb_choix_fait == nb_choix_demande)){
        //console.log("Cette pose a déjà été sélectionnée.")
        texte_temporaire = {"text": "This viewpoint has already been selected.", "x": x_pop_up, "y": y_pop_up, "t_end": new Date().getTime()+temps_pop}
        interactions.push({"time": new Date().getTime(), "type": get_message("erreur_pose_selectionnee", [num_tache, nb_choix_fait])})}
    
        // plus de choix possible
    if (nb_choix_fait == nb_choix_demande) {
        //console.log("Tu as déjà fait tes "+nb_choix_demande+" choix.")
        texte_temporaire = {"text": "You have already selected your "+nb_choix_demande+" viewpoints.", "x": x_pop_up, "y": y_pop_up, "t_end": new Date().getTime()+temps_pop}
        interactions.push({"time": new Date().getTime(), "type": get_message("erreur_choix_fait", [num_tache, nb_choix_fait, nb_choix_fait])})}
    
        // si on a pas encore choisie toutes nos poses, on peut en ajouter
    if (nb_choix_fait < nb_choix_demande && !(deja_choisie)){
        liste_poses.push(['choix'+(nb_choix_fait+1), {'theta':theta}, {"delta":delta}, {'idx_i':idx_i}, {'idx_j':idx_j}])
        // affichage de la vue sélectionnée dans le recap
        ctxMins[nb_choix_fait].drawImage(canvasRenderer, 0.5*canvasRenderer.width-0.5*canvasRenderer.height, 0, canvasRenderer.height, canvasRenderer.height, 0, 0, canvasMins[0].width, canvasMins[0].height)//canvasRenderer.height*0.3, canvasRenderer.height*0.25)
        nb_choix_fait = nb_choix_fait+1
        interactions.push({"time": new Date().getTime(), "type": get_message("bouton_select", [num_tache, nb_choix_fait, nb_choix_fait, idx_i, idx_j])})
    }
}

function action_bouton_retirer(){
    // il y a des poses à retirer
    if (liste_poses.length > 0){
        liste_poses.pop()
        nb_choix_fait = nb_choix_fait-1
        // RAZ du contexte liée à la dernière vue ajoutée
        ctxMins[nb_choix_fait].clearRect(0, 0, canvasMins[nb_choix_fait].width, canvasMins[nb_choix_fait].height)
        interactions.push({"time": new Date().getTime(), "type": get_message('bouton_remove', [num_tache, nb_choix_fait])})
        // On retire toutes les checkbox des checkbox
        //checkbox_clicked_courant[nb_choix_fait].idx_checkbox = []
        //checkbox_clicked_courant[nb_choix_fait].mots = []
    }
    // S'il n'y a pas de pose choisie
    else {
        //console.log("Il n'y a pas de pose à retirer.")
        texte_temporaire = {"text": "There are no selected viewpoints to remove.", "x": x_pop_up, "y": y_pop_up, "t_end": new Date().getTime()+temps_pop}
        interactions.push({"time": new Date().getTime(), "type": get_message("erreur_pas_de_pose", [num_tache, nb_choix_fait])})
    }
}

function action_bouton_reinitialiser(){
    if (liste_poses.length>0){
        liste_poses = []
        nb_choix_fait = 0
        interactions.push({"time": new Date().getTime(), "type": get_message("bouton_reset", [num_tache, nb_choix_fait])})
        // RAZ de tous les contexte : on ne les surrpime pas, on les nettoie
        for (let i = 0; i < nb_choix_demande; i++) {
            ctxMins[i].clearRect(0, 0, canvasMins[i].width, canvasMins[i].height)
        }
    }
    else {//console.log("Il n'y a pas de pose à reintialiser.")
        texte_temporaire = {"text": "There are no selected viewpoints to resart.", "x":x_pop_up, "y": y_pop_up, "t_end": new Date().getTime()+temps_pop}
    interactions.push({"time": new Date().getTime(), "type": get_message("erreur_reset_impossible", [num_tache, nb_choix_fait])})}
}

function action_bouton_valider(){
    interactions.push({"time": new Date().getTime(), "type": get_message("bouton_valider", [num_tache, nb_choix_fait])})
    // Si tous les mesh ont été vu
    if (num_tache == nb_mesh && nb_choix_demande==nb_choix_fait){
        choix_courant['choix_poses'] = liste_poses
        choix['tache_N'+num_tache] = choix_courant
        // sauvegarde des images du recap
        all_ctxMins['tache_N'+num_tache] = [mesh_courant,ctxMins]
        all_canvasMins['tache_N'+num_tache] = [mesh_courant,canvasMins]
        //checkbox_clicked['tache_N'+num_tache] = checkbox_clicked_courant
        num_tache = num_tache+1
        //page_analyse = true
        page_explication_analyse = true
        page_vues = false
        interactions.push({"time": new Date().getTime(), "type": get_message('fin_tache_i', [num_tache-1])})
        interactions.push({"time": new Date().getTime(), "type": get_message("fin_choix", [])})
    }

    // Si le nombre de vue demandé a été fait et que ce n'est pas le dernier mesh à voir
    else if (nb_choix_demande == liste_poses.length && num_tache < nb_mesh){
        choix_courant['choix_poses'] = liste_poses
        choix['tache_N'+num_tache] = choix_courant
        // sauvegarde des images du recap
        all_ctxMins['tache_N'+num_tache] = [mesh_courant,ctxMins]
        all_canvasMins['tache_N'+num_tache] = [mesh_courant,canvasMins]
        //checkbox_clicked['tache_N'+num_tache] = checkbox_clicked_courant
        // RAZ
        choix_courant = {}
        liste_poses = []
        nb_choix_fait = 0
        //checkbox_clicked_courant = []
        //for (let i = 0 ; i < nb_choix_demande; i++){checkbox_clicked_courant.push({recap: "n°"+(i+1),idx_checkbox:[], mots:[]})}
        // Mesh suivant
        indice_mesh = indice_mesh + 1
        num_tache = num_tache+1
        idx_i_init = Math.floor(Math.random()*8); idx_j_init = Math.floor(Math.random()*5)
        interactions.push({"time": new Date().getTime(), "type": get_message('fin_tache_i', [num_tache-1])})
        interactions.push({"time": new Date().getTime(), "type": get_message('debut_tache_i', [num_tache])})
        setUp_3D(indice_mesh, idx_i_init, idx_j_init) 

    }

    // Error : il reste des vues à sélectionner
    else if (nb_choix_fait < nb_choix_demande){
        //console.log("Tu n'as pas fait tes 3 choix")
        texte_temporaire = {"text": "You did not select your "+nb_choix_demande+" viewpoints.", "x": x_pop_up, "y": y_pop_up, "t_end": new Date().getTime()+temps_pop}
        interactions.push({"time": new Date().getTime(), "type": get_message("erreur_valider", [num_tache, nb_choix_fait])})
    }
    // Error : un pbl à identifier
    else{
        console.log("PBL bouton valider")
    }
}

function action_bouton_raz(){
    x_texte_raz = -(1.2*w_bouton)/4+W_3D + w_bouton*1.2 +10
    y_texte_raz = H_3D+dy*2+h_bouton
    l_max_raz = window.innerWidth-w_bouton-10 - x_texte_raz
    //on efface les autres textes pop
    texte_temporaire = {}
    //affichage du message 
    print_text(handle_text("Do you really want to restart the study?", x_texte_raz, y_texte_raz, taille_texte+"pt Courier", l_max_raz, color="#FFFFFF", interligne=0.045*window.innerHeight))
    // affichage 
    ctx.drawImage(imgs['croix'], x_texte_raz+ l_max_raz*0.2, window.innerHeight-h_bouton +10,  h_bouton/2, h_bouton/2)
    ctx.drawImage(imgs['check'], x_texte_raz+ l_max_raz*0.6, window.innerHeight-h_bouton +10,  h_bouton/2, h_bouton/2)
    // si on veut raz
    if (clicked && is_inside(xyMouseMove, x_texte_raz+ l_max_raz*0.6, window.innerHeight-h_bouton +10, h_bouton/2, h_bouton/2)){
        init_variable(false); 
        idx_i_init = Math.floor(Math.random()*8); idx_j_init = Math.floor(Math.random()*5)
        setUp_3D(indice_mesh, idx_i_init, idx_j_init)
        interactions.push({"time": new Date().getTime(), "type": get_message("bouton_raz_check", [num_tache, nb_choix_fait])})}
    // click sur la croix ou ailleurs : on clear
    if(clicked){
        bouton_raz_clicked = false
        interactions.push({"time": new Date().getTime(), "type": get_message("bouton_raz_croix", [num_tache, nb_choix_fait])})}


}

function traitement_bouton(){
    // raccourcis bouton et fleche
    //shortcuts(xyMouseMove, imgs['clavier_vues'], window.innerWidth/2 -(imgs['clavier_vues'].width/2), window.innerHeight/2 -(imgs['clavier_vues'].height/2), imgs['clavier_vues'].width, imgs['clavier_vues'].height, boutons['raccourcis'], x_Bshortcut, y_Bshortcut, w_Bshortcut, h_Bshortcut)
    // si on survol, on a les contours qui apparaissent
    survol_bouton()
    // si on click
    get_clicked_bouton()
    switch (which_clicked_bouton){
            // bouton valider pose : on rajoute le bouton à la liste
        case 'bouton_pose':
            bouton_raz_clicked = false
            action_bouton_pose()
            break;
        case 'bouton_retirer':
            bouton_raz_clicked = false
            action_bouton_retirer()
            break;
        case 'bouton_reinitialiser':
            bouton_raz_clicked = false
            action_bouton_reinitialiser()
            break;
        case 'bouton_valider':
            bouton_raz_clicked = false
            action_bouton_valider()
            break;
        case 'bouton_raz':
            bouton_raz_clicked = true
            //console.log("bouton raz")
            break;
    }
}

