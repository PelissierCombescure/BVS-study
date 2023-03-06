function traitement_explications(){
    //ctx.clearRect(0, 0, canvas.width, canvas.height)
    ctx.strokeStyle = "rgb(255, 255, 255)" // Pour que le contour soit rouge
    ctx.fillStyle = "rgb(255, 255, 255)" // Pour que l'intérieur soit bleu
    texte = "Explications"
    font = "42pt Courier"
    ctx.font = font
    largeur = ctx.measureText(texte).width
    ctx.fillText(texte, (window.innerWidth/2)- (largeur/2), 100) 

    // clignotement
    afficher_ecran(0,0,400,600,"rgb(255,255,255)", 1)
    
    
}

function afficher_ecran(originex, originey, largeur, hauteur, couleur, alpha){
    draw_rectangle(originex, originey, largeur, hauteur, couleur, alpha)
}
