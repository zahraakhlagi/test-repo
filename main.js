class Player{
    constructor(name,level){
        this.name= name;
        this.level= level;
    }

   /* levelUp(){
        this.level+=1;
        console.log("you leveled up, you are now level"+ this.level);
    }*/
    
    


}





function levelUp(player){
    player.level+=1;
    console.log("you leveled up, you are now level"+ player.level);

}
//vi kör en array
let players=[];
for(let i= 0; i< 10; i++){
    players.push(new Player("zahra", 4));

}

for(let i=0; i<3; i++){
    let player= players[i];
    player.levelUp();
}
leverUp(players[7]);

players[2]= players[9];
levelUp(players[2]);




player.levelUp();
player.levelUp();
player.levelUp();
player.levelUp();

levelUp(player);