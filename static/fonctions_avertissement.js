//scale_bouton_commencer_avertissement = 0.6
h_bouton_avertissement = 0.1*window.innerHeight
num_avertissement = 0


function affichage_texte_avertissement(texte, font, color, xt, yt, l_max_texte){
    // Texte
    ctx.strokeStyle = color // Pour que le contour soit rouge
    ctx.fillStyle = color // Pour que l'intérieur soit bleu
    ctx.font = font
    print_text(handle_text(texte, xt, yt, font, l_max_texte, color="#FFFFFF", interligne=0.045*window.innerHeight), false)  
    
}


////////////////////////////////////////////////////////////////////
///// BOUTON COMMENCER 

function action_bouton_commencer_avertissement(){
    page_avertissement = false 
    page_contexte = true 
    //page_vues = true
    interactions.push({"time": new Date().getTime(), "type": get_message("fin_avertissement", [])})
}

function afficher_bouton_commencer_avertissement(){
    w_bouton_commencer = w_bouton_suivant
    h_bouton_commencer = h_bouton_suivant
    x_bouton_commencer = x_bouton_suivant
    y_bouton_commencer = y_bouton_suivant
    // Bouton commencer
    ctx.drawImage(boutons["commencer_petit"], x_bouton_commencer, y_bouton_commencer , w_bouton_commencer, h_bouton_commencer)

    // Survol
    if(xyMouseMove.x >= x_bouton_commencer && xyMouseMove.x <= x_bouton_commencer + w_bouton_commencer && xyMouseMove.y > y_bouton_commencer && xyMouseMove.y < y_bouton_commencer + h_bouton_commencer){
        draw_rectangle(x_bouton_commencer, y_bouton_commencer , w_bouton_commencer, h_bouton_commencer, "rgb(200, 200, 200)", 0.6)
    }
}

////////////////////////////////////////////////////////////////////
///// BOUTON Next 

function action_bouton_suivant_avertissement(){
    num_avertissement = num_avertissement+1
    avertissements_a_afficher.push(avertissements["texte"+num_avertissement])

}

function action_bouton_avant_avertissement(){
    if (num_avertissement>0){
        avertissements_a_afficher.pop()}
        num_avertissement = num_avertissement-1
}

function afficher_bouton_suivant_avertissement(){
    ratio_bouton_avertissement = h_bouton_avertissement/boutons["suivant"].height
    w_bouton_suivant = ratio_bouton_avertissement*boutons["suivant"].width
    h_bouton_suivant = h_bouton_contexte
    x_bouton_suivant = (window.innerWidth/2)+ 5
    y_bouton_suivant = window.innerHeight - h_bouton_suivant - 20
    // Bouton commencer
    ctx.drawImage(boutons["suivant"], x_bouton_suivant, y_bouton_suivant , w_bouton_suivant, h_bouton_suivant)

    // Survol
    if(xyMouseMove.x >= x_bouton_suivant && xyMouseMove.x <= x_bouton_suivant + w_bouton_suivant && xyMouseMove.y > y_bouton_suivant && xyMouseMove.y < y_bouton_suivant + h_bouton_suivant){
        draw_rectangle(x_bouton_suivant, y_bouton_suivant , w_bouton_suivant, h_bouton_suivant, "rgb(200, 200, 200)", 0.6)
    }
}

function afficher_bouton_avant_avertissement(){
    w_bouton_avant = w_bouton_suivant
    h_bouton_avant = h_bouton_suivant
    x_bouton_avant = (window.innerWidth/2)-(w_bouton_avant) - 5
    y_bouton_avant = y_bouton_suivant
    // Bouton commencer
    ctx.drawImage(boutons["avant"], x_bouton_avant, y_bouton_avant , w_bouton_avant, h_bouton_avant)

    // Survol
    if(xyMouseMove.x >= x_bouton_avant && xyMouseMove.x <= x_bouton_avant + w_bouton_avant && xyMouseMove.y > y_bouton_avant && xyMouseMove.y < y_bouton_avant + h_bouton_avant){
        draw_rectangle(x_bouton_avant, y_bouton_avant , w_bouton_avant, h_bouton_avant, "rgb(200, 200, 200)", 0.6)
    }
}

