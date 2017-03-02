var counter = {
  scoreElem: document.getElementById("counter"),  
  highScoreElem: document.getElementById("highScore"), 
  highScore: localStorage.storedHighScore, 
  score: 0, 
  calcHighScore: function() {
    if (counter.score > counter.highScore) {
      counter.highScore = counter.score; 
      localStorage.storedHighScore = counter.highScore; 
    }
  },
  scoreDisplay: function() {
    this.scoreElem.innerHTML = "Score: " + this.score;
  }, 
  highScoreDisplay: function() {
    this.highScoreElem.innerHTML = "High Score: " + localStorage.storedHighScore;
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
    window.requestAnimationFrame(function() { 
      bomb.element.classList.add("transition");
    });
    this.element.innerHTML = "Click me !"; 
  },
  endGame: function() {
      // end game animation 
      document.querySelector(".container").classList.add("endAnim"); 
      this.element.innerHTML = "You lost !"; 
  }
}; 


var topScores = {
  scoreTable: [0,0,0,0,0],
  stringify: "", 
  parsed: [], 
  // stringify: function() { 
  //    JSON.stringify(this.scoreTable);
  // },
  // parsed: function() {
  //   JSON.parse(localStorage.best);
  // }, 
  updateScores: function () {
    for (let i = 0 ; i < 5 ; i ++) {
      if (counter.score > topScores.scoreTable[i] && (topScores.scoreTable.indexOf(counter.score)) == -1) {
        topScores.scoreTable.splice(i, 0, counter.score); 
        topScores.scoreTable.splice(5, 1); 
        console.log(topScores.scoreTable); 
        topScores.stringify = JSON.stringify(topScores.scoreTable); 
        console.log(topScores.stringify); 
        topScores.parsed = JSON.parse(topScores.stringify); 
        console.log(topScores.parsed); 
      }
    }
  }, 
  displayScore: function () {
    var listItem = document.querySelectorAll("#scoreList > li");
    for (let i = 0 ; i < 5 ; i++) {
      listItem[i].innerHTML = topScores.parsed[i]; 
    }
  }

}


// console.log(listItem[1]); 
//       for (let i = 0 ; i < 5 ; i++) {
//         listItem[i].innerHTML = topScores.parsed; 
//       }

// console.log(topScores.parsed); 



// var bestScores = [0, 0, 0, 0, 0]; 
// var displayScore; 
// var parsed = JSON.parse(localStorage.best);

 
//   for (let i = 0 ; i < 5 ; i++) {
//    // si le score est plus grand que l'un des highScore et qu'il n'existe pas encore dans le tableau
//     if (counter.score > bestScores[i] && (bestScores.indexOf(counter.score)) == -1) {
//       // alors le nouveau score est ajouté au tableau
//       bestScores.splice(i, 0, counter.score); 
//       // et la valeur en trop est supprimée
//       bestScores.splice(5, 1);
//     }
//   }
  
      // localStorage.best = JSON.stringify(bestScores);
      // console.log( localStorage.best);  









/**** Début de partie ****/
// Affiche le score et highScore
counter.scoreDisplay(); 
counter.highScoreDisplay(); 

/**** Partie ****/
function bombClick() {
  // Réinitialise le container
  document.querySelector(".container").classList.remove("endAnim"); 
  // Random position
  // bomb.position(); 
  //Relance l'animation au click
  bomb.animation(); 
  // Counter
  counter.addPoints(); 
  counter.scoreDisplay(); 
} /*** END bombClick() ***/

 
/**** Fin de partie ****/ 
bomb.element.addEventListener("animationend", function() {
  //fonction highScore et counter restart
  counter.calcHighScore(); 
  counter.highScoreDisplay(); 
  //adds the end of game animation
  bomb.endGame(); 

  topScores.updateScores(); 
  topScores.displayScore(); 
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

