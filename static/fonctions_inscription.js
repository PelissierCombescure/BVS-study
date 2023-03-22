scale_bouton_commencer = 1
scale_bouton_suivant = 0.6

h_bouton_inscription = 0.1*window.innerHeight
taille_titre_insription = (0.018*window.innerWidth)
taille_texte_inscription = (0.015*window.innerWidth)

function affichage_inscription(){
    // Texte
    draw_rectangle(0,0,canvas.width, canvas.height, "rgb(3, 26, 33)", 1) // ou + clair 4, 38, 48
    // ctx.strokeStyle = "rgb(255, 255, 255)" // Pour que le contour soit rouge
    // ctx.fillStyle = "rgb(255, 255, 255)" // Pour que l'intérieur soit bleu
    // texte = "Give me your personal information"
    // font = "58pt Courier"
    // ctx.font = font
    // largeur = ctx.measureText(texte).width
    // ctx.fillText(texte, (window.innerWidth/2)- (largeur/2), 100)
    titre = "Personal Information"
    affichage_titre(titre, taille_titre_insription+"pt Courier", "#EF476F")

    // Pour les zones de textes
    ctx.strokeStyle = "rgb(255, 255, 255)" 
    ctx.fillStyle = "rgb(255, 255, 255)" 
    ctx.font = taille_texte_inscription+"pt Courier"
    //ctx.fillText("Firstname:", x_texte_zone, parseInt(document.getElementById("Firstname").style.top) -12)
    ctx.fillText("Pseudo:", x_texte_zone, parseInt(document.getElementById("Pseudo").style.top) - 12)
    ctx.fillText("Age:", x_texte_zone, parseInt(document.getElementById("Age").style.top) - 12)
    ctx.fillText("Gender:", parseInt(document.getElementById("SexeM").style.left), parseInt(document.getElementById("SexeM").style.top) - 22)
    ctx.fillText("Male", parseInt(document.getElementById("SexeM").style.left)+40, parseInt(document.getElementById("SexeM").style.top)+24)
    ctx.fillText("Female", parseInt(document.getElementById("SexeF").style.left)+40, parseInt(document.getElementById("SexeM").style.top)+24)
    ctx.fillText("None of these above", parseInt(document.getElementById("SexeA").style.left)+40, parseInt(document.getElementById("SexeA").style.top)+24)
}

//////////////////////////////////////////////////////////////
/// BOUTON COMMENCER INSCRIPTION (POUUR ALLER VERS LE TUTO)

function afficher_bouton_commencer_inscription(){
    w_bouton_commencer = 2*ratio_inscription*boutons["commencer_tuto"].width
    h_bouton_commencer = 2*h_bouton_inscription //scale_bouton_commencer*boutons["commencer_tuto"].height
    x_bouton_commencer = (window.innerWidth/2)-(w_bouton_commencer/2)
    y_bouton_commencer = (window.innerHeight/2)-(h_bouton_commencer/2)

    // Bouton commencer
    ctx.drawImage(boutons["commencer_tuto"], x_bouton_commencer, y_bouton_commencer , w_bouton_commencer, h_bouton_commencer)

    // Survol
    if(xyMouseMove.x >= x_bouton_commencer && xyMouseMove.x <= x_bouton_commencer + w_bouton_commencer && xyMouseMove.y > y_bouton_commencer && xyMouseMove.y < y_bouton_commencer + h_bouton_commencer){
        draw_rectangle(x_bouton_commencer, y_bouton_commencer , w_bouton_commencer, h_bouton_commencer, "rgb(200, 200, 200)", 0.6)
    }
}

function action_bouton_commencer_inscription(){
    page_inscription = false 
    //page_vues = true 
    page_explication = true
    interactions.push({"time": new Date().getTime(), "type": "Début explications"})
    //gestion des données personnelle de l'utilisateur
    //gestion_donnees_personnelles()
        
}

//////////////////////////////////////////////////////////////
/// BOUTON COMMENCER SKIP (POUUR ALLER VERS LE TUTO)

function afficher_bouton_skip_inscription(){
    w_bouton_skip = w_bouton_commencer
    h_bouton_skip = h_bouton_commencer
    x_bouton_skip = (window.innerWidth/2)-(w_bouton_skip/2)
    y_bouton_skip =  (window.innerHeight/2) + (h_bouton_skip/2) + 20

    // Bouton commencer
    ctx.drawImage(boutons["skip"], x_bouton_skip, y_bouton_skip , w_bouton_skip, h_bouton_skip)

    // Survol
    if(xyMouseMove.x >= x_bouton_skip && xyMouseMove.x <= x_bouton_skip + w_bouton_skip && xyMouseMove.y > y_bouton_skip && xyMouseMove.y < y_bouton_skip + h_bouton_skip){
        draw_rectangle(x_bouton_skip, y_bouton_skip , w_bouton_skip, h_bouton_skip, "rgb(200, 200, 200)", 0.6)
    }
}

