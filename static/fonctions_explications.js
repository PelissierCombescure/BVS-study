function init_explication(){

    alpha_ecran = 1
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
    dh_ecran = 55

    // Position des boutons sur l'écran 
    w_bouton_suivant = boutons["suivant"].width*0.3
    h_bouton_suivant = boutons["suivant"].height*0.3

    temps_attente = 0


    ecrans = [
    // -1 avant de lancer l'interface 
    {'x': W_3D + ecart_x, "y": H_3D*0.6 - dy_ecran , "w":window.innerWidth-W_3D-2*ecart_x, "h":H_3D*0.45 + dh_ecran, "c":color_ecran,"a": alpha_ecran},
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
    {'x': W_3D + ecart_x, "y": H_3D*0.6 - dy_ecran, "w":window.innerWidth-W_3D-2*ecart_x, "h":H_3D*0.45 + dh_ecran, "c":color_ecran,"a": alpha_ecran},
    //5 : plus d'interaction
    {'x': W_3D + ecart_x, "y": H_3D*0.6 - dy_ecran, "w":window.innerWidth-W_3D-2*ecart_x, "h":H_3D*0.45 + dh_ecran, "c":color_ecran,"a": alpha_ecran},
    //6.1 : plus d'interaction
    {'x': W_3D/2 - (window.innerWidth-W_3D-2*ecart_x)/2 , "y": H_3D/2 - (H_3D*0.45 + dh_ecran)/2 , "w":window.innerWidth-W_3D-2*ecart_x, "h":H_3D*0.45 + dh_ecran, "c":color_ecran,"a": alpha_ecran},
    //6.2 :
    {'x': W_3D/2 - (window.innerWidth-W_3D-2*ecart_x)/2 , "y": H_3D/2 - (H_3D*0.45 + dh_ecran)/2 , "w":window.innerWidth-W_3D-2*ecart_x, "h":H_3D*0.45 + dh_ecran, "c":color_ecran,"a": alpha_ecran},
    //6.3 :
    {'x': W_3D/2 - (window.innerWidth-W_3D-2*ecart_x)/2 , "y": H_3D/2 - (H_3D*0.45 + dh_ecran)/2 , "w":window.innerWidth-W_3D-2*ecart_x, "h":H_3D*0.45 + dh_ecran, "c":color_ecran,"a": alpha_ecran},
    //6.4 :
    {'x': W_3D/2 - (window.innerWidth-W_3D-2*ecart_x)/2 , "y": H_3D/2 - (H_3D*0.45 + dh_ecran)/2 , "w":window.innerWidth-W_3D-2*ecart_x, "h":H_3D*0.45 + dh_ecran, "c":color_ecran,"a": alpha_ecran},
    //6.5 :
    {'x': W_3D/2 - (window.innerWidth-W_3D-2*ecart_x)/2 , "y": H_3D/2 - (H_3D*0.45 + dh_ecran)/2 , "w":window.innerWidth-W_3D-2*ecart_x, "h":H_3D*0.45 + dh_ecran, "c":color_ecran,"a": alpha_ecran},
    //6.6 :
    {'x': W_3D/2 - (window.innerWidth-W_3D-2*ecart_x)/2 , "y": H_3D/2 - (H_3D*0.45 + dh_ecran)/2 , "w":window.innerWidth-W_3D-2*ecart_x, "h":H_3D*0.45 + dh_ecran, "c":color_ecran,"a": alpha_ecran},
    //6.7 :
    {'x': W_3D/2 - (window.innerWidth-W_3D-2*ecart_x)/2 , "y": H_3D/2 - (H_3D*0.45 + dh_ecran)/2 , "w":window.innerWidth-W_3D-2*ecart_x, "h":H_3D*0.45 + dh_ecran, "c":color_ecran,"a": alpha_ecran},
    //7 :
    {'x': W_3D/2 - (window.innerWidth-W_3D-2*ecart_x)/2 , "y": H_3D/2 - (H_3D*0.45 + dh_ecran)/2 , "w":window.innerWidth-W_3D-2*ecart_x, "h":H_3D*0.45 + dh_ecran, "c":color_ecran,"a": alpha_ecran}
    ]


    textes = [
        //-1
        {"t":"This is where the instructions will appear to take control of the interface to select your "+nb_choix_demande+" best viewpoints. Now let's display the interface. (PRESS NEXT BUTTON)", "x": ecrans[0].x + marge_texte_x, "y": ecrans[0].y + marge_texte_y, "f":0.010, "l":l_texte_max, "c":color_texte, "i":50},
        // 0
        {"t":"Here is how the interface looks like. (PRESS NEXT BUTTON)", "x": ecrans[0].x + marge_texte_x, "y": ecrans[0].y + marge_texte_y, "f":0.010, "l":l_texte_max, "c":color_texte, "i":50},
        // 1.1 : ecran 3D
        {"t":"You have: A screen to view the 3D object. (PRESS NEXT BUTTON)", "x": ecrans[1].x + marge_texte_x, "y": ecrans[1].y + marge_texte_y, "f":0.010, "l":l_texte_max, "c":color_texte, "i":50},
        // 1.2 : fleche 
        {"t":"You have: Arrows to move the 3D object. (PRESS NEXT BUTTON)", "x": ecrans[2].x + marge_texte_x, "y": ecrans[2].y + marge_texte_y, "f":0.010, "l":l_texte_max, "c":color_texte, "i":50},
        // 1.3 : bouton 
        {"t":"You have: Buttons to make your selection. (PRESS NEXT BUTTON)", "x": ecrans[3].x + marge_texte_x, "y": ecrans[3].y + marge_texte_y, "f":0.010, "l":l_texte_max, "c":color_texte, "i":50},
        // 2.1 : Selection 1er vues 
        {"t":"Let's try to select your first viewpoint. To do this, let's move the 3D model. (PRESS NEXT BUTTON) ", "x": ecrans[4].x + marge_texte_x, "y": ecrans[4].y + marge_texte_y, "f":0.010, "l":l_texte_max, "c":color_texte, "i":50},
        // 2.2 : clique sur fleche droite 
        {"t":"Let's try to select your first viewpoint. To do this, let's move the 3D model. (PRESS RIGHT ARROW)", "x": ecrans[4].x + marge_texte_x, "y": ecrans[4].y + marge_texte_y, "f":0.010, "l":l_texte_max, "c":color_texte, "i":50},
        // 2.3 : clique sur fleche haut
        {"t":"Let's try to select your first viewpoint. To do this, let's move the 3D model. (PRESS UP ARROW)", "x": ecrans[4].x + marge_texte_x, "y": ecrans[4].y + marge_texte_y, "f":0.010, "l":l_texte_max, "c":color_texte, "i":50},
        // 2.4 : clique sur fleche haut 
        {"t":"ArrowUp once again. (PRESS UP ARROW)", "x": ecrans[4].x + marge_texte_x, "y": ecrans[4].y + marge_texte_y, "f":0.010, "l":l_texte_max, "c":color_texte, "i":50},
        // 2.5 :  PBL trop haut
        {"t":"You can't go further. Error messages may appear if you make impossible manipulations. Now let's try again to select our first viewpoint : GO DOWN. (PRESS DOWN ARROW)", "x": ecrans[4].x + marge_texte_x, "y": ecrans[4].y + marge_texte_y, "f":0.01, "l":l_texte_max, "c":color_texte, "i":50},
        // 3.1 :  clique sur fleche bas
        {"t":"It's better. Once again. (PRESS DOWN ARROW)", "x": ecrans[4].x + marge_texte_x, "y": ecrans[4].y + marge_texte_y, "f":0.010, "l":l_texte_max, "c":color_texte, "i":50},
        // 3.2 :  clique sur fleche bas
        {"t":"It's better. Go to the right. (PRESS RIGHT ARROW)", "x": ecrans[4].x + marge_texte_x, "y": ecrans[4].y + marge_texte_y, "f":0.010, "l":l_texte_max, "c":color_texte, "i":50},
        // 3.3 :  clique sur fleche bas
        {"t":"Let's imagine that you choose this viewpoint. You have to select it with the button. (PRESS SELECT BUTTON)", "x": ecrans[4].x + marge_texte_x, "y": ecrans[4].y + marge_texte_y, "f":0.01, "l":l_texte_max, "c":color_texte, "i":50},
        // 4 :  
        {"t":"You have chosen your first viewpoint. It is displayed on your right. This one has become gray on the 3D screen. You can no longer select it. (PRESS NEXT BUTTON)", "x": ecrans[4].x + marge_texte_x, "y": ecrans[4].y + marge_texte_y, "f":0.01, "l":l_texte_max, "c":color_texte, "i":50},
        //5
        {"t":"To go faster, the interaction part with the tutorial interface is finished. Now, you can just look and press the next button when it says here. (PRESS NEXT BUTTON)", "x": ecrans[4].x + marge_texte_x, "y": ecrans[4].y + marge_texte_y, "f":0.01, "l":l_texte_max, "c":color_texte, "i":50},
        // 6.1 
        {"t":"Let's imagine that you have chosen these "+nb_choix_demande+" viewpoints. (PRESS NEXT BUTTON)", "x": ecrans[15].x + marge_texte_x, "y": ecrans[15].y + marge_texte_y, "f":0.01, "l":l_texte_max, "c":color_texte, "i":50},
        // 6.2
        {"t":"With the little arrows, we can switch your selected viewpoints. (PRESS NEXT BUTTON)", "x": ecrans[15].x + marge_texte_x, "y": ecrans[15].y + marge_texte_y, "f":0.01, "l":l_texte_max, "c":color_texte, "i":50},
        // 6.3
        {"t":"With the little red cross, we can remove your the selected viewpoint of your choice. (PRESS NEXT BUTTON)", "x": ecrans[15].x + marge_texte_x, "y": ecrans[15].y + marge_texte_y, "f":0.01, "l":l_texte_max, "c":color_texte, "i":50},
        // 6.4
        {"t":"With the REMOVE button, we can remove the last selected viewpoint. (PRESS NEXT BUTTON)", "x": ecrans[15].x + marge_texte_x, "y": ecrans[15].y + marge_texte_y, "f":0.01, "l":l_texte_max, "c":color_texte, "i":50},
        // 6.5
        {"t":"With the RESET SELECTION button, we can rmove all selected viewpoints. (PRESS NEXT BUTTON)", "x": ecrans[15].x + marge_texte_x, "y": ecrans[15].y + marge_texte_y, "f":0.01, "l":l_texte_max, "c":color_texte, "i":50},
        // 6.6
        {"t":"With the RESET STUDY button, we can start from the beginning. (PRESS NEXT BUTTON)", "x": ecrans[15].x + marge_texte_x, "y": ecrans[15].y + marge_texte_y, "f":0.01, "l":l_texte_max, "c":color_texte, "i":50},
        // 6.7
        {"t":"When you have chosen your "+nb_choix_demande+" viewpoints, the VALIDATE button appears. You can validate your selection and go to the next mesh. (PRESS NEXT BUTTON)", "x": ecrans[15].x + marge_texte_x, "y": ecrans[15].y + marge_texte_y, "f":0.01, "l":l_texte_max, "c":color_texte, "i":50},
        // 7
        {"t":"The tutorial is finished, you now know the basic interactions of this interface. (PRESS NEXT BUTTON)", "x": ecrans[15].x + marge_texte_x, "y": ecrans[15].y + marge_texte_y, "f":0.01, "l":l_texte_max, "c":color_texte, "i":50},
   
    ]

    positions_bouton = [
        //-1  
        {"afficher": true, "x":  ecrans[0].x + ecrans[0].w - w_bouton_suivant - marge_texte_x, "y": ecrans[0].y + ecrans[0].h - h_bouton_suivant - marge_texte_x/2, "w": w_bouton_suivant, "h":h_bouton_suivant},
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
        {"afficher": true, "x":  ecrans[12].x + ecrans[12].w - w_bouton_suivant - marge_texte_x, "y": ecrans[12].y + ecrans[12].h - h_bouton_suivant - marge_texte_x/2, "w": w_bouton_suivant, "h":h_bouton_suivant},
        // 5
        {"afficher": true, "x":  ecrans[13].x + ecrans[13].w - w_bouton_suivant - marge_texte_x, "y": ecrans[13].y + ecrans[13].h - h_bouton_suivant - marge_texte_x/2, "w": w_bouton_suivant, "h":h_bouton_suivant},
        // 6.1
        {"afficher": true, "x":  ecrans[15].x + ecrans[15].w - w_bouton_suivant - marge_texte_x, "y": ecrans[15].y + ecrans[15].h - h_bouton_suivant - marge_texte_x/2, "w": w_bouton_suivant, "h":h_bouton_suivant},
        // 6.2
        {"afficher": true, "x":  ecrans[16].x + ecrans[16].w - w_bouton_suivant - marge_texte_x, "y": ecrans[16].y + ecrans[16].h - h_bouton_suivant - marge_texte_x/2, "w": w_bouton_suivant, "h":h_bouton_suivant},
        // 6.3
        {"afficher": true, "x":  ecrans[17].x + ecrans[17].w - w_bouton_suivant - marge_texte_x, "y": ecrans[17].y + ecrans[17].h - h_bouton_suivant - marge_texte_x/2, "w": w_bouton_suivant, "h":h_bouton_suivant},
        // 6.4
        {"afficher": true, "x":  ecrans[18].x + ecrans[18].w - w_bouton_suivant - marge_texte_x, "y": ecrans[18].y + ecrans[18].h - h_bouton_suivant - marge_texte_x/2, "w": w_bouton_suivant, "h":h_bouton_suivant},
        // 6.5
        {"afficher": true, "x":  ecrans[19].x + ecrans[19].w - w_bouton_suivant - marge_texte_x, "y": ecrans[19].y + ecrans[19].h - h_bouton_suivant - marge_texte_x/2, "w": w_bouton_suivant, "h":h_bouton_suivant},
        // 6.6
        {"afficher": true, "x":  ecrans[20].x + ecrans[20].w - w_bouton_suivant - marge_texte_x, "y": ecrans[20].y + ecrans[20].h - h_bouton_suivant - marge_texte_x/2, "w": w_bouton_suivant, "h":h_bouton_suivant},
        // 6.7
        {"afficher": true, "x":  ecrans[21].x + ecrans[21].w - w_bouton_suivant - marge_texte_x, "y": ecrans[21].y + ecrans[21].h - h_bouton_suivant - marge_texte_x/2, "w": w_bouton_suivant, "h":h_bouton_suivant},
        //7
        {"afficher": true, "x":  ecrans[22].x + ecrans[22].w - w_bouton_suivant - marge_texte_x, "y": ecrans[22].y + ecrans[22].h - h_bouton_suivant - marge_texte_x/2, "w": w_bouton_suivant, "h":h_bouton_suivant}
    ]

    clignotements = [
        //-1
        {"type":"a_cliquer", "x":positions_bouton[0].x, "y":positions_bouton[0].y, "w":positions_bouton[0].w, "h":positions_bouton[0].h, "c":color_clignotement,"a": alpha_clignotement, "t": temps_attente},
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
        {"type":"a_cliquer", "x": positions_bouton[12].x, "y":positions_bouton[12].y, "w":positions_bouton[12].w, "h":positions_bouton[12].h, "c":color_clignotement,"a": alpha_clignotement, "t": temps_attente},
        // 5
        {"type":"a_cliquer", "x": positions_bouton[13].x, "y":positions_bouton[13].y, "w":positions_bouton[13].w, "h":positions_bouton[13].h, "c":color_clignotement,"a": alpha_clignotement, "t": temps_attente},
        // 6.1
        {"type":"a_cliquer", "x": positions_bouton[15].x, "y":positions_bouton[15].y, "w":positions_bouton[15].w, "h":positions_bouton[15].h, "c":color_clignotement,"a": alpha_clignotement, "t": temps_attente},
        // 6.2
        // [{"type":"a_regarder", "x":  W_3D + (window.innerWidth-W_3D)/2.5 -5, "y": (H_3D/3.5)*0.6 + 100, "w":20 +10, "h": ((H_3D/3.5)*0.4 + 100+(20+ H_3D/3.5)*2 + 20) - ((H_3D/3.5)*0.6 + 100) , "c":color_clignotement,"a": alpha_clignotement, "t": temps_attente},
        // {"type":"a_cliquer", "x": positions_bouton[16].x, "y":positions_bouton[16].y, "w":positions_bouton[16].w, "h":positions_bouton[16].h, "c":color_clignotement,"a": alpha_clignotement, "t": temps_attente}
        // ],
        [{"type":"a_regarder", "x":  W_3D + (window.innerWidth-W_3D)/2.5 -5, "y": (H_3D/3.5)*0.6 + 100, "w":20 +10, "h": 20 , "c":color_clignotement,"a": alpha_clignotement, "t": temps_attente},
        {"type":"a_regarder", "x":  W_3D + (window.innerWidth-W_3D)/2.5 -5, "y": (H_3D/3.5)*0.6 + 100+(20+ H_3D/3.5), "w":20 +10, "h": 20 , "c":color_clignotement,"a": alpha_clignotement, "t": temps_attente},
        {"type":"a_regarder", "x":  W_3D + (window.innerWidth-W_3D)/2.5 -5, "y": (H_3D/3.5)*0.4 + 100+(20+ H_3D/3.5), "w":20 +10, "h": 20 , "c":color_clignotement,"a": alpha_clignotement, "t": temps_attente},
        {"type":"a_regarder", "x":  W_3D + (window.innerWidth-W_3D)/2.5 -5, "y": (H_3D/3.5)*0.4 + 100+(20+ H_3D/3.5)*2, "w":20 +10, "h": 20 , "c":color_clignotement,"a": alpha_clignotement, "t": temps_attente},
        {"type":"a_cliquer", "x": positions_bouton[16].x, "y":positions_bouton[16].y, "w":positions_bouton[16].w, "h":positions_bouton[16].h, "c":color_clignotement,"a": alpha_clignotement, "t": temps_attente}
        ],
        //6.3
        // [{"type":"a_regarder", "x":   W_3D+ (window.innerWidth-W_3D)/2.5 + W_3D/3.5 +10 -5 , "y": (H_3D/3.5)*0.4 + 100, "w":20 +10, "h": ((H_3D/3.5)*0.4 + 100+(20+ H_3D/3.5)*2 + 20) - ((H_3D/3.5)*0.4 + 100) , "c":color_clignotement,"a": alpha_clignotement, "t": temps_attente},
        // {"type":"a_cliquer", "x": positions_bouton[17].x, "y":positions_bouton[17].y, "w":positions_bouton[17].w, "h":positions_bouton[17].h, "c":color_clignotement,"a": alpha_clignotement, "t": temps_attente}
        // ],
        [{"type":"a_regarder", "x":   W_3D+ (window.innerWidth-W_3D)/2.5 + W_3D/3.5 +10 -5 , "y": (H_3D/3.5)*0.4 + 100, "w":20 +10, "h": 20 , "c":color_clignotement,"a": alpha_clignotement, "t": temps_attente},
        {"type":"a_regarder", "x":   W_3D+ (window.innerWidth-W_3D)/2.5 + W_3D/3.5 +10 -5 , "y": (H_3D/3.5)*0.4 + 100 + (20+ H_3D/3.5), "w":20 +10, "h": 20 , "c":color_clignotement,"a": alpha_clignotement, "t": temps_attente},
        {"type":"a_regarder", "x":   W_3D+ (window.innerWidth-W_3D)/2.5 + W_3D/3.5 +10 -5 , "y": (H_3D/3.5)*0.4 + 100 + (20+ H_3D/3.5)*2, "w":20 +10, "h": 20 , "c":color_clignotement,"a": alpha_clignotement, "t": temps_attente},
        {"type":"a_cliquer", "x": positions_bouton[17].x, "y":positions_bouton[17].y, "w":positions_bouton[17].w, "h":positions_bouton[17].h, "c":color_clignotement,"a": alpha_clignotement, "t": temps_attente}
        ],
        //6.4 remove
        [{"type":"a_regarder", "x":   W_3D*pos_bouton+w_bouton+ecart_bouton, "y": H_3D+dy*2, "w":w_bouton, "h": h_bouton , "c":color_clignotement,"a": alpha_clignotement, "t": temps_attente},
        {"type":"a_cliquer", "x": positions_bouton[18].x, "y":positions_bouton[18].y, "w":positions_bouton[18].w, "h":positions_bouton[18].h, "c":color_clignotement,"a": alpha_clignotement, "t": temps_attente}
        ],
        //6.5 reset selection 
        [{"type":"a_regarder", "x": W_3D*pos_bouton+w_bouton/2, "y": H_3D+dy*2+h_bouton+ecart_bouton, "w":w_bouton, "h": h_bouton , "c":color_clignotement,"a": alpha_clignotement, "t": temps_attente},
        {"type":"a_cliquer", "x": positions_bouton[19].x, "y":positions_bouton[19].y, "w":positions_bouton[19].w, "h":positions_bouton[19].h, "c":color_clignotement,"a": alpha_clignotement, "t": temps_attente}
        ],
        //6.6 raz
        [{"type":"a_regarder", "x": window.innerWidth-w_bouton-10, "y": window.innerHeight-h_bouton-10, "w":w_bouton, "h": h_bouton , "c":color_clignotement,"a": alpha_clignotement, "t": temps_attente},
        {"type":"a_cliquer", "x": positions_bouton[20].x, "y":positions_bouton[20].y, "w":positions_bouton[20].w, "h":positions_bouton[20].h, "c":color_clignotement,"a": alpha_clignotement, "t": temps_attente}
        ],
        //6.6 validate
        [{"type":"a_regarder", "x": -(1.2*w_bouton)/4+W_3D, "y": H_3D+dy*2+h_bouton, "w":w_bouton*1.2, "h": h_bouton*1.2, "c":color_clignotement,"a": alpha_clignotement, "t": temps_attente},
        {"type":"a_cliquer", "x": positions_bouton[21].x, "y":positions_bouton[21].y, "w":positions_bouton[21].w, "h":positions_bouton[21].h, "c":color_clignotement,"a": alpha_clignotement, "t": temps_attente}
        ],
        // 7. fini
        {"type":"a_cliquer", "x": positions_bouton[15].x, "y":positions_bouton[15].y, "w":positions_bouton[15].w, "h":positions_bouton[15].h, "c":color_clignotement,"a": alpha_clignotement, "t": temps_attente},

    ]


    conditions_suivant = [
        // -1
        {"type": "bouton", "x": positions_bouton[0].x, "y": positions_bouton[0].y, "w": positions_bouton[0].w, "h": positions_bouton[0].h},
        // 0
        {"type": "bouton", "x": positions_bouton[1].x, "y": positions_bouton[1].y, "w": positions_bouton[1].w, "h": positions_bouton[1].h},
        // 1.1
        {"type": "bouton", "x": positions_bouton[2].x, "y": positions_bouton[2].y, "w": positions_bouton[2].w, "h": positions_bouton[2].h},
        // 1.2
        {"type": "bouton", "x": positions_bouton[3].x, "y": positions_bouton[3].y, "w": positions_bouton[3].w, "h": positions_bouton[3].h},
        // 1.3
        {"type": "bouton", "x": positions_bouton[4].x, "y": positions_bouton[4].y, "w": positions_bouton[4].w, "h": positions_bouton[4].h},
        // 2.1 : Selection 1er vues 
        {"type": "bouton", "x": positions_bouton[5].x, "y": positions_bouton[5].y, "w": positions_bouton[5].w, "h": positions_bouton[5].h},
        // 2.2 : clique sur fleche droite
        {"type": "fleche_d", "x": clignotements[6].x, "y": clignotements[6].y, "w": clignotements[6].w, "h": clignotements[6].h},
        // 2.3 : clique sur fleche haut
        {"type": "fleche_h", "x": clignotements[7].x, "y": clignotements[7].y, "w": clignotements[7].w, "h": clignotements[7].h},
        // 2.4 : clique sur fleche haut
        {"type": "fleche_h", "x": clignotements[8].x, "y": clignotements[8].y, "w": clignotements[8].w, "h": clignotements[8].h},
        // 2.5 :  PBL trop haut
        {"type": "fleche_b", "x": clignotements[9].x, "y": clignotements[9].y, "w": clignotements[9].w, "h": clignotements[9].h},
        // 3.1 :  clique sur fleche bas
        {"type": "fleche_b", "x": clignotements[10].x, "y": clignotements[10].y, "w": clignotements[10].w, "h": clignotements[10].h},
        // 3.2 :  clique sur fleche bas
        {"type": "fleche_d", "x": clignotements[11].x, "y": clignotements[11].y, "w": clignotements[11].w, "h": clignotements[11].h},
        // 3.3 :  clique sur bouton pose
        {"type": "bouton_pose", "x": clignotements[12].x, "y": clignotements[12].y, "w": clignotements[12].w, "h": clignotements[12].h},
        // 4 :  clique sur next
        {"type": "bouton", "x": positions_bouton[13].x, "y":positions_bouton[13].y, "w":positions_bouton[13].w, "h":positions_bouton[13].h},
        // 5 :  clique sur next
        {"type": "bouton", "x": positions_bouton[13].x, "y":positions_bouton[13].y, "w":positions_bouton[13].w, "h":positions_bouton[13].h},
         // 6.1 :  clique sur next
        {"type": "bouton", "x": positions_bouton[15].x, "y":positions_bouton[15].y, "w":positions_bouton[15].w, "h":positions_bouton[15].h},
        // 6.2 :  clique sur next
        {"type": "bouton", "x": positions_bouton[16].x, "y":positions_bouton[16].y, "w":positions_bouton[16].w, "h":positions_bouton[16].h},
        // 6.3 :  clique sur next
        {"type": "bouton", "x": positions_bouton[17].x, "y":positions_bouton[17].y, "w":positions_bouton[17].w, "h":positions_bouton[17].h},
        // 6.4 :  clique sur next
        {"type": "bouton", "x": positions_bouton[18].x, "y":positions_bouton[18].y, "w":positions_bouton[18].w, "h":positions_bouton[18].h},
        // 6.5 :  clique sur next
        {"type": "bouton", "x": positions_bouton[18].x, "y":positions_bouton[18].y, "w":positions_bouton[18].w, "h":positions_bouton[18].h},
        // 6.5 :  clique sur next
        {"type": "bouton", "x": positions_bouton[18].x, "y":positions_bouton[18].y, "w":positions_bouton[18].w, "h":positions_bouton[18].h},
        // 6.6 :  clique sur next
        {"type": "bouton", "x": positions_bouton[18].x, "y":positions_bouton[18].y, "w":positions_bouton[18].w, "h":positions_bouton[18].h},
        // 6.7 :  clique sur next
        {"type": "bouton", "x": positions_bouton[18].x, "y":positions_bouton[18].y, "w":positions_bouton[18].w, "h":positions_bouton[18].h},
        // 7 :  clique sur next
        {"type": "bouton", "x": positions_bouton[18].x, "y":positions_bouton[18].y, "w":positions_bouton[18].w, "h":positions_bouton[18].h}
    ]


    nb_action = ecrans.length
    num_action = 0
    time_clicke = time_animate
}

