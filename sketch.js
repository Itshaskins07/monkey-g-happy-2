var bananaImage,obstacleimg,obstacleGroup,score,backImage,invisibleground,play,end,gameState,monkeydead;



function preload(){
backImage=loadImage("jungle.png");
player_running=loadAnimation("Monkey_01.png","Monkey_02.png","Monkey_03.png","Monkey_04.png","Monkey_05.png","Monkey_06.png","Monkey_08.png","Monkey_09.png","Monkey_10.png");
bananaImage=loadImage("banana.png");
obstacleimg=loadImage("stone.png"); 
monkeydead=loadAnimation("Monkey_08.png");  
}


function setup() {
  createCanvas(600,300);
backgroundI=createSprite(600,300,20,20);
backgroundI.addImage("backgroundimg",backImage);  
backgroundI.scale=3;  
 
 invisibleground = createSprite(300,300,600,20);  
 invisibleground.visible=false; 
  
score=0;  
  
play=1;
end=0;
  
gameState=play;

  
bananaGroup=new Group(); 
obstacleGroup=new Group();  
monkey=createSprite(50,180,20,20);
monkey.addAnimation("running",player_running);
monkey.addAnimation("monkeydead",monkeydead);  
monkey.scale=0.1;  
}


function draw(){
 background(0);
 
if(gameState==play){  
  
if(keyDown("space")){
monkey.velocityY=-10;  
}  
  
monkey.velocityY=monkey.velocityY+0.8;  
  
  
if(bananaGroup.isTouching(monkey)){  
score=score+2;
bananaGroup.destroyEach();  
}  

monkey.collide(invisibleground);
  
  
switch(score){  
  case 10:monkey.scale=0.12;
    break;
    
  case 20:monkey.scale=0.14;  
    break;
    
  case 30:monkey.scale=0.16;  
    break;
    
  case 40:monkey.scale=0.18;  
    break;
    
    default: break; 
}  
 
 
  
backgroundI.velocityX=-3;
  
if(backgroundI.x<0){
backgroundI.x=backgroundI.width/2;
}
  
spawnFood();
spawnObstacles();
if(monkey.isTouching(obstacleGroup)){
monkey.changeAnimation("monkeydead",monkeydead);  
gameState=end;
  
}
  
}  
  
else if(gameState==end){  
monkey.velocityY=0;
backgroundI.velocityX=0;
obstacleGroup.setVelocityXEach(0);  
bananaGroup.setVelocityXEach(0);  
obstacleGroup.setLifetimeEach(-1);  
bananaGroup.setLifetimeEach(-1);  
  
}  
drawSprites();
stroke=("white");
textSize=20;
fill=("white");
text("Score:"+ score, 500,50);  
}

function spawnFood(){
if(frameCount% 60==0){
var banana = createSprite(600,290);
banana.addImage("food",bananaImage);  
banana.y=Math.round(random(20,120));
banana.scale=0.08;  
banana.velocityX=-2;
banana.lifetime=300;  
bananaGroup.add(banana);
}
  
}


function spawnObstacles(){
if(frameCount% 300==0){
var obstacles=createSprite(600,275);
obstacles.addImage("stone",obstacleimg);
obstacles.velocityX=-2;
obstacles.scale=0.1;  
obstacles.lifetime=300;
obstacleGroup.add(obstacles);
  
  
  
}
  
}  