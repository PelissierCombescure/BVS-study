// nuemro init de l'analyse
num_analyse = 1
idx_tache = 0 // ATTENTION ça commence à 1

h_bouton_analyse = 0.1*window.innerHeight


// Variable 
function init_variable_analyse(){
    // liste des checkbox clické pour chaque recap
    //checkbox_clicked_courant = {}
    // for (let p=0; p<nb_choix_demande; p++){
    //     checkbox_clicked_courant["Viewpoint_"+(p+1)] = {idx_checkbox:[], mots:[]}
    // }
    checkbox_clicked_courant = {idx_checkbox:[], mots:[]}
    // Analayse des choix avec les checkboxs
    keywords_init = ["Side view", "Front view", "Global view", "Eyes contact", "Pleasant", "Recognizable", "3/4 view"]
    keywords = shuffle(keywords_init).concat(["Other:"])
    
    l_keyword_max = 0
    for (let p = 0; p<=keywords.length; p++){
        if (l_keyword_max < ctx.measureText(keywords[p])) {l_keyword_max = ctx.measureText(keywords[p])}
    }
    l_keyword_max = l_keyword_max +10

    y_recap = 0.2*window.innerHeight
    taille_texte_explication = 0.01*window.innerWidth
    x_recap_init = (window.innerWidth - nb_choix_demande*(H_3D/2))/(nb_choix_demande+1)

    // checkbox
    w_checkbox = 2*taille_texte_explication
    h_checkbox = 2*taille_texte_explication
    y_checkbox_init = y_recap + H_3D/2 + h_checkbox
}


function affichage_legende(pos){
    x_image = (pos+1)*x_recap_init + pos*(H_3D/2)
    ctx.strokeStyle = "rgb(255, 255, 255)"; ctx.fillStyle = "rgb(255, 255, 255)"
    if (pos==0){print_text(handle_text("Best viewpoint:", x_image, y_recap-10, taille_texte_explication+"pt Courier", longueur_max_recap))}
    if (pos==1){print_text(handle_text("2nd viewpoint:", x_image, y_recap-10, taille_texte_explication+"pt Courier", longueur_max_recap))}
    if (pos==2){print_text(handle_text("3rd viewpoint:", x_image, y_recap-10, taille_texte_explication+"pt Courier", longueur_max_recap))}
}

function affichage_texte(){
    // Texte
    //draw_rectangle(0,0,canvas.width, canvas.height, "rgb(3, 26, 33)", 1) // ou + clair 4, 38, 48
    affichage_titre("Analyze your selection:", (0.015*window.innerWidth)+"pt Courier", "#FFD166", yt =  0.05*window.innerHeight)
    affichage_titre("Select the criteria you used to select these viewpoints, from the most important to the least.", (0.01*window.innerWidth)+"pt Courier", "#FFD166", yt =  0.1*window.innerHeight)
    
}

// idx_tache est la num de la tache à aller chercher dans all_ctxMins
function affichage_analyse(idx_tache){
    canvasMins = all_canvasMins['tache_N'+list_idx_tache[idx_tache]][1]
    for (let i=0; i<nb_choix_demande; i++){
        affichage_legende(i)
        x_recap = (i+1)*x_recap_init + i*(H_3D/2)
        ctx.drawImage(canvasMins[i], x_recap, y_recap, H_3D/2, H_3D/2)
        //draw_contour( x_recap, y_recap, H_3D/2, H_3D/2, "rgb(255,0,0)")
    }  
}

function progress_bar_analyse(N_analyse, N_analyse_total){
    if (N_analyse<=N_analyse_total){
        // background
        draw_rectangle(x_progress_bar, y_progress_bar, w_progress_bar, h_progress_bar, "rgb(255,255,255)", 1)
        // bar
        w_bar = ((N_analyse)/N_analyse_total)*w_progress_bar
        draw_rectangle(x_progress_bar, y_progress_bar, w_bar, h_progress_bar, "rgb(17, 138, 178)", 1)
        // numero de tache
        ctx.strokeStyle = "rgb(255, 255, 255)" // Pour que le contour soit rouge
        ctx.fillStyle = "rgb(255, 255, 255)" // Pour que l'intérieur soit bleu
        ctx.font = "18pt Courier";
        ctx.fillText((N_analyse)+"/"+(N_analyse_total), x_progress_bar+w_progress_bar+10, h_progress_bar)
    }
}

///////////////////////////////////////////////////////////////
///////////////////// Bouton