function traitement_explications(idx_i_explication, idx_j_explication){
    temps_pop = 8000

    // Pour déplacer le mesh, il faut initialiser ces deux variables 
    if (num_action==0){
        idx_i = idx_i_explication
        idx_j = idx_j_explication
    }
      // rectangle bleu pour cacher l'interface
    if (num_action == 0){
        draw_rectangle(0, 0, window.innerWidth, window.innerHeight, "rgb(3, 26, 33)", 1)
    }
    // Rendre le recap inatif à partir de l'étape 14
    if(num_action<= 14){
        afficher_recap()
        // Affichage texte recap
        for (p=0; p<liste_poses.length; p++){affichage_texte_recap(p)}}

    if(num_action>14){
        afficher_recap_inactif()
        for (p=0; p<liste_poses.length; p++){affichage_texte_recap(p)}}        

    // remplir les canvasMins pour l'eemple quand on est a un num_action précis
    if (num_action == 15){
        nb_choix_fait = 3
        liste_poses = [['choix1', 1.5707963267948966, 2.356194490192345, 3, 0],['choix2', 0.7853981633974483, 2.356194490192345, 3, 1],['choix3', 0.7853981633974483, 3.141592653589793, 4, 1]]
        ctxMins[0].drawImage(imgs['recap1'], 0,0, imgs['recap1'].width, imgs['recap1'].height, 0, 0, canvasMins[0].width, canvasMins[0].height )
        ctxMins[1].drawImage(imgs['recap2'], 0,0, imgs['recap2'].width, imgs['recap2'].height, 0, 0, canvasMins[0].width, canvasMins[0].height )
        ctxMins[2].drawImage(imgs['recap3'], 0,0, imgs['recap3'].width, imgs['recap3'].height, 0, 0, canvasMins[0].width, canvasMins[0].height )
    }
        
    if (num_action < nb_action){

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
        if (num_action>0){
        survol_bouton()
        survol_fleche()}

        ///////// s'il faut afficher le bouton next/previous
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

        ///////// 1 clignotement courant donc taille = 8 car 8 keys
        if (Object.keys(clignotement).length == 8){
            if (time_animate > time_clicke + clignotement.t  && clignotement.type=="a_cliquer"){
                clignotement_contour(2000, clignotement.x, clignotement.y, clignotement.w, clignotement.h, clignotement.c, epaisseur_clignotement)        
            }                 
            if (time_animate > time_clicke + clignotement.t && clignotement.type=="a_regarder"){
                clignotement_rectangle(2000, clignotement.x, clignotement.y, clignotement.w, clignotement.h, "rgb(0, 255, 255)", 0.8) 
            }
        // on a plusieurs clignotement
        } else {
            for(let p=0; p<clignotement.length; p++){
                clignotement_p = clignotement[p]
                // contour
                if (time_animate > time_clicke + clignotement_p.t && num_action!=13 && clignotement_p.type=="a_cliquer"){
                    clignotement_contour(2000, clignotement_p.x, clignotement_p.y, clignotement_p.w, clignotement_p.h, clignotement_p.c, epaisseur_clignotement)
                }
                // rectangle
                if (time_animate > time_clicke + clignotement_p.t && clignotement_p.type=="a_regarder"){
                    clignotement_rectangle(2000, clignotement_p.x, clignotement_p.y, clignotement_p.w, clignotement_p.h, "rgb(0, 255, 255)", 0.8) 
                }
            }
        }
   

        ///////// si on clique sur NEXT   
        if (condition_suivant.type =="bouton" && clicked && click_inside(xyMouseDown, condition_suivant.x, condition_suivant.y, condition_suivant.w, condition_suivant.h)){
            //console.log("next")
            action_suivante()            
        }

        //////// Si on clique sur PREVIOUS
        //if (condition_suivant.type =="bouton" && num_action >0 && clicked && click_inside(xyMouseDown, condition_suivant.x- w_bouton_suivant - marge_texte_x, condition_suivant.y, condition_suivant.w, condition_suivant.h)){
        if (num_action >0 && clicked && click_inside(xyMouseDown, position_bouton.x- w_bouton_suivant - marge_texte_x, position_bouton.y, position_bouton.w, position_bouton.h)){    
            //console.log("previous")
            action_previous_explication()
        }
        // Si on clique sur Fleche droite
        if (condition_suivant.type =="fleche_d" && num_action > 0 && clicked && click_inside(xyMouseDown, condition_suivant.x, condition_suivant.y, condition_suivant.w, condition_suivant.h)){
            //console.log("fleche_d")
            action_droite_explication()
        }
        // Si on clique sur Fleche Haut
        if (condition_suivant.type =="fleche_h" && num_action > 0 && clicked && click_inside(xyMouseDown, condition_suivant.x, condition_suivant.y, condition_suivant.w, condition_suivant.h)){
            //console.log("fleche_h")
            action_haut_explication()
        }
        // Si on clique sur Fleche bas
        if (condition_suivant.type =="fleche_b" && num_action > 0 && clicked && click_inside(xyMouseDown, condition_suivant.x, condition_suivant.y, condition_suivant.w, condition_suivant.h)){
            //console.log("fleche_b")
            texte_temporaire = {}
            action_bas_explication()
        }
        // Si on clique sur select
        if (condition_suivant.type =="bouton_pose" && num_action > 0 && clicked && click_inside(xyMouseDown, condition_suivant.x, condition_suivant.y, condition_suivant.w, condition_suivant.h)){
            //console.log("bouton_pose")
            action_bouton_pose() 
            action_suivante()   
        }

    }  
    // FIN du tuto
    if (num_action==nb_action){
        action_fin_explication()
    }
    
}

