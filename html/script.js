/*
TO DO
list all flags with preview
on click, open new window with flag as url parameter
DONE create flag using processing to read png image
DONE display image properties
DONE do the hover mouse get colour thing
*/

let params, img, canvas, flag;

function preload() {
    listFlags();
}


function setup() {
    canvas = createCanvas(400, 400);
    canvas.parent('sketch-holder');
    changeFlag('One/ch.png');
}
  
function draw() {
    if(width != img.width || height != img.height) { resizeCanvas(img.width, img.height); }
    image(img,0,0);
    rect(10, 10, 200, 200);
    let ok = false;
    let x = floor(constrain(mouseX, 0, width));
    let y = floor(constrain(mouseY, 0, height));
    if(x == floor(mouseX) && y == floor(mouseY)) {
        ok = true;
    }
    let c = get(x, y);

    if(ok) {
        let a = `X: ${x} Y: ${y}`;
        let b = `R:${c[0]} G:${c[1]} B:${c[2]}`;
        select("#info").html(`${a}<br />${b}`);
        select("#sample").style('background-color',`rgba(${c[0]},${c[1]},${c[2]},${(c[3]/256)})`);    
        select("#sample").style('border','10px solid grey');
    } else {
        select("#info").html('&nbsp;<br />&nbsp;');
        select("#sample").style('background-color','white');    
        select("#sample").style('border','10px solid white');
    }
}

function listFlags() {
    let ret = "";
    flags.forEach(f => {
        ret += `<img src="../${f}" class="flagThumbnail" onclick="changeFlag('${f}');"/><br />`;
    })
    select('#flagsList').html(ret);
}

function changeFlag(f) {
    flag = f;
    img = loadImage(`../${flag}`,null,failureCallback);
    select("#title").html(name);
    name = f.substr(1 + f.lastIndexOf('/'), 100);
    //resizeCanvas(img.width, img.height);
}

function failureCallback() {
    alert("Could not load the requested image: " + flag);
}

function myButton() {
    resizeCanvas(img.width, img.height);
}

  