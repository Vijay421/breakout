class Powerup{

    constructor(x, y, tag, type, color){
        this.screen = document.getElementById("screen");

        this.ctx = this.screen.getContext("2d");

        this.width = 25;
        this.height = 25;
        this.color = color;
        this.speed = 0.4;
        this.tag = tag;
        this.type = type;

        this.x = x;
        this.y = y;

        this.draw();
    }

    update(){
        this.down(this.speed);

        if(this.y >= this.screen.height){
            removeGameObject(this);
        }
    }

    down(step = 1){
        this.y+= step;
        this.draw();
    }

    draw(){
        this.ctx.beginPath();
        this.ctx.rect(this.x , this.y, this.width, this.height);
        this.ctx.fillStyle = this.color;
        this.ctx.fill();
    }

    getX(){
        return this.x;
    }

    getY(){
        return this.y;
    }

}