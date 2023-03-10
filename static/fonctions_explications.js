function init_explication(){

    alpha_ecran = 0.9
alpha_clignotement = 0.8
color_ecran ="rgb(255,255,255)"
color_texte = "rgb(0,0,0)"
color_clignotement = "rgb(255,0,255)"
epaisseur_clignotement = 6
font_texte = window.innerWidth
ecart_x = 50
l_texte_max = window.innerWidth-W_3D-2*ecart_x -50

// marge du texte
marge_texte_x = 20
marge_texte_y = 100

// deplacement pour ajouter un titre à l'ecran 
dy_ecran = 50
dh_ecran = 70

// Position des boutons sur l'écran 
w_bouton_suivant = boutons["suivant"].width*0.3
h_bouton_suivant = boutons["suivant"].height*0.3

temps_attente = 0


ecrans = [
    // 0
   {'x': W_3D + ecart_x, "y": H_3D*0.6 - dy_ecran , "w":window.innerWidth-W_3D-2*ecart_x, "h":H_3D*0.45 + dh_ecran, "c":color_ecran,"a": alpha_ecran},
   // 1.1
   {'x': W_3D + ecart_x, "y": H_3D*0.6 - dy_ecran, "w":window.innerWidth-W_3D-2*ecart_x, "h":H_3D*0.45 + dh_ecran, "c":color_ecran,"a": alpha_ecran},
   // 1.2,
   {'x': W_3D + ecart_x, "y": H_3D*0.6 - dy_ecran, "w":window.innerWidth-W_3D-2*ecart_x, "h":H_3D*0.45 + dh_ecran, "c":color_ecran,"a": alpha_ecran},
   // 1.3
   {'x': W_3D + ecart_x, "y": H_3D*0.6 - dy_ecran, "w":window.innerWidth-W_3D-2*ecart_x, "h":H_3D*0.45 + dh_ecran, "c":color_ecran,"a": alpha_ecran},
   // 2.1 : Selection 1er vues 
   {'x': W_3D + ecart_x, "y": H_3D*0.6 - dy_ecran, "w":window.innerWidth-W_3D-2*ecart_x, "h":H_3D*0.45 + dh_ecran, "c":color_ecran,"a": alpha_ecran},
   // 2.2 : clique sur fleche droite
   {'x': W_3D + ecart_x, "y": H_3D*0.6 - dy_ecran, "w":window.innerWidth-W_3D-2*ecart_x, "h":H_3D*0.45 + dh_ecran, "c":color_ecran,"a": alpha_ecran},
   // 2.3 : clique sur fleche haut
   {'x': W_3D + ecart_x, "y": H_3D*0.6 - dy_ecran, "w":window.innerWidth-W_3D-2*ecart_x, "h":H_3D*0.45 + dh_ecran, "c":color_ecran,"a": alpha_ecran},
   // 2.4 : clique sur fleche haut
   {'x': W_3D + ecart_x, "y": H_3D*0.6 - dy_ecran, "w":window.innerWidth-W_3D-2*ecart_x, "h":H_3D*0.45 + dh_ecran, "c":color_ecran,"a": alpha_ecran},
   // 2.5 :  PBL trop haut
   {'x': W_3D + ecart_x, "y": H_3D*0.6 - dy_ecran, "w":window.innerWidth-W_3D-2*ecart_x, "h":H_3D*0.45 + dh_ecran, "c":color_ecran,"a": alpha_ecran},
   // 3.1 :  clique sur fleche bas
   {'x': W_3D + ecart_x, "y": H_3D*0.6 - dy_ecran, "w":window.innerWidth-W_3D-2*ecart_x, "h":H_3D*0.45 + dh_ecran, "c":color_ecran,"a": alpha_ecran},
   // 3.2 :  clique sur fleche bas
   {'x': W_3D + ecart_x, "y": H_3D*0.6 - dy_ecran, "w":window.innerWidth-W_3D-2*ecart_x, "h":H_3D*0.45 + dh_ecran, "c":color_ecran,"a": alpha_ecran},
   // 3.3 :  clique sur fleche droite
   {'x': W_3D + ecart_x, "y": H_3D*0.6 - dy_ecran, "w":window.innerWidth-W_3D-2*ecart_x, "h":H_3D*0.45 + dh_ecran, "c":color_ecran,"a": alpha_ecran},
   // 4:  Selection de la vue
   {'x': W_3D + ecart_x, "y": H_3D*0.6 - dy_ecran, "w":window.innerWidth-W_3D-2*ecart_x, "h":H_3D*0.45 + dh_ecran, "c":color_ecran,"a": alpha_ecran}
]


textes = [
    // 0
    {"t":"Here is how the interface looks like. (PRESS NEXT BUTTON)", "x": ecrans[0].x + marge_texte_x, "y": ecrans[0].y + marge_texte_y, "f":0.010, "l":l_texte_max, "c":color_texte, "i":50},
    // 1.1 : ecran 3D
    {"t":"You have: A screen to view the 3D object. (PRESS NEXT BUTTON)", "x": ecrans[1].x + marge_texte_x, "y": ecrans[1].y + marge_texte_y, "f":0.010, "l":l_texte_max, "c":color_texte, "i":50},
    // 1.2 : fleche 
    {"t":"You have: Arrows to move the 3D object. (PRESS NEXT BUTTON)", "x": ecrans[2].x + marge_texte_x, "y": ecrans[2].y + marge_texte_y, "f":0.010, "l":l_texte_max, "c":color_texte, "i":50},
    // 1.3 : bouton 
    {"t":"You have: Buttons to make your selection. (PRESS NEXT BUTTON)", "x": ecrans[3].x + marge_texte_x, "y": ecrans[3].y + marge_texte_y, "f":0.010, "l":l_texte_max, "c":color_texte, "i":50},
    // 2.1 : Selection 1er vues 
    {"t":"Let's try to select your first view. To do this, let's move the 3D model. (PRESS NEXT BUTTON) ", "x": ecrans[4].x + marge_texte_x, "y": ecrans[4].y + marge_texte_y, "f":0.010, "l":l_texte_max, "c":color_texte, "i":50},
    // 2.2 : clique sur fleche droite 
    {"t":"Let's try to select your first view. To do this, let's move the 3D model. (PRESS RIGHT ARROW)", "x": ecrans[4].x + marge_texte_x, "y": ecrans[4].y + marge_texte_y, "f":0.010, "l":l_texte_max, "c":color_texte, "i":50},
    // 2.3 : clique sur fleche haut
    {"t":"Let's try to select your first view. To do this, let's move the 3D model. (PRESS UP ARROW)", "x": ecrans[4].x + marge_texte_x, "y": ecrans[4].y + marge_texte_y, "f":0.010, "l":l_texte_max, "c":color_texte, "i":50},
    // 2.4 : clique sur fleche haut 
    {"t":"ArrowUp once again. (PRESS UP ARROW)", "x": ecrans[4].x + marge_texte_x, "y": ecrans[4].y + marge_texte_y, "f":0.010, "l":l_texte_max, "c":color_texte, "i":50},
    // 2.5 :  PBL trop haut
    {"t":"You can't go further. Error messages may appear if you make impossible manipulations. Now let's try again to select our first view : GO DOWN. (PRESS DOWN ARROW)", "x": ecrans[4].x + marge_texte_x, "y": ecrans[4].y + marge_texte_y, "f":0.01, "l":l_texte_max, "c":color_texte, "i":50},
    // 3.1 :  clique sur fleche bas
    {"t":"It's better. Once again. (PRESS DOWN ARROW)", "x": ecrans[4].x + marge_texte_x, "y": ecrans[4].y + marge_texte_y, "f":0.010, "l":l_texte_max, "c":color_texte, "i":50},
    // 3.2 :  clique sur fleche bas
    {"t":"It's better. Go to the right. (PRESS RIGHT ARROW)", "x": ecrans[4].x + marge_texte_x, "y": ecrans[4].y + marge_texte_y, "f":0.010, "l":l_texte_max, "c":color_texte, "i":50},
    // 3.3 :  clique sur fleche bas
    {"t":"Let's imagine that you choose this point of view. You have to select it with the button. (PRESS SELECT BUTTON)", "x": ecrans[4].x + marge_texte_x, "y": ecrans[4].y + marge_texte_y, "f":0.01, "l":l_texte_max, "c":color_texte, "i":50},
    // 4 :  
    {"t":"You have chosen your first viewpoint. It is displayed on your right. This one has become gray on the 3D screen. You can no longer select it. (PRESS NEXT BUTTON)", "x": ecrans[4].x + marge_texte_x, "y": ecrans[4].y + marge_texte_y, "f":0.01, "l":l_texte_max, "c":color_texte, "i":50},
]

positions_bouton = [
    // 0
    {"afficher": true, "x":  ecrans[0].x + ecrans[0].w - w_bouton_suivant - marge_texte_x, "y": ecrans[0].y + ecrans[0].h - h_bouton_suivant - marge_texte_x/2, "w": w_bouton_suivant, "h":h_bouton_suivant},
    // 1.1
    {"afficher": true, "x":  ecrans[1].x + ecrans[1].w - w_bouton_suivant - marge_texte_x, "y": ecrans[1].y + ecrans[1].h - h_bouton_suivant - marge_texte_x/2, "w": w_bouton_suivant, "h":h_bouton_suivant},
    // 1.2
    {"afficher": true, "x":  ecrans[2].x + ecrans[2].w - w_bouton_suivant - marge_texte_x, "y": ecrans[2].y + ecrans[2].h - h_bouton_suivant - marge_texte_x/2, "w": w_bouton_suivant, "h":h_bouton_suivant},
    // 1.3
    {"afficher": true, "x":  ecrans[3].x + ecrans[3].w - w_bouton_suivant - marge_texte_x, "y": ecrans[3].y + ecrans[3].h - h_bouton_suivant - marge_texte_x/2, "w": w_bouton_suivant, "h":h_bouton_suivant},
    // 2.1 : Selection 1er vues 
    {"afficher": true, "x":  ecrans[4].x + ecrans[4].w - w_bouton_suivant - marge_texte_x, "y": ecrans[4].y + ecrans[4].h - h_bouton_suivant - marge_texte_x/2, "w": w_bouton_suivant, "h":h_bouton_suivant},
    // 2.2 : clique sur fleche droite
    {"afficher": true, "x":  ecrans[5].x + ecrans[5].w - w_bouton_suivant - marge_texte_x, "y": ecrans[5].y + ecrans[5].h - h_bouton_suivant - marge_texte_x/2, "w": w_bouton_suivant, "h":h_bouton_suivant},
    // 2.3 : clique sur fleche haut
    {"afficher": true, "x":  ecrans[6].x + ecrans[6].w - w_bouton_suivant - marge_texte_x, "y": ecrans[6].y + ecrans[6].h - h_bouton_suivant - marge_texte_x/2, "w": w_bouton_suivant, "h":h_bouton_suivant},
    // 2.4 : clique sur fleche haut
    {"afficher": true, "x":  ecrans[7].x + ecrans[7].w - w_bouton_suivant - marge_texte_x, "y": ecrans[7].y + ecrans[7].h - h_bouton_suivant - marge_texte_x/2, "w": w_bouton_suivant, "h":h_bouton_suivant},
    // 2.5 :  PBL trop haut
    {"afficher": true, "x":  ecrans[8].x + ecrans[8].w - w_bouton_suivant - marge_texte_x, "y": ecrans[8].y + ecrans[8].h - h_bouton_suivant - marge_texte_x/2, "w": w_bouton_suivant, "h":h_bouton_suivant},
    // 3.1 :  clique sur fleche bas
    {"afficher": true, "x":  ecrans[9].x + ecrans[9].w - w_bouton_suivant - marge_texte_x, "y": ecrans[9].y + ecrans[9].h - h_bouton_suivant - marge_texte_x/2, "w": w_bouton_suivant, "h":h_bouton_suivant},
    // 3.2 :  clique sur fleche bas
    {"afficher": true, "x":  ecrans[10].x + ecrans[10].w - w_bouton_suivant - marge_texte_x, "y": ecrans[10].y + ecrans[10].h - h_bouton_suivant - marge_texte_x/2, "w": w_bouton_suivant, "h":h_bouton_suivant},
    // 3.3 :  clique sur fleche droite
    {"afficher": true, "x":  ecrans[11].x + ecrans[11].w - w_bouton_suivant - marge_texte_x, "y": ecrans[11].y + ecrans[11].h - h_bouton_suivant - marge_texte_x/2, "w": w_bouton_suivant, "h":h_bouton_suivant},
    // 4 
    {"afficher": true, "x":  ecrans[12].x + ecrans[12].w - w_bouton_suivant - marge_texte_x, "y": ecrans[12].y + ecrans[12].h - h_bouton_suivant - marge_texte_x/2, "w": w_bouton_suivant, "h":h_bouton_suivant}
]

clignotements = [
    // 0
    {"type":"a_cliquer", "x":positions_bouton[0].x, "y":positions_bouton[0].y, "w":positions_bouton[0].w, "h":positions_bouton[0].h, "c":color_clignotement,"a": alpha_clignotement, "t": temps_attente},
    // 1.1 : ecran 3D
    [{"type":"a_regarder", "x":0, "y":h_progress_bar, "w":W_3D, "h":H_3D, "c":color_clignotement,"a": alpha_clignotement, "t": 500},
    {"type":"a_cliquer", "x":positions_bouton[1].x, "y":positions_bouton[1].y, "w":positions_bouton[1].w, "h":positions_bouton[1].h, "c":color_clignotement,"a": alpha_clignotement, "t": temps_attente},
    ],
    // 1.2 : fleche
    [{"type":"a_regarder", "x": W_3D*0.2-b, "y":H_3D+DY, "w":b+a+b, "h":b+a+b, "c":color_clignotement,"a": alpha_clignotement, "t": temps_attente},
    {"type":"a_cliquer", "x":positions_bouton[2].x, "y":positions_bouton[2].y, "w":positions_bouton[2].w, "h":positions_bouton[2].h, "c":color_clignotement,"a": alpha_clignotement, "t": temps_attente},
    ],
    // 1.3
    [{"type":"a_regarder", "x":W_3D*pos_bouton, "y":H_3D+dy*2, "w":w_bouton*2 + ecart_bouton, "h":h_bouton*2+ecart_bouton, "c":color_clignotement,"a": alpha_clignotement, "t": 500},
    {"type":"a_cliquer", "x": positions_bouton[3].x, "y":positions_bouton[3].y, "w":positions_bouton[3].w, "h":positions_bouton[3].h, "c":color_clignotement,"a": alpha_clignotement, "t": temps_attente},
    ],
    // 2.1 : Selection 1er vues 
    {"type":"a_cliquer", "x": positions_bouton[4].x, "y":positions_bouton[4].y, "w":positions_bouton[4].w, "h":positions_bouton[4].h, "c":color_clignotement,"a": alpha_clignotement, "t": temps_attente},
    // 2.2 : clique sur fleche droite
    {"type":"a_cliquer", "x": W_3D*0.2+a, "y":H_3D+DY+b, "w":b, "h":a, "c":color_clignotement,"a":alpha_clignotement, "t": temps_attente},
    // 2.3 : clique sur fleche haut
    {"type":"a_cliquer", "x": W_3D*0.2, "y":H_3D+DY, "w":a, "h":b, "c":color_clignotement,"a":alpha_clignotement, "t": temps_attente},
    // 2.4 : clique sur fleche haut
    {"type":"a_cliquer", "x": W_3D*0.2, "y":H_3D+DY, "w":a, "h":b, "c":color_clignotement,"a":alpha_clignotement, "t": temps_attente},
    // 2.5 : PBL trop haut
    {"type":"a_cliquer", "x": W_3D*0.2, "y":H_3D+DY+b+a, "w":a, "h":b, "c":color_clignotement,"a":alpha_clignotement, "t": temps_attente},
    // 3.1 :  clique sur fleche bas
    {"type":"a_cliquer", "x": W_3D*0.2, "y":H_3D+DY+b+a, "w":a, "h":b, "c":color_clignotement,"a":alpha_clignotement, "t": temps_attente},
    // 3.2 :  clique sur fleche bas --> next step fleche droite
    {"type":"a_cliquer", "x": W_3D*0.2+a, "y":H_3D+DY+b, "w":b, "h":a, "c":color_clignotement,"a":alpha_clignotement, "t": temps_attente},
    // 3.3 :  clique sur fleche drioite --> next step bouton pose
    {"type":"a_cliquer", "x": W_3D*pos_bouton, "y": H_3D+dy*2, "w": w_bouton, "h": h_bouton, "c":color_clignotement,"a":alpha_clignotement, "t": temps_attente},
    // 4
    {"type":"a_cliquer", "x": positions_bouton[12].x, "y":positions_bouton[12].y, "w":positions_bouton[12].w, "h":positions_bouton[12].h, "c":color_clignotement,"a": alpha_clignotement, "t": temps_attente}
]


conditions_suivant = [
    // 0
    {"type": "bouton", "x": positions_bouton[0].x, "y": positions_bouton[0].y, "w": positions_bouton[0].w, "h": positions_bouton[0].h},
    // 1.1
    {"type": "bouton", "x": positions_bouton[1].x, "y": positions_bouton[1].y, "w": positions_bouton[1].w, "h": positions_bouton[1].h},
    // 1.2
    {"type": "bouton", "x": positions_bouton[2].x, "y": positions_bouton[2].y, "w": positions_bouton[2].w, "h": positions_bouton[2].h},
    // 1.3
    {"type": "bouton", "x": positions_bouton[3].x, "y": positions_bouton[3].y, "w": positions_bouton[3].w, "h": positions_bouton[3].h},
    // 2.1 : Selection 1er vues 
    {"type": "bouton", "x": positions_bouton[4].x, "y": positions_bouton[4].y, "w": positions_bouton[4].w, "h": positions_bouton[4].h},
    // 2.2 : clique sur fleche droite
    {"type": "fleche_d", "x": clignotements[5].x, "y": clignotements[5].y, "w": clignotements[5].w, "h": clignotements[5].h},
    // 2.3 : clique sur fleche haut
    {"type": "fleche_h", "x": clignotements[6].x, "y": clignotements[6].y, "w": clignotements[6].w, "h": clignotements[6].h},
    // 2.4 : clique sur fleche haut
    {"type": "fleche_h", "x": clignotements[7].x, "y": clignotements[7].y, "w": clignotements[7].w, "h": clignotements[7].h},
    // 2.5 :  PBL trop haut
    {"type": "fleche_b", "x": clignotements[8].x, "y": clignotements[8].y, "w": clignotements[8].w, "h": clignotements[8].h},
    // 3.1 :  clique sur fleche bas
    {"type": "fleche_b", "x": clignotements[9].x, "y": clignotements[9].y, "w": clignotements[9].w, "h": clignotements[9].h},
    // 3.2 :  clique sur fleche bas
    {"type": "fleche_d", "x": clignotements[10].x, "y": clignotements[10].y, "w": clignotements[10].w, "h": clignotements[10].h},
    // 3.3 :  clique sur bouton pose
    {"type": "bouton_pose", "x": clignotements[11].x, "y": clignotements[11].y, "w": clignotements[11].w, "h": clignotements[11].h},
    // 4 :  clique sur next
    {"type": "bouton", "x": positions_bouton[12].x, "y":positions_bouton[12].y, "w":positions_bouton[12].w, "h":positions_bouton[12].h}
]


nb_action = ecrans.length
num_action = 0
nb_click_explication = 0
time_clicke = time_animate
console.log('initttt')


}

