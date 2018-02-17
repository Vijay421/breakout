var screen;
var ctx;
var globalObj = [];

window.onload = function() {
    start();

    screen = document.getElementById("screen");
    ctx = this.screen.getContext("2d");


    //voorbeeld module
    var TestModule = (function(){
        let Public = {};

        Public.test = function (){
            return 'test';
        }

        return Public;
    })();

    console.log(TestModule);
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
        ctx.clearRect(0, 0, screen.width, screen.height);

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
            globalObj[tag+count] = new Laser(x, y, 'laser'+count,'#34ff07');
            break;

        default:
            console.log('game object: ' + i + ' doesn\'t exist');
            break;
    }
}