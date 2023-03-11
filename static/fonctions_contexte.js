scale_bouton_commencer_contexte = 0.6
num_texte = 0

// function affichage_texte_contexte(texte, font, color){
//     // Texte
//     draw_rectangle(0,0,canvas.width, canvas.height, "rgb(3, 26, 33)", 1) // ou + clair 4, 38, 48
//     ctx.strokeStyle = "rgb(255, 255, 255)" // Pour que le contour soit rouge
//     ctx.fillStyle = "rgb(255, 255, 255)" // Pour que l'intérieur soit bleu
//     texte = "Hi, I'm Marie, do you want to participate in my study?"
//     font = "42pt Courier"
//     ctx.font = font
//     largeur = ctx.measureText(texte).width
//     ctx.fillText(texte, (window.innerWidth/2)- (largeur/2), 100)

//     //print_text(handle_text(texte, (window.innerWidth/4), 100, "42pt Courier", (window.innerWidth/1.8)))    

//     ctx.drawImage(imgs['marie'], (window.innerWidth/2)-((imgs['marie'].width*0.7)/2), (window.innerHeight/4), imgs['marie'].width*0.7, imgs['marie'].height*0.7 )
// }

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
    interactions.push({"time": new Date().getTime(), "type": "Fin contexte - Début inscription"})
}

function afficher_bouton_commencer_contexte(){
    w_bouton_commencer = scale_bouton_commencer_contexte*boutons["commencer"].width
    h_bouton_commencer = scale_bouton_commencer_contexte*boutons["commencer"].height
    x_bouton_commencer = (window.innerWidth/2)-(w_bouton_commencer/2)
    y_bouton_commencer = innerHeight*0.75
    // Bouton commencer
    ctx.drawImage(boutons["commencer"], x_bouton_commencer, y_bouton_commencer , w_bouton_commencer, h_bouton_commencer)

    // Survol
    if(xyMouseMove.x >= x_bouton_commencer && xyMouseMove.x <= x_bouton_commencer + w_bouton_commencer && xyMouseMove.y > y_bouton_commencer && xyMouseMove.y < y_bouton_commencer + h_bouton_commencer){
        draw_rectangle(x_bouton_commencer, y_bouton_commencer , w_bouton_commencer, h_bouton_commencer, "rgb(200, 200, 200)", 0.6)
    }
}

////////////////////////////////////////////////////////////////////
///// BOUTON Next 

function action_bouton_suivant_contexte(){
    num_texte = num_texte+1
    if (num_texte == textes_page_1.length){texte_a_afficher = []}
    if (num_texte == (textes_page_1.length + textes_page_2.length)){texte_a_afficher = []}
    if (num_texte == (textes_page_1.length + textes_page_2.length + textes_page_3.length)){texte_a_afficher = []}
    texte_a_afficher.push(textes["texte"+num_texte])
    
    // if (num_texte == (textes_page_1.length + textes_page_2.length)){page_courante = textes_page_3}
    // if (num_texte == (textes_page_1.length + textes_page_2.length + textes_page_3.length)){page_courante = textes_page_4}
}

