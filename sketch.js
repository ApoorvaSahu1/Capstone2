var Play=1;
var End=0;
var gameState=Play;

var groundImage,ground,controlI,control;
var border1,border2,invisibleBorder;
var carI,car1I,car2I,car3I,car4I,car5I;
var car,enemyCars;
var enemyGroup;
var score=0;
var gameOver, restart;


function preload()
{
  groundImage=loadImage("Road/mainroad.png")
  carI=loadImage("MainCar/download__10_-removebg-preview.png");
  car1I=loadImage("enemycars/download (1).png");
  car2I=loadImage("enemycars/download (2).png");
  car3I=loadImage("enemycars/download (3).png");
  car4I=loadImage("enemycars/download (4).png");
  car5I=loadImage("enemycars/download (5).png");
  controlI=loadImage("controls-removebg-preview.png")
  gameOverImg = loadImage("Gameover/gameOver.png");
  restartImg = loadImage("restart.png");
  
  enemyGroup=new Group();
}

function setup()
{
 createCanvas(600,600);
  ground=createSprite(400,380);
  ground.addImage(groundImage);
  ground.scale=1.5;
  
  border1=createSprite(200,300,10,600);
  
  border2=createSprite(600,300,10,600);
  
  invisibleBorder=createSprite(400,600,410,10);
  invisibleBorder.visible=false;
  
  control=createSprite(100,150,30,30);
  control.addImage(controlI);
  
  gameOver = createSprite(400,300);
  gameOver.addImage(gameOverImg);
  
  restart = createSprite(350,350);
  restart.addImage(restartImg);
  
  gameOver.scale = 0.5;
  restart.scale = 0.5;

  gameOver.visible = false;
  restart.visible = false;
  
  car=createSprite(380,530,10,10);
  car.addImage(carI);
  car.scale=0.5;
  
  car.setCollider("rectangle",0,0,100,230);
  car.debug = false;
  
}

function draw()
{
  background("skyblue");
  textSize(20);
  fill("black");
  text("Score: "+ score, 50,50);
  text("TIPS: ",10,270);
  textSize(15);
  text("1.Dont crash with any car.",5,300)
  text("2.Dont crash with Color",5,330);
  text("   Changing Wall.",5,350)
  
  noFill();
   if (gameState===Play)
   {
     score = score + Math.round(getFrameRate()/60);
      ground.velocityY = 4;
      if(ground.y > 1200)
      {
        ground.y = 0;
      }
      if(enemyGroup.isTouching(car))
      {
          gameState=End;
      }
        car.bounceOff(invisibleBorder);
        car.bounceOff(border1);
        car.bounceOff(border2);
       Movements();
       Enemy();
       groundColor()
     
   }
    else if(gameState===End)
    {
      gameOver.visible = true;
      restart.visible = true;
      ground.velocityY = 0; 
      enemyGroup.velocityY=0;
      enemyGroup.destroyEach();
      enemyGroup.lifetime=0;
      car.velocityY=0;
      car.velocityX=0;
  
      if(mousePressedOver(restart)) 
      {
        reset();
      }
      
    }

  
  

 
   drawSprites();
  
}
function Movements()
{
     if (keyDown(UP_ARROW)) 
   {
    car.velocityX=0;
    car.velocityY=-6;
   }
   if (keyDown(DOWN_ARROW)) 
   {
    car.velocityX=0;
    car.velocityY=6;
   }
  if (keyDown(LEFT_ARROW)) 
   {
    car.velocityX=-6;
    car.velocityY=0;
   }
   if (keyDown(RIGHT_ARROW)) 
   {
    car.velocityX=6;
    car.velocityY=0;
   }
   if (keyWentUp(UP_ARROW))
   {
    car.velocityX=0;
    car.velocityY=0;
   }
   if (keyWentUp(DOWN_ARROW)) 
   {
    car.velocityX=0;
    car.velocityY=0;
   }
   if (keyWentUp(LEFT_ARROW)) 
   {
    car.velocityX=0;
    car.velocityY=0;
   }
   if (keyWentUp(RIGHT_ARROW)) 
   {
    car.velocityX=0;
    car.velocityY=0;
   }
}
function Enemy()
{
 if (frameCount % 60 === 0)
 {
  enemyCars=createSprite(400,20,20,20);
  enemyCars.x=Math.round(random(220,550));
  enemyCars.velocityY=(4 + 2*score/200);
  enemyCars.scale=0.5;
  var rand = Math.round(random(1,5));
  switch(rand)
    {
      case 1:enemyCars.addImage(car1I);
      break;
      case 2:enemyCars.addImage(car2I);
      break;
      case 3:enemyCars.addImage(car3I);
      break;
      case 4:enemyCars.addImage(car4I);
      break;
      case 5:enemyCars.addImage(car5I);
      break;
      default :
      break;
    }
   enemyGroup.add(enemyCars);
   enemyCars.lifetime=300;
 }
}
function reset(){
  gameState = Play;
  gameOver.visible = false;
  restart.visible = false;
  
  enemyGroup.destroyEach();
  score = 0;
}

function groundColor()
{
 
 if (frameCount % 100 === 0)
 {  
    var rand = Math.round(random(1,6));
    switch(rand)
    {
    case 1: border1.shapeColor="red";
    break;
    case 2: border1.shapeColor="blue";
    break;
    case 3: border1.shapeColor="orange";
    break;
    case 4: border1.shapeColor="green";
    break;
    case 5: border1.shapeColor="yellow";
    break;
    case 6: border1.shapeColor="pink";
    break;
    default : 
    break;
    }
       switch(rand)
    {
    case 1: border2.shapeColor="red";
    break;
    case 2: border2.shapeColor="blue";
    break;
    case 3: border2.shapeColor="orange";
    break;
    case 4: border2.shapeColor="green";
    break;
    case 5: border2.shapeColor="yellow";
    break;
    case 6: border2.shapeColor="pink";
    break;
    default : 
    break;
    }
 }     
}