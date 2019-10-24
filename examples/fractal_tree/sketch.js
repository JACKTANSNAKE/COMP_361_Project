// https://www.youtube.com/watch?v=E1B4UoSQMFw&t=605s

let axiom = "F";
let sentence = axiom;

let len = 100;
let angle;

rules = [];
rules.push( {
    a: "F",
    b: "FF+[+F-F-F]-[-F+F+F]"
});

rules.push({
    a: "B",
    b: "A"
});

function generate(){
    len *= .5;
    let nextSentence = "";
    for (let c of sentence){
        let found = false;
        for (let rule of rules){
            if (c === rule.a){
                found = true;
                nextSentence += rule.b;
                break;
            }
        }
        if (!found) {
            nextSentence += c;
        }
    }
    sentence = nextSentence;
    createP(sentence);
    turtle();
}

function turtle(){
    background(51);
    resetMatrix();
    stroke(255, 100);
    translate(width/2, height);

    for (let curr of sentence){
        if (curr === "F"){
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

function setup() {
  // put setup code here
    createCanvas(400, 400);
    angle = radians(25);
    background(51);
    createP(axiom);
    turtle();
    let button = createButton("generate");
    button.mousePressed(generate);
}

function draw() {
  // put drawing code here
}
