// Variable global
// bouton
function init_variable_fonction(dict_boutons, dict_imgs ){
    // fleche
    scale_fleche = 0.065
    dy = 0.03*H_3D
    DY = 2*dy
    a = scale_fleche*dict_imgs["gauche"].height
    b = scale_fleche*dict_imgs["gauche"].width
    // bouton
    scale_bouton = 0.3
    h_bouton = scale_bouton*dict_boutons["choix_pose"].height
    w_bouton = scale_bouton*dict_boutons["choix_pose"].width
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
    // Message pop up
    x_pop_up = W_3D*pos_bouton+w_bouton*2+ecart_bouton+30
    y_pop_up = H_3D +dy*4
    ecart = 40
    
}


function new_image(src) {
    img = new Image()
    img.src = src
    return img
}

function getMousePos(c, event) {
    var rect = c.getBoundingClientRect()
    return {
        x: event.clientX - rect.left,
        y: event.clientY - rect.top
    }
}

function is_inside(xyMove, x, y, w, h) {
    return (xyMove.x > x && xyMove.x < x+w && xyMove.y > y && xyMove.y < y +h)
}

function click_inside(xyClick, x, y, w, h) {
    return (xyClick.x > x && xyClick.x < x+w && xyClick.y > y && xyClick.y < y +h)
}

function draw_rectangle(originex, originey, largeur, hauteur, couleur, alpha){
    ctx.beginPath()
    ctx.moveTo(originex, originey)
    ctx.lineTo(originex+largeur, originey)
    ctx.lineTo(originex+largeur, originey+hauteur)
    ctx.lineTo(originex, originey+hauteur)
    ctx.lineTo(originex, originey)
    ctx.fillStyle = couleur
    ctx.globalAlpha = alpha
    ctx.fill()
    ctx.globalAlpha = 1
}

function draw_contour(originex, originey, largeur, hauteur, couleur, alpha=1){
    ctx.beginPath()
    ctx.moveTo(originex, originey)
    ctx.lineTo(originex+largeur, originey)
    ctx.lineTo(originex+largeur, originey+hauteur)
    ctx.lineTo(originex, originey+hauteur)
    ctx.lineTo(originex, originey)
    ctx.lineWidth = 5
    ctx.strokeStyle = couleur
    ctx.globalAlpha = alpha
    ctx.stroke()
    ctx.lineWidth = 1
}

function bloquer_pose(L_poses){
    for (p=0; p<L_poses.length; p++){
        idx_i_p = L_poses[p][3]
        idx_j_p = L_poses[p][4]
        // Si on est en train de voir une pose déjà choisie
        if (idx_i== idx_i_p && idx_j==idx_j_p){
            draw_rectangle(0, h_progress_bar, W_3D, H_3D-h_progress_bar, "rgb(0, 0, 0)", alpha_bloque)
        }
    }
}

function progress_bar(N_tache, N_mesh){
    if (N_tache<=N_mesh){
        // background
        draw_rectangle(x_progress_bar, y_progress_bar, w_progress_bar, h_progress_bar, "rgb(255,255,255)", 1)
        // bar
        w_bar = ((N_tache-1)/N_mesh)*w_progress_bar
        draw_rectangle(x_progress_bar, y_progress_bar, w_bar, h_progress_bar, "rgb(17, 138, 178)", 1)
        // numero de tache
        ctx.strokeStyle = "rgb(255, 255, 255)" // Pour que le contour soit rouge
        ctx.fillStyle = "rgb(255, 255, 255)" // Pour que l'intérieur soit bleu
        ctx.font = "18pt Courier";
        ctx.fillText((N_tache)+"/"+(N_mesh), x_progress_bar+w_progress_bar+10, h_progress_bar)
    }
}

function pose_deja_choisie(L_poses, i_choix, j_choix){
    deja_choisie = false
    for (p=0; p<L_poses.length; p++){
        idx_i_p = L_poses[p][3]
        idx_j_p = L_poses[p][4]
        // Si on est en train de voir une pose déjà choisie
        if (i_choix == idx_i_p && j_choix==idx_j_p){
            deja_choisie = true
        }
    }
}

function print_text(dialogue) {

    s = dialogue.texte
    for (let i = 0; i < s.length; i++) {
        if (s[i].lettre !== undefined) {
            ctx.strokeStyle = s[i].stroke
            ctx.fillStyle = s[i].fill
            ctx.strokeText(s[i].lettre, s[i].x, s[i].y)
            ctx.fillText(s[i].lettre, s[i].x, s[i].y)
        }
    }

}

