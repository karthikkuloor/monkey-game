//Global Variables
var monkey,monkeyimg,ground,bananagroup,bananaimg,jungle,jungleimg,obstaclegroup,obstacle,obstacleimg,gameover,gameoverimg,restart,restartimg;
var score;
var PLAY=1;
var END=0;
var gamestate=0;
function preload(){

  monkeyimg= loadImage("Monkey_01.png","Monkey_02.png","Monkey_03.png","Monkey_04.png","Monkey_05.png","Monkey_06.png","Monkey_07.png","Monkey_08.png","Monkey_09.png","Monkey_10.png");
  bananaimg=loadImage("Banana.png");
  jungleimg=loadImage("jungle.jpg");
 obstacleimg=loadImage("stone.png") ;
  gameoverimg=loadImage("gameOver.png");
  restartimg=loadImage("restart.png");
}


function setup() {
  createCanvas(500,300);
  
  
  jungle=createSprite(700  ,300);
  jungle.addImage("r",jungleimg);
  jungle.x=jungle.width/2;
  jungle.velocityX=-3;
  monkey=createSprite(80,230,10,80);
  monkey.addAnimation("kar",monkeyimg);
  monkey.scale=0.2;
  ground=createSprite(10,290,1200,10)
  bananagroup=new Group();
  textSize(20);
  score=0;
  obstaclegroup=new Group();
  gameover=createSprite(300,10,10,80);
  gameover.addImage("g",gameoverimg);
  restart=createSprite(300,150,10,80);
  restart.addImage("o",restartimg)
}


function draw(){
 background(255);
  
    if(gamestate===PLAY){
       if(jungle.x<0){
    jungle.x=jungle.width/2;
    }
  spawnbanana();
  spawnobstacles();
     if(monkey.isTouching(bananagroup)){
      score=score+2
     bananagroup.destroyEach();
    
     }
      gameover.visible=false;
      restart.visible=false;
    switch(score){
    case 10: monkey.scale=0.12;
      break;
      case 20: monkey.scale=0.14;
      break;
      case 30: monkey.scale=0.16;
      break;
      case 40: monkey.scale=0.18;
      break;
      default: break;
      
    }
  
  
   
  monkey.collide(ground);
  ground.visible=false;
      if(keyDown("space")&& monkey.y>=220){
     monkey.velocityY=-15
     }
  monkey.velocityY=monkey.velocityY+0.8;
 if(obstaclegroup.isTouching(monkey)){
  gamestate=END;
   }
       }
  else if(gamestate===END){
    gameover.visible=true;
    restart.visible=true;
    ground.velocityX=0;
    monkey.velocityY=0;
    obstaclegroup.setVelocityEach(0);
    bananagroup.setVelocityEach(0);
    obstaclegroup.setLifetimeEach(-1);
    bananagroup.setVelocityEach(-1);
    if(mousePressedOver(restart)){
      reset();
       }
          }
  
     
  
  drawSprites();
 text("score: " + score,300,50);

}

function spawnbanana(){
  if(frameCount%150===0){
     banana=createSprite(600,150,10,80)
    banana.addImage("karthik",bananaimg);
    banana.scale=0.1;
    banana.velocityX=-4;
    banana.y=Math.round(random(70,150))
    bananagroup.add(banana);
     }
}
function spawnobstacles(){
  if(frameCount%250===0){
     obstacle=createSprite(500,295,10,80)
    obstacle.addImage("p",obstacleimg);
    obstacle.velocityX=-4;
    obstacle.scale=0.2;
    obstaclegroup.add(obstacle);
     }
}
function reset(){
  gamestate=PLAY;
  gameover.visible=false;
  restart.visible=false;
   obstaclegroup.destroyEach();
    bananagroup.destroyEach();
  score=0;
}