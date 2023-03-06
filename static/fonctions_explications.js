function init_explication(){

alpha_ecran = 0.9
alpha_clignotement = 0.8
color_ecran ="rgb(255,255,255)"
color_texte = "rgb(0,0,0)"
color_clignotement = "rgb(255,0,255)"
font_texte = "28pt Courier"
l_texte_max = 600

actions = [
    {'ecran': {'x':W_3D +50, "y": 200, "w":window.innerWidth-W_3D-80, "h":400, "c":color_ecran,"a": alpha_ecran}, 
    "texte": {"t":"Voici comment se présente l'interface.", "x":W_3D + 80, "y":300, "f":font_texte, "l":l_texte_max, "c":color_texte}, 
    'clignotement': {"x":0, "y":0, "w":100, "h":100, "c":color_clignotement,"a": alpha_clignotement}}
]

num_action = 0
}

function traitement_explications(){
    //ctx.clearRect(0, 0, canvas.width, canvas.height)
    ctx.strokeStyle = "rgb(255, 255, 255)" // Pour que le contour soit rouge
    ctx.fillStyle = "rgb(255, 255, 255)" // Pour que l'intérieur soit bleu
    //texte = "Explications"
    //font = "42pt Courier"
    //ctx.font = font
    //largeur = ctx.measureText(texte).width
    //ctx.fillText(texte, (window.innerWidth/2)- (largeur/2), 100) 

    // STEP 1 
    action = actions[num_action]
    afficher_ecran(action.ecran.x, action.ecran.y, action.ecran.w, action.h, action.c, action.a )
    print_text(handle_text(action.texte.t, action.texte.x, action.texte.y, action.texte.f, action.texte.l, action.texte.c))
    
    
    
    
}

function afficher_ecran(originex, originey, largeur, hauteur, couleur, alpha){
    draw_rectangle(originex, originey, largeur, hauteur, couleur, alpha)
}
