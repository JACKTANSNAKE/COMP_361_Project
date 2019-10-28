// https://www.youtube.com/watch?v=E1B4UoSQMFw&t=605s

let ls;

let axiom = "";
let sentence = "";

let len = 1280;
let angle = 0;

let rules = {};

let canvas = {
    width: 500,
    height: 500
};

function turtle(){
    resetMatrix();

    const bound = getBound(ls.sentence);
    console.log(`minX: ${bound.minX}`);
    console.log(`maxX: ${bound.maxX}`);
    console.log(`minY: ${bound.minY}`);
    console.log(`maxY: ${bound.maxY}`);

    let len = 0;    // Set up the length of each stroke
    if (bound.maxX - bound.minX >= bound.maxY - bound.minY){
        // Scale the unit scalar to put the boundary inside the canvas
        // Set the length according to the unit scalar
        len = canvas.width / (bound.maxX - bound.minX);
        console.log(`Width length: ${len}`);
    }
    else {
        len = canvas.height / (bound.maxY - bound.minY);
        console.log(`Height length: ${len}`);
    }
    // resetMatrix();
    stroke(0, 100);

    // Get the coordinate of the origin point in relation to the left top point, and scale the coordinate according to
    // the new unit vector
    const totalX = bound.maxX - bound.minX;
    const totalY = bound.maxY - bound.minY;
    const centerX = canvas.width * (Math.abs(bound.minX) / totalX);
    const centerY = canvas.height * (Math.abs(bound.minY) / totalY);
    translate(centerX, centerY);

    console.log(`Total X: ${totalX}`);
    console.log(`Center X: ${centerX}`);
    console.log(`Total Y: ${totalY}`);
    console.log(`Center Y: ${centerY}`);

    // The canvas's coordinate system can be convert to the standard coordinate system by rotating 90 deg.
    for (let curr of ls.sentence){
        if (curr.match(/^[A-Z]$/)){ // Go forward
            line(0, 0, 0, len);
            translate(0, len);
        } else if (curr === "+"){   // Rotate right in standard coordinate system
            rotate(-angle);
        } else if (curr === "-"){   // Rotate left in standard coordinate system
            rotate(angle);
        } else if (curr === "["){
            push();
        } else if (curr === "]"){
            pop();
        }
    }
}

function scaleGraph(sentence){
    let bound = {minX: 0,
                minY: 0,
                maxX: 0,
                maxY:0
    };

    let turtle = {
        x: 0,
        y: 0,
        moveX: 0,
        moveY: 1
    };


    for (let c of sentence){
        if (c.match(/^[A-Z]$/)){
            turtle.x += turtle.moveX;
            turtle.y += turtle.moveY;
        }


    }
}

function setup() {
    let button = createButton("Generate");
    button.id("generateButton");
    button.parent("parameters");
    button.attribute("type", "button");
    ls = new Lsystem();

    // set the canvas' width and height equal to the canvas-container
    const canvasContainer = document.getElementById("canvas-container");
    const containerWidth = canvasContainer.offsetWidth;
    canvas.width =  containerWidth;
    canvas.height = containerWidth;

    const cnv = createCanvas(canvas.height, canvas.width);
    background(255);
    cnv.parent("canvas-container");

    button.mousePressed(e=>{
        ls.generate();

        axiom = ls.axiom;
        sentence = "";

        len = 1280;
        angle = radians(ls.angle);

        rules = ls.rules;
        turtle();
    });
}

function windowResized(){
    const canvasContainer = document.getElementById("canvas-container");
    const containerWidth = canvasContainer.offsetWidth;
    canvas.width =  containerWidth;
    canvas.height = containerWidth;
    resizeCanvas(canvas.width, canvas.height);
    turtle();
}

