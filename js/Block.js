class Block{

    constructor(x , y ,tag){
        this.screen = document.getElementById("screen");

        this.ctx = this.screen.getContext("2d");

        this.width = 100;
        this.height = 50;
        this.color = 'blue';
        this.life = 1;
        this.tag = tag;

        this.x = x;
        this.y = y;

        this.ctx.beginPath();
        this.ctx.rect(this.x , this.y, this.width, this.height);
        this.ctx.fillStyle = this.color;
        this.ctx.fill();
    }

    update(){
        this.idle();

        if(this.life <= 0){

            let rand = Math.random();
            if(rand * 10 > 5){
                if(Math.random() * 10 > 5){
                    addGameObject(this.getX() + (this.width / 2), this.getY() + (this.height / 2), 'powerup:laser');
                }else{
                    addGameObject(this.getX() + (this.width / 2), this.getY() + (this.height / 2), 'powerup:grow');
                }
            }
            removeGameObject(this);
        }
    }

    idle(){
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