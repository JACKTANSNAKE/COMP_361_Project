// https://www.youtube.com/watch?v=E1B4UoSQMFw&t=605s

class Turtle{
    constructor(angle, len){
        this.angle = angle;
        this.len = len;
    }

    move(char){
        if (char === "F"){  // draw forward
            line(0, 0, 0, this.len);
            translate(0, this.len);
        } else if (char === "+"){   // turn left
            rotate(this.angle);
        } else if (char === "-"){
            rotate(-this.angle);
        } else if (char === "["){
            push();
        } else if (char === "]"){
            pop();
        }
    }
}

let len = 20;
let angle = 90;
function move(char) {
    // if (char === "F"){  // draw forward
    //     line(0, 0, 0, len);
    //     translate(0, len);
    // } else if (char === "+"){   // turn left
    //     rotate(angle);
    // } else if (char === "-"){
    //     rotate(-angle);
    // } else if (char === "["){
    //     push();
    // } else if (char === "]"){
    //     pop();
    // }

    let currentangle = 0;

    if (char==='F') { // draw forward
        // polar to cartesian based on step and currentangle:
        let x1 = x + len*cos(radians(currentangle));
        let y1 = y + len*sin(radians(currentangle));
        line(x, y, x1, y1); // connect the old and the new

        // update the turtle's position:
        x = x1;
        y = y1;
    } else if (char === '+') {
        currentangle += angle; // turn left
    } else if (char === '-') {
        currentangle -= angle; // turn right
    }

    // give me some random color values:
    let r = random(128, 255);
    let g = random(0, 192);
    let b = random(0, 50);
    let a = random(50, 100);

    // pick a gaussian (D&D) distribution for the radius:
    let radius = 0;
    radius += random(0, 15);
    radius += random(0, 15);
    radius += random(0, 15);
    radius = radius / 3;

    // draw the stuff:
    fill(r, g, b, a);
    ellipse(x, y, radius, radius);
}

class Lsystem{
    constructor(axiom, rules){
        this.axiom = axiom;
        this.rules = rules;
    }

    getNextSentence(currSentence){
        let nextSentence = "";
        for (let char of currSentence){ // Loop through each char in the currSentence
            let rule = this.rules[char];
            if (typeof rule === "undefined"){   // The char does not have a rule
                nextSentence += char;   // Do not change the char
            } else {
                nextSentence += rule;   // Replace the char with the derivation
            }
        }
        console.log(`Next sentence: "${nextSentence}"`);
        return nextSentence;
    }

    getSentence(iters){
        let sentence = axiom;
        for (let i = 0; i < iters; i++){
            sentence = this.getNextSentence(sentence);
        }
        return sentence;
    }
}

let axiom = "A";
let currSentence = axiom;
let turtle;
const lsystem = new Lsystem("A",
    {
        "A": "-BF+AFA+FB-",
        "B": "+AF-BFB-FA+"
    }
);
let x, y;

function setup() {
  // put setup code here
    createCanvas(710, 400);
    stroke(0, 0, 0, 255);
    background(225);

    currSentence = lsystem.getSentence(5);
    angle = radians(90);
    x = 0;
    y = height-1;
}

let i = 0;

function draw() {
  // put drawing code here

    for (let char of currSentence){
        move(char);
    }
    // increment the point for where we're reading the string.
    // wrap around at the end.
}
