h_bouton_fin = 0.1*window.innerHeight
download_ok = false
depot_ok = false

function affichage_texte_fin(M_fin, pbl_envoie=false){


    // titre = "Done, thx you :)"
    // if (envoie_ok) {affichage_titre(titre, (0.03*window.innerWidth)+"pt Courier", "#FFFFFF", yt=0.1*window.innerHeight)}
    // else  {affichage_titre(titre, (0.03*window.innerWidth)+"pt Courier", "#FFFFFF", yt=0.1*window.innerHeight)}

    // titre = "Please      a moment"
    // if (envoie_ok) {affichage_titre(titre, (0.05*window.innerWidth)+"pt Courier", "#FFFFFF", yt=0.3*window.innerHeight)}
    // else {affichage_titre(titre, (0.03*window.innerWidth)+"pt Courier", "#FFFFFF", yt=0.2*window.innerHeight)}

    // titre = "    WAIT      "
    // if (envoie_ok) {affichage_titre(titre, (0.05*window.innerWidth)+"pt Courier", "#EF476F", yt=0.3*window.innerHeight)}
    // else {affichage_titre(titre, (0.03*window.innerWidth)+"pt Courier", "#EF476F", yt=0.2*window.innerHeight)}

    // if (envoie_ok) {affichage_titre(M_fin, (0.016*window.innerWidth)+"pt Courier", "#FFD166", yt=0.4*window.innerHeight)}
    // else {affichage_titre(M_fin, (0.016*window.innerWidth)+"pt Courier", "#FFD166", yt=0.3*window.innerHeight)}


    titre = "Done, thx you :)"
    affichage_titre(titre, (0.03*window.innerWidth)+"pt Courier", "#FFFFFF", yt=0.1*window.innerHeight)

    titre = "Please      a moment"
    affichage_titre(titre, (0.05*window.innerWidth)+"pt Courier", "#FFFFFF", yt=0.3*window.innerHeight)
    
    titre = "    WAIT      "
    affichage_titre(titre, (0.05*window.innerWidth)+"pt Courier", "#EF476F", yt=0.3*window.innerHeight)
  

    affichage_titre(M_fin, (0.016*window.innerWidth)+"pt Courier", "#FFD166", yt=0.4*window.innerHeight)


    // affichage_titre("Your completion code is : C6HDHXRT", (0.02*window.innerWidth)+"pt Courier", "#EF476F", yt=0.8*window.innerHeight)

}

function update_texte_fin_siOK(M_fin1, M_fin2){
    titre = "Done, thx you :)"
    affichage_titre(titre, (0.03*window.innerWidth)+"pt Courier", "#FFFFFF", yt=0.1*window.innerHeight)
    affichage_titre(M_fin1, (0.02*window.innerWidth)+"pt Courier", "#FFD166", yt=0.4*window.innerHeight)
    affichage_titre(M_fin2, (0.03*window.innerWidth)+"pt Courier", "#EF476F", yt=0.6*window.innerHeight)

}

// function update_texte_fin_siPASOK(M_fin1, M_fin21, M_fin22, M_fin3, M_fin4, M_fin51, M_fin52){
//     affichage_titre(M_fin1, (0.02*window.innerWidth)+"pt Courier", "#FFD166", yt=0.4*window.innerHeight)
//     affichage_titre(M_fin21, (0.018*window.innerWidth)+"pt Courier", "#FFFFFF", yt=0.55*window.innerHeight)
//     affichage_titre(M_fin22, (0.018*window.innerWidth)+"pt Courier", "#EF476F", yt=0.55*window.innerHeight)
//     affichage_titre(M_fin3, (0.015*window.innerWidth)+"pt Courier", "#FFFFFF", yt=0.6*window.innerHeight)
//     affichage_titre(M_fin4, (0.015*window.innerWidth)+"pt Courier", "#FFFFFF", yt=0.65*window.innerHeight)
//     affichage_titre(M_fin51, (0.018*window.innerWidth)+"pt Courier", "#FFFFFF", yt=0.70*window.innerHeight)
//     affichage_titre(M_fin52, (0.018*window.innerWidth)+"pt Courier", "#EF476F", yt=0.70*window.innerHeight)

// }