function affichage_bouton_valider_analyse(m){
    ratio_bouton_analyse = h_bouton_analyse/boutons["valider"].height
    w_bouton_analyse = ratio_bouton_analyse*boutons["valider"].width
    h_bouton_analyse = h_bouton_analyse
    x_bouton_analyse = (window.innerWidth/2) - w_bouton_analyse/2
    y_bouton_analyse = window.innerHeight - h_bouton_analyse - 20
    // si au moins un mot est coché
    if (condition_valider()){
        // affichage bouton valider
        if (m == "en_cours")
        {ctx.drawImage(boutons["valider"], x_bouton_analyse, y_bouton_analyse, w_bouton_analyse, h_bouton_analyse)}
        else{ctx.drawImage(boutons["suivant_grand"], x_bouton_analyse, y_bouton_analyse, w_bouton_analyse, h_bouton_analyse)}
        // survol
        if(is_inside(xyMouseMove, x_bouton_analyse, y_bouton_analyse, w_bouton_analyse, h_bouton_analyse)){
            draw_rectangle(x_bouton_analyse, y_bouton_analyse, w_bouton_analyse, h_bouton_analyse, "rgb(200, 200, 200)", 0.6)

        }
    }
}

function condition_valider(){
    //S'il n'y a pas de checkbox cochée
    if (checkbox_clicked_courant.idx_checkbox.length == 0){
        return false
    }
    //il y a Other: other --> texte non vide
    if (checkbox_clicked_courant.idx_checkbox.indexOf(keywords.length-1)!=-1){
        if(document.getElementById('texte_area').value.length == 0){
            return false
        }
    }
    return true
}

function action_bouton_valider_analyse(){
    interactions.push({"time": new Date().getTime(), "type": get_message("bouton_valider_analyse", [num_analyse]) })
    // si au moins un mot est coché et qu'il reste des analyse à faire
    if (condition_valider()){
        // sauvegarde des checkbox clikée et les mesh 
        if (checkbox_clicked_courant.idx_checkbox.indexOf(keywords.length-1)!=-1){
            texte_toto = lecture_zone_texte()
            checkbox_clicked['Analyse_N'+(num_analyse)] = {"mesh" : choix["tache_N"+list_idx_tache[idx_tache]].mesh ,"Checkbox" : checkbox_clicked_courant, "Texte_other":texte_toto}
        } else {
            checkbox_clicked['Analyse_N'+(num_analyse)] = {"mesh" : choix["tache_N"+list_idx_tache[idx_tache]].mesh ,"Checkbox" : checkbox_clicked_courant}
        }
        //RAZ pour la prochaine analyse
        checkbox_clicked_courant = {idx_checkbox:[], mots:[]}
        keywords = shuffle(keywords_init).concat(["Other:"])
        toto = document.getElementById('texte_area')
            if (toto!=  null){toto.parentElement.removeChild(toto)} 
        // analyse suivant
        num_analyse = num_analyse + 1
        // indice mesh da l'analyse suivante
        idx_tache = idx_tache + 1
        if (num_analyse<=nb_analyse_demande){
        interactions.push({"time": new Date().getTime(), "type": get_message("fin_analyse_i", [num_analyse-1]) })
        interactions.push({"time": new Date().getTime(), "type": get_message("debut_analyse_i", [num_analyse, choix["tache_N"+list_idx_tache[idx_tache]].mesh,]) })}
    } 
}


///////////////////////////////////////////////////////////////
///////////////////// Checkbox
function measure_largeur(debut, pos){
    if (pos>=0){
    l = 0
    for (let p = debut; p<=debut+pos; p++){
        l = l + ctx.measureText(keywords[p]).width + 0.05*window.innerWidth 
    }
    return l
    }
    else{return 15}
}

function traitement_empty_checkbox(){
    //for(let p=0; p<nb_choix_demande; p++){    
        for (let i = 0 ; i < keywords.length; i++){
            // checkbox vide
              //i*((window.innerWidth * 8/10)/6)
            if(i<=5){x_checkbox = window.innerWidth*1/10 + measure_largeur(0, i-1); 
                    y_checkbox = y_checkbox_init}
            else {p = (i%5)-1; 
                    x_checkbox = window.innerWidth*1/10 + measure_largeur(6, p-1); 
                    y_checkbox = y_checkbox_init + 2*h_checkbox}
            ctx.drawImage(imgs["checkbox"], x_checkbox , y_checkbox, w_checkbox, h_checkbox)
            // Texte 
            print_text(handle_text(keywords[i], x_checkbox + w_checkbox + 10, y_checkbox + h_checkbox*0.75, taille_texte_explication+"pt Courier", longueur_max_error))
            // survol
            if (is_inside(xyMouseMove, x_checkbox, y_checkbox, w_checkbox, h_checkbox)){
                draw_rectangle(x_checkbox, y_checkbox, w_checkbox, h_checkbox, "rgb(0, 255, 0)", alpha_survol)
            }
            // clicked
            if (clicked && is_inside(xyMouseMove, x_checkbox, y_checkbox, w_checkbox, h_checkbox)){
                check_ou_decheck(i)
            }
        }
        

    }
