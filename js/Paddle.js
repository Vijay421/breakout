class Paddle{

    constructor(tag){
        this.screen = document.getElementById("screen");

        this.ctx = this.screen.getContext("2d");

        this.width = 150;
        this.height = 25;
        this.color = 'red';
        this.speed = 1.5;
        this.tag = tag;

        this.growTimerr = 0;
        this.laserTimer = 0;
        this.shootTimer = 0;
        this.isLaser = false ;

        this.x = this.screen.width / 2 - (this.width / 2);
        this.y = (this.screen.height - this.height) + -50;

        this.keys = [];
        this.keys['a'] = false;
        this.keys['d'] = false;
        this.keys['spacebar'] = false;

        document.addEventListener('keydown', (event) => {
             this.setKey(event, true);
        });

        document.addEventListener('keyup', (event) => {
            this.setKey(event, false);
        });

        this.draw();
    }

    setKey(event, bool){
        for(let key in this.keys){
            if(key === event.key){

                this.keys[key] = bool;
            }else if(event.which === 32){

                this.keys['spacebar'] = bool;
            }
        }
    }

    update(){
        switch(true){
            case this.keys['d']:
                this.move(this.speed, 'right');
                break;

            case this.keys['a']:
                this.move(this.speed, 'left');
                break;

            default:
                this.draw();
                break;
        }

        for(let i in globalObj){

            if(i.includes('powerup') && globalObj[i] !== null){

                if(this.isCollide(this, globalObj[i])){

                    if(globalObj[i].type === 'grow'){
                        if(this.width === 150){
                            this.grow()
                        }else{
                            this.growTimerr = 0;
                        }
                    }

                    if(globalObj[i].type === 'laser'){
                        if(this.isLaser){
                            this.laserTimer = 0;
                        }
                        this.isLaser = true;
                    }
                    removeGameObject(globalObj[i]);
                }
            }
        }

        if(this.width === 200){
            this.growTimerr++;
            if(this.growTimerr === 1500){
                this.shrink()
                this.growTimerr = 0;
                this.isLaser = false;
            }
        }

        if(this.isLaser){
            this.laserTimer++;

            if(this.keys['spacebar']){
                if(this.shootTimer >= 30){
                    if(this.width >= 200){
                        addGameObject(this.x , this.y, 'laser');
                        addGameObject(this.x + (this.width - 10), this.y, 'laser');
                        addGameObject(this.x + ((this.width / 2) - 5), this.y, 'laser')
                    }else{
                        addGameObject(this.x + (this.width / 2) - 5, this.y, 'laser');
                    }
                    this.shootTimer = 0;
                }
                this.shootTimer++;
            }

            if(this.laserTimer >= 2000){
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
        this.draw();
    }

    draw(){
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