function commencer_etude(){
    draw_rectangle(0,0,canvas.width, canvas.height, "rgb(3, 26, 33)", 1) // ou + clair 4, 38, 48
    ctx.strokeStyle = "rgb(255, 255, 255)" // Pour que le contour soit rouge
    ctx.fillStyle = "rgb(255, 255, 255)" // Pour que l'intérieur soit bleu
    texte = "Are  you ready to start the study?" 
    font = "40pt Courier"
    ctx.font = font
    largeur = ctx.measureText(texte).width
    ctx.fillText(texte, (window.innerWidth/2)- (largeur/2), 100)
    // affichager le bouton commencer
    afficher_bouton_commencer_explication()
    // si on appuie 
    if (clicked && click_inside(xyMouseDown, x_bouton_commencer, y_bouton_commencer , w_bouton_commencer, h_bouton_commencer)){
        action_bouton_commencer_explication()
    }  
}

////////////////////////////////////////////////////////////////////////////////
////////////////////////////////////////////////////////////////////////////////
////////////////////////////////////////////////////////////////////////////////

function action_fin_explication(){
    console.log("explications finies")
    choix_courant = {}
    liste_poses = []
    nb_choix_fait = 0
    for (let i = 0; i < nb_choix_demande; i++) {
        ctxMins[i].clearRect(0, 0, canvasMins[i].width, canvasMins[i].height)
    }
    page_explication = false
    page_explication_bis = true
    interactions.push({"time": new Date().getTime(), "type": "Fin explication"})
}

