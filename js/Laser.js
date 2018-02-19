class Laser{

    constructor(x, y, tag, color){
        this.screen = document.getElementById("screen");

        this.ctx = this.screen.getContext("2d");

        this.width = 10;
        this.height = 25;
        this.color = color;
        this.speed = 2.5;
        this.tag = tag;

        this.x = x;
        this.y = y;

        this.draw();
    }

    update(){
        this.up(this.speed);

        if(this.y <= 0){
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


//MODULDE **********************************************
 /*window.Laser = (function laser(){
    var Public = {};
    var self = {};

    Public.constructor = (function (x, y, tag, color) {
        self.width = 10;
        self.height = 25;
        self.color = color;
        self.speed = 5;
        self.tag = tag;

        self.x = x;
        self.y = y;

        self.gameScreen = window.gameScreen;
        self.ctx = window.ctx;
        console.log(self);
    })();

    _draw();

    Public.update =  function(){
        _up(self.speed);

        if(self.y >= self.screen.height){
            removeGameObject(self);
        }

        for(let i in globalObj){

            if(i.includes('block') && globalObj[i] !== null){
                if(_isCollide(globalObj[i], self)){

                    if(i.includes('block')){
                        globalObj[i].life-= 0.5;
                    }
                    removeGameObject(self);
                }
            }
        }
    }

    function _up(step = 1){
        self.y-= step;
        _draw();
    }

     function _draw(){
        self.ctx.beginPath();
        self.ctx.rect(this.x , this.y, this.width, this.height);
        self.ctx.fillStyle = this.color;
        self.ctx.fill();
    }

    function _isCollide(obj1, obj2) {
        return(
            obj1.getX() + obj1.width >= obj2.getX() && obj1.getX() <= obj2.getX()
            &&
            obj1.getY() + obj1.height >= obj2.getY() && obj1.getY() <= obj2.getY()
        );
    }

    Public.getX = function(){
        return self.x;
    }

    Public.getY = function(){
        return self.y;
    }

    Public.new = function () {
        return new laser;
    }

    return Public;
})()*/;