function action_bouton_skip_inscription(){
    page_inscription = false 
    page_vues = true
    skiped = true
    interactions.push({"time": new Date().getTime(), "type": "Skip tutorial -- Debut choix vues"})
    //gestion des données personnelle de l'utilisateur
    //gestion_donnees_personnelles()
        
}

//////////////////////////////////////////////////////////////
/// BOUTON SUIVANT INSCRIPTION
function afficher_bouton_suivant_inscription(){
    ratio_inscription = h_bouton_inscription/boutons["suivant_grand"].height
    w_bouton_suivant = ratio_inscription*boutons["suivant_grand"].width
    h_bouton_suivant = h_bouton_inscription
    x_bouton_suivant = (window.innerWidth/2)-(w_bouton_suivant/2)
    y_bouton_suivant = innerHeight*0.75
    // Bouton commencer
    ctx.drawImage(boutons["suivant_grand"], x_bouton_suivant, y_bouton_suivant , w_bouton_suivant, h_bouton_suivant)

    // Survol
    if(xyMouseMove.x >= x_bouton_suivant && xyMouseMove.x <= x_bouton_suivant + w_bouton_suivant && xyMouseMove.y > y_bouton_suivant && xyMouseMove.y < y_bouton_suivant + h_bouton_suivant){
        draw_rectangle(x_bouton_suivant, y_bouton_suivant , w_bouton_suivant, h_bouton_suivant, "rgb(200, 200, 200)", 0.6)
    }
}

function action_bouton_suivant_inscription(){
    inscription_finie = true 
    gestion_donnees_personnelles()
    ctx.clearRect(0, 0, canvas.width, canvas.height)
    interactions.push({"time": new Date().getTime(), "type": "Fin inscription"})
}



//////////////////////////////////////////////////////////////
/// CHAMPS INSCRIPTION

function champs_remplis_correctment(){
    //firstname_ok = false
    name_ok = false
    age_ok = false
    sexe_ok = false
    //if ((document.getElementById("Firstname").value.length >0) && (value_non_vide(document.getElementById("Firstname").value))){firstname_ok = true}
    if (document.getElementById("Pseudo").value.length >0 && (value_non_vide(document.getElementById("Pseudo").value))){name_ok = true}
    if ((document.getElementById("Age").value >0) && (document.getElementById("Age").value.length >0) && (value_non_vide(document.getElementById("Age").value))){age_ok = true}
    if (document.getElementById("SexeM").checked || document.getElementById("SexeF").checked || document.getElementById("SexeA").checked){ sexe_ok= true}
    //return firstname_ok && name_ok && age_ok && sexe_ok
    return name_ok && age_ok && sexe_ok
}

function value_non_vide(V){
    non_vide = false
    for(let p=0;p<V.length; p++){
        if (V[p] != ' '){return true}
    }
    return non_vide
}