function action_previous_explication(){
    if ((num_action == 7) || (num_action == 12)){action_fleche_gauche(); update_mesh(idx_i, idx_j)}
    if ((num_action == 8) ){action_fleche_bas(); update_mesh(idx_i, idx_j)}
    if ((num_action == 10) || (num_action == 11)  ){action_fleche_haut(); update_mesh(idx_i, idx_j)}
    if (num_action == 13){action_bouton_retirer()}
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
            if (num_action==12){
                //console.log("pose clavier")
                action_bouton_pose() 
                action_suivante() }
            break;
        // valider
        case  'Enter':  
            if (num_action == nb_action && page_explication){
                action_fin_explication()
            }   
            if (page_explication_bis){
                action_bouton_commencer_explication()
            }
            if (num_action < nb_action && condition_suivant.type =="bouton"){
                action_suivante()} 
                        
            break;
        case  'Backspace':
            if (num_action > 0){
                if (num_action == 7){action_fleche_gauche(); update_mesh(idx_i, idx_j)}
                if ((num_action == 8) ){action_fleche_bas(); update_mesh(idx_i, idx_j)}
                //console.log("previous clavier")
                action_precedente()}                        
            break;

        case 'ArrowRight' :
            if (condition_suivant.type =="fleche_d"){
                //console.log("fleche_d clavier")
                action_droite_explication()
            }
            break
        case 'ArrowUp' :
            if (condition_suivant.type =="fleche_h"){
                //console.log("fleche_h clavier")
                action_haut_explication()
            }
            break

        case 'ArrowDown' :
            if (condition_suivant.type =="fleche_b"){
                //console.log("fleche_b clavier")
                action_bas_explication()
            }
            break
    }
}