function traitement_explications(idx_i_explication, idx_j_explication){
    temps_pop = 8000
    if (num_action==0){
        idx_i = idx_i_explication
        idx_j = idx_j_explication
    }    
    //console.log("debut", idx_i, idx_j, num_action)
    
    ctx.strokeStyle = "rgb(255, 255, 255)" // Pour que le contour soit rouge
    ctx.fillStyle = "rgb(255, 255, 255)" // Pour que l'intérieur soit bleu
    if (num_action < nb_action ){
        // Données
        ecran = ecrans[num_action]
        texte = textes[num_action]
        clignotement = clignotements[num_action]
        position_bouton = positions_bouton[num_action]
        condition_suivant = conditions_suivant[num_action]

        // ecran blanc
        afficher_ecran(ecran.x, ecran.y, ecran.w, ecran.h, ecran.c, ecran.a )
        print_text(handle_text(texte.t, texte.x, texte.y, texte.f*font_texte +"pt Courier", texte.l, texte.c, texte.i))
        print_text(handle_text("Guidelines to follow:", ecran.x +marge_texte_x, ecran.y+52, 0.016*font_texte +"pt Courier", texte.l, "#EF476F", texte.i))



        // survol de tous les boutons 
        survol_bouton()

        // s'il faut afficher le bouton next/previous
        if (position_bouton.afficher){
            // bouton suivant
            ctx.drawImage(boutons['suivant'], position_bouton.x, position_bouton.y, position_bouton.w, position_bouton.h)
            if (is_inside(xyMouseMove, position_bouton.x, position_bouton.y, position_bouton.w, position_bouton.h)){
                //console.log('ttt')
                draw_rectangle(position_bouton.x, position_bouton.y, position_bouton.w, position_bouton.h, "rgb(200, 200, 200)", 0.6)}
            // Bouton previous 
            if (num_action>0){ 
                ctx.drawImage(boutons['avant'], position_bouton.x - w_bouton_suivant - marge_texte_x, position_bouton.y, position_bouton.w, position_bouton.h)
                if (is_inside(xyMouseMove, position_bouton.x - w_bouton_suivant - marge_texte_x, position_bouton.y, position_bouton.w, position_bouton.h)){
                    //console.log("dedans")
                    draw_rectangle(position_bouton.x - w_bouton_suivant - marge_texte_x, position_bouton.y, position_bouton.w, position_bouton.h, "rgb(200, 200, 200)", 0.6)}
            }
        }

        // 1 clignotement courant donc taille = 8 car 8 keys
        if (Object.keys(clignotement).length == 8){
            if (time_animate > time_clicke + clignotement.t && num_action!=12 && clignotement.type=="a_cliquer"){
                clignotement_contour(2000, clignotement.x, clignotement.y, clignotement.w, clignotement.h, clignotement.c, epaisseur_clignotement)        
            }                 
            if (time_animate > time_clicke + clignotement.t && clignotement.type=="a_regarder"){
                clignotement_rectangle(2000, clignotement.x, clignotement.y, clignotement.w, clignotement.h, "rgb(17, 138, 178)", 0.6) 
            }
        // on a plusieurs clignotement
        } else {
            for(let p=0; p<clignotement.length; p++){
                clignotement_p = clignotement[p]
                // contour
                if (time_animate > time_clicke + clignotement_p.t && num_action!=12 && clignotement_p.type=="a_cliquer"){
                    clignotement_contour(2000, clignotement_p.x, clignotement_p.y, clignotement_p.w, clignotement_p.h, clignotement_p.c, epaisseur_clignotement)
                }
                // rectangle
                if (time_animate > time_clicke + clignotement_p.t && clignotement_p.type=="a_regarder"){
                    clignotement_rectangle(2000, clignotement_p.x, clignotement_p.y, clignotement_p.w, clignotement_p.h, "rgb(17, 138, 178)", 0.6) 
                }
            }
        }
   

        // si on clique sur NEXT   
        if (condition_suivant.type =="bouton" && clicked && click_inside(xyMouseDown, condition_suivant.x, condition_suivant.y, condition_suivant.w, condition_suivant.h)){
            console.log("next")
            action_suivante()
            
        }
        // Si on clique sur PREVIOUS
        //if (condition_suivant.type =="bouton" && num_action >0 && clicked && click_inside(xyMouseDown, condition_suivant.x- w_bouton_suivant - marge_texte_x, condition_suivant.y, condition_suivant.w, condition_suivant.h)){
        if (num_action >0 && clicked && click_inside(xyMouseDown, position_bouton.x- w_bouton_suivant - marge_texte_x, position_bouton.y, position_bouton.w, position_bouton.h)){    
            console.log("previous")
            action_previous_explication()
        }
        // Si on clique sur Fleche droite
        if (condition_suivant.type =="fleche_d" && num_action > 0 && clicked && click_inside(xyMouseDown, condition_suivant.x, condition_suivant.y, condition_suivant.w, condition_suivant.h)){
            console.log("fleche_d")
            action_droite_explication()
        }
        // Si on clique sur Fleche Haut
        if (condition_suivant.type =="fleche_h" && num_action > 0 && clicked && click_inside(xyMouseDown, condition_suivant.x, condition_suivant.y, condition_suivant.w, condition_suivant.h)){
            console.log("fleche_h")
            action_haut_explication()
        }
        // Si on clique sur Fleche bas
        if (condition_suivant.type =="fleche_b" && num_action > 0 && clicked && click_inside(xyMouseDown, condition_suivant.x, condition_suivant.y, condition_suivant.w, condition_suivant.h)){
            console.log("fleche_b")
            texte_temporaire = {}
            action_bas_explication()
        }
        // Si on clique sur Fleche bas
        if (condition_suivant.type =="bouton_pose" && num_action > 0 && clicked && click_inside(xyMouseDown, condition_suivant.x, condition_suivant.y, condition_suivant.w, condition_suivant.h)){
            console.log("bouton_pose")
            action_bouton_pose() 
            action_suivante()   
        }

        
    // FIN du tuto
    if (num_action==nb_action){
        console.log("explications finies")
        action_fin_explication()
    }
    }
}

