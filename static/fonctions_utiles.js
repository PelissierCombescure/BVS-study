function new_image(src) {
    img = new Image()
    img.src = src
    return img
}

function getMousePos(c, event) {
    var rect = c.getBoundingClientRect()
    return {
        x: event.clientX - rect.left,
        y: event.clientY - rect.top
    }
}

function is_inside(xyMove, x, y, w, h) {
    return (xyMove.x > x && xyMove.x < x+w && xyMove.y > y && xyMove.y < y +h)
}

function click_inside(xyClick, x, y, w, h) {
    return (xyClick.x > x && xyClick.x < x+w && xyClick.y > y && xyClick.y < y +h)
}

function draw_rectangle(originex, originey, largeur, hauteur, couleur, alpha){
    ctx.beginPath()
    ctx.moveTo(originex, originey)
    ctx.lineTo(originex+largeur, originey)
    ctx.lineTo(originex+largeur, originey+hauteur)
    ctx.lineTo(originex, originey+hauteur)
    ctx.lineTo(originex, originey)
    ctx.fillStyle = couleur
    ctx.globalAlpha = alpha
    ctx.fill()
    ctx.globalAlpha = 1
}

function draw_contour(originex, originey, largeur, hauteur, couleur, alpha=1){
    ctx.beginPath()
    ctx.moveTo(originex, originey)
    ctx.lineTo(originex+largeur, originey)
    ctx.lineTo(originex+largeur, originey+hauteur)
    ctx.lineTo(originex, originey+hauteur)
    ctx.lineTo(originex, originey)
    ctx.lineWidth = 5
    ctx.strokeStyle = couleur
    ctx.globalAlpha = alpha
    ctx.stroke()
    ctx.lineWidth = 1
}

function print_text(dialogue) {

    s = dialogue.texte
    for (let i = 0; i < s.length; i++) {
        if (s[i].lettre !== undefined) {
            ctx.strokeStyle = s[i].stroke
            ctx.fillStyle = s[i].fill
            ctx.strokeText(s[i].lettre, s[i].x, s[i].y)
            ctx.fillText(s[i].lettre, s[i].x, s[i].y)
        }
    }

}

function handle_text(dialogue, x_start, y_start, font, l_max, color="#FFFFFF") {
    let s = dialogue

    let x = 0
    let y = y_start

    let mot = ""
    let img_to_print = ""
    let lettres = s.split("")
    let message = []

    let current_fill = color

    ctx.textAlign = "left"
    ctx.font = font

    while (lettres.length > 0) {
        l = lettres.splice(0, 1)[0]
        if (l === " ") {
            if (x >= l_max) {
               
                x = 0
                y += 40
                for (let i = 0; i < mot.length; i++) {
                    message[message.length-mot.length+i].x = x_start+x
                    message[message.length-mot.length+i].y = y
                    x += ctx.measureText(message[message.length-mot.length+i].lettre).width
                }
            }
            message.push({"lettre": " ", "x": x_start+x, "y": y, "fill": current_fill, "stroke": current_fill})
            x += ctx.measureText(" ").width
            mot = ""
        } else {
            mot += l
            message.push({"lettre": l, "x": x_start+x, "y": y, "fill": current_fill, "stroke": current_fill})
            x += ctx.measureText(l).width
        }
    }

    if (x >= l_max) {
        x = 0
        y += 40
        for (let i = 0; i < mot.length; i++) {
            message[message.length-mot.length+i].x = x_start+x
            message[message.length-mot.length+i].y = y
            x += ctx.measureText(message[message.length-mot.length+i].lettre).width
        }
    }

    return {"texte": message}
}


function progress_bar(N_tache, N_mesh){
    if (N_tache<=N_mesh){
        // background
        draw_rectangle(x_progress_bar, y_progress_bar, w_progress_bar, h_progress_bar, "rgb(255,255,255)", 1)
        // bar
        w_bar = ((N_tache-1)/N_mesh)*w_progress_bar
        draw_rectangle(x_progress_bar, y_progress_bar, w_bar, h_progress_bar, "rgb(17, 138, 178)", 1)
        // // numero de tache
        // ctx.strokeStyle = "rgb(255, 255, 255)" // Pour que le contour soit rouge
        // ctx.fillStyle = "rgb(255, 255, 255)" // Pour que l'intérieur soit bleu
        // ctx.font = "18pt Courier";
        // ctx.fillText((N_tache)+"/"+(N_mesh), x_progress_bar+w_progress_bar+10, h_progress_bar)
    }
}