function survol_bouton_explication(){
    if (is_inside(xyMouseMove, W_3D*pos_bouton, H_3D+dy*2, w_bouton, h_bouton)){draw_rectangle(W_3D*pos_bouton, H_3D+dy*2, w_bouton, h_bouton, "rgb(200, 200, 200)", 0.6)}

}

function afficher_bouton_commencer_explication(){
    w_bouton_commencer = scale_bouton_commencer*boutons["commencer_choix"].width
    h_bouton_commencer = scale_bouton_commencer*boutons["commencer_choix"].height
    x_bouton_commencer = (window.innerWidth/2)-(w_bouton_commencer/2)
    y_bouton_commencer =  (window.innerHeight/2)-(h_bouton_commencer/2)

    // Bouton commencer
    ctx.drawImage(boutons["commencer_choix"], x_bouton_commencer, y_bouton_commencer , w_bouton_commencer, h_bouton_commencer)

    // Survol
    if(xyMouseMove.x >= x_bouton_commencer && xyMouseMove.x <= x_bouton_commencer + w_bouton_commencer && xyMouseMove.y > y_bouton_commencer && xyMouseMove.y < y_bouton_commencer + h_bouton_commencer){
        draw_rectangle(x_bouton_commencer, y_bouton_commencer , w_bouton_commencer, h_bouton_commencer, "rgb(200, 200, 200)", 0.6)
    }
}

