function affichage_texte_contexte(){
    // Texte
    draw_rectangle(0,0,canvas.width, canvas.height, "rgb(3, 26, 33)", 1) // ou + clair 4, 38, 48
    ctx.strokeStyle = "rgb(255, 255, 255)" // Pour que le contour soit rouge
    ctx.fillStyle = "rgb(255, 255, 255)" // Pour que l'intérieur soit bleu
    texte = "Hi, I'm Marie, do you want to participate in my study?"
    font = "58pt Courier"
    ctx.font = font
    largeur = ctx.measureText(texte).width
    ctx.fillText(texte, (window.innerWidth/2)- (largeur/2), 100)

    //print_text(handle_text(texte, (window.innerWidth/4), 100, "42pt Courier", (window.innerWidth/1.8)))    

    ctx.drawImage(imgs['marie'], (window.innerWidth/2)-((imgs['marie'].width*0.7)/2), (window.innerHeight/4), imgs['marie'].width*0.7, imgs['marie'].height*0.7 )
}


function action_bouton_commencer_contexte(){
    page_contexte = false 
    page_inscription = true 
    interactions.push({"time": new Date().getTime(), "type": "bouton commencer de contexte"+s})
}

function traitement_contexte(){
    affichage_texte_contexte()
    //clignotement_rectangle(1000, 10,10,100,100, "rgb(255,0,0)")
    afficher_bouton_commencer() // meme bouton que la page inscription 
    if (clicked && click_inside(xyMouseDown, x_bouton_commencer, y_bouton_commencer , w_bouton_commencer, h_bouton_commencer)){
        // on passe aux choix 
        action_bouton_commencer_contexte()     
    }         
}

