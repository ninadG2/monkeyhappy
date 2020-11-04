var PLAY = 1;
var END = 0;
var gameState = PLAY;
var player,player_running;
var banana,bananaImage;
var jungle,jungleImage;
var obsatcle,obstacleImage;
var score = 0;
var invisGround;

function preload(){
 player_running = loadAnimation("Monkey_01.png","Monkey_02.png","Monkey_03.png","Monkey_04.png","Monkey_05.png","Monkey_06.png","Monkey_07.png","Monkey_08.png","Monkey_09.png","Monkey_10.png");
  
  bananaImage = loadImage("banana.png");
  jungleImage = loadImage("jungle.jpg");
  obstacleImage = loadImage("stone.png")
  
}



function setup() {
  createCanvas(windowWidth,      windowHeight);
  
  jungle =  createSprite(width/2,height/2,windowWidth,windowHeight)
  jungle.addImage(jungleImage);
   jungle.x = jungle.width/2;
   jungle.scale = 1.5
   jungle.velocityX = -10;
  
  
  player = createSprite(124,552,10,20);
  player.addAnimation("running",player_running);
  player.scale = 0.1;
 
  
  invisGround = createSprite(300,height-10,windowWidth,10);
  invisGround.visible = false; 

  bananaGroup = new Group();
  obstacleGroup = new Group();
  
  
}

function draw()
{
  
  background(220);
  
  
  console.log(mouseX);
  console.log(score);
  
  
  if(gameState === PLAY)
    {
       if (jungle.x < 0)
       {
        jungle.x = jungle.width/2;
       }
      if(player.isTouching(bananaGroup))
      {
         bananaGroup.destroyEach();
         score = score + 1;
        switch(score)
         {
        
          case 10:player.scale = 0.12;
               break;
          case 20:player.scale = 0.14;
               break;
          case 30:player.scale = 0.16;
               break;
          case 40:player.scale = 0.18;
               break;
               
          default :break;
         
        }
        
      } 
      if(obstacleGroup.isTouching(player))
        
       {
        gameState = END;
         
       }
      
      if(score === 0 && gameState === END)
        {
          gameState = END;
        }
      
    }else if(gameState === END)
      {
        obstacleGroup.destroyEach();
        bananaGroup.destroyEach();
        player.destroy();
        jungle.visible = false;
        background(0,0,0);
        player.scale = 0.1;
        score = score - 1;
        jungle.velocityX = 0;
        bananaGroup.destroyEach();
        textSize(30);
        fill("red");
        text("GAME OVER",200,height/2);
        score = 0;
      }
  
     
     
   
  
  
  if(keyDown("space") && player.y>= 320){
   player.velocityY = -12;
  }
  
 
  player.velocityY = player.velocityY + 0.7
  
  spawnBanana();
  spawnObstacle();
  
  player.collide(invisGround);
  
  console.log("width" + windowWidth)
  console.log("height" + windowHeight)
  
  drawSprites();
  
  stroke("white");
  fill(255,255,255);
  textSize(20);
  text("Score: "+ score,466,35);

}
function spawnBanana()
{
  if(frameCount%100 === 0)
  {
    var banana = createSprite(800,120,40,10);
    banana.y = Math.round(random(455,382))
    banana.addImage(bananaImage);
    banana.scale = 0.1;
    banana.velocityX = -3;
    banana.lifetime = windowWidth/-3;
    banana.depth = player.depth;
    player.depth = player.depth + 1;
    bananaGroup.add(banana);
  }
  
  
}

function spawnObstacle()
{
  if(frameCount%200 === 0)
    {
      var obstacle = createSprite(900,552,40,10)
      obstacle.x = Math.round(random(267,355))
      obstacle.addImage(obstacleImage);
      obstacle.velocityX = -(4 + score/100);
      obstacle.scale = 0.2;
      obstacle.lifetime = windowWidth/-4;
      obstacleGroup.add(obstacle);
    }
  
}


