var trex =[],cactusimg = [],x =0,y =0,cactus = [],gameState = "play",dist = 0;
function preload(){
  for (let index = 0; index < 4; index++) {
    trex[index] = loadImage("trex/trex"+index+".png")
  }
  for (let index = 0; index < 6; index++) {
    cactusimg[index] = loadImage("cactus/obstacle"+(index+1)+".png")
  }
  
}
function setup(){
  dist = 0
  createCanvas(windowWidth, windowHeight);
  x =width/2;y=height/2
  gameOver = loadImage("image/gameOver.png")
  replay = loadImage("image/restart.png")
}
function draw(){
  background(220)
  
  for (let index = 0; index < cactus.length; index++) {
    
    cactus[index].show()
    if(gameState === "play"){
    cactus[index].move(-5,0);
    let hit  = collideRectRect(cactus[index].x, cactus[index].y, cactus[index].w,cactus[index].h,x,y,50,50);
    if(hit){
      gameState = "end"
    }
  }
    
  }
  

  
  // console.log(gameState)
  push()
  imageMode(CENTER);
  image(trex[round(frameCount/5)%3+1], x, y, 50, 50);
  pop()
  if(gameState === "play"){
    control(5)
    x-=5
    if(frameCount%10 === 0) cactus[cactus.length] = new Cactus(width,random(height),50,50,cactusimg[round(random(cactusimg.length-1))]);
  dist++;  
  }else{
      image(gameOver,width/2,height/2,gameOver.width,gameOver.height)
      let bx = width/2,by = height/2+50
      image(replay,bx,by,replay.width,replay.height)
      if(mouseIsPressed){
        
        if(mouseX>bx&&mouseX<bx+gameOver.width&&mouseY>by&&mouseY,by+gameOver.width){
          gameState = "play"
          cactus = []
          x =width/2;y=height/2
          dist = 0
        }
      }
    }
    text("dist: "+dist,50,50)
}
function control(speed){
  if (keyIsDown(87)) {
    y-=speed
    // console.log("hi")
  }
  if (keyIsDown(83)) {
    y+=speed
  }
  
  if (keyIsDown(68)) {
    x+=speed+5
  }
  if (keyIsDown(65)) {
    x-=speed
  }
  if(x>width){
    x = width
  }
  // console.log(x,y)
}
class Cactus{
  constructor(x,y,w,h,img){
    this.x = x;
    this.y = y;
    this.w = w;
    this.h = h;
    this.img = img
  }
  move(x,y){
    this.x+=x;
    this.y+=y;
  }
  show(){
    imageMode(CENTER)
    // console.log(this.img)
    image(this.img, this.x, this.y, this.w,this.h);
  }
  
}
