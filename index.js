// Created by r8w9

/*

Created by
      ___         ___ 
  _ _( _ )_ __ __/ _ \
 | '_/ _ \ V  V /\_  /
 |_| \___/\_/\_/  /_/ 
 



Assisted by 
  ___                   
 | _ )_  _ _ _ ___ _  _        
 | _ \ || | '_/ -_) || |
 |___/\_,_|_| \___|\_, |   
                   |__/ 
                   
 - with cool dead effect
   ___   
  ( _ )  
  / _ \/\
 | (_>  <
  \___/\/
                           
  __  __          _   _      
 |  \/  |__ _ _ _| |_(_)_ _  
 | |\/| / _` | '_|  _| | ' \ 
 |_|  |_\__,_|_|  \__|_|_||_|
                             
 - with great joystick controller     
              
*/ 


// Burey - https://www.sololearn.com/Profile/197327
// Martin - https://www.sololearn.com/Profile/4103074

// document.querySelector(".loadingOverlay").style.display = "none";








/*********** UTILITIES ***********/

// Selector
function id(arg){
  return document.getElementById(arg);
} 

// Dirty error handling
function stoperror(){
  return true;
} window.onerror = stoperror;







/*********** ONLOAD INITIALIZATION ***********/

window.onload = function(){
// var joystick = new Joystick(); - Burey's joystick
var dead = false; // Burey's dead effect :)
var isAngel = false; // Is-angel (for immortality)
var canvas = id("canvas");
var c = canvas.getContext("2d");
canvas.width = window.innerWidth;
canvas.height = window.innerHeight - 5; // - 5 for avoiding overflow from joystick








/*********** MOUSE & TOUCH CONTROLS ***********/

/*
  var mouse = {
  x: canvas.width/2,
  y: canvas.height-33
};
  
var touch = {
  x: canvas.width/2,
  y: canvas.height-33
};
  
//event listener for mouse object
canvas.addEventListener("mousemove", function(event){
  mouse.x = event.clientX;
  mouse.y = event.clientY;
});
//eventListener to mouse object
canvas.addEventListener("touchmove", function(event){
  var rect = canvas.getBoundingClientRect();
  var root = document.documentElement;
  var touch = event.changedTouches[0];
  var touchX = parseInt(touch.clientX);
  var touchY = parseInt(touch.clientY) - rect.top - root.scrollTop;
  event.preventDefault();
  mouse.x = touchX;
  mouse.y = touchY;
});
*/  









/*********** GAME VARIABLES ***********/

// Player
var player_width = 42;
var player_height = 42;

// var playerImg = new Image();
// playerImg.src =  "https://i.ibb.co/Q8CD3Jv/hero.png";

// Score is no longer needed
// In Player object I wrote new method that draws HP bar
//var score = 100; // HP
//var score_center; // For centering hero's score

// Array for obsticles  
var _obsticles = [];


// Array for angelDrops (falling angel wings icon - when picked gains immortality to hero player)
var _angelDrops = [];

// Game colors
var gameColors = ["#5E412F", "#DA4624", "#6E9ECF", "#75EB00", "#FF85CB", "#FF432E", "#354458", "#542733", "#EB65A0", "#982395", "#260126", " #59323C", " #F2EEB3", "#8C6954", "#ED1C24", "#20457C", "#160A47", "#F05A28", "#3A0256", "#591E23", "#73503C", "#0C98CF", "#775BA3", "#493621", "#82683B", "#F76835", "#999900", "#000000", "#D75C37", "#CC0063"];

// Hero level
var level = 1;

// For timing in GAMELOOP (currentTime - lastTime)
var lastTime = 0;









/*********** GAME OBJECTS ***********/


// Player object
function Player(x, y, width, height){
  this.x = x;
  this.y = y;
  this.width = width;
  this.height = height;
  this.score_color = "green";
  this.score_width = 40;
  this.score_height = 10;
  //this.speedX = speedX; // replaced with joystick controls
  //this.speedY = speedY; // replaced with joystick controls
  
  this.draw = function(){
    c.beginPath();
    // Draw player
    //c.drawImage(playerImg, this.x, this.y);
    c.rect(this.x, this.y, this.width, this.height);
    c.fillStyle = "#354458";
    c.strokeStyle = "#000";
    c.fill();
    c.stroke();
    
    // Boundaries
    
    if(this.x + this.width/2 < 0){ // left
        this.x = -this.width/2;
    }
    
    else if(this.x + this.width/2 > canvas.width){ // right
      this.x = canvas.width - this.width/2;
    }
    
    if(this.y <= 0){ // top
        this.y = 0;
    }
    
    else if (this.y >= (canvas.height - this.height)){ // bottom
        this.y = (canvas.height - this.height);
      }


    // Joystick is here instead of this
    
    // this.x -= this.speedX;
    // this.y -= this.speedY;
    
  };
  
  // Main update function that calls draw and score (HP bar)
  this.update = function(){
    this.draw();
    this.score();
    
    // MAX HP BAR width can be 40
    if(this.score_width >= 40) this.score_width = 40;
  };
  
  // Score method that draws HP BAR
  // Just a simple green rectangle above player's head
  // If player collides with obstacle - this width decreases
  // If this width is 0, player is dead
  this.score = function(){
    c.beginPath();
    c.rect(this.x + 1.5, this.y -13, this.score_width, this.score_height);
    c.fillStyle = this.score_color;
    c.fill();
  };

}








// Obsticle
function Obsticle(x, y, width, height, speed){
  this.x = x;
  this.y = y;
  this.width = width;
  this.height = height;
  this.speed = speed;
  this.color = gameColors[Math.floor(Math.random() * gameColors.length)]; // Index random color
  
  this.draw = function(){
    c.beginPath();
    c.lineWidth = "1";
    c.strokeStyle = "white";
    c.fillStyle = this.color;
    c.rect(this.x, this.y, this.width, this.height); 
    c.fill();
    c.stroke();    
  };
  
  this.update = function(){
    
    // Bounce back in x axis always when x > canvas.width or x < 0
    if(this.x - player_width > canvas.width || this.x + player_width * 1.5 < 0){
      this.speed = -this.speed;
    }
    this.x += this.speed;
    
    this.draw();
  };
}
  
  
  
  
  
  
  
  
  
// Finish
function Finish(x, y, width, height){
  this.x = x;
  this.y = y;
  this.width = width;
  this.height = height;
  
  this.draw = function(){
    c.beginPath();
    c.lineWidth = "3";
    c.strokeStyle = "white";
    c.fillStyle = "#FFAC00";
    c.rect(this.x, this.y, this.width, this.height); 
    c.fill();
    c.stroke();
  };
  
  this.update = function(){
    
    
    // Boundaries
    
    if(this.x + this.width/2 < 0){ // Left
        this.x = -this.width/2;
    }
    
    else if(this.x + this.width/2 > canvas.width){ // Right
      this.x = canvas.width - this.width/2;
    }
    
    if(this.y <= 0){ // top
        this.y = 0;
    }
    
    else if (this.y >= (canvas.height - this.height)){ // Bottom
        this.y = (canvas.height - this.height);
    }
      
      
      
    this.draw();
  };
}









// Angel wings
function AngelWings(){
  this.x = player.x;
  this.y = player.y;
  this.width = 80;
  this.height = 80;
  
  this.draw = function(){
    c.beginPath();
    var img2 = new Image();
    img2.src = "https://i.ibb.co/PxfLt3K/wings.png"; // Angel image
    c.drawImage(img2, this.x - 18, this.y - 57, this.width, this.height);
    // c.lineWidth = "1";
    // c.fillStyle = "#fff";
    // c.rect(this.x, this.y, this.width, this.height);
    // c.fill();
    // c.stroke();
  };
  
  this.update = function(){
      
     //this.x = player.x; // Added to gameloop for funnier transitions
     //this.y = player.y; // Added to gameloop for funnier transitions
     
    this.draw();
  };
  
}








// Angel drops (icons)
function AngelDrop(){
  this.x = Math.random() * canvas.width;
  this.y = -50;
  this.width = 32;
  this.height = 32;
  
  this.draw = function(){
    c.beginPath();
    var img3 = new Image();
    img3.src = "https://i.ibb.co/PxfLt3K/wings.png"; // Angel icon image
    c.drawImage(img3, this.x, this.y, this.width, this.height);
    // c.lineWidth = "1";
    // c.fillStyle = "#fff";
    // c.rect(this.x, this.y, this.width, this.height);
    // c.fill();
    // c.stroke();
  };
  
  this.update = function(){
    
    
    // Boundaries
    
    if(this.x + this.width/2 < 0){ // Left
      this.x = -this.width/2;
    }
    
    else if(this.x + this.width/2 > canvas.width){ // Right
      this.x = canvas.width - this.width/2;
    }
    this.y += 1; // Fall down from top
    
    this.draw();
  };
  
}








/*********** COLLISION DETECTION ***********/

function collision(a, b) {
  return a.x < b.x + b.width && // Right
         a.x + a.width > b.x && // Left
         a.y < b.y + b.height && // Bottom
         a.y + a.height > b.y; // Top
}








/*********** new OBJECT ***********/ 

// Draw Player (player.update in game loop for drawing)
var player = new Player(canvas.width/2 - player_width/2, canvas.height - player_height - 1, player_width, player_height);






// Draw Obsticles (called in game loop everytime I hit gold finish box)
function drawObsticles(){  
  for (var _ = 0; _ < 1; _++){ //x, y, width, height, speed
    var obsticle = new Obsticle(/*x = */ Math.random()*canvas.width, /*y = */ Math.floor((Math.random() * canvas.height/2) + 70), /*width = */ Math.floor((Math.random() * 60) + 30), /*height = */ Math.floor((Math.random() * 15) + 8), /*speed = */ Math.floor(Math.random() * 3.5) + 1);
    _obsticles.push(obsticle);
  }
}drawObsticles();






// Draw Finish (Gold box) (finish.update in game loop for drawing)
var finish = new Finish(/*x = */canvas.width/2 - 16, /*y = */ 2, /*width = */ 32, /*height = */ 32);






// Draw Angel wings on hero player (angel.update in game loop for drawing)
var angelWings = new AngelWings();
//var angelDrop = new AngelDrop(); // Testing








/*********** JOYSTICK ***********/  

function joystick(data) {
  var front = front || {radius: 20, color: "#E7A718"};
  var back = back   || {radius: 34, color: "#DF3B21"};
  var r = front.radius, R = back.radius;
  var c = front.color, C = back.color; 

  var touch = {on: false};
    
  var start = function(e) {
    if(touch && !touch.on) {
      touch = {
        x: e.clientX || e.touches[0].clientX,
        y: e.clientY || e.touches[0].clientY,
        on: true};
            
          this.back = document.createElement("div");
          this.back.style.position = "absolute";
          this.back.style.width = 2 * R +"px";
          this.back.style.height = 2 * R +"px";
          this.back.style.border = "solid #000";
          this.back.style.borderWidth = "0.5px";
          this.back.style.borderRadius = "50%";
          this.back.style.background = C;
          
          this.front = document.createElement("div");
          this.front.style.position = "absolute";
          this.front.style.width = 2 * r +"px";
          this.front.style.height = 2 * r +"px";
          this.front.style.border = "solid #000";
          this.front.style.borderWidth = "0.5px";
          this.front.style.borderRadius = "50%";
          this.front.style.background = c;
          
          this.front.style.left = touch.x - r +"px";
          this.front.style.top = touch.y - r +"px";
          this.back.style.left = touch.x - R +"px";
          this.back.style.top = touch.y - R +"px";
          
          document.body.appendChild(this.back);
          document.body.appendChild(this.front);
    }
  };
  
  var move = function(e) {
    var x = e.clientX || e.touches[0].clientX;
    var y = e.clientY || e.touches[0].clientY;
    if(touch && touch.on) {
      var dx = x - touch.x;
      var dy = y - touch.y;
      var l = Math.hypot(dx, dy);
      var max = 4 * R/5;
      if(l > max) {dx *= max/l; dy *= max/l}
        this.front.style.left = parseFloat(this.back.style.left) + dx + r/2 +"px";
        this.front.style.top = parseFloat(this.back.style.top)+ dy + r/2 +"px";
        data({dx: dx, dy: dy}); // Move
    }
  };  
    
  var stop = function(e) {
    if(touch && touch.on) {
      document.body.removeChild(this.back);
      document.body.removeChild(this.front);
      touch.on = false;
      data({dx: 0,dy: 0}); // Prevent hero moving
    }
  };
    
    
  // Listeners
  document.addEventListener("touchstart", start);
  document.addEventListener("touchmove", move);
  document.addEventListener("touchend", stop);
  document.addEventListener("touchcancel", stop);
    
  // document.addEventListener("click", start);
  document.addEventListener("mousedown", start);
  document.addEventListener("mousemove", move);
  document.addEventListener("mouseup", stop);
    
}

/*********** JOYSTICK'S USAGE ***********/

// Added vector x and y values for player.x and .y movement
var v = {x :0, y: 0}

joystick(function(data) {
    // Do something with the joystick data
    // Data is an object {dx: float, dy: float}
    
    // If player not dead - move in x and y axis
    if(!dead) v.x = data.dx * 0.15;
    if(!dead) v.y = data.dy * 0.15;
    
    // If player dead - don't move
    if(dead) v.x = v.y = 0;

});






// Burey's joystick setup - not used

// function joystickControl(){
//    player.x += joystick.deltaX()*0.15;
//    player.y += joystick.deltaY()*0.15;
//}


/* 
// UP
id("up").addEventListener("mousedown", function(){
  player.speedY = 4;
  player.y -= player.speedY;
});
id("up").addEventListener("mouseup", function(){
  player.speedY = 0;
});
id("up").addEventListener("touchstart", function(){
  player.speedY = 4;
  player.y -= player.speedY;
});
id("up").addEventListener("touchend", function(){
  player.speedY = 0;
});
  
// DOWN  
id("down").addEventListener("mousedown", function(){
  player.speedY= -4;
  player.y += player.speedY;
});
id("down").addEventListener("mouseup", function(){
  player.speedY = 0;
});
id("down").addEventListener("touchstart", function(){
  player.speedY= -4;
  player.y += player.speedY;
});
id("down").addEventListener("touchend", function(){
  player.speedY= 0;
});

// LEFT  
id("left").addEventListener("mousedown", function(){
  player.speedX = 4;
  player.x -= player.speedX;
});
id("left").addEventListener("mouseup", function(){
  player.speedX = 0;
});
id("left").addEventListener("touchstart", function(){
  player.speedX = 4;
  player.x -= player.speedX;
});
id("left").addEventListener("touchend", function(){
  player.speedX = 0;
});
  
//RIGHT  
id("right").addEventListener("mousedown", function(){
  player.speedX = -4;
  player.x += player.speedX;
});
id("right").addEventListener("mouseup", function(){
  player.speedX = 0;
});
id("right").addEventListener("touchstart", function(){
  player.speedX = -4;
  player.x += player.speedX;
});
id("right").addEventListener("touchend", function(){
  player.speedX = 0;
});
*/  






/*
___________________________________________________________________________________________________________________________________
*/



  
/*********** G A M E  L O O P ***********/

// currentTime for handling timing

function GAMELOOP(currentTime){
  
  // Main animation
  requestAnimationFrame(GAMELOOP);

  // Begin
  c.beginPath();
  // Clear canvas
  c.clearRect(0, 0, canvas.width, canvas.height);
  
  
  
  
  
  
  
  
  
/*********** UPDATE OBJECTS ***********/

  // Update _player
  
  // Martin's vector x and y values
  player.x += v.x; player.y += v.y;
  
  //Dead effect
  (!dead || Math.floor(player.y)%2) && player.update();
  finish.update();
 // !dead && joystickControl(); // removed - Martin's joystick is here instead of this
 
 
 
 
/*********** RESET GAME ***********/ 
 // If Player dies then reset game
 if(player.score_width <= 0) {alert("You DED at level: " + level); player.score_width = 60; _obsticles.length = 1; level = 1;}
 
 
 
 
 
 
/*********** SCORE ***********/
/*
  c.fillStyle = "white";
  c.font = "1em Arial";
  
  c.fillText(score, player.x + player.width/2 - score_center, player.y + player.height/2 + 7);
  
  // Center my score based on score's length
  if(score > 99)  score_center = 14;
  if(score < 99)  score_center = 9;
  if(score > 999) score_center = 19;
  
  // Reset game when score <= 0
  if(score <= 0) {alert("You DED at level: " + level); score = 100; _obsticles.length = 1; level = 1;}
  
*/
  
  
  

  
  
  
/*********** LEVEL ***********/

  c.fillStyle = "white";
  c.font = "1.1em Arial";
  c.fillText("LEVEL " +level, 15, 25);
  
  
  
  
  
  
  
  
/*********** COLLISION DETECTION: PLAYER x OBSTICLES ***********/

  // Update obsticles and check collisions
  for(var i = _obsticles.length-1; i >= 0; i--){
    // Update obsticles
    _obsticles[i].update();
    

   // If collision && !dead && !isAngel: dead = true and score--
   if (collision(player, _obsticles[i]) && !dead && isAngel == false){
     // Collision detected!  
     dead = true; // Set hero player to dead state
     player.score_width -= 5; // Decrease hero's score (width of healthbar)
     //score -= 10; // Decrease hero player's score
   }
  
  } // End of for loop that updates obsticles
 
 
 
 
 
 
 
 
 
 
  // Dead player
  // If dead, fall down
  if(dead){
    player.y += 9;
  }
  
  // If in start position, dead = false
  if(dead && player.y >= (canvas.height - player.width)){
    dead = false;
  }

  
  
  
  
  
  
  
  
  
  
/*********** COLLISION DETECTION: PLAYER x FINISH ***********/

  if(collision(player, finish)){
    // Collision detected 
       
    // When reach final gold block:
    // Center players x and y axis
    // Add player's score (increase HP bar's width)
    // Increase level
    // Draw a new obsticle
    // Place gold box with random x axis
    // Set isAngel to false to delete angel wings and immortallity
    // Clear angelDrops array
       
    player.x = canvas.width/2 - player.width/2;
    player.y = canvas.height;
    //score += 10;
    player.score_width += 5;
    level++;
    drawObsticles();
    finish.x = Math.floor((Math.random() * canvas.width));
    isAngel = false;
    _angelDrops.length = 0;
   }
   
   
   
   
   
   
   
   
   
  
  
/*********** COLLISION DETECTION: OBSTICLES x OBSTICLES ***********/

  for(var i = _obsticles.length-1; i >= 0; i--){
    for(var j = _obsticles.length-1; j >= 0; j--){
      
      // If collision between obsticles
      if (collision(_obsticles[i], _obsticles[j]) && i != j){
        
        // Collision detected - delete 1 obsticle
         _obsticles.splice(i, 1); // _obsticles[j].y += 3;
         
      } // End of if
    } // End of for loop [j]
  } // End of for loop [i]
  
  
  
  
  
  
  
  
  
  
/*********** ANGEL DROPS - WHEN HIT ANGEL DROP, DRAW ANGEL WINGS AND GAIN IMORTALITY ***********/  

  function generateAngelDrop(){
    for (var _ = 0; _<1; _++){
      // Launch every n seconds (here random) && only when hero IS NOT angel    
      if(currentTime >= lastTime + Math.floor(Math.random() * 160000) + 60000 && isAngel == false){
        lastTime = currentTime;
        
        // Create new angel drop (icon)
        var __angel = new AngelDrop();
        
        // Push angel drop to my angelDrops array
        _angelDrops.push(__angel);
      }
    }
    
    // Update angel drops
    for (var _ = _angelDrops.length - 1; _ >= 0; _--){
      // Update angel drops (icons) from my angelDrops array    
      _angelDrops[_].update();
      
      // Delete angel drops from screen when out of display
      if(_angelDrops[_].y > canvas.height) _angelDrops.splice(_, 1);
  }
    
  } generateAngelDrop();
  
  
  
  
  
  
  
  
  
  
  /*********** COLLISION DETECTION: PLAYER + ANGELDROPS ***********/
  
  for (var i = _angelDrops.length - 1; i >= 0; i--){
    // If collision  
    if (collision(player, _angelDrops[i])){
      
      // Collision detected
      // Set isAngel to true to draw angel wings
      // Splice angel drop (icon) from screen
      isAngel = true;
      _angelDrops.splice(i, 1);
    } 
  } 
  
  
  
  
  


  /*********** DRAW ANGEL WINGS ***********/
  
  // Angel wings update
  // Draw angel wings and give immortality to hero player
  if (isAngel === true){
    angelWings.update();
    angelWings.x = player.x;
    angelWings.y = player.y;
  }
  
  
  
  
  
  
  
  
} // End of GAMELOOP function

// Run GAMELOOP in loop
GAMELOOP();

}; // Onload func
