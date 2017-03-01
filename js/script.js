var counter = {
  scoreElem: document.getElementById("counter"),  
  highScoreElem: document.getElementById("highScore"), 
  highScore: 0, 
  score: 0, 
  scoreDisplay: function() {
    this.scoreElem.innerHTML = "Score: " + this.score;
  }, 
  highScoreDisplay: function() {
    this.highScoreElem.innerHTML = "High Score: " + this.highScore;
  },
  addPoints: function() {
    this.score += 10; 
  }
}; 


var bomb = {
  element: document.getElementById("bomb"), 
  // random position 
  position: function() { 
    this.element.style.left = Math.floor((Math.random() * 1200) + 1) + "px"; 
    this.element.style.top = Math.floor((Math.random() * 500) + 1) + "px"; 
  }, 
  // restart bomb animation 
  animation: function() {
    this.element.classList.remove("transition"); 
    void this.element.offsetWidth; // https://css-tricks.com/restart-css-animation/
    this.element.classList.add("transition");
    this.element.innerHTML = "Click me !"; 
  },
  endGame: function() {
    this.element.addEventListener("animationend", function() {
      // highScore
      if (counter.score > counter.highScore) {
        counter.highScore = counter.score; 
      }
      counter.highScoreElem.innerHTML = "High Score: " + counter.highScore; 

      // end game animation + counter restart
      document.querySelector(".container").classList.add("endAnim"); 
      bomb.element.innerHTML = "You lost !"; 
      counter.score = 0; 
    }); 
  }
}; 

counter.scoreDisplay(); 
counter.highScoreDisplay(); 

// Fonction au click de la bombe
function bombClick() {
  // Réinitialise le container
  document.querySelector(".container").classList.remove("endAnim"); 

  // Random position
  bomb.position(); 

  //Relance l'animation au click
  bomb.animation(); 

  // Counter
  counter.addPoints(); 
  counter.scoreDisplay(); 
}

// Fin de partie - fonction highScore et counter restart
bomb.endGame(); 








//   var x = count % 10; 
//   console.log(x + "  he"); 
//   if (x == 0 && count > 0) {
//     console.log("helloe"); 
//     var ghost = document.createElement("img"); 
//     ghost.setAttribute("src", "img/shrimp.png"); 
//     ghost.setAttribute("height", "100"); 
//     ghost.setAttribute("width", "100"); 

//     document.querySelector(".container").appendChild(ghost); 
//   }

