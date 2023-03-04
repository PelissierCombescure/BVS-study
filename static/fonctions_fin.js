function affichage_texte_fin(M_fin, E_termine){
    ctx.strokeStyle = "rgb(255, 255, 255)" 
    ctx.fillStyle = "rgb(255, 255, 255)"
    //Message de remerciement 
    texte = "Done, thx you :)"
    font = "100pt Courier"
    ctx.font = font
    largeur = ctx.measureText(texte).width
    print_text(handle_text(texte, (window.innerWidth/2)-(largeur/2), 150, font, window.innerWidth, 1000, color="#FFFFFF"))
    
    // Texte WAIT
    texte = "Please      a moment"
    font = "70pt Courier"
    ctx.font = font
    largeur = ctx.measureText(texte).width
    print_text(handle_text(texte, (window.innerWidth/2)-(largeur/2), 350, font, window.innerWidth, 1000, color="#FFFFFF"))

    ctx.strokeStyle = "rgb(239, 71, 111)" 
    ctx.fillStyle = "rgb(239, 71, 111)"
    texte = "    WAIT      "
    largeur = ctx.measureText(texte).width
    print_text(handle_text(texte, (window.innerWidth/2)-(largeur/2), 350, font, window.innerWidth, 1000))
    
    // Texte d'envoie
    ctx.strokeStyle = "rgb(255, 255, 255)" 
    ctx.fillStyle = "rgb(255, 255, 255)"
    if (!E_termine){
        print_text(handle_text(M_fin, (window.innerWidth/2)-450, innerHeight/2 +100, "26pt Courier",  1000))
    }
    else {
        print_text(handle_text(M_fin, (window.innerWidth/2)-450, innerHeight/2 +200, "26pt Courier",  1000))
    }


}