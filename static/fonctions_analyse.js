// nuemro init de l'analyse
num_analyse = 0
idx_tache = 0 // ATTENTION ça commence à 1

h_bouton_analyse = 0.1*window.innerHeight


// Variable 
function init_variable_analyse(){
    // liste des checkbox clické pour chaque recap
    checkbox_clicked_courant = {}
    for (let p=0; p<nb_choix_demande; p++){
        checkbox_clicked_courant["Viewpoint_"+(p+1)] = {idx_checkbox:[], mots:[]}
    }

       // Analayse des choix avec les checkboxs
    keywords = ["1. De face", "2. De profil", "3. Debout", "4. Eyes contact", "5. toto"]
    
    y_recap = 0.2*window.innerHeight
    taille_texte_explication = 0.01*window.innerWidth
    x_recap_init = (window.innerWidth - nb_choix_demande*(H_3D/2))/(nb_choix_demande+1)

    // checkbox
    w_checkbox = 20
    h_checkbox = 20
    y_checkbox_init = y_recap + H_3D/2 + h_checkbox
}


function affichage_legende(pos){
    x_image = (pos+1)*x_recap_init + pos*(H_3D/2)
    ctx.strokeStyle = "rgb(255, 255, 255)"; ctx.fillStyle = "rgb(255, 255, 255)"
    if (pos==0){print_text(handle_text("Best viewpoint:", x_image, y_recap-10, taille_texte_explication+"pt Courier", longueur_max_recap))}
    if (pos==1){print_text(handle_text("2nd viewpoint:", x_image, y_recap-10, taille_texte_explication+"pt Courier", longueur_max_recap))}
    if (pos==2){print_text(handle_text("3rd viewpoint:", x_image, y_recap-10, taille_texte_explication+"pt Courier", longueur_max_recap))}
}

function affichage_texte(){
    // Texte
    draw_rectangle(0,0,canvas.width, canvas.height, "rgb(3, 26, 33)", 1) // ou + clair 4, 38, 48
    affichage_titre("Analysis your choices", (0.018*window.innerWidth)+"pt Courier", "#EF476F", yt =  0.1*window.innerHeight)
}

// idx_tache est la num de la tache à aller chercher dans all_ctxMins
function affichage_analyse(idx_tache){
    canvasMins = all_canvasMins['tache_N'+list_idx_tache[idx_tache]][1]
    for (let i=0; i<nb_choix_demande; i++){
        affichage_legende(i)
        x_recap = (i+1)*x_recap_init + i*(H_3D/2)
        ctx.drawImage(canvasMins[i], x_recap, y_recap, H_3D/2, H_3D/2)
        //draw_contour(dx + (ecart_analyse+ W_3D/2.5)*i, 250,  H_3D/2.5, H_3D/2.5, "rgb(255,0,0)")
    }  
}

function progress_bar_analyse(N_analyse, N_analyse_total){
    if (N_analyse<=N_analyse_total){
        // background
        draw_rectangle(x_progress_bar, y_progress_bar, w_progress_bar, h_progress_bar, "rgb(255,255,255)", 1)
        // bar
        w_bar = ((N_analyse)/N_analyse_total)*w_progress_bar
        draw_rectangle(x_progress_bar, y_progress_bar, w_bar, h_progress_bar, "rgb(17, 138, 178)", 1)
        // numero de tache
        ctx.strokeStyle = "rgb(255, 255, 255)" // Pour que le contour soit rouge
        ctx.fillStyle = "rgb(255, 255, 255)" // Pour que l'intérieur soit bleu
        ctx.font = "18pt Courier";
        ctx.fillText((N_analyse)+"/"+(N_analyse_total), x_progress_bar+w_progress_bar+10, h_progress_bar)
    }
}


///////////////////////////////////////////////////////////////
///////////////////// Bouton

function affichage_bouton_valider_analyse(m){
    ratio_bouton_analyse = h_bouton_analyse/boutons["valider"].height
    w_bouton_analyse = ratio_bouton_analyse*boutons["valider"].width
    h_bouton_analyse = h_bouton_analyse
    x_bouton_analyse = (window.innerWidth/2) - w_bouton_analyse/2
    y_bouton_analyse = window.innerHeight - h_bouton_analyse - 20
    // si au moins un mot est coché
    if (condition_valider()){
        // affichage bouton valider
        if (m == "en_cours")
        {ctx.drawImage(boutons["valider"], x_bouton_analyse, y_bouton_analyse, w_bouton_analyse, h_bouton_analyse)}
        else{ctx.drawImage(boutons["envoie_data"], x_bouton_analyse, y_bouton_analyse, w_bouton_analyse, h_bouton_analyse)}
        // survol
        if(is_inside(xyMouseMove, x_bouton_analyse, y_bouton_analyse, w_bouton_analyse, h_bouton_analyse)){
            draw_rectangle(x_bouton_analyse, y_bouton_analyse, w_bouton_analyse, h_bouton_analyse, "rgb(200, 200, 200)", 0.6)

        }
    }
}

