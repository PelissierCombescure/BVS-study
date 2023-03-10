////////////////////////////////////////
////////////////////////////////////////
//            CLAVIER

function action_clavier_contexte(event){
    switch (event.key){
        // selectionner pose
        // case ' ' :
        //     action_bouton_commencer_contexte('clavier')
        // break;
        // valider
        case  'Enter':
            action_bouton_commencer_contexte('clavier')          
        break;
    }
}

function action_clavier_inscription(event){
    switch (event.key){
        // selectionner pose
        // case ' ' :
        //     if (champs_remplis_correctment()){
        //     action_bouton_commencer('clavier')}
        //     break;idx_i, idx_j
        // valider
        case  'Enter':
            if (!inscription_finie){
                if (champs_remplis_correctment()){
                    action_bouton_suivant_inscription()} 
            }else{
                action_bouton_commencer_inscription()
            }        
            break;
    }
}


function action_clavier_vues(event){
    switch (event.key){
        case  'ArrowLeft':
            console.log("deplacement K-G")
            action_fleche_gauche()
            //idx_i = (idx_i+1)%8
            break;
        case 'ArrowRight' :
            console.log("deplacement K-D")
            action_fleche_droite()
            //idx_i = (idx_i+7)%8
            break;
        case 'ArrowDown' :
            console.log("deplacement K-B")
            action_fleche_bas()
            //idx_j = Math.min(idx_j+1,4)
            break;
        case 'ArrowUp' :
            console.log("deplacement K-H")
            action_fleche_haut()
            //idx_j = Math.max(idx_j-1,0)
            break;
        // selectionner pose
        case ' ' :
            action_bouton_pose()
            break;
        // retirer
        case 'Backspace':
            action_bouton_retirer()
            break;
        // reintialiser
        case 'Delete':
            action_bouton_reinitialiser()
            break;
        // valider
        case  'Enter':
            action_bouton_valider()             
            break;
    }
}

function action_clavier_analyse(event){
    switch (event.key){
        // selectionner pose
        // valider
        case  'Enter':
            action_bouton_valider_analyse()             
            break;
        case  '1':
            check_ou_decheck(0)           
            break;
        case  '2':
            check_ou_decheck(1)           
            break;
        case  '3':
            check_ou_decheck(2)           
            break;
        case  '4':
            check_ou_decheck(3)           
            break;
        case  '5':
            check_ou_decheck(4)           
            break;
    }
}

function init_clavier_contexte(){
    document.addEventListener("keydown", action_clavier_contexte)
}

function init_clavier_inscription(){
    document.addEventListener("keydown", action_clavier_inscription)
}


function init_clavier_explication(){
    document.addEventListener("keydown", action_clavier_explication)
}


function init_clavier_vues(){
    document.addEventListener("keydown", action_clavier_vues)
}

function init_clavier_analyse(){
    document.addEventListener("keydown", action_clavier_analyse)
}