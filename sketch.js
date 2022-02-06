var bg,bgImg;
var player, shooterImg, shooter_shooting;
var zombie, zombieImg;
var bullet, bulletImg;
var zombieGroup;

var explosionSound, loseSound, winSound;

function preload(){
  
  shooterImg = loadImage("assets/shooter_2.png");
  shooter_shooting = loadImage("assets/shooter_3.png");
  zombieImg = loadImage("assets/zombie.png");
  bulletImg = loadImage("assets/bullet.png");
  bgImg = loadImage("assets/bg.jpeg");

  explosionSound = loadSound("assets/explosion.mp3");
  winSound = loadSound("assets/win.mp3");
  loseSound = loadSound("assets/lose.mp3");
}

function setup() {
  createCanvas(windowWidth,windowHeight);

 
  bg = createSprite(displayWidth/2-20,displayHeight/2-40,20,20)
    bg.addImage(bgImg)
    bg.scale = 1.1
  
  player = createSprite(displayWidth-1350, displayHeight-300, 50, 50);
   player.addImage(shooterImg)
     player.scale = 0.3
     player.setCollider("rectangle",0,0,300,300)

     
    

    zombieGroup = createGroup()
}


function draw() {
  background(0); 

if(keyDown("UP_ARROW")){
  player.y -= 30
}
if(keyDown("DOWN_ARROW")){
  player.y += 30
}


if(keyWentDown("space")){
 
  bullet = createSprite(displayWidth-1150,player.y-30,20,10)
    bullet.addImage(bulletImg);
    bullet.scale = 0.2
    bullet.velocityX = 20
  player.changeImage(shooter_shooting)
}
else if(keyWentUp("space")){
  player.addImage(shooterImg)
}

if(zombieGroup.isTouching(bullet)){
  for(var i = 0;i<zombieGroup.length; i++){
    if(zombieGroup[i].isTouching(bullet)){
      zombieGroup[i].destroy()
    }
  }
}

if(zombieGroup.isTouching(player)){
  for(var i = 0;i<zombieGroup.length; i++){
    if(zombieGroup[i].isTouching(player)){
      zombieGroup[i].destroy()
    }
  }
}

enemy();
drawSprites();

}


function enemy(){
  if(frameCount%50===0){
    
    zombie = createSprite(random(900,1100),random(300,800),40,40)

    zombie.addImage(zombieImg)
    zombie.scale = 0.15
    zombie.velocityX = -3
    zombie.debug = "true"
    zombie.setCollider("rectangle",0,0,1100,400)
    zombie.lifetime = 400
    zombieGroup.add(zombie)
  }
}