var w = window.innerWidth; //window width
var h = window.innerHeight; //window height

var ballSize = 30; //Simplicity
var baseBallSpeed = 5; //Simplicity
var ballSizeA = ballSize; //Global ballA size
var ballSizeB = ballSize; //Global ballB size
var baseBallSpeedA = baseBallSpeed; //To reset speedA
var ballSpeedA = baseBallSpeedA; //Set speed of ballA
var ballSprintA = ballSpeedA + 3; //Sprint speed
var stamA = 100; //Stamina for sprinting
var stamMaxA = 80; //Max staminaA
var baseBallSpeedB = baseBallSpeed; //To reset speedB
var ballSpeedB = baseBallSpeedB; //Set speed of ballB
var ballSprintB = ballSpeedB + 3; //Sprint speed
var stamB = 100; //Stamina for sprinting
var stamMaxB = 80; //Max staminaB
var staminaBalance = 5; //Punishes spamming the shift key

var d; //Distance

var powerSize = 20;
var powerOneAct = true;
var dPowerAA;
var dPowerAB;
var powerOneAppear;
var turboSpeed = 10;
var intPowerDura = 240;
var powerDura = intPowerDura;

var ballA = new ballA(); //creates global object ballA
var ballB = new ballB(); //creates global object ballB
var powerA = new powerA(); //MORE OBJECTS

var beginCheck = false;
var time = 60; //Timer set to avoid
var triggerTime = time - 8; //Used in draw function
var timerInterval = setInterval(winCondition, 1000); //Timer decrements by 1 second

var tacked = ["BOPPED", "TACKLED", "TRAMPLED", "DOMINATED", "CAUGHT", "PUNCHED"]; //Wow
var winned = ["AVOIDED", "JUKED", "WINNER", "DITCHED", "LAPPED", "DODGED"]; //Wow
let imgA;
let imgB;

function setup() {
  createCanvas(w, h);
  document.getElementById('disTime').innerHTML = time;
  var limitTime = time - 25;
  powerOneAppear = Math.floor((Math.random() * limitTime) + 20);
  imgA = loadImage('runner.png');
  imgB = loadImage('Z_Eric_Test.gif');
}

function draw() {
  background(220);
  d = Math.floor(dist(ballA.x, ballA.y, ballB.x, ballB.y));
  image(imgA,30,30,ballSize,ballSize);
  image(imgB,30,30,ballSize,ballSize);
  
  if (d < ballSizeA) {
    collision();
    noLoop();
  }
  
  if (time < powerOneAppear && powerOneAct === true) {
    powerA.show();
    dPowerAA = Math.floor(dist(ballA.x, ballA.y, powerA.x, powerA.y));
    dPowerAB = Math.floor(dist(ballB.x, ballB.y, powerA.x, powerA.y));
  }
  if (dPowerAA < powerSize && powerDura > 0) {
    if (powerDura !== 0) {
      powerA.workA();
      powerDura--;
    }
    powerOneAct = false;
  } else if (dPowerAB < powerSize && powerDura > 0) {
    if (powerDura !== 0) {
      powerA.workB();
      powerDura--;
    }
    powerOneAct = false;
  } else if (powerDura === 0) {
    dPowerAA = "Bleh";
    dPowerAB = "Bleh";
    baseBallSpeedA = baseBallSpeed;
    ballSpeedA = baseBallSpeedA;
    ballSprintA = ballSpeedA + 3;
    baseBallSpeedB = baseBallSpeed;
    ballSpeedB = baseBallSpeedB;
    ballSprintB = ballSpeedB + 3;
    powerDura--;
  }
  
  strokeWeight(1);
  ballA.show();
  ballA.move();
  ballB.show();
  ballB.move();
  
  var x = w - ballSize;
  var y = h - ballSize;
  stroke(0);
  strokeWeight(2);
  noFill();
  rect(ballSize/2, ballSize/2, x, y);
  if (time > triggerTime) {
    document.getElementById('dis').innerHTML = "Distance between Players: " + d + " :::" + " Controls: Player1: WASD and shift ::: Player2: IJKL and space";
  } else {
    document.getElementById('dis').innerHTML = "Distance between Players: " + d;
  }
  document.getElementById('playA').innerHTML = "Player1 stamina: " + stamA;
  document.getElementById('playB').innerHTML = "Player2 stamina: " + stamB;
}

function start() {
  beginCheck = true;
  document.getElementById('bttn').style.display = "none";
}

