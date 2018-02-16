class Paddle{

    constructor(tag){
        this.screen = document.getElementById("screen");

        this.ctx = this.screen.getContext("2d");

        this.width = 150;
        this.height = 25;
        this.color = 'red';
        this.speed = 5;
        this.tag = tag;
        this.growTimerr = 0;
        this.laserTimer = 0;
        this.isLaser = false ;

        this.x = this.screen.width / 2 - (this.width / 2);
        this.y = (this.screen.height - this.height) + -50;

        this.ctx.beginPath();
        this.ctx.rect(this.x , this.y, this.width, this.height);
        this.ctx.fillStyle = this.color;
        this.ctx.fill();

        this.keyName = 'empty';

        document.addEventListener('keydown', (event) => {
             this.keyName = event.key;

             if(event.which === 32){
                 this.keyName = '';
             }

             console.log('key: ' + this.keyName);
        });

        document.addEventListener('keyup', (event) => {
            this.keyName = 'emtpy';
        });

    }

    update(){
        switch (this.keyName){
            case 'd':
                this.move(this.speed, 'right');
                break;
            case 'a':
                this.move(this.speed, 'left');
                break;

            default:
                this.idle();
                break;
        }

        for(let i in globalObj){

            if(i.includes('powerup') && globalObj[i] !== null){

                if(this.isCollide(this, globalObj[i])){

                    if(globalObj[i].type === 'grow'){
                        console.log('delete: ' + i);

                        if(this.width === 150){
                            this.grow()
                        }else{
                            this.growTimerr = 0;
                        }
                    }

                    if(globalObj[i].type === 'laser'){
                        this.isLaser = true;
                    }
                    console.log('hit: ' + i);
                    removeGameObject(globalObj[i]);
                }
            }
        }

        if(this.width === 200){
            this.growTimerr++;
            if(this.growTimerr === 500){
                this.shrink()
                this.growTimerr = 0;
            }
        }

        if(this.isLaser){
            this.laserTimer++;

            if(this.keyName === 'spacebar'){
                console.log('schiet');
            }

            if(this.laserTimer === 500){
                this.isLaser = false;
                this.laserTimer = 0;
            }
        }
    }

    grow(){
        this.width = 200;
    }

    shrink(){
        this.width = 150;
    }

    move(speed  = 1, side){
        this.x = (side === 'right') ? this.x+= speed : this.x-= speed;

        this.ctx.beginPath();
        this.ctx.rect(this.x , this.y, this.width, this.height);
        this.ctx.fillStyle = this.color;
        this.ctx.fill();
    }

    idle(){
        this.ctx.beginPath();
        this.ctx.rect(this.x , this.y, this.width, this.height);
        this.ctx.fillStyle = this.color;
        this.ctx.fill();
    }

    /*isCollide(obj1, obj2) {
        return(
            obj1.getX() + obj1.width >= obj2.getX()) && (obj1.getX() <= obj2.getX()
            &&
            obj1.getY() + (obj1.height * -1 + obj1.height) <= obj2.getY() && obj1.getY() + (obj1.height * -1 + obj1.height) <= obj2.getY()
        );
    }*/

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