//scale_bouton_commencer_explication_analyse = 0.6
h_bouton_explication_analyse = 0.1*window.innerHeight
num_explication_analyse = 0


function affichage_texte_explication_analyse(texte, font, color, xt, yt, l_max_texte){
    // Texte
    ctx.strokeStyle = color // Pour que le contour soit rouge
    ctx.fillStyle = color // Pour que l'intérieur soit bleu
    ctx.font = font
    print_text(handle_text(texte, xt, yt, font, l_max_texte, color="#FFFFFF", interligne=0.045*window.innerHeight), false)  
    
}

////////////////////////////////////////////////////////////////////
///// BOUTON COMMENCER 

function action_bouton_commencer_explication_analyse(){
    page_explication_analyse = false 
    page_analyse = true 
    //page_vues = true
    interactions.push({"time": new Date().getTime(), "type": "Fin warning"})
}

function afficher_bouton_commencer_explication_analyse(){
    w_bouton_commencer = w_bouton_suivant
    h_bouton_commencer = h_bouton_suivant
    x_bouton_commencer = x_bouton_suivant
    y_bouton_commencer = y_bouton_suivant
    // Bouton commencer
    ctx.drawImage(boutons["commencer"], x_bouton_commencer, y_bouton_commencer , w_bouton_commencer, h_bouton_commencer)

    // Survol
    if(xyMouseMove.x >= x_bouton_commencer && xyMouseMove.x <= x_bouton_commencer + w_bouton_commencer && xyMouseMove.y > y_bouton_commencer && xyMouseMove.y < y_bouton_commencer + h_bouton_commencer){
        draw_rectangle(x_bouton_commencer, y_bouton_commencer , w_bouton_commencer, h_bouton_commencer, "rgb(200, 200, 200)", 0.6)
    }
}

////////////////////////////////////////////////////////////////////
///// BOUTON Next 

function action_bouton_suivant_explication_analyse(){
    num_explication_analyse = num_explication_analyse+1
    explications_analyse_a_afficher.push(explications_analyse["texte"+num_explication_analyse])

}

function action_bouton_avant_explication_analyse(){
    if (num_explication_analyse>0){
        explications_analyse_a_afficher.pop()}
        num_explication_analyse = num_explication_analyse-1
}

function afficher_bouton_suivant_explication_analyse(){
    ratio_bouton_explication_analyse = h_bouton_explication_analyse/boutons["suivant"].height
    w_bouton_suivant = ratio_bouton_explication_analyse*boutons["suivant"].width
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

function afficher_bouton_avant_explication_analyse(){
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

function traitement_explication_analyses(){
    ctx.clearRect(0, 0, canvas.width, canvas.height) 
    draw_rectangle(0,0,canvas.width, canvas.height, "rgb(3, 26, 33)", 1) // ou + clair 4, 38, 48
    // variable position             
    x_texte = window.innerWidth*(1/10)
    w_texte = window.innerWidth*(8/10)
    font_texte = (0.012*window.innerWidth)+"pt Courier" 
    
    // titre commun à chaque page 
    affichage_titre(titre, (0.018*window.innerWidth)+"pt Courier", "#EF476F")
    // affichage texte 
    for(let p=0; p<explications_analyse_a_afficher.length; p++){
        dict_texte = explications_analyse_a_afficher[p]
        affichage_texte_explication_analyse(dict_texte.t, font_texte, dict_texte.c, x_texte, dict_texte.y, w_texte)
    }
      
    if (num_explication_analyse < (explications_analyse_page_1.length)-1){
        // affichage bouton next
        afficher_bouton_suivant_explication_analyse()
        // si on clique sur next 
        if (clicked && click_inside(xyMouseDown, x_bouton_suivant, y_bouton_suivant , w_bouton_suivant, h_bouton_suivant)){
            // on passe aux texte suivant 
            action_bouton_suivant_explication_analyse() 
        } 
    } else {
        // affichage bouton next
        afficher_bouton_commencer_explication_analyse()
        // si on clique sur next 
        if (clicked && click_inside(xyMouseDown, x_bouton_commencer, y_bouton_commencer , w_bouton_commencer, h_bouton_commencer)){
            // on passe aux texte suivant 
            action_bouton_commencer_explication_analyse() 
        } 
    }
    
    //affichage bouton previous dès le deuxièeme texte 
    if(num_explication_analyse > 0){
        // affichage bouton next
        afficher_bouton_avant_explication_analyse()
        //si on clique sur previous
        if (clicked && click_inside(xyMouseDown, x_bouton_avant, y_bouton_avant , w_bouton_avant, h_bouton_avant)){
            // on passe aux texte suivant 
            action_bouton_avant_explication_analyse()    
        } 
    }
  
    
     
}


////////////////////////////////////////////////////////////////////
///// Textes

function init_textes_explication_analyses(){
y_titre = 50
titre = "Analyze your choices"
color_blanc = "rgb(255,255,255)"
color_rouge = "rgb(239, 71, 111)"
explications_analyse={
"texte0":{"t":"You have finished selecting the best viewpoints for each object.", "y": window.innerHeight*0.15, "c": color_blanc},
"texte1":{"t":"Now I ask you to justify your choices.", "y":window.innerHeight*0.25, "c": color_blanc},
"texte2":{"t":"For this, for some objects, the views you have chosen will reappear..", "y":window.innerHeight*0.38, "c": color_blanc},
"texte3":{"t":"For each of the views you will have to select the main characteristic that made you decide to select this viewpoint..", "y": window.innerHeight*0.52, "c": color_blanc},
}

explications_analyse_page_1 = [explications_analyse["texte0"], explications_analyse["texte1"], explications_analyse["texte2"], explications_analyse["texte3"]]
explications_analyse_a_afficher = [explications_analyse["texte0"]]
}


     

