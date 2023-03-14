scale_bouton_commencer_contexte = 0.6
num_texte = 0


function affichage_texte_contexte(texte, font, color, xt, yt, l_max_texte){
    // Texte
    ctx.strokeStyle = color // Pour que le contour soit rouge
    ctx.fillStyle = color // Pour que l'intérieur soit bleu
    ctx.font = font
    print_text(handle_text(texte, xt, yt, font, l_max_texte), false)  
    
}

function affichage_titre_contexte(titre, font, color, yt){
    ctx.strokeStyle =color
    ctx.fillStyle =color
    ctx.font = font
    largeur = ctx.measureText(titre).width
    // au milieu 
    ctx.fillText(titre, (window.innerWidth/2)- (largeur/2), yt)
}

////////////////////////////////////////////////////////////////////
///// BOUTON COMMENCER 

function action_bouton_commencer_contexte(){
    page_contexte = false 
    page_inscription = true 
    //page_vues = true
    interactions.push({"time": new Date().getTime(), "type": "Fin contexte"})
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
    texte_a_afficher.push(textes["texte"+num_texte])

}

function action_bouton_avant_contexte(){
    if (num_texte>0){
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
    w_bouton_suivant = scale_bouton_commencer_contexte*boutons["suivant"].width
    h_bouton_suivant = scale_bouton_commencer_contexte*boutons["suivant"].height
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
    ctx.clearRect(0, 0, canvas.width, canvas.height) 
    // variable position             
    x_texte = window.innerWidth*(1/8)
    w_texte = window.innerWidth*(6/8)
    font_texte = (0.012*window.innerWidth)+"pt Courier" 
    // titre commun à chaque page 
    affichage_titre_contexte(titre, (0.018*window.innerWidth)+"pt Courier", "#EF476F", y_titre)
    // affichage texte 
    for(let p=0; p<texte_a_afficher.length; p++){
        dict_texte = texte_a_afficher[p]
        if ((num_texte == 7 || num_texte == 6) && (p == (textes_page_2.length)-1 ||  p == ( textes_page_2.length)-2)){w_texte = window.innerWidth*(4/8)}
        affichage_texte_contexte(dict_texte.t, font_texte, dict_texte.c, x_texte, dict_texte.y, w_texte)
        w_texte = window.innerWidth*(6/8)
    }
      
    if (num_texte < ((textes_page_1.length + textes_page_2.length + textes_page_3.length +textes_page_4.length))-1){
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
    if(num_texte > 0){
        // affichage bouton next
        afficher_bouton_avant_contexte()
        //si on clique sur previous
        if (clicked && click_inside(xyMouseDown, x_bouton_avant, y_bouton_avant , w_bouton_avant, h_bouton_avant)){
            // on passe aux texte suivant 
            action_bouton_avant_contexte()    
        } 
    }
    // affichage image 
    if(num_texte==6){
        ctx.drawImage(imgs['exemple1'], x_bouton_suivant + w_bouton_suivant + 100, textes["texte6"].y - 100, window.innerWidth*(2/8), window.innerWidth*(2/8))
    }
    if(num_texte==7){
        ctx.drawImage(imgs['exemple2'], x_bouton_suivant + w_bouton_suivant + 100, textes["texte6"].y - 100, window.innerWidth*(2/8), window.innerWidth*(2/8))
    }       
    
     
}


////////////////////////////////////////////////////////////////////
///// Textes

function init_textes_contexte(){
y_titre = 50
titre = "User study : Best view selection"
color_blanc = "rgb(255,255,255)"
color_rouge = "rgb(239, 71, 111)"
textes={
//"texte0":{"t":"Hello, I am Marie Pelissier, a 3rd year PhD student. I work in the field of computer science and more precisely in computer vision.", "y": window.innerHeight*0.15, "c": color_blanc},
"texte0":{"t":"Hello! I am Marie Pelissier, a 3rd year PhD student. I work on computer vision, a subfield of computer science, and you are about to help me with my research.", "y": window.innerHeight*0.15, "c": color_blanc},
//"texte1":{"t":"You are currently participating in my user study which will allow me to collect data related to my research. These data are precious because they will be used to demonstrate the effectiveness of my work. Unfortunately, such data are not available today in the scientific literature.", "y":window.innerHeight*0.35, "c": color_blanc},
"texte1":{"t":"First, thank you for participating in my study. Then, I am collecting data in order to evaluate how well a computer does against actual human opinion in the mattter of finding the best viewpoint to look at an object. Unfortunatly, it seems that no one in the scientific community has yet proposed a dataset for this purpouse.", "y":window.innerHeight*0.35, "c": color_blanc},
//"texte2":{"t":"My work is dedicated to the automatic selection of the best viewpoint for a given 3D object. I will give you more details.", "y":window.innerHeight*0.65, "c": color_blanc},
"texte2":{"t":"That’s where you come into play, I need you to answer a few question in order to build a dataset of human-chosen viewpoints of objects. Let me get into the details...", "y":window.innerHeight*0.65, "c": color_blanc},
"texte3":{"t":"What is a viewpoint? ", "y": window.innerHeight*0.15, "c": color_rouge},
"texte4":{"t":"> The viewpoint of an object is the position from which we observe the object.", "y": window.innerHeight*0.2, "c": color_blanc},
//"texte5":{"t":"Depending on this position, we can observe different parts of this object. However, from any position, it is often not possible to observe all the parts of this object.", "y": window.innerHeight*0.32, "c": color_blanc},
"texte5":{"t":"A viewpoint will always highlight some parts and obscure other parts of an object.", "y": window.innerHeight*0.3, "c": color_blanc},
"texte6":{"t":"For example, this is wolf. This perspective highlights the tail and the hind legs, but obscures the head and face.", "y": window.innerHeight*0.45, "c": color_blanc},
"texte7":{"t":"This viewpoint reveal the head, face, and front legs but hides the tail and barely shows the hind legs.", "y": window.innerHeight*0.6, "c": color_blanc},
"texte8":{"t":"What is a good viewpoint?", "y": window.innerHeight*0.15, "c": color_rouge},
"texte9":{"t":"> A good point of view corresponds to a position from which we can observe representative parts of an object that allow us to identify it. And also to observe the most salient elements. The more characteristic elements a viewpoint contains, the better the viewpoint will be considered.", "y": window.innerHeight*0.2, "c": color_blanc},
"texte10":{"t":"The purpose of this study is to ask you, for a given object, which are for you the best viewpoints and why. The answers will of course be subjective because everyone has their own opinion. This subjective information is what I am interested in.", "y": window.innerHeight*0.45, "c": color_blanc},
"texte11":{"t":"Now that you are up to speed, here are the instructions of the study:", "y": window.innerHeight*0.15, "c": color_blanc},
"texte12":{"t":"- You will be presented "+nb_mesh+" different objects.", "y": window.innerHeight*0.25, "c": color_blanc},
"texte13":{"t":"- For each of them, you will chose "+nb_choix_demande+" viewpoints you find most representative of the given object.", "y": window.innerHeight*0.35, "c": color_blanc},
"texte14":{"t":"- Afterward, you will answer a few questions to justify your choices.", "y": window.innerHeight*0.5, "c": color_blanc},
"texte15":{"t":"As a mean for you to get familiar with the interface, and make your selection easier, we have set up a quick tutorial.", "y": window.innerHeight*0.6, "c": color_blanc},
"texte16":{"t":"But before anything, we need you to register in order to save your answers.", "y": window.innerHeight*0.7, "c": color_blanc},
}

textes_page_1 = [textes["texte0"], textes["texte1"], textes["texte2"]]
textes_page_2 = [textes["texte3"], textes["texte4"], textes["texte5"], textes["texte6"], textes["texte7"]]
textes_page_3 = [textes["texte8"], textes["texte9"], textes["texte10"]]
textes_page_4 = [textes["texte11"], textes["texte12"], textes["texte13"], textes["texte14"], textes["texte15"], textes["texte16"]]
texte_a_afficher = [textes["texte0"]]
}


     