function condition_valider(){
    for(let k=0; k<nb_choix_demande;k++){
        if (checkbox_clicked_courant['Viewpoint_'+(k+1)].idx_checkbox.length == 0){
            return false
        }     
    }
    return true
}

function action_bouton_valider_analyse(){
    interactions.push({"time": new Date().getTime(), "type": "Bouton valider analyse."})
    // si au moins un mot est coché et qu'il reste des analyse à faire
    if (condition_valider()){
        // sauvegarde des checkbox clikée et les mesh 
        checkbox_clicked['Analyse_N'+(num_analyse+1)] = {"mesh" : choix["tache_N"+list_idx_tache[idx_tache]].mesh ,"Checkbox" : checkbox_clicked_courant}
        //RAZ pour la prochaine analyse
        checkbox_clicked_courant = {}
        for (let p=0; p<nb_choix_demande; p++){
            checkbox_clicked_courant["Viewpoint_"+(p+1)] = {idx_checkbox:[], mots:[]}
        }
        // analyse suivant
        num_analyse = num_analyse + 1
        // indice mesh da l'analyse suivante
        idx_tache = idx_tache + 1
        if (num_analyse<nb_analyse_demande){
        interactions.push({"time": new Date().getTime(), "type": "Début analyse n°"+(num_analyse+1)})}
    } 
}


///////////////////////////////////////////////////////////////
///////////////////// Checkbox

function traitement_empty_checkbox(){
    for(let p=0; p<nb_choix_demande; p++){    
        for (let i = 0 ; i < keywords.length; i++){
            // checkbox vide
            x_checkbox = (p+1)*x_recap_init + p*(H_3D/2)
            y_checkbox = y_checkbox_init + (h_checkbox* 1.5)*i
            ctx.drawImage(imgs["checkbox"], x_checkbox , y_checkbox, w_checkbox, h_checkbox)
            // Texte 
            print_text(handle_text(keywords[i], x_checkbox + w_checkbox + 30, y_checkbox + 20, taille_texte_explication+"pt Courier", longueur_max_error))
            // survol
            if (is_inside(xyMouseMove, x_checkbox, y_checkbox, w_checkbox, h_checkbox)){
                draw_rectangle(x_checkbox, y_checkbox, w_checkbox, h_checkbox, "rgb(0, 255, 0)", alpha_survol)
            }
            // clicked
            if (clicked && is_inside(xyMouseMove, x_checkbox, y_checkbox, w_checkbox, h_checkbox)){
                check_ou_decheck(i,p)
            }
        }
    }
}

function check_ou_decheck(i_mot, p_vue){
     //s'il n'y a pas deja un check dessus
    if (checkbox_clicked_courant["Viewpoint_"+(p_vue+1)].idx_checkbox.indexOf(i_mot) == -1){
        checkbox_clicked_courant["Viewpoint_"+(p_vue+1)].idx_checkbox.push(i_mot)
        checkbox_clicked_courant["Viewpoint_"+(p_vue+1)].mots.push(keywords[i_mot])
        interactions.push({"time": new Date().getTime(), "type": "ajout check sur : analyse n°"+(num_analyse+1)+", mot "+keywords[i_mot]+" à "+(p_vue+1)+"e vues"})
        console.log("ajout "+keywords[i_mot]+" à "+(p_vue+1)+"e vues")
    }
    
    else{
        position_i = checkbox_clicked_courant["Viewpoint_"+(p_vue+1)].idx_checkbox.indexOf(i_mot)
        checkbox_clicked_courant["Viewpoint_"+(p_vue+1)].idx_checkbox.splice(position_i,1)
        checkbox_clicked_courant["Viewpoint_"+(p_vue+1)].mots.splice(position_i,1)
        console.log("retrait "+keywords[i_mot]+" à "+(p_vue+1)+"e vues")
        interactions.push({"time": new Date().getTime(), "type": "retrait check sur : analyse n°"+(num_analyse+1)+", mot "+keywords[i_mot]+" à "+(p_vue+1)+"e vues"})
    }
}

function draw_check(p_vue){
    idx_check = checkbox_clicked_courant["Viewpoint_"+(p_vue+1)].idx_checkbox
    // pour chacune de ces checkbox cliquée on affiche un check
    for (let i = 0 ; i < idx_check.length; i++){
        pos = idx_check[i]
        x_checkbox = (p_vue+1)*x_recap_init + p_vue*(H_3D/2)
        y_checkbox = y_checkbox_init + (h_checkbox* 1.5)*pos
        ctx.drawImage(imgs["check"], x_checkbox-5 , y_checkbox-5, w_checkbox+10, h_checkbox+10)
    }
}

