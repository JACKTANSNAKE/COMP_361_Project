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
    const bound = getBound(ls.sentence);

    let len = 0;    // Set up the length of each stroke
    if (bound.maxX - bound.minX >= bound.maxY - bound.minY){
        // Scale the unit scalar to put the boundary inside the canvas
        // Set the length according to the unit scalar
        len = canvas.width / (bound.maxX - bound.minX) / Math.cos(ls.angle);
    }
    else {
        len = canvas.height / (bound.maxY - bound.minY) / Math.cos(ls.angle);
    }

    background(51);
    // resetMatrix();
    stroke(255, 100);

    // Get the coordinate of the origin point in relation to the left top point, and scale the coordinate according to
    // the new unit vector
    const centerX = canvas.width * (Math.abs(bound.minX) / (Math.abs(bound.maxX) + Math.abs(bound.minX)));
    const centerY = canvas.height * (Math.abs(bound.maxY) / (Math.abs(bound.maxY) + Math.abs(bound.minY)));
    translate(centerX, centerY);

    // translate(0, height/2);
    for (let curr of ls.sentence){
        if (curr.match(/^[A-Z]$/)){
            line(0, 0, 0, -len);
            translate(0, -len);
        } else if (curr === "+"){
            rotate(angle);
        } else if (curr === "-"){
            rotate(-angle);
        } else if (curr === "["){
            push();
        } else if (curr === "]"){
            pop();
        }
    }
}

// function scaleGraph(sentence){
//     minX = 0;
//     maxX = 0;
//     minY = 0;
//     maxY = 0;
//     for (let curr of sentence){
//         if (curr.match(/^[A-Z]$/)){
//             line(0, 0, 0, 1);
//             translate(0, 1);
//             if turtle()
//         } else if (curr === "+"){
//             rotate(radians(90));
//         } else if (curr === "-"){
//             rotate(radians(-90));
//         } else if (curr === "["){
//             push();
//         } else if (curr === "]"){
//             pop();
//         }
//     }
//
// }
//
//
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
  // put setup code here

    // createP(axiom);


    let button = createButton("generate");
    button.id("generateButton");
    ls = new Lsystem();

    createCanvas(2560, 2560);
    background(51);

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

