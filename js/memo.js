var card = document.querySelectorAll(".cards");
var message = document.querySelector("#message");
var cards = Array.from(card);
var openedCards = [];
var maxPairs = 6;
var counter = 0;
var second = 0;
var minute = 0;
var timer = document.querySelector("#time");
var interval;

function startTimer() {
    interval = setInterval(function() {
        timer.textContent = minute + " mins " + second + " secs";
        second++;
        if(second == 60) {
            minute++;
            second = 0;
        }
        minute = minute % 60;
    }, 1000);
}


function generateCards() {
	let container = document.querySelector("#container");
	cards = random(cards);
	container.innerHTML = "";
	for (var i = 0; i < cards.length; i++) {
		container.append(cards[i]);
	}	
}

generateCards();
startTimer();

for (var i = 0; i < cards.length; i++) {
		cards[i].addEventListener("click", display);		
};

function display() {
		this.lastChild.classList.toggle("show");
		openedCards.push(this);
		clickable(openedCards, false);
	 	if (openedCards.length === 2) {
	 		if (openedCards[0].getAttribute("flag") === openedCards[1].getAttribute("flag")) {
	 			openedCards[0].classList.add("hide");
	 			openedCards[1].classList.add("hide");	
	 			openedCards = [];
	 			counter++;
	 		} else {
	 			setTimeout(function() {
	 				clickable(openedCards, true);
	 				openedCards[0].lastChild.classList.toggle("show");
	 				openedCards[1].lastChild.classList.toggle("show");
	 				openedCards = [];
	 			}, 300)
	 		}

	 		if (counter === maxPairs) {
	 			setTimeout(function(){
	 				message.textContent = "WELL DONE!"
	 				clearInterval(interval);
	 			}, 500);
	 		}
	} 	
}

function clickable(openedCards, clickable) {
	for (var i = 0; i < openedCards.length; i++) {
		if (clickable) {
			openedCards[i].addEventListener("click", display);	
		} else {
			openedCards[i].removeEventListener("click", display);
		}
	}
}

function random(arr){
	var currentIndex = arr.length;
	var temp = 0;
	var randomIndex = 0;

	while (currentIndex != 0) {
		randomIndex = Math.floor(Math.random() * currentIndex);
		currentIndex--;
		temp = arr[currentIndex];
		arr[currentIndex] = arr[randomIndex];
		arr[randomIndex] = temp; 
	}
	return arr;
}