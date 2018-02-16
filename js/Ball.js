class Ball{

    constructor(tag){
        this.screen = document.getElementById("screen");

        this.ctx = this.screen.getContext("2d");

        this.raduis = 10;
        this.color = 'orange';
        this.speed = 2;
        this.direction = 'down';
        this.turnX = 0;
        this.turnY = -3;
        this.tag = tag;

        this.x = this.screen.width / 2 - (this.raduis / 2);
        this.y = 225;

        this.ctx.beginPath();
        this.ctx.arc(this.x , this.y, this.raduis,0,2*Math.PI);
        this.ctx.fillStyle = this.color;
        this.ctx.fill();

    }

    update(){
        this.move(this.speed, this.direction);

        if(this.y <= 0){
            this.direction = 'down';
        }

        if(this.y >= this.screen.height){
            this.direction = 'up';
        }

        if(this.x <= 0){
            this.turnX+= 1;
        }

        if(this.x >= this.screen.width){
            this.turnX-= 1;
        }

        for(let i in globalObj){

            if(i === 'paddle' || i.includes('block') && globalObj[i] !== null){
                if(this.isCollide(globalObj[i], this)){
                    let newDirection = (this.direction === 'down')? 'up':'down';
                    this.direction = newDirection;

                    let turnAmount = this.turnOnCollide(globalObj[i], this);
                    this.turnX = (turnAmount / 100) * 2.3;
                    this.turnY = (this.turnY < 0)? -3:3 ;

                    if(i.includes('block')){
                        globalObj[i].life--;
                    }
                }
            }
        }
    }

    isCollide(obj1, obj2) {
        return(
            obj1.getX() + obj1.width >= obj2.getX() && obj1.getX() <= obj2.getX()
            &&
            obj1.getY() + obj1.height >= obj2.getY() && obj1.getY() <= obj2.getY()
        );
    }

    turnOnCollide(obj1,obj2){
        let obj1Collide = obj1.getX() + obj1.width;
        let obj2Collide= obj2.getX() + obj2.raduis;

        let answer = (obj1.width / 2) - (obj1Collide - obj2Collide);

        if(answer <= 20 && answer >= -20){
            return 0;
        }else{
            return answer;
        }
    }

    getX(){
        return this.x;
    }

    getY(){
        return this.y;
    }

    move(step = 1, direction){
        if(direction === 'down'){
            this.y+= step;
        }else if(direction === 'up'){
            this.y-= step;
        }
        this.x+= this.turnX;

        this.ctx.beginPath();
        this.ctx.arc(this.x, this.y, this.raduis,0,2*Math.PI);
        this.ctx.fillStyle = this.color;
        this.ctx.fill();
    }
}