function handle_text(dialogue, x_start, y_start, font, l_max, color="#FFFFFF") {
    let s = dialogue

    let x = 0
    let y = y_start

    let mot = ""
    let img_to_print = ""
    let lettres = s.split("")
    let message = []

    let current_fill = color

    ctx.textAlign = "left"
    ctx.font = font

    while (lettres.length > 0) {
        l = lettres.splice(0, 1)[0]
        if (l === " ") {
            if (x >= l_max) {
               
                x = 0
                y += 40
                for (let i = 0; i < mot.length; i++) {
                    message[message.length-mot.length+i].x = x_start+x
                    message[message.length-mot.length+i].y = y
                    x += ctx.measureText(message[message.length-mot.length+i].lettre).width
                }
            }
            message.push({"lettre": " ", "x": x_start+x, "y": y, "fill": current_fill, "stroke": current_fill})
            x += ctx.measureText(" ").width
            mot = ""
        } else {
            mot += l
            message.push({"lettre": l, "x": x_start+x, "y": y, "fill": current_fill, "stroke": current_fill})
            x += ctx.measureText(l).width
        }
    }

    if (x >= l_max) {
        x = 0
        y += 40
        for (let i = 0; i < mot.length; i++) {
            message[message.length-mot.length+i].x = x_start+x
            message[message.length-mot.length+i].y = y
            x += ctx.measureText(message[message.length-mot.length+i].lettre).width
        }
    }

    return {"texte": message}
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
    y_image = 100+(20+ H_3D/3.5)*pos
    ctx.strokeStyle = "rgb(255, 255, 255)"; ctx.fillStyle = "rgb(255, 255, 255)"
    if (pos==0){print_text(handle_text("Best viewpoint:", W_3D+dx, (H_3D/3.5)*0.4 + y_image, "20pt Courier", longueur_max_recap))}
    if (pos==1){print_text(handle_text("2nd viewpoint:", W_3D+dx, (H_3D/3.5)*0.4 + y_image, "20pt Courier", longueur_max_recap))}
    if (pos==2){print_text(handle_text("3rd viewpoint:", W_3D+dx, (H_3D/3.5)*0.4 + y_image, "20pt Courier", longueur_max_recap))}
}