////////////////////////////////////////////////////////////////////////////////
////////////////////////////////////////////////////////////////////////////////
////////////////////////////////////////////////////////////////////////////////

function action_fin_explication(){
    choix_courant = {}
    liste_poses = []
    nb_choix_fait = 0
    page_explication = false
    page_vues = true

    interactions.push({"time": new Date().getTime(), "type": "Fin explication. Début des choix."})
}

function action_previous_explication(){
    if ((num_action == 6) || (num_action == 11)){action_fleche_gauche(); update_mesh(idx_i, idx_j)}
    if ((num_action == 7) ){action_fleche_bas(); update_mesh(idx_i, idx_j)}
    if ((num_action == 9) || (num_action == 10)  ){action_fleche_haut(); update_mesh(idx_i, idx_j)}
    if (num_action == 12){action_bouton_retirer()}
    action_precedente()   
    
}

function action_haut_explication(){
    action_fleche_haut()
    update_mesh(idx_i, idx_j)
    action_suivante()  
}

function action_droite_explication(){
    action_fleche_droite()
    update_mesh(idx_i, idx_j)
    action_suivante() 
}

function action_bas_explication(){
    action_fleche_bas()
    update_mesh(idx_i, idx_j)
    action_suivante()   
}


function action_suivante(){
    num_action = num_action+1
    time_clicke = time_animate
}