//}

function check_ou_decheck(i_mot){
    //s'il n'y a pas deja un check dessus
    if (checkbox_clicked_courant.idx_checkbox.indexOf(i_mot) == -1){
        checkbox_clicked_courant.idx_checkbox.push(i_mot)
        checkbox_clicked_courant.mots.push(keywords[i_mot])
        interactions.push({"time": new Date().getTime(), "type": get_message("ajout_check", [num_analyse, keywords[i_mot]])})
        console.log("ajout "+keywords[i_mot])
        // checkbox Other
        if (i_mot == keywords.length-1){
            zone_texte()
        }
    }
    else{
        position_i = checkbox_clicked_courant.idx_checkbox.indexOf(i_mot)
        checkbox_clicked_courant.idx_checkbox.splice(position_i,1)
        checkbox_clicked_courant.mots.splice(position_i,1)
        console.log("retrait "+keywords[i_mot])
        interactions.push({"time": new Date().getTime(), "type": get_message("retrait_check", [num_analyse, keywords[i_mot]])})
        if (i_mot == keywords.length-1){
            toto = document.getElementById('texte_area')
            if (toto!=  null){toto.parentElement.removeChild(toto)}            
        }
    }
}

function draw_check(){
    idx_check = checkbox_clicked_courant.idx_checkbox
    // pour chacune de ces checkbox cliquée on affiche un check
    for (let i = 0 ; i < idx_check.length; i++){
        pos = idx_check[i]
        if (pos > 5){p = (pos%5)-1; x_checkbox = window.innerWidth*1/10 + measure_largeur(6, p-1); y_checkbox = y_checkbox_init + 2*h_checkbox}
        else{
            x_checkbox =  window.innerWidth*1/10 + measure_largeur(0, pos-1) 
            y_checkbox = y_checkbox_init 
        }
        //ctx.drawImage(imgs["check"], x_checkbox-5 , y_checkbox-5, w_checkbox+10, h_checkbox+10)
        print_text(handle_text(""+(i+1), x_checkbox + 0.2*w_checkbox, y_checkbox + h_checkbox*0.75, taille_texte_explication+"pt Courier", longueur_max_error, '#EF476F'))

    }
}

function zone_texte(){
        inscription_finie = false
        h_text_zone = 0.15*window.innerHeight
        nb_caract_min = 1
        nb_caract_max = 250
        x_texte_zone = (window.innerWidth/3) 
        y_texte_zone = y_checkbox_init + 2*h_checkbox
        ecart_texte_zone = 0.2*window.innerHeight
    
        // Zone de texte : Name
        input2 = document.createElement('textarea');
        input2.type = 'text';
        input2.id = 'texte_area';
        input2.maxLength = nb_caract_max
        input2.cols = 0.02*window.innerWidth
        // style 
        input2.style.position = 'fixed';   
        input2.style.left = x_texte_zone+'px';
        input2.style.top = y_texte_zone+'px';//ecart_texte_zone+y_texte_zone+'px';
        input2.style.textAlign = 'left'
        input2.style.height = h_text_zone
        input2.style.display = true
        input2.style.font =  taille_texte_inscription+"pt Courier"    
        document.body.appendChild(input2);
        //input2.focus();
 }

 function lecture_zone_texte(){
    toto = document.getElementById('texte_area')
    if(toto.value != null){
        return toto.value
    }
 }
///////////////////////////////////////////////////////////////
///////////////////// MAIN 
function traitement_analyse(){
    if ((num_analyse <= nb_analyse_demande)){
        // affiche les textes de la page sauf les ceheckbox
        affichage_texte()
        // afficher les checkbox et gerer les click ou declick
        traitement_empty_checkbox()
        // affiche les check vert en fonction de ce qu'il y a dans checkbox_clicked_courant
        for (let p =0; p<nb_choix_demande;p++){draw_check(p)}
        // affiche les nb_demande_choix images recap 
        affichage_analyse(idx_tache)
        // affiche progress bar
        //progress_bar_analyse(num_analyse, nb_analyse_demande)
        if (num_analyse <= nb_analyse_demande-1){
            // bouton valider 
            affichage_bouton_valider_analyse("en_cours")}
        else{
            affichage_bouton_valider_analyse("fin")
        }
        // action si bouton valider 
        if (clicked && is_inside(xyMouseMove, x_bouton_analyse, y_bouton_analyse, w_bouton_analyse, h_bouton_analyse)){
            action_bouton_valider_analyse()
        }
    }
    else{
       page_analyse = false
       interactions.push({"time": new Date().getTime(), "type": get_message("fin_analyse_i", [num_analyse-1]) })
       interactions.push({"time": new Date().getTime(), "type": get_message("fin_etude", [])})
    }

}

