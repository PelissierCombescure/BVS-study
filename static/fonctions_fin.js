function affichage_texte_fin(M_fin){
    // ctx.strokeStyle = "rgb(255, 255, 255)"
    // ctx.fillStyle = "rgb(255, 255, 255)"
    // //Message de remerciement
    // texte = "Done, thx you :)"
    // font = 0.05*window.innerWidth*"pt Courier"
    // ctx.font = font
    // largeur = ctx.measureText(texte).width
    // print_text(handle_text(texte, (window.innerWidth/2)-(largeur/2), 0.2*window.innerHeight, font, window.innerWidth, 1000, color="#FFFFFF"))

    // // Texte WAIT
    // texte = "Please      a moment"
    // font = 0.02*window.innerWidth*"pt Courier"
    // ctx.font = font
    // largeur = ctx.measureText(texte).width
    // print_text(handle_text(texte, (window.innerWidth/2)-(largeur/2), 0.35*window.innerHeight, font, window.innerWidth, 1000, color="#FFFFFF"))

    // ctx.strokeStyle = "rgb(239, 71, 111)"
    // ctx.fillStyle = "rgb(239, 71, 111)"
    // texte = "    WAIT      "
    // largeur = ctx.measureText(texte).width
    // print_text(handle_text(texte, (window.innerWidth/2)-(largeur/2), 0.5*window.innerHeight, font, window.innerWidth, 1000))

    // // Texte d'envoie
    // ctx.strokeStyle = "rgb(255, 255, 255)"
    // ctx.fillStyle = "rgb(255, 255, 255)"
    // print_text(handle_text(M_fin, (window.innerWidth/2)-450, innerHeight/2 +100, "26pt Courier",  1000))

    titre = "Done, thx you :)"
    affichage_titre(titre, (0.05*window.innerWidth)+"pt Courier", "#FFFFFF", yt=0.15*window.innerHeight)

    titre = "Please      a moment"
    affichage_titre(titre, (0.05*window.innerWidth)+"pt Courier", "#FFFFFF", yt=0.35*window.innerHeight)

    titre = "    WAIT      "
    affichage_titre(titre, (0.05*window.innerWidth)+"pt Courier", "#EF476F", yt=0.35*window.innerHeight)

    affichage_titre(M_fin, (0.02*window.innerWidth)+"pt Courier", "#FFFFFF", yt=0.6*window.innerHeight)

    // affichage_titre("Your completion code is : C6HDHXRT", (0.02*window.innerWidth)+"pt Courier", "#EF476F", yt=0.8*window.innerHeight)

}

function update_texte_fin(M_fin){
    affichage_titre(M_fin, (0.02*window.innerWidth)+"pt Courier", "#FFFFFF", yt=0.7*window.innerHeight)

}
