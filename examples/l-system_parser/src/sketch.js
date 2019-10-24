// https://www.youtube.com/watch?v=E1B4UoSQMFw&t=605s

let ls;

let axiom = "";
let sentence = "";

let len = 100;
let angle = 0;

let rules = {};

// rules.push( {
//     a: "F",
//     b: "FF+[+F-F-F]-[-F+F+F]"
// });
//
// rules.push({
//     a: "B",
//     b: "A"
// });

// function generate(){
//     len *= .5;
//     let nextSentence = "";
//     for (let c of sentence){
//         let found = false;
//         for (let rule of rules){
//             if (c === rule[]){
//                 found = true;
//                 nextSentence += rule.b;
//                 break;
//             }
//         }
//         if (!found) {
//             nextSentence += c;
//         }
//     }
//     sentence = nextSentence;
//     createP(sentence);
//     turtle();
// }

function turtle(){
    background(51);
    resetMatrix();
    stroke(255, 100);
    translate(width/2, height/2);

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
    createCanvas(1080, 960);
    background(51);
    createP(axiom);


    let button = createButton("generate");
    button.id("generateButton");
    ls = new Lsystem();
    button.mousePressed(e=>{
        ls.generate();
        axiom = ls.axiom;
        sentence = "";

        len = 100;
        angle = radians(ls.angle);

        rules = ls.rules;
        turtle();
    });



}

function draw() {
  // put drawing code here
    // turtle();
}