function afficher_champs_inscription() {
    inscription_finie = false
    w_text_zone = 0.015*window.innerWidth
    h_text_zone = 0.05*window.innerHeight
    nb_caract_min = 1
    nb_caract_max = 30
    x_texte_zone = (window.innerWidth/4) 
    y_texte_zone = 0.20*window.innerHeight
    ecart_texte_zone = 0.2*window.innerHeight
    

    // // Zone de texte : Firstname
    // var input = document.createElement('input');
    // input.type = 'text';
    // input.id = 'Firstname';
    // input.minLength = nb_caract_min
    // input.maxLength = nb_caract_max
    // input.size = w_text_zone
    // input.style.position = 'fixed';   
    // input.style.left = x_texte_zone+'px';
    // input.style.top = y_texte_zone+'px';
    // input.style.textAlign = 'left'
    // input.style.height = h_text_zone
    // input.style.font = taille_texte_inscription+"pt Courier"  
    // document.body.appendChild(input);
    // input.focus();

    // Zone de texte : Name
    var input2 = document.createElement('input');
    input2.type = 'text';
    input2.id = 'Pseudo';
    input2.minLength = nb_caract_min
    input2.maxLength = nb_caract_max
    input2.size = w_text_zone
    // style 
    input2.style.position = 'fixed';   
    input2.style.left = x_texte_zone+'px';
    input2.style.top = y_texte_zone+'px';//ecart_texte_zone+y_texte_zone+'px';
    input2.style.textAlign = 'left'
    input2.style.height = h_text_zone
    input2.style.font =  taille_texte_inscription+"pt Courier"    
    document.body.appendChild(input2);
    input2.focus();

    // Zone de texte : Age
    var input3 = document.createElement('input');
    input3.type = 'number';
    input3.id = 'Age';
    input3.min = 1
    input3.max = 99
    input3.size = 10
    // style 
    input3.style.position = 'fixed';   
    input3.style.left = x_texte_zone+'px';
    input3.style.top = ecart_texte_zone+y_texte_zone+'px';//2*ecart_texte_zone + y_texte_zone+'px';
    input3.style.textAlign = 'left'
    input3.style.height = h_text_zone
    input3.style.font =  taille_texte_inscription+"pt Courier"    
    document.body.appendChild(input3);
    input3.focus();

    // Zone de texte : Sexe
    var input4 = document.createElement('input');
    input4.type = 'radio';
    input4.id = 'SexeM';
    input4.name = "sexe"
    //input4.size = w_text_zone
    // style 
    input4.style.position = 'fixed';   
    input4.style.left = x_texte_zone+'px';
    input4.style.top = 2*ecart_texte_zone + y_texte_zone+'px';//3*ecart_texte_zone + y_texte_zone+'px';
    input4.style.height = 20
    input4.style.width = 20
    document.body.appendChild(input4);
    input4.focus();

    var input5 = document.createElement('input');
    input5.type = 'radio';
    input5.id = 'SexeF';
    input5.name = "sexe"
    //input4.size = w_text_zone
    // style 
    input5.style.position = 'fixed';   
    input5.style.left = window.innerWidth*0.1 + x_texte_zone+'px';
    input5.style.top = 2*ecart_texte_zone + y_texte_zone+'px';//3*ecart_texte_zone + y_texte_zone+'px';
    input5.style.height = 20
    input5.style.width = 20
    document.body.appendChild(input5);
    input5.focus();

    var input6 = document.createElement('input');
    input6.type = 'radio';
    input6.id = 'SexeA';
    input6.name = "sexe"
    //input4.size = w_text_zone
    // style 
    input6.style.position = 'fixed';   
    input6.style.left = window.innerWidth*0.22 + x_texte_zone+'px';
    input6.style.top = 2*ecart_texte_zone + y_texte_zone+'px';//3*ecart_texte_zone + y_texte_zone+'px';
    input6.style.height = 20
    input6.style.width = 20
    document.body.appendChild(input6);
    input6.focus();


}

function gestion_donnees_personnelles(){
    // Sauvegarde des infos  
    if (document.getElementById("SexeM").checked){sexe = "M"}
    else if (document.getElementById("SexeF").checked){sexe = "F"}
    else if (document.getElementById("SexeM").checked){sexe = "M"}
    else {sexe='None'}  
    choix['identite'] = {//"Firstname":document.getElementById("Firstname").value,
                        "Pseudo": document.getElementById("Pseudo").value,
                        "Age": document.getElementById("Age").value,
                        "Sexe": sexe}
    //document.getElementById("Firstname").style.display = 'none'
    document.getElementById("Pseudo").style.display = 'none'
    document.getElementById("Age").style.display = 'none'
    document.getElementById("SexeM").style.display = 'none'
    document.getElementById("SexeF").style.display = 'none'
    document.getElementById("SexeA").style.display = 'none'
                    
}


//////////////////////////////////////////////////////////////
/// MAIN INSCRIPTION

function traitement_inscription(){
    if (!inscription_finie){
        affichage_inscription()
        if (champs_remplis_correctment()){
            // affichage du bouton next
            afficher_bouton_suivant_inscription()
            // Si on clique sur le bouton Next
            if (clicked && click_inside(xyMouseDown, x_bouton_suivant, y_bouton_suivant , w_bouton_suivant, h_bouton_suivant)){
                action_bouton_suivant_inscription()                
            }         
        }
    // les champs sont remplie et on a appuyé sur le bouton next
    } else {
        draw_rectangle(0,0,canvas.width, canvas.height, "rgb(3, 26, 33)", 1)
        texte = "Are  you ready to start the tutorial to learn" 
        texte2 = "how to use the interface of the study?"
        ctx.strokeStyle = "#EF476F"
        ctx.fillStyle = "#EF476F"
        ctx.font = taille_titre_insription+"pt Courier"
        largeur = ctx.measureText(texte).width
        largeur2 = ctx.measureText(texte2).width
        ctx.fillText(texte, (window.innerWidth/2)- (largeur/2), 0.10*window.innerHeight)
        ctx.fillText(texte2, (window.innerWidth/2)- (largeur2/2), 0.16*window.innerHeight)

        // affichager le bouton commencer tutorial
        afficher_bouton_commencer_inscription()
        // affichager le bouton skipi
        afficher_bouton_skip_inscription()
        // si on appuie sur start tutorial
        if (clicked && click_inside(xyMouseDown, x_bouton_commencer, y_bouton_commencer , w_bouton_commencer, h_bouton_commencer)){
            action_bouton_commencer_inscription()
        }
        if (clicked && click_inside(xyMouseDown, x_bouton_skip, y_bouton_skip , w_bouton_skip, h_bouton_skip)){
            action_bouton_skip_inscription()
        }
        


    }
}
