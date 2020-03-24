/*
TO DO
list all flags with preview
on click, open new window with flag as url parameter
DONE create flag using processing to read png image
DONE display image properties
DONE do the hover mouse get colour thing
*/

let params, img, canvas, name, basePath = "https://raw.githubusercontent.com/aphoenixholland/svc-ks3-p5js-flags/master/";

function preload() {
    params = getURLParams();
    img = loadImage(basePath + params.img,null,failureCallback);
    name = params.img.substr(1 + params.img.lastIndexOf('/'), 100);
    listFlags();
}

function failureCallback() {
    alert("Could not load the requested image: " + params.img);
}

function setup() {
    select("#title").html(name);
    canvas = createCanvas(img.width, img.height);
    canvas.parent('sketch-holder');
    image(img,0,0);
}
  
function draw() {
    let x = floor(constrain(mouseX, 0, width));
    let y = floor(constrain(mouseY, 0, height));
    let c = get(x, y);

    let a = `X: ${x} Y: ${y}`;
    let b = `R:${c[0]} G:${c[1]} B:${c[2]} A:${c[3]} `;
    select("#info").html(`${a}<br />${b}`);
    select("#sample").style('background-color',`rgba(${c[0]},${c[1]},${c[2]},${(c[3]/256)})`);
}

function listFlags() {
    let ret = "";
    flags.forEach(f => {
        ret += `<img src="${basePath + f}" class="flagThumbnail" /><br />`;
    })
    select('#flagsList').html(ret);
}

  