function afficher_recap(){
    ecart_recap  = 50
    w_recap = window.innerWidth-W_3D
    // texte du haut
    print_text(handle_text("Selected Viewpoints:",   W_3D +(window.innerWidth-W_3D)/4,  h_progress_bar + ecart_recap, "24pt Courier", 500))
    // fleche swap haut
    x_fleche_h = W_3D+ w_recap/2.5 - ecart_recap/2
    w_fleche_h = 20
    h_fleche_h = 20
    // fleche swap bas
    x_fleche_b = W_3D+ w_recap/2.5 - ecart_recap/2
    w_fleche_b = 20
    h_fleche_b = 20
    // croix
    x_croix = W_3D+ w_recap/2.5 + W_3D/3.5 +10
    w_croix = 20
    h_croix = 20
    // pour chaque recap
    for (let i = 0 ; i < canvasMins.length; i++) {
        // Draw les images des contextes
        y_image = 100+(20+ H_3D/3.5)*i
        ctx.drawImage(canvasMins[i],W_3D+ w_recap/2.5 +10, y_image, W_3D/3.5, H_3D/3.5)
        //draw_contour(W_3D+ w_recap/2.5, 100+(20+ H_3D/3.5)*i, W_3D/3.5, H_3D/3.5, "rgb(255,0,0)")
        //Fleche pour Switch haut
        if (nb_choix_fait > 1 && i > 0 && i < nb_choix_fait) {
            y_fleche_h = (H_3D/3.5)*0.4 + y_image
            ctx.drawImage(imgs["haut"], x_fleche_h, y_fleche_h, w_fleche_h, h_fleche_h)
            if (clicked && click_inside(xyMouseDown, x_fleche_h, y_fleche_h, w_fleche_h, h_fleche_h)) {
                swapElements(canvasMins, i, i-1)
                swapElements(ctxMins, i, i-1)
                swapElements(liste_poses, i, i-1)
                //swapElements(checkbox_clicked_courant, i, i-1)
                //checkbox_clicked_courant[i-1].recap = "n°"+i
                //checkbox_clicked_courant[i].recap = "n°"+(i+1)
                interactions.push({"time": new Date().getTime(), "type": "fleche switch haut de la pose n°"+(i+1)})
                clicked = false
            }
        }
        // Fleche pour Switch bas
        if (nb_choix_fait > 1 && i < nb_choix_fait-1) {
            y_fleche_b =  (H_3D/3.5)*0.6 + y_image
            ctx.drawImage(imgs["bas"], x_fleche_b, y_fleche_b, w_fleche_b, h_fleche_b)
            if (clicked && click_inside(xyMouseDown, x_fleche_b, y_fleche_b, w_fleche_b, h_fleche_b)) {
                swapElements(canvasMins, i, i+1)
                swapElements(ctxMins, i, i+1)
                swapElements(liste_poses, i, i+1)
                // swapElements(checkbox_clicked_courant, i, i+1)
                // checkbox_clicked_courant[i+1].recap = "n°"+(i+2)
                // checkbox_clicked_courant[i].recap = "n°"+(i+1)
                interactions.push({"time": new Date().getTime(), "type": "fleche switch bas de la pose n°"+(i+1)})
                clicked = false
            }
        }
        // Croix
        if (i < nb_choix_fait) {
            // checkbox 
            //draw_empty_checkbox(25 + (5+0.3*canvasRenderer.height)*i, i)
            //afficher_check(checkbox_clicked_courant, i, 25 + (5+0.3*canvasRenderer.height)*i)
            // croix pour annuler
            y_croix = (H_3D/3.5)*0.4 + y_image
            ctx.drawImage(imgs["croix"], x_croix, y_croix, w_croix, h_croix)
            if (clicked && click_inside(xyMouseDown, x_croix, y_croix, w_croix, h_croix)) {
                liste_poses.splice(i, 1)
                nb_choix_fait = nb_choix_fait-1
                interactions.push({"time": new Date().getTime(), "type": "suppression de la pose n°"+(i+1)})
                ctxMins[i].clearRect(0, 0, canvasMins[i].width, canvasMins[i].height)
                for (let j = i; j < nb_choix_demande-1; j++) {
                    swapElements(canvasMins, j, j+1)
                    swapElements(ctxMins, j, j+1)
                    // swapElements(checkbox_clicked_courant, j, j+1)
                    // checkbox_clicked_courant[j+1].recap = "n°"+(j+2)
                    // checkbox_clicked_courant[j].recap = "n°"+(j+1)
                }
                // vider le dernier recap poru les checkbox 
                // checkbox_clicked_courant[nb_choix_demande-1].idx_checkbox = []
                // checkbox_clicked_courant[nb_choix_demande-1].mots = []
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
        draw_contour(W_3D*0.2-b, H_3D+DY+b, b, a, "rgb(17, 138, 178)", alpha_survol)
    }
    // Fleche DROITE
    if (xyMouseMove.x >= W_3D*0.2+a  && xyMouseMove.x <= W_3D*0.2+a+b && xyMouseMove.y > H_3D+DY+b && xyMouseMove.y < H_3D+DY+b+a ){
        draw_contour(W_3D*0.2+a, H_3D+DY+b, b, a, "rgb(17, 138, 178)", alpha_survol)
    }
    // Fleche HAUT
    if (xyMouseMove.x >= W_3D*0.2  && xyMouseMove.x <= W_3D*0.2+a && xyMouseMove.y > H_3D+DY && xyMouseMove.y < H_3D+DY+b ){
        // l'image devient verte
        draw_contour(W_3D*0.2, H_3D+DY, a, b, "rgb(17, 138, 178)", alpha_survol)
    }
    // Fleche BAS
    if (xyMouseMove.x >=  W_3D*0.2  && xyMouseMove.x <=  W_3D*0.2+a && xyMouseMove.y > H_3D+DY+b+a && xyMouseMove.y < H_3D+DY+b+a+b ){
        // l'image devient verte
        draw_contour(W_3D*0.2, H_3D+DY+b+a, a, b, "rgb(17, 138, 178)", alpha_survol)
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
    //survol_fleche()
    // click sur une fleche
    get_clicked_fleche()
    //console.log(which_clicked_fleche)
    switch (which_clicked_fleche){
        case'gauche' :
            console.log("deplacement G")
            action_fleche_gauche()
            //idx_i = (idx_i+1)%8
            break;
        case 'droite' :
            console.log("deplacement D")
            //idx_i = (idx_i+7)%8
            action_fleche_droite()
            break;
        case'haut' :
            console.log("deplacement H")
            action_fleche_haut()
            //idx_j = Math.max(idx_j-1,0)
               //idx_j = Math.max(idx_j-1,1)
            break;
        case 'bas' :
            console.log("deplacement B")
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
    interactions.push({"time": new Date().getTime(), "type": "fleche gauche"})}
function action_fleche_droite(){
    idx_i = (idx_i+7)%8
    interactions.push({"time": new Date().getTime(), "type": "fleche droite"})}
function action_fleche_haut(){
    interactions.push({"time": new Date().getTime(), "type": "fleche haut"})
    if (idx_j == 0){
        texte_temporaire = {"text": "You can't go any further, go back down.", "x": x_pop_up, "y": y_pop_up, "t_end": new Date().getTime()+temps_pop}
        interactions.push({"time": new Date().getTime(), "type": "Affichage error à cause de fleche haut"})
    }
    idx_j = Math.max(idx_j-1,0)
    }
function action_fleche_bas(){
    interactions.push({"time": new Date().getTime(), "type": "fleche bas"})
    if (idx_j == 4){
        texte_temporaire = {"text": "You can't go any further, go up.", "x": x_pop_up, "y": y_pop_up, "t_end": new Date().getTime()+temps_pop}
        interactions.push({"time": new Date().getTime(), "type": "Affichage error à cause de fleche bas"})
    }
    idx_j = Math.min(idx_j+1,4)
    }

///////////////////////////////////////////////////////////////
///////////////////// BOUTON
function afficher_bouton(dict_boutons){
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
        interactions.push({"time": new Date().getTime(), "type": "bouton raz"})
    }
}

function action_bouton_pose(){
    interactions.push({"time": new Date().getTime(), "type": "bouton pose n°"+(nb_choix_fait+1)})
    // on regarde si la pose sélectionnée n'a pas déjà été choisie avant
    pose_deja_choisie(liste_poses, idx_i, idx_j)
    if (deja_choisie && !(nb_choix_fait == nb_choix_demande)){
        console.log("Cette pose a déjà été sélectionnée.")
        texte_temporaire = {"text": "This viewpoint has already been selected.", "x": x_pop_up, "y": y_pop_up, "t_end": new Date().getTime()+temps_pop}
        interactions.push({"time": new Date().getTime(), "type": "Affichage error pose déjà sélectionnée"})}
    
        // plus de choix possible
    if (nb_choix_fait == nb_choix_demande) {
        console.log("Tu as déjà fait tes "+nb_choix_demande+" choix.")
        texte_temporaire = {"text": "You have already selected your "+nb_choix_demande+" viewpoints.", "x": x_pop_up, "y": y_pop_up, "t_end": new Date().getTime()+temps_pop}
        interactions.push({"time": new Date().getTime(), "type": "Affichage error "+nb_choix_demande+" déjà fait"})}
    
        // si on a pas encore choisie toutes nos poses, on peut en ajouter
    if (nb_choix_fait < nb_choix_demande && !(deja_choisie)){
        liste_poses.push(['choix'+(nb_choix_fait+1), theta, delta, idx_i, idx_j])
        // affichage de la vue sélectionnée dans le recap
        ctxMins[nb_choix_fait].drawImage(canvasRenderer, 0.5*canvasRenderer.width-0.5*canvasRenderer.height, 0, canvasRenderer.height, canvasRenderer.height, 0, 0, canvasRenderer.height*0.3, canvasRenderer.height*0.25)
        nb_choix_fait = nb_choix_fait+1
    }
}

function action_bouton_retirer(){
    interactions.push({"time": new Date().getTime(), "type": "bouton retirer"})
    // il y a des poses à retirer
    if (liste_poses.length > 0){
        liste_poses.pop()
        nb_choix_fait = nb_choix_fait-1
        // RAZ du contexte liée à la dernière vue ajoutée
        ctxMins[nb_choix_fait].clearRect(0, 0, canvasMins[nb_choix_fait].width, canvasMins[nb_choix_fait].height)
        // On retire toutes les checkbox des checkbox
        //checkbox_clicked_courant[nb_choix_fait].idx_checkbox = []
        //checkbox_clicked_courant[nb_choix_fait].mots = []
    }
    // S'il n'y a pas de pose choisie
    else {
        console.log("Il n'y a pas de pose à retirer.")
        texte_temporaire = {"text": "There are no selected viewpoints to remove.", "x": x_pop_up, "y": y_pop_up, "t_end": new Date().getTime()+temps_pop}
        interactions.push({"time": new Date().getTime(), "type": "Affichage error pas de pose à retirer"})
    }
}

function action_bouton_reinitialiser(){
    interactions.push({"time": new Date().getTime(), "type": "bouton renitialiser"})
    if (liste_poses.length>0){
        liste_poses = []
        nb_choix_fait = 0
        // RAZ de tous les contexte : on ne les surrpime pas, on les nettoie
        for (let i = 0; i < nb_choix_demande; i++) {
            ctxMins[i].clearRect(0, 0, canvasMins[i].width, canvasMins[i].height)
        }
        // on reinitilaise les checbok box
        //for (let i = 0 ; i < nb_choix_demande; i++){
            //checkbox_clicked_courant[i].idx_checkbox = []
            //checkbox_clicked_courant[i].mots = []
        //}
    }
    else {console.log("Il n'y a pas de pose à reintialiser.")
        texte_temporaire = {"text": "There are no selected viewpoints to resart.", "x":x_pop_up, "y": y_pop_up, "t_end": new Date().getTime()+temps_pop}
    interactions.push({"time": new Date().getTime(), "type": "Affichage error aucun choix fait donc pas de reinitialisation possible"})}
}

function action_bouton_valider(){
    interactions.push({"time": new Date().getTime(), "type": "bouton valider"})
    // Si tous les mesh ont été vu
    if (num_tache == nb_mesh && nb_choix_demande==nb_choix_fait){
        choix_courant['choix_poses'] = liste_poses
        choix['tache_N'+num_tache] = choix_courant
        // sauvegarde des images du recap
        all_ctxMins['tache_N'+num_tache] = [mesh_courant,ctxMins]
        all_canvasMins['tache_N'+num_tache] = [mesh_courant,canvasMins]
        //checkbox_clicked['tache_N'+num_tache] = checkbox_clicked_courant
        num_tache = num_tache+1
        page_analyse = true
        page_vues = false
        interactions.push({"time": new Date().getTime(), "type": "fin des choix."})
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
        setUp_3D(indice_mesh)  
    }

    // Error : il reste des vues à sélectionner
    else if (nb_choix_fait < nb_choix_demande){
        //console.log("Tu n'as pas fait tes 3 choix")
        texte_temporaire = {"text": "You did not select your "+nb_choix_demande+" viewpoints.", "x": x_pop_up, "y": y_pop_up, "t_end": new Date().getTime()+temps_pop}
        interactions.push({"time": new Date().getTime(), "type": "Affichage error à cause du bouton valider"})
        console.log("ccc")}
    // Error : un pbl à identifier
    else{
        console.log("PBL bouton valider")
    }
}

function action_bouton_raz(){
    //on efface les autres textes pop
    texte_temporaire = {}
    //affichage du message 
    print_text(handle_text("Do you really want to restart the study?",   window.innerWidth-w_bouton*2.1, window.innerHeight-h_bouton*2, "18pt Courier", 300))
    // affichage 
    ctx.drawImage(imgs['croix'], (window.innerWidth-w_bouton*2.1)+w_bouton*0.65, window.innerHeight-h_bouton +10,  60,50)
    ctx.drawImage(imgs['check'], (window.innerWidth-w_bouton*2.1)+w_bouton*0.15, window.innerHeight-h_bouton +10,  50,50)
    // // survol croix
    // if (is_inside(xyMouseMove,(window.innerWidth-w_bouton*2.5)+w_bouton*0.75, window.innerHeight-h_bouton +10,  50,50)){
    //     draw_contour((window.innerWidth-w_bouton*2.5)+w_bouton*0.75, window.innerHeight-h_bouton +10,  50,50, "rgb(255, 0, 255)")
    // } // survol check
    // if (is_inside(xyMouseMove,(window.innerWidth-w_bouton*2.5)+w_bouton*0.25, window.innerHeight-h_bouton +10,  50,50)){
    //     draw_contour((window.innerWidth-w_bouton*2.5)+w_bouton*0.25, window.innerHeight-h_bouton +10,  50,50, "rgb(255, 0, 255)")
    // }

    // click sur le check : on raz  
    //draw_contour( (window.innerWidth-w_bouton*2.1)+w_bouton*0.15, window.innerHeight-h_bouton +10,  50,50)
    if (clicked && is_inside(xyMouseMove, (window.innerWidth-w_bouton*2.1)+w_bouton*0.15, window.innerHeight-h_bouton +10,  50,50)){
        
        init_variable(false); 
        setUp_3D(indice_mesh)
        interactions.push({"time": new Date().getTime(), "type": "bouton raz check"})}
    // click sur la croix ou ailleurs : on clear
    //if (clicked && is_inside(xyMouseMove,W_3D*0.35+a+2*b+ecart*7 + w_bouton +400*1/2, H_3D+dy+ecart*2  + 100,  50,50)){
    if(clicked){
        bouton_raz_clicked = false
        interactions.push({"time": new Date().getTime(), "type": "bouton raz croix"})}


}

function traitement_bouton(){
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
            console.log("bouton raz")
            break;
    }
}

