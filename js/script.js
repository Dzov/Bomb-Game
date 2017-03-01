var bomb = document.getElementById("bomb"); 
var counter = document.getElementById("counter"); 
var count = 0; 
counter.innerHTML = "Score: " + count; 


function bombClick() {
  bomb.style.left = Math.floor((Math.random() * 900) + 1) + "px"; 
  bomb.style.top = Math.floor((Math.random() * 500) + 1) + "px"; 
  
  //Relance l'animation au click
  bomb.classList.remove("transition"); 
  void bomb.offsetWidth; // https://css-tricks.com/restart-css-animation/
  bomb.classList.add("transition"); 

  // Counter
  count += 10; 
  counter.innerHTML = "Score: "+ count; 
}




bomb.addEventListener("animationend", function(){ 
  alert("You lose"); 
  count = 0; 
}); 


