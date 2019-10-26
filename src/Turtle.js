class Turtle{
    constructor(){
        this.x = 0;
        this.y = 0;
        this.moveX = 0;
        this.moveY = 1;
        this.stack = [];
    }

    forward(){
        this.x += this.moveX;
        this.y += this.moveY;
    }

    right(angle){
        let moveX = this.moveX;
        let moveY = this.moveY;
        this.moveX = Math.cos(angle) * moveX - Math.sin(angle) * moveY;
        this.moveY = Math.sin(angle) * moveX + Math.cos(angle) * moveY;
    }

    left(angle){
        let moveX = this.moveX;
        let moveY = this.moveY;
        this.moveX = Math.cos(angle) * moveX + Math.sin(angle) * moveY;
        this.moveY = -Math.sin(angle) * moveX + Math.cos(angle) * moveY;
    }

    push(){
        this.stack.push({   // TODO: handle the case when the number of [ and ] is unequal
            x: this.x,
            y: this.y
        })
    }

    pop(){
        let coord = this.stack.pop();
        this.x = coord.x;
        this.y = coord.y;
    }

    getX(){
        return this.x;
    }

    getY(){
        return this.y;
    }
}



 function getBound(sentence){
     const tt = new Turtle();
     let bound = {
         minX: 0,
         minY: 0,
         maxX: 0,
         maxY: 0
     };
     for (let c of sentence){
         if (c.match(/^[A-Z]$/)){   // move forward if c is a letter
             tt.forward();
             if (tt.x < bound.minX){
                 bound.minX = tt.x;
             } else if (tt.x > bound.maxX){
                 bound.maxX = tt.x;
             }
             if (tt.y < bound.minY){
                 bound.minY = tt.y;
             } else if(tt.y > bound.maxY) {
                 bound.maxY = tt.y;
             }
         } else if (c === "+"){
             tt.right(radians(ls.angle));
         } else if (c === "-"){
             tt.left(radians(ls.angle));
         } else if (c === "["){
             tt.push();
         } else if (c === "]"){
             tt.pop();
         }
     }

     return bound;
 }

 function transformBound(bound, angle){

 }