scale_bouton_commencer_warning = 0.6
num_warning = 0


function affichage_texte_warning(texte, font, color, xt, yt, l_max_texte){
    // Texte
    ctx.strokeStyle = color // Pour que le contour soit rouge
    ctx.fillStyle = color // Pour que l'intérieur soit bleu
    ctx.font = font
    print_text(handle_text(texte, xt, yt, font, l_max_texte), false)  
    
}

function affichage_titre_warning(titre, font, color, yt){
    ctx.strokeStyle =color
    ctx.fillStyle =color
    ctx.font = font
    largeur = ctx.measureText(titre).width
    // au milieu 
    ctx.fillText(titre, (window.innerWidth/2)- (largeur/2), yt)
}

////////////////////////////////////////////////////////////////////
///// BOUTON COMMENCER 

function action_bouton_commencer_warning(){
    page_warning = false 
    page_explication_bis = true 
    //page_vues = true
    interactions.push({"time": new Date().getTime(), "type": "Fin warning"})
}

function afficher_bouton_commencer_warning(){
    w_bouton_commencer = w_bouton_suivant
    h_bouton_commencer = h_bouton_suivant
    x_bouton_commencer = x_bouton_suivant
    y_bouton_commencer = y_bouton_suivant
    // Bouton commencer
    ctx.drawImage(boutons["suivant"], x_bouton_commencer, y_bouton_commencer , w_bouton_commencer, h_bouton_commencer)

    // Survol
    if(xyMouseMove.x >= x_bouton_commencer && xyMouseMove.x <= x_bouton_commencer + w_bouton_commencer && xyMouseMove.y > y_bouton_commencer && xyMouseMove.y < y_bouton_commencer + h_bouton_commencer){
        draw_rectangle(x_bouton_commencer, y_bouton_commencer , w_bouton_commencer, h_bouton_commencer, "rgb(200, 200, 200)", 0.6)
    }
}

////////////////////////////////////////////////////////////////////
///// BOUTON Next 

function action_bouton_suivant_warning(){
    num_warning = num_warning+1
    warnings_a_afficher.push(warnings["texte"+num_warning])

}

function action_bouton_avant_warning(){
    if (num_warning>0){
        warnings_a_afficher.pop()}
        num_warning = num_warning-1
}

function afficher_bouton_suivant_warning(){
    w_bouton_suivant = scale_bouton_commencer_warning*boutons["suivant"].width
    h_bouton_suivant = scale_bouton_commencer_warning*boutons["suivant"].height
    x_bouton_suivant = (window.innerWidth/2)+ 5
    y_bouton_suivant = window.innerHeight - h_bouton_suivant - 20
    // Bouton commencer
    ctx.drawImage(boutons["suivant"], x_bouton_suivant, y_bouton_suivant , w_bouton_suivant, h_bouton_suivant)

    // Survol
    if(xyMouseMove.x >= x_bouton_suivant && xyMouseMove.x <= x_bouton_suivant + w_bouton_suivant && xyMouseMove.y > y_bouton_suivant && xyMouseMove.y < y_bouton_suivant + h_bouton_suivant){
        draw_rectangle(x_bouton_suivant, y_bouton_suivant , w_bouton_suivant, h_bouton_suivant, "rgb(200, 200, 200)", 0.6)
    }
}

function afficher_bouton_avant_warning(){
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

function traitement_warnings(){
    ctx.clearRect(0, 0, canvas.width, canvas.height) 
    draw_rectangle(0,0,canvas.width, canvas.height, "rgb(3, 26, 33)", 1) // ou + clair 4, 38, 48
    // variable position             
    x_texte = window.innerWidth*(1/8)
    w_texte = window.innerWidth*(6/8)
    font_texte = (0.012*window.innerWidth)+"pt Courier" 

    // titre commun à chaque page 
    affichage_titre_warning(titre, (0.018*window.innerWidth)+"pt Courier", "#EF476F", y_titre)
    // affichage texte 
    for(let p=0; p<warnings_a_afficher.length; p++){
        dict_texte = warnings_a_afficher[p]
        affichage_texte_warning(dict_texte.t, font_texte, dict_texte.c, x_texte, dict_texte.y, w_texte)
    }
      
    if (num_warning < (warnings_page_1.length)-1){
        // affichage bouton next
        afficher_bouton_suivant_warning()
        // si on clique sur next 
        if (clicked && click_inside(xyMouseDown, x_bouton_suivant, y_bouton_suivant , w_bouton_suivant, h_bouton_suivant)){
            // on passe aux texte suivant 
            action_bouton_suivant_warning() 
        } 
    } else {
        // affichage bouton next
        afficher_bouton_commencer_warning()
        // si on clique sur next 
        if (clicked && click_inside(xyMouseDown, x_bouton_commencer, y_bouton_commencer , w_bouton_commencer, h_bouton_commencer)){
            // on passe aux texte suivant 
            action_bouton_commencer_warning() 
        } 
    }
    
    //affichage bouton previous dès le deuxièeme texte 
    if(num_warning > 0){
        // affichage bouton next
        afficher_bouton_avant_warning()
        //si on clique sur previous
        if (clicked && click_inside(xyMouseDown, x_bouton_avant, y_bouton_avant , w_bouton_avant, h_bouton_avant)){
            // on passe aux texte suivant 
            action_bouton_avant_warning()    
        } 
    }
  
    
     
}


////////////////////////////////////////////////////////////////////
///// Textes

function init_textes_warnings(){
y_titre = 50
titre = "Warnings"
color_blanc = "rgb(255,255,255)"
color_rouge = "rgb(239, 71, 111)"
warnings={
"texte0":{"t":"The following is a list of warnings to keep in mind during the study:", "y": window.innerHeight*0.15, "c": color_blanc},
"texte1":{"t":"- When you have launched the web page, you should not change the size of the web page or computer screen. Changing the size may cause annoyance.", "y":window.innerHeight*0.25, "c": color_blanc},
"texte2":{"t":"- The loading time of the objects can take time. The 3D screen may be completely black for a few seconds. Be patient, the objects will appear.", "y":window.innerHeight*0.38, "c": color_blanc},
"texte3":{"t":"- Once you have finished the study, wait a few seconds before leaving the web page, to allow time for the data to fully commit to the server. A message will indicate when the registration is complete.", "y": window.innerHeight*0.52, "c": color_blanc},
"texte4":{"t":"- If during the study there are some problems that you can't solve with the interface features, you can refresh the web page.All your data will be lost and you will have to start all over again. ", "y": window.innerHeight*0.68, "c": color_blanc},
}

warnings_page_1 = [warnings["texte0"], warnings["texte1"], warnings["texte2"], warnings["texte3"], warnings["texte4"]]
warnings_a_afficher = [warnings["texte0"]]
}


     

