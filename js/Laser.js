class Laser{

    constructor(x, y, tag, color){
        this.screen = document.getElementById("screen");

        this.ctx = this.screen.getContext("2d");

        this.width = 10;
        this.height = 25;
        this.color = color;
        this.speed = 5;
        this.tag = tag;

        this.x = x;
        this.y = y;

        this.ctx.beginPath();
        this.ctx.rect(this.x , this.y, this.width, this.height);
        this.ctx.fillStyle = this.color;
        this.ctx.fill();
    }

    update(){
        this.up(this.speed);

        if(this.y >= this.screen.height){
            removeGameObject(this);
        }

        for(let i in globalObj){

            if(i.includes('block') && globalObj[i] !== null){
                if(this.isCollide(globalObj[i], this)){

                    if(i.includes('block')){
                        globalObj[i].life-= 0.5;
                    }
                    removeGameObject(this);
                }
            }
        }
    }

    up(step = 1){
        this.y-= step;

        this.ctx.beginPath();
        this.ctx.rect(this.x , this.y, this.width, this.height);
        this.ctx.fillStyle = this.color;
        this.ctx.fill();
    }

    isCollide(obj1, obj2) {
        return(
            obj1.getX() + obj1.width >= obj2.getX() && obj1.getX() <= obj2.getX()
            &&
            obj1.getY() + obj1.height >= obj2.getY() && obj1.getY() <= obj2.getY()
        );
    }

    getX(){
        return this.x;
    }

    getY(){
        return this.y;
    }
}