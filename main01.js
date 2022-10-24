let canvas= document.getElementById('canvas');
let context= canvas.getContext('2d');

const width= canvas.width;
const height= canvas.height;
const halfWidth= width/2;
const halfHeight= height/2;

class Position{
    constructor(x,y){
        this.x=x;
        this.y=y;
    }
}
class Keys{
    constructor(){
        this.up= false;
        this.down=false;
        this.right= false;
        this.left= false;

    }
}
//hur mycket position ska ändras
class Velocity{
    constructor(dx,dy){
        this.dx= dx;
        this.dy=dy;
    }
}

class Player{
    constructor(){
    this.position= new Position(halfWidth,halfHeight);
    this.speed= 5;
    this.radius=30;
    this.color= 'green';
    this.keys= new Keys();
   

}

}


class Enemy{

    constructor(position, velocity){
        this.position= position;
        this.velocity= velocity;
        this.color= 'red';
        this.radius= 10;
    }

}
let player= new Player();
let enemies= [
    new Enemy(new Position(10,10), new Velocity(1,1)),
    new Enemy(new Position(80,80), new Velocity(2,2)),
    new Enemy(new Position(120,120), new Velocity(-3,1)),
    new Enemy(new Position(300,400), new Velocity(-3,-1))
];


function handleKeyDown(event){
    if(event.repeat) return;
   
    if(event.key==='w'){
        player.keys.up= true;

    }else if(event.key==='a'){
        player.keys.left= true;

    }else if(event.key==='s'){
        player.keys.down= true;

    }else if(event.key==='d'){
        player.keys.right= true;

    }
    

}
function handleKeyUp(event){
    
    if(event.key==='w'){
        player.keys.up= false;

    }else if(event.key==='a'){
        player.keys.left= false;

    }else if(event.key==='s'){
        player.keys.down= false;

    }else if(event.key==='d'){
        player.keys.right= false;

    }
    
}


window.addEventListener('keypress',handleKeyDown);
window.addEventListener('keyup', handleKeyUp);





function drawCircle(entity){
    context.beginPath();
    context.fillStyle= entity.color;
    context.arc(entity.position.x, entity.position.y,entity.radius, 0,Math.PI*2);
    context.fill();
}


function handelPlayerMovement(player){
    if(player.keys.up && player.position.y> player.radius){
        player.position.y -= player.speed; 
    }
    else if(player.keys.down && player.position.y < height -  player.radius){
        player.position.y += player.speed; 
    }
    else if(player.keys.left && player.position.x> player.radius){
        player.position.x -= player.speed; 
    }
    else if(player.keys.right && player.position.x < width - player.radius){
        player.position.x += player.speed; 
    }


}
function handleEnemyMovement(enemy){
    enemy.position.y += enemy.velocity.dy;
    enemy.position.x += enemy.velocity.dx;

}
 function isCircleOutside(entity){
    
 }


//game loop

function tick(){
    context.fillStyle= 'rgb(255,255,255)';
    context.fillRect(0,0,width,height);
    drawCircle(player);
    handelPlayerMovement(player);
    for(let i=0;i < enemies.length;i++){
       let  enemy = enemies[i];
       drawCircle(enemy);
       handleEnemyMovement(enemy);

    }
 
//uppdatera gamen
    requestAnimationFrame(tick);

}
tick();