function action_bouton_avant_contexte(){
    if(num_texte>0){num_texte = num_texte-1}
    
    
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
    // tant qu'on est pas au dernier texte
    if (num_texte < 16){
        // affichage bouton next
        afficher_bouton_suivant_contexte()
        // affichage texte 
        for(let p=0; p<texte_a_afficher.length; p++){
            dict_texte = texte_a_afficher[p]
            if (p == (textes_page_2.length)-1 || p == ( textes_page_2.length)-2 ){w_texte = window.innerWidth*(4/8)}
            affichage_texte_contexte(dict_texte.t, font_texte, dict_texte.c, x_texte, dict_texte.y, w_texte)
            w_texte = window.innerWidth*(6/8)
        }
        // si on clique sur next 
        if (clicked && click_inside(xyMouseDown, x_bouton_suivant, y_bouton_suivant , w_bouton_suivant, h_bouton_suivant)){
            // on passe aux texte suivant 
            action_bouton_suivant_contexte() 
        } 
        //affichage bouton previous dès le deuxièeme texte 
        if(num_texte > 0){
            // affichage bouton next
            afficher_bouton_avant_contexte()}
        //si on clique sur previous
        if (clicked && click_inside(xyMouseDown, x_bouton_avant, y_bouton_avant , w_bouton_avant, h_bouton_avant)){
            // on passe aux texte suivant 
            action_bouton_avant_contexte()    
        }   

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
"texte0":{"t":"Hello, I am Marie Pelissier, a 3rd year PhD student. I work in the field of computer science and more precisely in computer vision.", "y": window.innerHeight*0.15, "c": color_blanc},
"texte1":{"t":"You are currently participating in my user study which will allow me to collect data. These data are precious because they will be used to demonstrate the effectiveness of my work. Unfortunately, such data are not available today in the scientific literature.", "y":window.innerHeight*0.35, "c": color_blanc},
"texte2":{"t":"My work is dedicated to the automatic selection of the best viewpoint for a given 3D object. I will give you more details.", "y":window.innerHeight*0.65, "c": color_blanc},
"texte3":{"t":"What is a viewpoint? ", "y": window.innerHeight*0.15, "c": color_rouge},
"texte4":{"t":"> A point of view of a object corresponds to the position from which we observe a object.", "y": window.innerHeight*0.2, "c": color_blanc},
"texte5":{"t":"Depending on this position, we can observe different parts of this object. However, from any position, it is often not possible to observe all the parts of this object. Some of them, are not visible because they form the 'back' of the object.", "y": window.innerHeight*0.32, "c": color_blanc},
"texte6":{"t":"For example, let's look at this object (which represents a wolf) from this position/viewpoint. Here we cannot see the head of the wolf  but its four legs and tail are visible.", "y": window.innerHeight*0.55, "c": color_blanc},
"texte7":{"t":"There, we cannot see its right eye, left rear leg and tail but the head of the wolf is visible.", "y": window.innerHeight*0.75, "c": color_blanc},
"texte8":{"t":"What is a good viewpoint?", "y": window.innerHeight*0.15, "c": color_rouge},
"texte9":{"t":"> A good point of view corresponds to the position from which we can observe representative parts of our objects that allow us to identify it at first. But also to observe the most salient elements. The more characteristic elements a viewpoint contains, the better the viewpoint will be considered.", "y": window.innerHeight*0.15, "c": color_blanc},
"texte10":{"t":"The purpose of this study is to ask you, for a given object, which are for you the best viewpoints and why. The answers will of course be subjective because everyone will have their own opinion. It is this subjective information that interests me.", "y": window.innerHeight*0.15, "c": color_blanc},
"texte11":{"t":"Now that you know the context of this study, here are the instructions:", "y": window.innerHeight*0.15, "c": color_blanc},
"texte12":{"t":"- you will study "+nb_mesh+" different objects,", "y": window.innerHeight*0.15, "c": color_blanc},
"texte13":{"t":"- for each of them, you will have to select "+nb_choix_demande+" viewpoints,", "y": window.innerHeight*0.15, "c": color_blanc},
"texte14":{"t":"- once this is done, you will have to fill in a questionnaire to justify your choice of viewpoint.", "y": window.innerHeight*0.15, "c": color_blanc},
"texte15":{"t":"To learn how to use this interface and make your viewpoint selection correctly, a tutorial has been created. But first, you have to register.", "y": window.innerHeight*0.15, "c": color_blanc},
}

textes_page_1 = [textes["texte0"], textes["texte1"], textes["texte2"]]
textes_page_2 = [textes["texte3"], textes["texte4"], textes["texte5"], textes["texte6"], textes["texte7"]]
textes_page_3 = [textes["texte8"], textes["texte9"], textes["texte10"]]
textes_page_4 = [textes["texte11"], textes["texte12"], textes["texte13"], textes["texte14"], textes["texte15"]]
texte_a_afficher = [textes["texte0"]]
}


     

