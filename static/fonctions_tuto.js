scale_bouton_commencer = 0.6

function affichage_tuto(){
    w_bouton_commencer = scale_bouton_commencer*boutons["commencer"].width
    h_bouton_commencer = scale_bouton_commencer*boutons["commencer"].height
    // Texte
    draw_rectangle(0,0,canvas.width, canvas.height, "rgb(3, 26, 33)", 1) // ou + clair 4, 38, 48
    ctx.strokeStyle = "rgb(255, 255, 255)" // Pour que le contour soit rouge
    ctx.fillStyle = "rgb(255, 255, 255)" // Pour que l'intérieur soit bleu
    ctx.font = "bold 58pt Courier";
    ctx.fillText("Are you ready ??????", (window.innerWidth/2)-450, innerHeight/2 -100)

    // Bouton commencer
    ctx.drawImage(boutons["commencer"], (window.innerWidth/2)-(w_bouton_commencer/2), innerHeight/2, w_bouton_commencer, h_bouton_commencer)
}

function survol_commencer(){
    if(xyMouseMove.x >= (window.innerWidth/2)-(w_bouton_commencer/2) && xyMouseMove.x <= (window.innerWidth/2)-(w_bouton_commencer/2) + w_bouton_commencer && xyMouseMove.y > innerHeight/2 && xyMouseMove.y < innerHeight/2 + h_bouton_commencer){
        draw_rectangle((window.innerWidth/2)-(w_bouton_commencer/2), innerHeight/2, w_bouton_commencer, h_bouton_commencer, "rgb(200, 200, 200)", 0.6)
    }
}

function action_bouton_commencer(s){
    page_tuto = false 
    page_vues = true 
    interactions.push({"time": new Date().getTime(), "type": "bouton commencer"+s})
}


function traitement_tuto(){
    affichage_tuto()
    survol_commencer()
    if (clicked && click_inside(xyMouseDown, (window.innerWidth/2)-(w_bouton_commencer/2), innerHeight/2, w_bouton_commencer, h_bouton_commencer)){
        // on passe aux choix 
        action_bouton_commencer("titi")              
    }
}

