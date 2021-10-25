var girl, girl1Img, girl2Img;
var ground1, ground2, groundImg;
var edges;
var platform, platformImg, platformGroup;
var coin, coinImg, coinGroup;
var stoneImg;
var trunkImg;
var gold, goldImg, goldGroup;
var snakeImg;
var lifeImg;
var fireImg;
var obstacle, obstacleGroup;
var gameState = "play";

function preload() {
  groundImg = loadImage("Images/background.png");

  girl1Img = loadAnimation("Girl/girl02.png");
  girl2Img = loadAnimation(
    "Girl/girl00.png",
    "Girl/girl01.png",
    "Girl/girl02.png",
    "Girl/girl03.png",
    "Girl/girl04.png",
    "Girl/girl05.png",
    "Girl/girl06.png",
    "Girl/girl07.png",
    "Girl/girl08.png",
    "Girl/girl09.png",
    "Girl/girl10.png",
    "Girl/girl11.png"
  );

  platformImg = loadImage("Images/bricks_2.png");
  coinImg = loadImage("Images/coin.png");
  goldImg = loadImage("Images/gold.png");
  stoneImg = loadImage("Images/Stone.png");
  trunkImg = loadImage("Images/stump.png");
  snakeImg = loadImage("Images/snake.png");
  lifeImg = loadImage("Images/Life.png");
  fireImg = loadAnimation(
    "Images/fire1.png",
    "Images/fire2.png",
    "Images/fire3.png",
    "Images/fire4.png",
    "Images/fire5.png"
  );
}

function setup() {
  createCanvas(800, 400);
  ground1 = createSprite(400, 200, 800, 400);
  ground1.addImage("ground1", groundImg);
  ground1.velocityX = 0;

  ground2 = createSprite(400, 200, 800, 400);
  ground2.addImage("ground2", groundImg);

  girl = createSprite(150, 260, 50, 50);
  girl.addAnimation("standing", girl1Img);
  girl.addAnimation("running", girl2Img);
  girl.scale = 0.5;
  girl.debug = false;
  girl.setCollider("rectangle", 0, 0, 200, 200);

  platformGroup = new Group();
  coinGroup = new Group();
  goldGroup = new Group();

  obstacleGroup = new Group();
  edges = createEdgeSprites();
}

function draw() {
  background(0);
  if (gameState === "play") {
    if (ground2.x < 300) {
      ground2.x = 400;
    }

    if (keyDown("right")) {
      ground2.velocityX = -6;
      girl.changeAnimation("running", girl2Img);
      obstacleGroup.setVelocityXEach(-6);
    }

    girl.collide(edges);

    spawnPlatforms();
    spawnObstacles();
    if (obstacleGroup.isTouching(girl)) {
      gameState = "end";
    }
  } else if (gameState === "end") {
    ground2.velocityX = 0;
    obstacleGroup.setVelocityXEach(0);
    platformGroup.setVelocityXEach(0);
    coinGroup.setVelocityXEach(0);
    goldGroup.setVelocityXEach(0);
  }

  drawSprites();
}

function spawnObstacles() {
  if (frameCount % 260 === 0) {
    obstacle = createSprite(1000, 350, 50, 50);
    obstacle.velocityX = -6;
    var rand = Math.round(random(1, 4));
    switch (rand) {
      case 1:
        obstacle.addImage("snake", snakeImg);
        obstacle.scale = 0.2;
        break;
      case 2:
        obstacle.addImage("stone", stoneImg);
        obstacle.scale = 0.1;
        break;
      case 3:
        obstacle.addAnimation("fire", fireImg);
        obstacle.scale = 0.25;
        break;
      case 4:
        obstacle.addImage("trunk", trunkImg);
        obstacle.scale = 0.3;
        break;

      default:
        break;
    }

    obstacle.lifetime = 800;
    obstacleGroup.add(obstacle);
  }
}

function spawnPlatforms() {
  if (frameCount % 300 === 0) {
    platform = createSprite(1000, 200, 50, 50);
    platform.addImage(platformImg);
    platform.scale = 0.2;
    platformGroup.add(platform);
    platform.lifetime = 800;
    platformGroup.setVelocityXEach(-6);
  }

  if (frameCount % 300 === 0) {
    coin = createSprite(1020, 170, 50, 50);
    coin.addImage(coinImg);
    coin.scale = 0.04;
    coinGroup.add(coin);
    coin.lifetime = 800;
    coinGroup.setVelocityXEach(-6);
  }

  if (frameCount % 320 === 0) {
    gold = createSprite(1000, 100, 50, 50);
    gold.addImage(goldImg);
    gold.scale = 0.1;
    goldGroup.add(gold);
    gold.lifetime = 800;
    goldGroup.setVelocityXEach(-6);
  }
}