function ballA() { //Global object "ball"
  this.x = 50;
  this.y = 50;
  this.show = function () { //Created function "ballA.show()"
    stroke(0);
    fill(255, 0, 0);
    ellipse(this.x, this.y, ballSizeA, ballSizeA);
  };
  this.move = function () { //Created function "ballA.move()"
    if (beginCheck === true) {
      if (keyIsDown(65)) { //Left
        this.x -= ballSpeedA;
      }
      if (keyIsDown(68)) { //Right
        this.x += ballSpeedA;
      }
      if (keyIsDown(87)) { //Up
        this.y -= ballSpeedA;
      }
      if (keyIsDown(83)) { //Down
        this.y += ballSpeedA;
      }
      if (keyIsDown(16)) { //Speed up for A
        if (stamA > 0) {
          stamA--;
          ballSpeedA = ballSprintA;
        }
      } else {
        if (stamA < stamMaxA) { //Regenerate StamA
          stamA++;
        }
        ballSpeedA = baseBallSpeedA;
      }
      if (stamA === 0) { //Resets the speed if stamina runs out
        ballSpeedA = baseBallSpeedA;
      }
      if (stamA < 0) {
        stamA = 0;
      }
    }
    if (this.x < ballSizeA) { //Border Left
      this.x = ballSizeA;
    } else if (this.x > w - ballSizeA) { //Border Right
      this.x = w - ballSizeA;
    }
    if (this.y < ballSizeA) { //Border Up
      this.y = ballSizeA;
    } else if (this.y > h - ballSizeA) { //Border Down
      this.y = h - ballSizeA;
    }
  };
}

function ballB() { //Player 2 ballB()
  this.x = w - 50;
  this.y = h - 50;
  this.show = function () {
    stroke(0);
    fill(0, 97, 255);
    ellipse(this.x, this.y, ballSizeB, ballSizeB);
  };
  this.move = function () {
    if (beginCheck === true) {
      if (keyIsDown(74)) { //Left
        this.x -= ballSpeedB;
      }
      if (keyIsDown(76)) { //Right
        this.x += ballSpeedB;
      }
      if (keyIsDown(73)) { //Up
        this.y -= ballSpeedB;
      }
      if (keyIsDown(75)) { //Down
        this.y += ballSpeedB;
      }
      if (keyIsDown(32)) { //Speed up for B
        if (stamB > 0) {
          stamB--;
          ballSpeedB = ballSprintB;
        }
      } else {
        if (stamB < stamMaxB) { //Regenerate StamA
          stamB++;
        }
        ballSpeedB = baseBallSpeedB;
      }
      if (stamB === 0) { //Resets the speed if stamina runs out
        ballSpeedB = baseBallSpeedB;
      }
      if (stamB < 0) {
        stamB = 0;
      }
    }
    if (this.x < ballSizeB) { //Border Left
      this.x = ballSizeB;
    } else if (this.x > w - ballSizeB) { //Border Right
      this.x = w - ballSizeB;
    }
    if (this.y < ballSizeB) { //Border Up
      this.y = ballSizeB;
    } else if (this.y > h - ballSizeB) { //Border Down
      this.y = h - ballSizeB;
    }
  };
}

function powerA() {
  this.x = Math.floor(Math.random() * w - ballSize) + ballSize;
  this.y = Math.floor(Math.random() * h - ballSize) + ballSize;
  if (this.x < ballSize) { //Border Left
    this.x = ballSize;
  } else if (this.x > w - ballSize) { //Border Right
    this.x = w - ballSize;
  }
  if (this.y < ballSize) { //Border Up
    this.y = ballSize;
  } else if (this.y > h - ballSize) { //Border Down
    this.y = h - ballSize;
  }
  this.show = function () {
    fill(255, 255, 0);
    stroke(0);
    ellipse(this.x, this.y, powerSize, powerSize);
  };
  this.workA = function () {
    this.x = ballA.x;
    this.y = ballA.y;
    noFill();
    strokeWeight(8);
    stroke(255, 255, 0);
    ellipse(this.x,this.y,ballSize+10,ballSize+10);
    if (powerDura === intPowerDura) {
      baseBallSpeedA = 10;
      ballSpeedA = baseBallSpeedA;
      ballSprintA = ballSpeedA + 3;
    }
  };
  this.workB = function () {
    this.x = ballB.x;
    this.y = ballB.y;
    noFill();
    strokeWeight(8);
    stroke(255, 255, 0);
    ellipse(this.x,this.y,ballSize+10,ballSize+10);
    if (powerDura === intPowerDura) {
      baseBallSpeedB = 10;
      ballSpeedB = baseBallSpeedB;
      ballSprintB = ballSpeedB + 3;
    }
  };
}

function keyPressed() {
  if (beginCheck === true) {
    if (keyCode == "16") {
      stamA -= staminaBalance;
    }
    if (keyCode == "32") {
      stamB -= staminaBalance;
    }
  } else if (keyCode == "13" && beginCheck === false) {
    start();
  }
}

function collision() { //When the two player collide
  var rand = Math.floor(Math.random() * tacked.length);
  window.alert(tacked[rand] + " -P2 win");
  location.href = "starterGame.html";
}

function winCondition() { //When the player is able to avoid the opponent
  var rand = Math.floor(Math.random() * winned.length);
  if (beginCheck === true) {
    time--;
    document.getElementById('disTime').innerHTML = time;
  }
  if (time === 0) {
    window.alert(winned[rand] + " -P1 win");
    location.href = "starterGame.html";
  }
}