function update_texte_fin_siPASOK(M_fin1, M_fin2, M_fin3, M_fin4, M_fin5, c_base = "#FFFFFF", c_vive='#EF476F'){
    titre = "Done, thx you :)"
    affichage_titre(titre, (0.03*window.innerWidth)+"pt Courier", "#FFFFFF", yt=0.1*window.innerHeight)

    ctx.strokeStyle = c_base 
    ctx.fillStyle = c_base 
    xt = window.innerWidth*(0.05)  
    w_texte = window.innerWidth*(9/10)
    affichage_titre(M_fin1, (0.018*window.innerWidth)+"pt Courier", "#FFD166", yt=0.2*window.innerHeight)
    ctx.strokeStyle = c_base 
    ctx.fillStyle = c_base
    consigne = "Please follow the ¤3 STEPS¤ of instructions for sending your results and then the ¤completion code¤ will appear on this page : "
    print_text(handle_text(consigne, xt, yt=0.3*window.innerHeight, (0.013*window.innerWidth)+"pt Courier", w_texte, color="#FFFFFF", interligne=0.045*window.innerHeight), false, c_base ="#FFFFFF", c_vive)  
    print_text(handle_text(M_fin2, xt, yt=0.45*window.innerHeight, (0.015*window.innerWidth)+"pt Courier", w_texte, color="#FFFFFF", interligne=0.045*window.innerHeight), false, c_base ="#FFFFFF", c_vive)  
    affichage_titre(M_fin3, (0.013*window.innerWidth)+"pt Courier", "#FFFFFF", yt=0.5*window.innerHeight)
    print_text(handle_text(M_fin4, xt, yt=0.6*window.innerHeight, (0.015*window.innerWidth)+"pt Courier", w_texte, color="#FFFFFF", interligne=0.045*window.innerHeight), false, c_base ="#FFFFFF", c_vive)  
    print_text(handle_text(M_fin5, xt, yt=0.7*window.innerHeight, (0.015*window.innerWidth)+"pt Courier", w_texte, color="#FFFFFF", interligne=0.045*window.innerHeight), false, c_base ="#FFFFFF", c_vive)  
   
    }

function action_bouton_lien(){
    interactions.push({"time": new Date().getTime(), "type": get_message("lien_next_cloud", [])})
    // A appeler quand l'utilisateur clique sur le lien
    window.open('https://nextcloud.tforgione.fr/s/REJ9qHH5eSaWNGr', '_blank');
    depot_ok = true
    
 
}
function afficher_bouton_lien(){
    ratio_bouton_fin = h_bouton_fin/boutons["depot"].height
    w_bouton_fin = ratio_bouton_fin*boutons["depot"].width
    h_bouton_fin = h_bouton_fin
    x_bouton_fin2 = 3*(window.innerWidth/4)+ 5 - w_bouton_fin
    y_bouton_fin = window.innerHeight - h_bouton_fin - 20
    // Bouton commencer
    ctx.drawImage(boutons["depot"], x_bouton_fin2, y_bouton_fin , w_bouton_fin, h_bouton_fin)
}

function traitement_fin_lien(){
    afficher_bouton_lien()
    if(is_inside(xyMouseMove, x_bouton_fin2, y_bouton_fin , w_bouton_fin, h_bouton_fin)){
        draw_rectangle(x_bouton_fin2, y_bouton_fin , w_bouton_fin, h_bouton_fin, "rgb(200, 200, 200)", 0.6)
    }

    if (clicked && click_inside(xyMouseDown, x_bouton_fin2, y_bouton_fin , w_bouton_fin, h_bouton_fin)){
        action_bouton_lien()
    }
}

function action_bouton_download(){
    interactions.push({"time": new Date().getTime(), "type": get_message("enregistrement_json", [])})
    // A appeler quand l'utilisateur clique sur le bouton pour télécharger les données
    let data = new File([JSON.stringify(choix, undefined, 4)], choix.uuid+'.json', {type: "text/plain;charset=utf-8"});
    saveAs(data, choix.uuid+'.json');
    download_ok = true
}

function afficher_bouton_download(){
    ratio_bouton_fin = h_bouton_fin/boutons["enregistrement"].height
    w_bouton_fin = ratio_bouton_fin*boutons["enregistrement"].width
    h_bouton_fin = h_bouton_fin
    x_bouton_fin = (window.innerWidth/4)+ 5
    y_bouton_fin = window.innerHeight - h_bouton_fin - 20
    // Bouton commencer
    ctx.drawImage(boutons["enregistrement"], x_bouton_fin, y_bouton_fin , w_bouton_fin, h_bouton_fin)
}

function traitement_fin_enregistrement(){
    afficher_bouton_download()
     // Survol
    if(is_inside(xyMouseMove, x_bouton_fin, y_bouton_fin , w_bouton_fin, h_bouton_fin)){
        draw_rectangle(x_bouton_fin, y_bouton_fin , w_bouton_fin, h_bouton_fin, "rgb(200, 200, 200)", 0.6)
    }

    if (clicked && click_inside(xyMouseDown, x_bouton_fin, y_bouton_fin , w_bouton_fin, h_bouton_fin)){
        action_bouton_download()
    }
}



