var counter = {
  scoreElt: document.getElementById("counter"),  
  score: 0, 
  scoreDisplay: function() {
    this.scoreElt.innerHTML = this.score;
  }, 
  addPoints: function() {
    this.score += 10; 
  }
}; /*** END counter Object ***/


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
    window.requestAnimationFrame(function() { 
      bomb.element.classList.add("transition");
    });
    this.element.innerHTML = "Click me !"; 
  },
  endGame: function() {
      // end game animation 
      document.querySelector(".gameContainer").classList.add("endAnim"); 
      this.element.innerHTML = "You lost !"; 
  }
}; /*** END bomb Object ***/


var topScores = {
  scoreTable: [0,0,0,0,0],
  parsed: [], 
  updateScores: function () {
    for (let i = 0 ; i < 5 ; i ++) {
      // si le score est plus grand que l'un des highScore et qu'il n'existe pas encore dans le tableau
      if (counter.score > topScores.scoreTable[i] && (topScores.scoreTable.indexOf(counter.score)) == -1) {
        // alors le nouveau score est ajouté au tableau
        topScores.scoreTable.splice(i, 0, counter.score); 
        // et la valeur en trop est supprimée
        topScores.scoreTable.splice(5, 1);

        console.log(topScores.scoreTable); 
        localStorage.best = JSON.stringify(topScores.scoreTable); 
        console.log(topScores.stringify); 
        topScores.parsed = JSON.parse(localStorage.best); 
        console.log(topScores.parsed); 
      }
    }
  }, 
  highScoreDisplay: function () {
    var listItem = document.querySelectorAll("#scoreList > li");
    for (let i = 0 ; i < 5 ; i++) {
      listItem[i].innerHTML = i +1 + ": " +topScores.parsed[i]; 
    }
  }
} /*** END topScores Object ***/

if (localStorage.best) {
  topScores.parsed = JSON.parse(localStorage.best); 
  topScores.scoreTable = topScores.parsed; 
}


/*****************  JEU  *******************/


/**** Début de partie ****/
// Affiche le score et highScore
counter.scoreDisplay(); 
topScores.highScoreDisplay(); 


/**** Partie ****/
function bombClick() {
  // Réinitialise le container
  document.querySelector(".gameContainer").classList.remove("endAnim"); 
  // Random position
  bomb.position(); 
  //Relance l'animation au click
  bomb.animation(); 
  // Calculates and displays score
  counter.addPoints(); 
  counter.scoreDisplay(); 
} /*** END bombClick() ***/

 
/**** Fin de partie ****/ 
bomb.element.addEventListener("animationend", function() {
  //adds the end of game animation
  bomb.endGame(); 
  // Calculates and displays High Scores
  topScores.updateScores(); 
  topScores.highScoreDisplay(); 
  // restarts the counter
  counter.score = 0; 
}); /*** END onanimationend() ***/




















// GHOST OBJECT

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

