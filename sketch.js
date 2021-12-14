var PLAY = 1
var END = 0
var gameState= PLAY
var rocket,rocketImg

var space,spaceimg
var reset,gameover,resetimg,gameoverimg
var alien
var meteorimg,robotimg
var wood,woodimg
var fuels,score,coins,stars
var alien1,alien2,alien3
var coinimg
var starimg
var fuelimg
var meteorimg,robotimg
var stargrp,aliengrp,enemygrp,fuelgrp,coingrp
var enemies,fuel,star,coin

function preload(){
   rocketImg = loadImage("IMAGES/rocket.jpeg")
   starimg=loadImage("IMAGES/stars.png")
   coinimg=loadImage("IMAGES/coins.jpeg")
   resetimg=loadImage("IMAGES/restart.jpeg")
   gameoverimg=loadImage("IMAGES/game over.jpg")
   fuelimg=loadImage("IMAGES/fuel.png")
   meteorimg=loadImage("IMAGES/meteoride.jpg")
   robotimg=loadImage("IMAGES/robot.jpeg")
   spaceimg=loadImage("IMAGES/space.jpg")
   woodimg = loadImage("IMAGES/wood.jpg")
   alien1=loadImage("IMAGES/alien 1.png")
   alien2=loadImage("IMAGES/alien 2.png")
   alien3=loadImage("IMAGES/alien 3.jpeg")
} 
function setup() {
  createCanvas(1540,740);
    
  
  
  
  space = createSprite(770,370)
  space.addImage("spaceimg",spaceimg)
  space.scale = 3
  space.velocityX= -5
   
  reset=createSprite(770,500)
  reset.addImage("resetimg",resetimg)
  reset.scale=0.4
  reset.visible=false

  gameover=createSprite(770,370)
  gameover.addImage("gameoverimg",gameoverimg)
  gameover.scale=0.5
  gameover.visible=false


  rocket=createSprite(90,500, 50, 50);
  rocket.addImage("rocketImg",rocketImg)
  rocket.scale=0.5

   stargrp = new Group();
   coingrp = new Group();
   enemygrp = new Group()
   fuelgrp = new Group()
   aliengrp = new Group()
   
 score = 0
 fuels=500
 stars = 0
 coins = 0

  
}

function draw() {
  background(255,255,255)
  
  rocket.y=World.mouseY
 


  for (var i = 30; i< 1540; i=i+30) 
  {
    wood = createSprite(i, 120, 25,25);
    wood.addImage("woodimg",woodimg)
    wood.scale = 0.1
  }
  for (var i = 0; i< 70; i=i+30) 
  {
    wood = createSprite(450,i,25,25);
    wood.addImage("woodimg",woodimg)
    wood.scale = 0.1
  }
  for (var i = 0; i< 70; i=i+30) 
  {
    wood = createSprite(750,i,25,25);
    wood.addImage("woodimg",woodimg)
    wood.scale = 0.1
  }
  for (var i = 0; i< 70; i=i+30) 
  {
    wood = createSprite(1050,i,25,25);
    wood.addImage("woodimg",woodimg)
    wood.scale = 0.1
  }


  if(gameState===PLAY){
    
    fuels-=1
  spawnAliens();
  spawnCoins();
  spawnStars();
  spawnFuel();
  spawnenemy();
     if(space.x<670){
      space.x=770
      gameover.visible = false
      reset.visible = false
    }
    
    
      for(var i = 0;i<stargrp.length;i++){
        if(rocket.isTouching(stargrp.get(i))){
          stargrp.get(i).destroy()
      
      stars+=1
      score+=10
        }
    }

   for(var x = 0;x<coingrp.length;x++){
    if(rocket.isTouching(coingrp.get(x))){
      coingrp.get(x).destroy()

      coins+=1
      score+=30
    }
    }
   
   for(var y =0;y<fuelgrp.length;y++){
    if(rocket.isTouching(fuelgrp)){
      fuelgrp.get(y).destroy()

      fuels+=300
      score+=70
    }
  }
    
    if(rocket.isTouching(aliengrp)||rocket.isTouching(enemygrp)){
      gameState=END
    }
  }
   
  if(gameState===END){
    gameover.visible=true
    reset.visible=true
    stargrp.destroyEach()
    aliengrp.destroyEach()
    coingrp.destroyEach()
    fuelgrp.destroyEach()
    enemygrp.destroyEach()
    score=0
    if(mousePressedOver(reset)){
      replay();
     }
  }

  
  

  
  

   
  

   
  drawSprites();
  
  
  textSize(30)
  fill("orange")
  text("Score: "+ score, 150,50);
  textSize(30)
  fill("green")
  text("Stars:"+ stars,550,50)
  textSize(30)
  fill("yellow")
  text("Coins:"+coins,850,50)
  textSize(30)
  fill("red")
  text("Fuel:"+fuels,1250,50)
  
}
function spawnAliens(){
  if(frameCount % 167=== 0){
     alien = createSprite(1540,Math.round(random(150,350)),30,30)
    alien.velocityX = -19
    alien.scale = 0.5
    aliengrp.add(alien)
    //generate random obstacles
    var rand = Math.round(random(1,3))
    switch(rand) {
      case 1 :alien.addImage(alien1);
      break;
      case 2 :alien.addImage(alien2);
      break;
      case 3 :alien.addImage(alien3);
      break;
      default:break;
    }
  }
}

function spawnCoins(){
if(frameCount% 122 === 0){
coin = createSprite(1540,Math.round(random(300,600)),30,30)
coin.addImage(coinimg)
coin.velocityX = -38
coin.scale = 0.5
coingrp.add(coin)
}
}

function spawnStars(){
  if(frameCount % 105 === 0){
  star = createSprite(1540,Math.round(random(250,700)),30,30)
  star.addImage(starimg)
  star.velocityX = -23
  star.scale = 0.1
  stargrp.add(star)
  }
  
  }

  function spawnFuel(){
    if(frameCount% 455 === 0){
     fuel = createSprite(1540,Math.round(random(650,720)),30,30)
    fuel.addImage(fuelimg)
    fuel.velocityX = -27
    fuel.scale = 0.3
    fuelgrp.add(fuel)
    }
    }

    function spawnenemy(){
      if(frameCount % 40 === 0){
        enemies = createSprite(1540,Math.round(random(600,700)),30,30)
        enemies.velocityX = -19
        enemies.scale = 0.2
        enemygrp.add(enemies)
        //generate random obstacles
        var rand = Math.round(random(1,2))
        switch(rand) {
          case 1 :enemies.addImage(robotimg);
          break;
          case 2 :enemies.addImage(meteorimg);
          break;
          default:break;
        }
      }
    }

    function replay(){
     gameState = PLAY
    gameover.visible = false 
     reset.visible = false
     score = 0
     stars = 0
     coins = 0
     fuels =  500
     enemygrp.destroyEach()
     coingrp.destroyEach()
     stargrp.destroyEach()
     fuelgrp.destroyEach()
     aliengrp.destroyEach()
    }
    




