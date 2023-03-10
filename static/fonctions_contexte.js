scale_bouton_commencer_contexte = 0.6

function affichage_texte_contexte(){
    // Texte
    draw_rectangle(0,0,canvas.width, canvas.height, "rgb(3, 26, 33)", 1) // ou + clair 4, 38, 48
    ctx.strokeStyle = "rgb(255, 255, 255)" // Pour que le contour soit rouge
    ctx.fillStyle = "rgb(255, 255, 255)" // Pour que l'intérieur soit bleu
    texte = "Hi, I'm Marie, do you want to participate in my study?"
    font = "42pt Courier"
    ctx.font = font
    largeur = ctx.measureText(texte).width
    ctx.fillText(texte, (window.innerWidth/2)- (largeur/2), 100)

    //print_text(handle_text(texte, (window.innerWidth/4), 100, "42pt Courier", (window.innerWidth/1.8)))    

    ctx.drawImage(imgs['marie'], (window.innerWidth/2)-((imgs['marie'].width*0.7)/2), (window.innerHeight/4), imgs['marie'].width*0.7, imgs['marie'].height*0.7 )
}


function action_bouton_commencer_contexte(){
    page_contexte = false 
    page_inscription = true 
    //page_vues = true
    interactions.push({"time": new Date().getTime(), "type": "Fin contexte - Début inscription"})
}

function traitement_contexte(){
    //shortcuts(xyMouseMove, imgs['clavier_enter'], window.innerWidth/2 -(imgs['clavier_enter'].width/2), window.innerHeight/2 -(imgs['clavier_enter'].height/2), imgs['clavier_enter'].width, imgs['clavier_enter'].height, boutons['raccourcis'], x_Bshortcut, y_Bshortcut, w_Bshortcut, h_Bshortcut)
    affichage_texte_contexte()
    //clignotement_rectangle(1000, 10,10,100,100, "rgb(255,0,0)")
    afficher_bouton_commencer_contexte() // meme bouton que la page inscription 
    if (clicked && click_inside(xyMouseDown, x_bouton_commencer, y_bouton_commencer , w_bouton_commencer, h_bouton_commencer)){
        // on passe aux choix 
        action_bouton_commencer_contexte()     
    }         
}


function afficher_bouton_commencer_contexte(){
    w_bouton_commencer = scale_bouton_commencer_contexte*boutons["commencer"].width
    h_bouton_commencer = scale_bouton_commencer_contexte*boutons["commencer"].height
    x_bouton_commencer = (window.innerWidth/2)-(w_bouton_commencer/2)
    y_bouton_commencer = innerHeight*0.75
    // Bouton commencer
    ctx.drawImage(boutons["commencer"], x_bouton_commencer, y_bouton_commencer , w_bouton_commencer, h_bouton_commencer)

    // Survol
    if(xyMouseMove.x >= x_bouton_commencer && xyMouseMove.x <= x_bouton_commencer + w_bouton_commencer && xyMouseMove.y > y_bouton_commencer && xyMouseMove.y < y_bouton_commencer + h_bouton_commencer){
        draw_rectangle(x_bouton_commencer, y_bouton_commencer , w_bouton_commencer, h_bouton_commencer, "rgb(200, 200, 200)", 0.6)
    }
}

