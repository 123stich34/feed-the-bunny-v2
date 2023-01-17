const Engine = Matter.Engine;
const Render = Matter.Render;
const World = Matter.World;
const Bodies = Matter.Bodies;
const Constraint = Matter.Constraint;
const Body = Matter.Body;
const Composites = Matter.Composites;
const Composite = Matter.Composite;

let engine;
let world;
var ground,
  rope,
  fruit,
  fl,
  bgi,
  fi,
  bi,
  bunny,
  blink,
  eat,
  sad,
  grd,
  bgs,
  cs,
  ss,
  es,
  air,
  bw,
  mtbtn,
  mt,
  sd,si,se,st,so,st1,st2,slb
function preload() {
  bgi = loadImage("background.png");
  fi = loadImage("melon.png");
  bi = loadImage("Rabbit-01.png");
  bgs = loadSound("sound1.mp3");
  cs = loadSound("rope_cut.mp3");
  ss = loadSound("sad.wav");
  es = loadSound("eating_sound.mp3");
  air = loadSound("air.wav");
  md = loadAnimation("mute1.png");
  sd = loadAnimation("volume.png");
  si=loadImage("star.png")
  se=loadAnimation("empty.png")
  so=loadAnimation("one_star.png")
 
  st=loadAnimation("stars.png")


  blink = loadAnimation("blink_1.png", "blink_2.png", "blink_3.png");
  eat = loadAnimation(
    "eat_0.png",
    "eat_1.png",
    "eat_2.png",
    "eat_3.png",
    "eat_4.png"
  );
  sad = loadAnimation("sad_1.png", "sad_2.png", "sad_3.png");

  blink.playing = true;
  eat.playing = true;
  eat.looping = false;
  sad.looping = false;
}

function setup() {
 // var flag=/iPhone|iPad|iPod|Android/i.test(navigator.userAgent)
  //if(flag){
//     createCanvas(displayWidth,displayHeight)
//   }
// else{createCanvas(windowWidth,windowHeight)}
  
  createCanvas(600, 700);
  frameRate(80);
  engine = Engine.create();
  world = engine.world;
  ground = new Ground(width/2, height-10, width, 20);
  rope1 = new Rope(5, { x: 120, y: 100 });
  rope2 = new Rope(5, { x: 470, y: 100 });
 // rope3= new Rope(3, { x: width/2+110, y: height/2-80 });

  fruit = Bodies.circle(width/2, height/2, 20);
  blink.frameDelay = 20;
  Matter.Composite.add(rope1.body, fruit);
  Matter.Composite.add(rope2.body, fruit);
 // Matter.Composite.add(rope3.body, fruit);
  //sad.frameDelay=30
  fl1 = new Link(rope1, fruit);
  fl2 = new Link(rope2, fruit);
  //fl3 = new Link(rope3, fruit);

  bunny = createSprite(200, height-100);
  // bunny.addImage(bi)
  bunny.addAnimation("blink", blink);
  bunny.addAnimation("eat", eat);
  bunny.addAnimation("sad", sad);

  bunny.scale = 0.25;
  mtbtn = createSprite(width - 50, 50);
  mtbtn.addAnimation("volume", sd);
  mtbtn.addAnimation("mute", md);

  mtbtn.scale = 0.08;
   bgs.play()
  bgs.setVolume(0.05);

  imageMode(CENTER);

  rectMode(CENTER);
  ellipseMode(RADIUS);
  textSize(50);
  btn1 = createImg("cut_button.png");
  btn1.position(100,100);
  btn1.size(50, 50);
  btn1.mouseClicked(drop1);
  btn2 = createImg("cut_button.png");
  btn2.position(450, 100);
  btn2.size(50, 50);
  btn2.mouseClicked(drop2);
  //btn3 = createImg("cut_button.png");
 // btn3.position(width/2+100, height/2-100);
 // btn3.size(50, 50);
 // btn3.mouseClicked(drop3);
  grd = createSprite(width / 2, height - 10, width, 20);
  grd.visible = false;
  bw = createImg("balloon.png");
  bw.position(250, 310);
  bw.size(120, 150);
  bw.mouseClicked(blow);
  st1=createSprite(310,50)
  st1.addImage(si)
  st1.scale=0.02
  st2=createSprite(50,310)
  st2.addImage(si)
  st2.scale=0.02
  slb=createSprite(100,50)
  slb.addAnimation("mt",se)
  slb.addAnimation("1",so)
  slb.addAnimation("2",st)
  slb.scale=0.2
}

function draw() {
  background(51);
  image(bgi, width / 2, height / 2, width, height);
  // ground.show();

  Engine.update(engine);

  rope1.show();
  rope2.show();
 // rope3.show();
  if (fruit) image(fi, fruit.position.x, fruit.position.y, 70, 70);
  if (collide(fruit, bunny)) {
    bunny.changeAnimation("eat");
    es.play();
    fruit = null;

  }
  if (collide(fruit, ground.body)) {
    bunny.changeAnimation("sad");
    ss.play();
    fruit = null;

   // console.log(78);
  }
 
  if(collide(fruit,st1)){
    st1.visible=false
    slb.changeAnimation("1")
  }
  if(collide(fruit,st2)){
    st2.visible=false
    slb.changeAnimation("2")
  }
  //mtbtn.mousePressedOver(()=>{
  //mtbtn.changeAnimation("mute")
  //})
  if (mousePressedOver(mtbtn)) {
    if (mouseWentDown(LEFT)) {
      if (bgs.isPlaying()) {
        bgs.stop();
        mtbtn.changeAnimation("mute");
      } else {
        bgs.play();
        mtbtn.changeAnimation("volume");
      }
    }
  }

  drawSprites();
  //stext(mouseX+","+mouseY,mouseX,mouseY)
}
function drop1() {
  fl1.detach();
  rope1.break();
  fl1 = null;
  cs.play();
}
function drop2() {
  fl2.detach();
  rope2.break();
  fl2 = null;
  cs.play();
}
function drop3() {
  fl3.detach();
  rope3.break();
  fl3 = null;
  cs.play();
}

function collide(body, sprite) {
  if (body) {
    var d = dist(
      body.position.x,
      body.position.y,
      sprite.position.x,
      sprite.position.y
    );
    // console.log(d)
    if (d <= 80) {
    //  Matter.World.remove(world, fruit);
    //  fruit = null;
      return true;
    } else {
      return false;
    }
  }
}
function blow() {
  Matter.Body.applyForce(fruit, fruit.position, { x: 0, y: -0.05});
  air.play();
}
