scale_bouton_commencer = 0.6

function affichage_inscription(){
    // Texte
    draw_rectangle(0,0,canvas.width, canvas.height, "rgb(3, 26, 33)", 1) // ou + clair 4, 38, 48
    ctx.strokeStyle = "rgb(255, 255, 255)" // Pour que le contour soit rouge
    ctx.fillStyle = "rgb(255, 255, 255)" // Pour que l'intérieur soit bleu
    texte = "Give me your personal information"
    font = "58pt Courier"
    ctx.font = font
    largeur = ctx.measureText(texte).width
    ctx.fillText(texte, (window.innerWidth/2)- (largeur/2), 100)

    // Pour les zones de textes
    ctx.strokeStyle = "rgb(255, 255, 255)" 
    ctx.fillStyle = "rgb(255, 255, 255)" 
    ctx.font = "28pt Courier"
    ctx.fillText("Firstname:", x_texte_zone, parseInt(document.getElementById("Firstname").style.top) -12)
    ctx.fillText("Name:", x_texte_zone, parseInt(document.getElementById("Name").style.top) - 12)
    ctx.fillText("Age:", x_texte_zone, parseInt(document.getElementById("Age").style.top) - 12)
    ctx.fillText("Sexe:", parseInt(document.getElementById("SexeM").style.left), parseInt(document.getElementById("SexeM").style.top) - 22)
    ctx.font = "24pt Courier"
    ctx.fillText("Male", parseInt(document.getElementById("SexeM").style.left)+40, parseInt(document.getElementById("SexeM").style.top)+24)
    ctx.fillText("Female", parseInt(document.getElementById("SexeF").style.left)+40, parseInt(document.getElementById("SexeM").style.top)+24)
}


function afficher_bouton_commencer(){
    w_bouton_commencer = scale_bouton_commencer*boutons["commencer"].width
    h_bouton_commencer = scale_bouton_commencer*boutons["commencer"].height
    x_bouton_commencer = (window.innerWidth/2)-(w_bouton_commencer/2)
    y_bouton_commencer = innerHeight*0.75
    // Bouton commencer
    ctx.drawImage(boutons["commencer"], x_bouton_commencer, y_bouton_commencer , w_bouton_commencer, h_bouton_commencer)

    // Survol
    if(xyMouseMove.x >= x_bouton_commencer && xyMouseMove.x <= x_bouton_commencer + w_bouton_commencer && xyMouseMove.y > y_bouton_commencer && xyMouseMove.y < y_bouton_commencer + h_bouton_commencer){
        draw_rectangle(x_bouton_commencer, y_bouton_commencer , w_bouton_commencer, h_bouton_commencer, "rgb(200, 200, 200)", 0.6)
    }
}

function action_bouton_commencer(s){
    page_inscription = false 
    page_vues = true 
    interactions.push({"time": new Date().getTime(), "type": "bouton commencer d'inscription"+s})
    
}


function traitement_inscription(){
    affichage_inscription()
    if (champs_remplis_correctment()){
        afficher_bouton_commencer()
        if (clicked && click_inside(xyMouseDown, x_bouton_commencer, y_bouton_commencer , w_bouton_commencer, h_bouton_commencer)){
            // on passe aux choix 
            action_bouton_commencer("titi")     
        }         
    }
}

//////////////////////////////////////////////////////////////
/// CHAMPS INSCRIPTION

function champs_remplis_correctment(){
    firstname_ok = false
    name_ok = false
    age_ok = false
    sexe_ok = false
    if (document.getElementById("Firstname").value.length >0){firstname_ok = true}
    if (document.getElementById("Name").value.length >0){name_ok = true}
    if (document.getElementById("Age").value.length >0){age_ok = true}
    if (document.getElementById("SexeM").checked || document.getElementById("SexeF").checked){ sexe_ok= true}
    return firstname_ok && name_ok && age_ok && sexe_ok
}

function afficher_champs_inscription() {
    w_text_zone = 30
    h_text_zone = 42
    nb_caract_min = 1
    nb_caract_max = 30
    x_texte_zone = (window.innerWidth/3) 
    y_texte_zone = 200
    ecart_texte_zone = 160

    // Zone de texte : Firstname
    var input = document.createElement('input');
    input.type = 'text';
    input.id = 'Firstname';
    input.minLength = nb_caract_min
    input.maxLength = nb_caract_max
    input.size = w_text_zone
    input.style.position = 'fixed';   
    input.style.left = x_texte_zone+'px';
    input.style.top = y_texte_zone+'px';
    input.style.textAlign = 'left'
    input.style.height = h_text_zone
    input.style.font = "24pt Courier"  
    document.body.appendChild(input);
    input.focus();

    // Zone de texte : Name
    var input2 = document.createElement('input');
    input2.type = 'text';
    input2.id = 'Name';
    input2.minLength = nb_caract_min
    input2.maxLength = nb_caract_max
    input2.size = w_text_zone
    // style 
    input2.style.position = 'fixed';   
    input2.style.left = x_texte_zone+'px';
    input2.style.top = ecart_texte_zone+y_texte_zone+'px';
    input2.style.textAlign = 'left'
    input2.style.height = h_text_zone
    input2.style.font = "24pt Courier"  
    document.body.appendChild(input2);
    input2.focus();

    // Zone de texte : Age
    var input3 = document.createElement('input');
    input3.type = 'number';
    input3.id = 'Age';
    input3.min = 1
    input3.max = 99
    input3.size = w_text_zone
    // style 
    input3.style.position = 'fixed';   
    input3.style.left = x_texte_zone+'px';
    input3.style.top = 2*ecart_texte_zone + y_texte_zone+'px';
    input3.style.textAlign = 'left'
    input3.style.height = h_text_zone
    input3.style.font = "24pt Courier"  
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
    input4.style.left = x_texte_zone + 250;
    input4.style.top = 10+ 2*ecart_texte_zone + y_texte_zone+'px';
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
    input5.style.left = x_texte_zone + 400;
    input5.style.top = 10 + 2*ecart_texte_zone + y_texte_zone+'px';
    input5.style.height = 20
    input5.style.width = 20
    document.body.appendChild(input5);
    input5.focus();


}

function gestion_donnees_personnelles(){
    // Sauvegarde des infos  
    if (document.getElementById("SexeM").checked){sexe = "M"}
    else if (document.getElementById("SexeF").checked){sexe = "F"}
    else {sexe='None'}  
    choix['identite'] = {"Firstname":document.getElementById("Firstname").value,
                        "Name": document.getElementById("Name").value,
                        "Age": document.getElementById("Age").value,
                        "Sexe": sexe}
    document.getElementById("Firstname").style.display = 'none'
    document.getElementById("Name").style.display = 'none'
    document.getElementById("Age").style.display = 'none'
    document.getElementById("SexeM").style.display = 'none'
    document.getElementById("SexeF").style.display = 'none'


                    
}
