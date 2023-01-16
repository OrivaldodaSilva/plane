
var bg, bgImg
var bottomGround
var topGround
var plane, planeImg
var score=0
var FORM=1
var PLAY=2
var END=0
var gamestate=FORM

function preload(){
bgImg = loadImage("assets/bg.png")

planeImg = loadImage("assets/plane.png")

mountainImg = loadImage("assets/Mountain.png")

startImg = loadImage("assets/start.png")

boomImg = loadImage("assets/boom.jpg")

endImg = loadImage("assets/end.png")
}

function setup(){

createCanvas(400,400)

//imagem de plano de fundo
bg = createSprite(165,485,1,1);
bg.addImage(bgImg);
bg.scale = 1.3

//criando canto superior e inferior
bottomGround = createSprite(200,390,800,20);
bottomGround.visible = false;

topGround = createSprite(200,10,800,20);
topGround.visible = false;
      
//criando o avião     
plane = createSprite(100,200,20,50);
plane.addImage("plane",planeImg);
plane.addImage("boom",boomImg);
plane.scale = 0.13;
// plane.debug=true
plane.setCollider('rectangle',0,0,100,50)

MountainTopGroup=new Group()
MountainDownGroup=new Group()
BarraGroup=new Group()

start = createSprite(width/2,width/2)
start.addImage(startImg)
start.scale=1.5



}

function draw() {
  
  background("black");
  if (gamestate===FORM) {
    plane.visible=false
    if (mousePressedOver(start)) {
      gamestate=PLAY
      start.visible=false
    }

  }
  if (gamestate===PLAY) {
    plane.visible=true
          if(keyDown("space")) {
            plane.velocityY = -6 ;
            
          }
          if(plane.isTouching(BarraGroup)) {
            for(var i=0;i<BarraGroup.length;i++) {
              BarraGroup [i].destroy()
            }
            score=score+1
          }
          if (score===3) {
            gamestate=WIN 
            image(endImg,0,0,width,height)
          }

          //adicionando gravidade
          plane.velocityY = plane.velocityY + 2;
          if(MountainTopGroup.isTouching(plane)||MountainDownGroup.isTouching(plane)
          ||plane.isTouching(bottomGround)||plane.isTouching(topGround)) {
            gamestate=END
          }


          spawnMountainTop()
          spawnMountaindown()
          Barra()
   
  }
  if (gamestate===END) {
    plane.changeImage("boom")
    plane.velocityX=0
    plane.velocityY=0
    plane.y=380
    MountainTopGroup.setVelocityXEach(0)
    MountainTopGroup.setLifetimeEach(-1)
    MountainDownGroup.setVelocityXEach(0)
    MountainDownGroup.setLifetimeEach(-1)
    BarraGroup.setVelocityXEach(0)

  }
        
          
          
        drawSprites();
        textSize(25);
        fill('blue');
        text('Pontuação: '+score,225,50)
        
}

function spawnMountainTop() {
  if (frameCount%60===0) {
    floMountain=createSprite(400,50,40,50)
    floMountain.velocityX=-4
    floMountain.addImage(mountainImg)
    floMountain.scale=0.25
    MountainTopGroup.add(floMountain)
    //floMountain.debug=true
    floMountain.setCollider('rectangle',0,0,900,660)
  }
}
function spawnMountaindown() {
  if (frameCount%60===0) {
    Mountain=createSprite(400,400,40,50)
    Mountain.velocityX=-4
    Mountain.addImage(mountainImg)
    Mountain.scale=0.25
    Mountain.lifetime=200
    Mountain.y=Math.round(random(300,400))
    Mountain.scale=0.25
    MountainDownGroup.add(Mountain)
    Mountain.rotation+=180
    //Mountain.debug=true
    Mountain.setCollider('rectangle',0,0,900,660)
  }
}
function Barra() {
  if (frameCount%60===0) {
    barra=createSprite(400,200,10,600)
    barra.velocityX=-4
    BarraGroup.add(barra)
    barra.visible=false
  }
}