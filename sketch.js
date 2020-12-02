//Create variables here
var dogImg,dog,happydog,database,food,foods;
function preload()
{
  //load images here
  dogImg = loadImage("images/dogImg.png")
  happydog=loadImage("images/dogImg1.png")
}

function setup() {
  database = firebase.database()
  createCanvas(500, 500);
  dog = createSprite(250,250,20,40)
  dog.addImage(dogImg)
  dog.scale=0.3

  
  foods = database.ref('Food')
  foods.on("value",reads)
  
}


function draw() {  
  background(46,139,87)

  if(keyWentDown("up")){
    writes(food)
    dog.addImage(happydog)
  }
  if(keyWentUp("up")){
    dog.addImage(dogImg)
    writes(5)
  }
  drawSprites();
  //add styles here
  textSize(20)
  fill("white")
  text("PRESS UP ARROW KEY TO FEED",100,100)

  text("food remaining:"+food,150,480)
}


function reads(data){
  food = data.val()
}

function writes(x){
  if(x<=0){
    x = 0
  }
  else{
    x = x-1;
  }
  database.ref('/').update({
    Food:x
  })
}