function action_precedente(){
    num_action = num_action-1
    time_clicke = time_animate
}

function update_mesh(I,J){
    theta = 2*Math.PI * ( (2/8)*(J==0) + (1/8)*(J==1) + (-1/8)*(J==3) + (-2/8)*(J==4))
    delta = 2*Math.PI * (I/8)
    //camera.position.set(R*Math.cos(theta)*Math.cos(delta), R*Math.sin(theta)*Math.cos(delta), R*Math.sin(delta)) // repère wiki
    camera.position.set(R*Math.cos(delta)*Math.cos(theta), R*Math.sin(theta), R*Math.sin(delta)*Math.cos(theta)) // repère JS
    camera.lookAt(0, 0, 0)
}


function action_clavier_explication(event){
    switch (event.key){
        // selectionner pose
        case ' ' :
            if (num_action==11){
                console.log("pose clavier")
                action_bouton_pose() 
                action_suivante() }
            break;
        // valider
        case  'Enter':
            console.log("next clavier")
            if (num_action < nb_action && condition_suivant.type =="bouton"){
                action_suivante()}     
            if (num_action == nb_action){
                action_fin_explication()
            }                   
            break;
        case  'Backspace':
            if (num_action > 0){
                if (num_action == 6){action_fleche_gauche(); update_mesh(idx_i, idx_j)}
                if ((num_action == 7) ){action_fleche_bas(); update_mesh(idx_i, idx_j)}
                console.log("previous clavier")
                action_precedente()}                        
            break;
        case 'ArrowRight' :
            if (condition_suivant.type =="fleche_d"){
            console.log("fleche_d clavier")
            action_droite_explication()
            }
            break
        case 'ArrowUp' :
            if (condition_suivant.type =="fleche_h"){
            console.log("fleche_h clavier")
            action_haut_explication()
            }
            break

        case 'ArrowDown' :
            if (condition_suivant.type =="fleche_b"){
            console.log("fleche_b clavier")
            action_bas_explication()
            }
            break
    }
}

function survol_bouton_explication(){
    if (is_inside(xyMouseMove, W_3D*pos_bouton, H_3D+dy*2, w_bouton, h_bouton)){draw_rectangle(W_3D*pos_bouton, H_3D+dy*2, w_bouton, h_bouton, "rgb(200, 200, 200)", 0.6)}

}

    //ctx.clearRect(0, 0, canvas.width, canvas.height)
    //texte = "Explications"
    //font = "42pt Courier"
    //ctx.font = font
    //largeur = ctx.measureText(texte).width
    //ctx.fillText(texte, (window.innerWidth/2)- (largeur/2), 100) 
