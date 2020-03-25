/*
TO DO
list all flags with preview
on click, open new window with flag as url parameter
DONE create flag using processing to read png image
DONE display image properties
DONE do the hover mouse get colour thing
*/

let params, img, canvas, flag, lineColor=0;

function preload() {
    listFlags();
}


function setup() {
    canvas = createCanvas(400, 400);
    canvas.parent('sketch-holder');
    changeFlag('One/ch.png');
}
  
function draw() {
    lineColor++;
    if(width != img.width || height != img.height) { resizeCanvas(img.width, img.height); }
    name = flag.substr(1 + flag.lastIndexOf('/'), 100)  + " (" + width + " x " + height +")";
    select("#title").html(name);
    image(img,0,0);
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
        stroke(lineColor%256);
        line(x,0,  x,height);
        stroke((lineColor+128)%256);
        line(0,y,  width,y);
    } else {
        select("#info").html('&nbsp;<br />&nbsp;');
        select("#sample").style('background-color','lightgrey');    
        select("#sample").style('border','10px solid lightgrey');
    }
}

function listFlags() {
    let ret = "";
    flags.forEach(f => {
        ret += `<img src="../${f}" class="flagThumbnail" onclick="changeFlag('${f}');"/><br />${f}<br /><br />`;
    })
    select('#flagsList').html(ret);
}

function changeFlag(f) {
    flag = f;
    img = loadImage(`../${flag}`,null,failureCallback);
}

function failureCallback() {
    alert("Could not load the requested image: " + flag);
}
  