function get_message(message_nom, arguments){
    let interaction_messages = {}
    interaction_messages['debut_etude'] = 'start'
    interaction_messages['fin_avertissement'] = "fin avertissement - debut contexte"
    interaction_messages['retour_avertissement'] = "retour avertissement"
    interaction_messages['fin_contexte'] = "fin contexte - debut inscription"
    interaction_messages['fin_inscription'] = "fin inscription - choix tutorial"
    interaction_messages['skip'] = "skip tutorial - debut warning"
    interaction_messages['debut_tutorial'] = "debut tutorial"
    interaction_messages['fin_tutorial'] = "fin tutorial - debut warning"
    interaction_messages['fin_warning'] = "fin warning - bouton commencer choix vues"
    interaction_messages['debut_choix'] = "debut choix vues"
    interaction_messages['debut_tache_i'] = "debut tache n°"+(arguments[0])
    interaction_messages['fin_tache_i'] = "fin tache n°"+(arguments[0])
    interaction_messages['fin_choix'] = "fin choix vues - debut explication analyse"

    interaction_messages['affichage_mesh_IJ'] = "T"+arguments[0]+" Ch_fait"+arguments[1]+" Affichage Mesh random : "+arguments[2]+" en idx_i, idx_j : ("+arguments[3]+", "+arguments[4]+")"
    interaction_messages['affichage_mesh_TD'] = "T"+arguments[0]+" Ch_fait"+arguments[1]+" Affichage Mesh random : "+arguments[2]+" en theta, delta : ("+arguments[3]+", "+arguments[4]+")"
    
    interaction_messages['FG'] = "T"+arguments[0]+" Ch_fait"+arguments[1]+" fleche gauche ("+arguments[2]+", "+arguments[3]+')'
    interaction_messages['FD'] = "T"+arguments[0]+" Ch_fait"+arguments[1]+" fleche droite ("+arguments[2]+", "+arguments[3]+')'
    interaction_messages['FH'] = "T"+arguments[0]+" Ch_fait"+arguments[1]+" fleche haut ("+arguments[2]+", "+arguments[3]+')'
    interaction_messages['FB'] = "T"+arguments[0]+" Ch_fait"+arguments[1]+" fleche bas ("+arguments[2]+", "+arguments[3]+')'

    interaction_messages['erreur_FH'] = "T"+arguments[0]+" Ch_fait"+arguments[1]+" Affichage error a cause de fleche haut"
    interaction_messages['erreur_FB'] = "T"+arguments[0]+" Ch_fait"+arguments[1]+" Affichage error a cause de fleche bas"

    interaction_messages['switch_haut_i'] = "T"+arguments[0]+" Ch_fait"+arguments[1]+" fleche switch haut de la pose n°"+(arguments[2]+1)
    interaction_messages['switch_bas_i'] = "T"+arguments[0]+" Ch_fait"+arguments[1]+" fleche switch bas de la pose n°"+(arguments[2]+1)
    interaction_messages['supp_pose_i'] = "T"+arguments[0]+" Ch_fait"+arguments[1]+" suppression de la pose n°"+(arguments[2]+1)

    interaction_messages['bouton_select'] = "T"+arguments[0]+" Ch_fait"+arguments[1]+" choix n°"+(arguments[2])+" bouton pose :("+arguments[3]+", "+arguments[4]+")"
    interaction_messages['bouton_remove'] = "T"+arguments[0]+" Ch_fait"+arguments[1]+" bouton retirer"
    interaction_messages['bouton_reset'] = "T"+arguments[0]+" Ch_fait"+arguments[1]+" bouton reinitialiser"
    interaction_messages['bouton_valider'] = "T"+arguments[0]+" Ch_fait"+arguments[1]+" bouton valider"
    interaction_messages['bouton_raz'] = "T"+arguments[0]+" Ch_fait"+arguments[1]+" bouton raz"
    interaction_messages['bouton_raz_check'] = "T"+arguments[0]+" Ch_fait"+arguments[1]+" bouton raz check"
    interaction_messages['bouton_raz_croix'] = "T"+arguments[0]+" Ch_fait"+arguments[1]+" bouton raz croix"

    interaction_messages['erreur_reset_impossible'] = "T"+arguments[0]+" Ch_fait"+arguments[1]+" Affichage error aucun choix fait donc pas de reinitialisation possible"
    interaction_messages['erreur_pas_de_pose'] = "T"+arguments[0]+" Ch_fait"+arguments[1]+" Affichage error pas de pose a retirer"
    interaction_messages['erreur_choix_fait'] = "T"+arguments[0]+" Ch_fait"+arguments[1]+" Affichage error "+arguments[2]+" deja fait"
    interaction_messages['erreur_pose_selectionnee'] = "T"+arguments[0]+" Ch_fait"+arguments[1]+" Affichage error pose deja sélectionnee"
    interaction_messages['erreur_valider'] = "T"+arguments[0]+" Ch_fait"+arguments[1]+" Affichage error a cause du bouton valider"

    interaction_messages['fin_explication_analyse'] =  "fin explication analyse - debut analyse"
    interaction_messages['debut_analyse'] = "debut analyse"

    interaction_messages['bouton_valider_analyse'] =  "A"+arguments[0]+" bouton valider analyse"
    interaction_messages['debut_analyse_i'] = "debut analyse n°"+(arguments[0])+", mesh : "+arguments[1]
    interaction_messages['fin_analyse_i'] = "fin analyse n°"+(arguments[0])
    interaction_messages['ajout_check'] = "A"+arguments[0]+" ajout check sur : analyse n°"+(arguments[0])+", mot "+arguments[1]
    interaction_messages['retrait_check'] = "A"+arguments[0]+" retrait check sur : analyse n°"+(arguments[0])+", mot "+arguments[1]
    interaction_messages['fin_analyse'] =  "fin analyse"
    interaction_messages['fin_etude'] = "envoie des donnees - fin etude"
    interaction_messages['pbl_enregistrement_final'] = "Probleme lors de l'enregistrement final"
    interaction_messages['enregistrement_json'] = "enregistrement en local du json"
    interaction_messages['lien_next_cloud'] = "click sur lien nextcloud"

    return interaction_messages[message_nom]

}