function action_bouton_commencer_explication(){
    page_explication_bis = false 
    page_vues = true 
    interactions.push({"time": new Date().getTime(), "type": "Début étude"})
        
}

function afficher_recap_inactif(){
    w_recap = window.innerWidth-W_3D
    // texte du haut
    //print_text(handle_text("Selected Viewpoints:",   W_3D +(window.innerWidth-W_3D)/4,  h_progress_bar + ecart_recap, "24pt Courier", 500))
    // fleche swap haut
    x_fleche_h = W_3D+ w_recap/2.5 
    w_fleche_h = 20
    h_fleche_h = 20
    // fleche swap bas
    x_fleche_b = W_3D+ w_recap/2.5 
    w_fleche_b = 20
    h_fleche_b = 20
    // croix
    x_croix = W_3D+ w_recap/2.5 + W_3D/3.5 +10
    w_croix = 20
    h_croix = 20
    // pour chaque recap
    for (let i = 0 ; i < canvasMins.length; i++) {
        // Draw les images des contextes
        y_image = 100+(20+ H_3D/3.5)*i
        ctx.drawImage(canvasMins[i],W_3D+ w_recap/2, y_image, H_3D/3.5, H_3D/3.5)
        //Fleche pour Switch haut
        if (nb_choix_fait > 1 && i > 0 && i < nb_choix_fait) {
            y_fleche_h = (H_3D/3.5)*0.4 + y_image
            ctx.drawImage(imgs["haut"], x_fleche_h, y_fleche_h, w_fleche_h, h_fleche_h)            
        }
        // Fleche pour Switch bas
        if (nb_choix_fait > 1 && i < nb_choix_fait-1) {
            y_fleche_b =  (H_3D/3.5)*0.6 + y_image
            ctx.drawImage(imgs["bas"], x_fleche_b, y_fleche_b, w_fleche_b, h_fleche_b)            
        }
        // Croix
        if (i < nb_choix_fait) {
            // croix pour annuler
            y_croix = (H_3D/3.5)*0.4 + y_image
            ctx.drawImage(imgs["croix"], x_croix, y_croix, w_croix, h_croix)            
        }
    }
}