////////////////////////////////////////////////////////////////////
///// MAIN 

function traitement_avertissements(){
    ctx.clearRect(0, 0, canvas.width, canvas.height) 
    draw_rectangle(0,0,canvas.width, canvas.height, "rgb(3, 26, 33)", 1) // ou + clair 4, 38, 48
    // variable position             
    x_texte = window.innerWidth*(1/10)
    w_texte = window.innerWidth*(8/10)
    font_texte = (0.012*window.innerWidth)+"pt Courier" 
    // titre commun à chaque page 
    affichage_titre(titre, (0.018*window.innerWidth)+"pt Courier", "#FFD166")
    // affichage warning
    w_avertissement = 0.15*window.innerHeight
    h_avertissement = w_avertissement
    ctx.drawImage(imgs['avertissement'], window.innerWidth/2 - w_avertissement/2, avertissements['texte0'].y - (h_avertissement*1.4), w_avertissement, h_avertissement )
    ctx.drawImage(imgs['avertissement'], window.innerWidth/4 - w_avertissement/2, avertissements['texte0'].y - (h_avertissement*1.4), w_avertissement, h_avertissement )
    ctx.drawImage(imgs['avertissement'], window.innerWidth*(3/4) - w_avertissement/2, avertissements['texte0'].y - (h_avertissement*1.4), w_avertissement, h_avertissement )
    // affichage texte 
    for(let p=0; p<avertissements_a_afficher.length; p++){
        dict_texte = avertissements_a_afficher[p]
        affichage_texte_avertissement(dict_texte.t, font_texte, dict_texte.c, x_texte, dict_texte.y, w_texte)
    }
      
    if (num_avertissement < (avertissements_page_1.length)-1){
        // affichage bouton next
        afficher_bouton_suivant_avertissement()
        // si on clique sur next 
        if (clicked && click_inside(xyMouseDown, x_bouton_suivant, y_bouton_suivant , w_bouton_suivant, h_bouton_suivant)){
            // on passe aux texte suivant 
            action_bouton_suivant_avertissement() 
        } 
    } else {
        // affichage bouton next
        afficher_bouton_commencer_avertissement()
        // si on clique sur next 
        if (clicked && click_inside(xyMouseDown, x_bouton_commencer, y_bouton_commencer , w_bouton_commencer, h_bouton_commencer)){
            // on passe aux texte suivant 
            action_bouton_commencer_avertissement() 
            clicked = false
        } 
    }
    
    //affichage bouton previous dès le deuxièeme texte 
    if(num_avertissement > 0){
        // affichage bouton next
        afficher_bouton_avant_avertissement()
        //si on clique sur previous
        if (clicked && click_inside(xyMouseDown, x_bouton_avant, y_bouton_avant , w_bouton_avant, h_bouton_avant)){
            // on passe aux texte suivant 
            action_bouton_avant_avertissement()    
        } 
    }
     
     
}

////////////////////////////////////////////////////////////////////
///// Textes

function init_textes_avertissements(){
y_titre = 50
titre = "READ CAREFULLY BEFORE STARTING"// --> User study : Best view selection"
color_blanc = "rgb(255,255,255)"
color_rouge = "rgb(239, 71, 111)"
avertissements={
"texte0":{"t": "Before we begin, make sure your BROWSER WINDOW IS BIG ENOUGH, and if you are using multiple screens, place your window on the screen you will work on. Your computer should be plugged in.", "y": window.innerHeight*0.32, "c": color_blanc},
"texte1":{"t": "If necessary, you can REFRESH this page to resize everything but doing so will resume the study and take you back at the start, so make sure everything feels right before you start.", "y":window.innerHeight*0.52, "c": color_blanc},
"texte2":{"t":"All your data will be sent at the very end, so restarting will not mess up our data, but you will have do start from the begining.", "y":window.innerHeight*0.72, "c": color_blanc},
}

avertissements_page_1 = [avertissements["texte0"], avertissements["texte1"], avertissements["texte2"]]
avertissements_a_afficher = [avertissements["texte0"]]
}


     

