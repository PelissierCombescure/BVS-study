//scale_bouton_commencer_contexte = 0.6
num_texte = 0
h_bouton_contexte = 0.1*window.innerHeight



function affichage_texte_contexte(texte, font, color, xt, yt, l_max_texte, c_vive){
    // Texte
    ctx.strokeStyle = color // Pour que le contour soit rouge
    ctx.fillStyle = color // Pour que l'intérieur soit bleu
    ctx.font = font
    print_text(handle_text(texte, xt, yt, font, l_max_texte, color="#FFFFFF", interligne=0.045*window.innerHeight), false, c_base ="#FFFFFF", c_vive)    
    
}


////////////////////////////////////////////////////////////////////
///// BOUTON COMMENCER 

function action_bouton_commencer_contexte(){
    page_contexte = false 
    page_inscription = true 
    //page_vues = true
    interactions.push({"time": new Date().getTime(), "type": get_message("fin_contexte", [])})
}

function afficher_bouton_commencer_contexte(){
    w_bouton_commencer = w_bouton_suivant
    h_bouton_commencer = h_bouton_suivant
    x_bouton_commencer = x_bouton_suivant
    y_bouton_commencer = y_bouton_suivant
    // Bouton commencer
    ctx.drawImage(boutons["commencer_inscription"], x_bouton_commencer, y_bouton_commencer , w_bouton_commencer, h_bouton_commencer)

    // Survol
    if(xyMouseMove.x >= x_bouton_commencer && xyMouseMove.x <= x_bouton_commencer + w_bouton_commencer && xyMouseMove.y > y_bouton_commencer && xyMouseMove.y < y_bouton_commencer + h_bouton_commencer){
        draw_rectangle(x_bouton_commencer, y_bouton_commencer , w_bouton_commencer, h_bouton_commencer, "rgb(200, 200, 200)", 0.6)
    }
}

////////////////////////////////////////////////////////////////////
///// BOUTON Next 

function action_bouton_suivant_contexte(){
    num_texte = num_texte+1
    if (num_texte == textes_page_1.length){
        texte_a_afficher = []}
    if (num_texte == (textes_page_1.length + textes_page_2.length)){
        texte_a_afficher = []}
    if (num_texte == (textes_page_1.length + textes_page_2.length + textes_page_3.length)){
        texte_a_afficher = []}
    texte_a_afficher.push(textes_contexte["texte"+num_texte])

}

function action_bouton_avant_contexte(){
    if (num_texte>=0){
        if (num_texte == textes_page_1.length){
            texte_a_afficher = JSON.parse(JSON.stringify(textes_page_1))}
        else if (num_texte == (textes_page_1.length + textes_page_2.length)){
            texte_a_afficher = JSON.parse(JSON.stringify(textes_page_2))}
        else if (num_texte == (textes_page_1.length + textes_page_2.length + textes_page_3.length)){
            texte_a_afficher = JSON.parse(JSON.stringify(textes_page_3))} 
        else {
            texte_a_afficher.pop()} 
        }
        num_texte = num_texte-1
}