///////////////////////////////////////////////////////////////
///////////////////// MAIN 
function traitement_fin(){
    if ((num_analyse < nb_analyse_demande)){
        // affiche les textes de la page sauf les ceheckbox
        affichage_texte()
        // afficher les checkbox et gerer les click ou declick
        traitement_empty_checkbox()
        // affiche les check vert en fonction de ce qu'il y a dans checkbox_clicked_courant
        for (let p =0; p<nb_choix_demande;p++){draw_check(p)}
        // affiche les nb_demande_choix images recap 
        affichage_analyse(idx_tache)
        // affiche progress bar
        progress_bar_analyse(num_analyse, nb_analyse_demande)
        if (num_analyse < nb_analyse_demande-1){
            // bouton valider 
            affichage_bouton_valider_analyse("en_cours")}
        else{
            affichage_bouton_valider_analyse("fin")
        }
        // action si bouton valider 
        if (clicked && is_inside(xyMouseMove, x_bouton_analyse, y_bouton_analyse, w_bouton_analyse, h_bouton_analyse)){
            action_bouton_valider_analyse()
        }
    }
    else{
       page_analyse = false
       interactions.push({"time": new Date().getTime(), "type": "Fin analyse"})
    }

}


// function draw_empty_checkbox(y_img_recap, num_recap){
//     // croix
//     x_checkbox = W_3D+dx*2+longueur_max_recap+w_fleche_b+canvasMins[0].width+w_croix*2
//     w_checkbox = 20
//     h_checkbox = 20
//     dx_checkbox = 0
//     for (let i = 0 ; i < keywords.length; i++){
//         if (i%2 == 0){dx_checkbox = i/2 * 180}
//         // checkbox vide
//         y_checkbox = 20 + y_img_recap + 80*(i%2)
//         ctx.drawImage(imgs["checkbox"], x_checkbox + dx_checkbox , y_checkbox, w_checkbox, h_checkbox)
//         print_text(handle_text(keywords[i], x_checkbox + dx_checkbox + 30, y_checkbox + 20, "14pt Courier", longueur_max_error))
//         // survol
//         if (xyMouseMove.x >= x_checkbox + dx_checkbox  && xyMouseMove.x <= x_checkbox + dx_checkbox + w_checkbox && xyMouseMove.y > y_checkbox && xyMouseMove.y < y_checkbox+h_checkbox ){
//             draw_rectangle(x_checkbox + dx_checkbox, y_checkbox, w_checkbox, h_checkbox, "rgb(0, 255, 0)", alpha_survol)
//         }
//         // clicked
//         if (clicked && xyMouseMove.x >= x_checkbox + dx_checkbox  && xyMouseMove.x <= x_checkbox + dx_checkbox + w_checkbox && xyMouseMove.y > y_checkbox && xyMouseMove.y < y_checkbox+h_checkbox ){
//             // s'il n'y a pas deja un check dessus
//             if (checkbox_clicked_courant[num_recap].idx_checkbox.indexOf(i) == -1){
//                 checkbox_clicked_courant[num_recap].idx_checkbox.push(i)
//                 checkbox_clicked_courant[num_recap].mots.push(keywords[i])
//                 interactions.push({"time": new Date().getTime(), "type": "ajout check sur : recap n°"+(num_recap+1)+", mot "+keywords[i]})}
//             else{
//                 position_i = checkbox_clicked_courant[num_recap].idx_checkbox.indexOf(i)
//                 checkbox_clicked_courant[num_recap].idx_checkbox.splice(position_i,1)
//                 checkbox_clicked_courant[num_recap].mots.splice(position_i,1)
//                 interactions.push({"time": new Date().getTime(), "type": "retrait check sur : recap n°"+(num_recap+1)+", mot "+keywords[i]})}
//         }
//     }
// }

// // affichage des check pour le recap n°num_recap qui a un y = y_img_recap
// function afficher_check(liste_check, num_recap, y_img_recap){
//     dx_checkbox = 0
//     idx_check = liste_check[num_recap].idx_checkbox
//     // pour chacune de ces checkbox cliquée on affiche un check
//     for (let i = 0 ; i < idx_check.length; i++){
//         pos = idx_check[i]
//         if (pos%2 == 0){dx_checkbox = pos/2 * 180}
//         else{dx_checkbox = (pos-1)/2 * 180}
//         y_checkbox = 20 + y_img_recap + 80*(pos%2)
//         ctx.drawImage(imgs["check"], x_checkbox + dx_checkbox , y_checkbox, w_checkbox, h_checkbox)
//     }
// }
