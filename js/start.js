var globalObj = [];

//voorbeeld module
var TestModule = (function Module(){
    var Public = {};
    var self = this;

    self.msg = 'private var';

    Public.test = function (){
        return self.msg;
    }

    Public.new = function () {
        return new Module;
    }

    return Public;
})();

console.log(TestModule.new());

window.onload = function() {
    start();

    window.gameScreen = document.getElementById("screen");
    window.ctx = window.gameScreen.getContext("2d");
};

function start() {
    let paddle = new Paddle('paddle');
    let ball = new Ball('ball');

    for(let i=0;i<3;i++){
        for(let y=0;y<6;y++){
            addGameObject(y * (100 + 10) + 25, (10 + 60) * i, 'block');
        }
    }

    globalObj[paddle.tag] = paddle;
    globalObj[ball.tag] = ball;

    console.log(globalObj['paddle']);
    console.log(globalObj['ball']);

    setInterval(function(){
        window.ctx.clearRect(0, 0, screen.width, screen.height);

        for(let i in globalObj){
            if(globalObj[i] !== null){
                globalObj[i].update();
            }
        }
    }, 0);
}

function removeGameObject(element) {
    for(let i in globalObj){

        if(i === element.tag){
            globalObj[i] = null;
        }
    }
}

function addGameObject(x = 0, y = 0, tag) {
    let count = 0;
    for(let i in globalObj){
        if(i.includes(tag+count)){
            count++;
        }
    }
    switch(tag){
        case 'powerup:grow':
            globalObj[tag+count] = new Powerup(x, y, tag+count, 'grow', 'purple');
            break;

        case 'powerup:laser':
            globalObj[tag+count] = new Powerup(x, y, tag+count, 'laser', 'grey');
            break;

        case 'ball':
            globalObj[tag+count] = new Ball(tag+count);
            break;

        case 'block':
            globalObj[tag+count] = new Block(x, y, tag+count);
            break;

        case 'paddle':
            globalObj[tag+count] = new Paddle(tag);
            break;

        case 'laser':
            globalObj[tag+count] = new Laser(x, y, tag+count,'#34ff07');
            //globalObj[tag+count] = window.Laser.new().constructor(x, y, 'laser'+count,'#34ff07');
            break;

        case 'ball':
            globalObj[tag+count] = new Ball(tag+count);
            break;

        default:
            console.log('game object: ' + tag + ' doesn\'t exist');
            break;
    }
}

function getGame() {
    console.log(globalObj);
}

function filterNull(item) {
    return item !== null;
}