function afficher_bouton_suivant_contexte(){
    //w_bouton_suivant = scale_bouton_commencer_contexte*boutons["suivant"].width
    //h_bouton_suivant = scale_bouton_commencer_contexte*boutons["suivant"].height
    ratio_bouton_contexte = h_bouton_contexte/boutons["suivant"].height
    w_bouton_suivant = ratio_bouton_contexte*boutons["suivant"].width
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

function afficher_bouton_avant_contexte(){
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

function traitement_contexte(){
    //console.log(num_texte)
    ctx.clearRect(0, 0, canvas.width, canvas.height) 
    // variable position             
    x_texte = window.innerWidth*(0.05)
    w_texte = window.innerWidth*(9/10)
    font_texte = (0.012*window.innerWidth)+"pt Courier" 
    // titre commun à chaque page 
    affichage_titre(titre, (0.018*window.innerWidth)+"pt Courier", "#FFD166")
    // affichage texte 
    for(let p=0; p<texte_a_afficher.length; p++){
        dict_texte = texte_a_afficher[p]
        if ((num_texte == 7 || num_texte == 6) && (p == (textes_page_2.length)-1 ||  p == ( textes_page_2.length)-2)){w_texte = window.innerWidth*(5/10); console.log('rr')}
        //if ((num_texte == 10 || num_texte == 11) && (p == (textes_page_3.length)-2)){w_texte = window.innerWidth*(5/10)}
        // question de l'étude ne plus gros
        if ((num_texte == 11) && p == (textes_page_3.length)-1){font_texte = (dict_texte.fontsize*window.innerWidth)+"pt Courier" }

        affichage_texte_contexte(dict_texte.t, font_texte, dict_texte.c, x_texte, dict_texte.y, w_texte, c_vive='#FFD166')
        w_texte = window.innerWidth*(9/10)
        font_texte = (0.012*window.innerWidth)+"pt Courier" 
    }
      
    if (num_texte < ((textes_page_1.length + textes_page_2.length + textes_page_3.length +textes_page_4.length))-2){
        // affichage bouton next
        afficher_bouton_suivant_contexte()
        // si on clique sur next 
        if (clicked && click_inside(xyMouseDown, x_bouton_suivant, y_bouton_suivant , w_bouton_suivant, h_bouton_suivant)){
            // on passe aux texte suivant 
            action_bouton_suivant_contexte() 
           
        } 
    } else {
        // affichage bouton next
        afficher_bouton_commencer_contexte()
        // si on clique sur next 
        if (clicked && click_inside(xyMouseDown, x_bouton_commencer, y_bouton_commencer , w_bouton_commencer, h_bouton_commencer)){
            // on passe aux texte suivant 
            action_bouton_commencer_contexte() 
        } 
    }
    
    //affichage bouton previous dès le deuxièeme texte 
    if(num_texte >= 0){
        // affichage bouton next
        afficher_bouton_avant_contexte()
        //si on clique sur previous
        if (clicked && click_inside(xyMouseDown, x_bouton_avant, y_bouton_avant , w_bouton_avant, h_bouton_avant)){
            if(num_texte == 0){
                action_revenir_page_avant_contexte()

            }
            // on passe aux texte suivant 
            else {action_bouton_avant_contexte()}
        } 
    }
    // affichage image 
    if(num_texte==6){
        ctx.drawImage(imgs['exemple1'], x_bouton_suivant + w_bouton_suivant + 100, (textes_contexte["texte6"].y + textes_contexte["texte5"].y)/2, window.innerWidth*(2/8), window.innerWidth*(2/8))
    }
    if(num_texte==7){
        ctx.drawImage(imgs['exemple2'], x_bouton_suivant + w_bouton_suivant + 100, (textes_contexte["texte6"].y + textes_contexte["texte5"].y)/2 , window.innerWidth*(2/8), window.innerWidth*(2/8))
    }  
    if(num_texte==10 || num_texte==11){
        //affichage_texte_contexte("Which viewpoint would you choose between both?", font_texte, "rgb(255, 209, 102)", x_texte, (textes_contexte["texte10"].y + textes_contexte["texte11"].y)/2, window.innerWidth*(4/8))
        //ctx.drawImage(imgs['exemple1'], window.innerWidth*(6/10)+20 , textes_contexte["texte10"].y - 50, window.innerWidth*(1/8), window.innerWidth*(1/8))
        //ctx.drawImage(imgs['exemple2'], window.innerWidth*(6/10) +  window.innerWidth*(1/8) + 40, textes_contexte["texte10"].y - 50 , window.innerWidth*(1/8), window.innerWidth*(1/8))
        w_exemple =  window.innerWidth*(1/8)
        h_exemple = w_exemple
        ctx.drawImage(imgs['exemple1'], window.innerWidth/2 - w_exemple/2 -10, (textes_contexte["texte10"].y + textes_contexte["texte11"].y)/2 - h_exemple/2 , w_exemple, h_exemple)
        ctx.drawImage(imgs['exemple2'], window.innerWidth/2 + w_exemple/2 +10, (textes_contexte["texte10"].y + textes_contexte["texte11"].y)/2 -h_exemple/2, w_exemple, h_exemple)
    }             
    
     
}
function action_revenir_page_avant_contexte(){
    page_contexte = false 
    page_avertissement = true
    init_textes_avertissements()
    avertissements_a_afficher = [avertissements["texte0"], avertissements["texte1"], avertissements["texte2"]]
    num_avertissement = avertissements_a_afficher.length-1
    init_clavier_avertissement()
    document.removeEventListener("keydown", action_clavier_contexte)
    interactions.push({"time": new Date().getTime(), "type": get_message("retour_avertissement", [])})
}

////////////////////////////////////////////////////////////////////
///// Textes

function init_textes_contexte(){
titre = "User study : Best view selection"
color_blanc = "rgb(255,255,255)"
color_rouge = "rgb(239, 71, 111)"
color_jaune = "rgb(255, 209, 102)"
textes_contexte={
"texte0":{"t":"Hello! I am Marie Pelissier, a 3rd year Ph.D. student. I work in computer vision, a subfield of computer science, and you are about to help me with my research.", "y": window.innerHeight*0.15, "c": color_blanc},
"texte1":{"t":"First, thank you for participating in my study. I am collecting data in order to evaluate how well a computer compares to actual human opinion in the matter of finding the best viewpoint to look at an object (here an object is a 3D mesh). It seems that no one in the scientific community has yet proposed a dataset for this purpose.", "y":window.innerHeight*0.35, "c": color_blanc},
"texte2":{"t":"That is where you come into play, I need you to answer a few questions in order to build a dataset of human-chosen viewpoints of objects. Let me get into the details...", "y":window.innerHeight*0.65, "c": color_blanc},
"texte3":{"t":"What is a viewpoint? ", "y": window.innerHeight*0.15, "c": color_jaune},
"texte4":{"t":"> The viewpoint of an object is the position from which we observe the object.", "y": window.innerHeight*0.2, "c": color_blanc},
"texte5":{"t":"A viewpoint will always highlight some parts and discard other parts of an object.", "y": window.innerHeight*0.25, "c": color_blanc},
"texte6":{"t":"For example, this is a wolf. This perspective highlights its tail and its hind legs, but discards its head and its face.", "y": window.innerHeight*0.45, "c": color_blanc},
"texte7":{"t":"This viewpoint reveal its head, face, and front legs but hides its tail and barely shows its hind legs.", "y": window.innerHeight*0.6, "c": color_blanc},
"texte8":{"t":"What is a good viewpoint?", "y": window.innerHeight*0.15, "c": color_jaune},
"texte9":{"t":"> A good viewpoint is one that offers a ¤RELEVANT¤ view of the object. The one that ¤BEST¤ showcases/highlights the object and the one that is the most ¤REPRESENTATIVE¤ of the object. ", "y": window.innerHeight*0.2, "c": color_blanc},//A more geometrical definition: a good viewpoint is a position from which most representative characteristics of an object (i.e. the parts that make the object the most identifiable), are visible.", "y": window.innerHeight*0.2, "c": color_blanc},
//"texte10":{"t":"Let's imagine that you have to create an advertising display to promote the movie Dances with Wolves.", "y": window.innerHeight*0.35, "c": color_blanc},
"texte10":{"t":"If you had to choose between these two viewpoints:", "y": window.innerHeight*0.35, "c": color_blanc},
//"texte11":{"t":"The purpose of this study is to ask you, for a given object, which are for you the best viewpoints and why. The answers will of course be subjective because everyone has their own opinion. This subjective information is what I am interested in.", "y": window.innerHeight*0.7, "c": color_blanc},
"texte11": {"t":"Which viewpoint do you prefer to both SHOWCASE and RECOGNIZE the wolf?", "y": window.innerHeight*0.75, "c": color_jaune, 'fontsize':0.015},
//"texte11": {"t":"Which viewpoint allows you to EASILY RECOGNIZE that this object is a wolf??", "y": window.innerHeight*0.8, "c": "rgb(255, 209, 102)"},
"texte12":{"t":"Now that you are up to speed, here are the instructions of the study:", "y": window.innerHeight*0.15, "c": color_blanc},
"texte13":{"t":"- You will be presented ¤"+nb_mesh+" different objects.¤", "y": window.innerHeight*0.25, "c": color_blanc},
"texte14":{"t":"- For each object, you will chose a viewpoint you prefer to both ¤showcase¤ and ¤recognize¤ the object. You will have to do this "+nb_choix_demande+" times.", "y": window.innerHeight*0.35, "c": color_blanc},
"texte15":{"t":"- Afterwards, you will answer a ¤few questions¤ to justify your choices.", "y": window.innerHeight*0.5, "c": color_blanc},
"texte16":{"t":"As a mean for you to get familiar with the interface, and ease your experience, we have set up a quick tutorial.", "y": window.innerHeight*0.6, "c": color_blanc},
"texte17":{"t":"But before anything, we need you to register your Prolific ID in order to save your answers.", "y": window.innerHeight*0.7, "c": color_blanc},
}

textes_page_1 = [textes_contexte["texte0"], textes_contexte["texte1"], textes_contexte["texte2"]]
textes_page_2 = [textes_contexte["texte3"], textes_contexte["texte4"], textes_contexte["texte5"], textes_contexte["texte6"], textes_contexte["texte7"]]
textes_page_3 = [textes_contexte["texte8"], textes_contexte["texte9"], textes_contexte["texte10"], textes_contexte["texte11"]]
textes_page_4 = [textes_contexte["texte12"], textes_contexte["texte13"], textes_contexte["texte14"], textes_contexte["texte15"], textes_contexte["texte16"], , textes_contexte["texte17"]]
texte_a_afficher = [textes_contexte["texte0"]]
}


     

