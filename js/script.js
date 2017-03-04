var counter = {
  scoreElt: document.getElementById("counter"),  
  score: 0, 
  scoreDisplay: function() {
    this.scoreElt.textContent = this.score;
  }, 
  addPoints: function() {
    this.score += 10; 
  }
}; /*** END counter Object ***/

var topScores = {
  scoreTable: [0,0,0,0,0],
  parsed: [], 
  updateScores: function () {
    for (let i = 0 ; i < 5 ; i ++) {
      // si le score est plus grand que l'un des highScore et qu'il n'existe pas encore dans le tableau
      if (counter.score > topScores.scoreTable[i] && (topScores.scoreTable.indexOf(counter.score)) == -1) {
        // alors le nouveau score est ajouté au tableau à la place de la valeur du précédent highscore
        topScores.scoreTable.splice(i, 0, counter.score); 
        // et la valeur en trop est supprimée
        topScores.scoreTable.splice(5, 1);
        // store les highscores
        localStorage.best = JSON.stringify(topScores.scoreTable); 
      }
    }
  }, 
  highScoreDisplay: function () {
    var listItem = document.querySelectorAll("#scoreList > li");
    for (let i = 0 ; i < 5 ; i++) {
      listItem[i].textContent = i +1 + ": " + topScores.parsed[i]; 
    }
  }
}; /*** END topScores Object ***/

var bomb = {
  container: document.querySelector(".gameContainer"), 
  element: document.getElementById("bomb"), 
  text: document.querySelector(".bombText"),
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
    this.text.textContent = "Catch me !"; 
  },
  endGame: function() {
      // end game animation 
      this.container.classList.add("endAnim"); 
      this.text.textContent = "You lost !"; 
  }
}; /*** END bomb Object ***/


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
  bomb.element.classList.remove("death"); 
  // Réinitialise le container
  bomb.container.classList.remove("endAnim"); 
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
  bomb.element.classList.add("death"); 
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

