/* GLOBAL VARIABLES */

let icons = [
   // fontawesome icons as unicode
   'f13d;', //anchor
   'f77c;', //baby
   'f1e2;', //bomb
   'f5d7;', //bone
   'f207;', //bus
   'f787;', //carrot
   'f6be;', //cat
   'f441;', //chess-knight
   'f561;', //cocktail
   'f4b8;', //couch
   'f520;', //crow
   'f6d5', //dragon
   'f0f0;', //user-med
   'f52e;', //frog
   'f3a5;', //gem
   'f7a6;', //guitar
   'f717;', //spider
   'f7a2;', //globe-europe
   'f1e3;', //futbol
   'f578;', //fish
   'f4fb;', //user-astronaut
   'f63b;', //truck-monster
   'f0f4;', //coffee
   'f7d0;', //snowman
   'f6de;', //fist-raised
   'f753;', //meteor
   'f083;', //camera-retro
   'f21b;', //user-secret
   'f0c7;' //save
];

let score = 0;
let firstClick, secondClick;
let alreadyClicked = false;
let time = 0;
let idInterval;

/* DOM ELEMENTS */
const cards = document.querySelectorAll('.card');

let feedbackDisplay = document.querySelector('.feedback');
let scoreDisplay = document.querySelector('.score');

let timerDisplay = document.querySelector('.timer');

/* GAME */
generateBoard();
setTimer();

function generateBoard() {
   cards.forEach(function(card) {
      card.addEventListener('click', cardClick);
   });

   //initially mix icons in boards
   mixIt();

   for (let i = 0; i < 18; i++) {
      //populate boards with unicode fontawesome icons
      cards[i].innerHTML = '&#x' + icons[i];
      cards[i].dataset.id = icons[i];
   }

   let randomFirstCard = Math.floor(Math.random() * 9);
   let randomSecondCard = Math.floor(Math.random() * 9) + 9;

   cards[randomSecondCard].innerHTML = '&#x' + icons[randomFirstCard];
   cards[randomSecondCard].dataset.id = icons[randomFirstCard];

   let matchingID;
   matchingID = icons[randomFirstCard];
   // console.log(matchingID);
}

//shuffle an array with icons >> Fisher-Yates algorithm
function mixIt() {
   for (var i = icons.length - 1; i >= 0; i--) {
      var randomIndex = Math.floor(Math.random() * (i + 1));
      var itemAtIndex = icons[randomIndex];

      icons[randomIndex] = icons[i];
      icons[i] = itemAtIndex;
   }
   return icons;
}

function cardClick() {
   if (this === firstClick) return; // prevent to click the same card twice

   this.classList.add('clicked');

   if (!alreadyClicked) {
      firstClick = this;
      alreadyClicked = true;
      return;
   }
   secondClick = this;
   alreadyClicked = false;

   removeListeners();
   checkMatch();
}

//prevent clicking after decision-making
function removeListeners() {
   cards.forEach(function(card) {
      card.removeEventListener('click', cardClick);
   });
}

function checkMatch() {
   resetTimer();
   let match = firstClick.dataset.id === secondClick.dataset.id;
   match ? correct() : negative();
}

function correct() {
   feedbackDisplay.classList.add('correct');
   feedbackDisplay.innerText = 'Correct!';
   score++;
   reset();
}

function negative() {
   feedbackDisplay.classList.add('negative');
   feedbackDisplay.innerText = 'Negative!';
   score--;
   reset();
}

function reset() {
   setTimeout(function() {
      firstClick.classList.remove('clicked');
      secondClick.classList.remove('clicked');
      feedbackDisplay.classList.remove('negative', 'correct');
      feedbackDisplay.innerText = ' ↖ Match them ↗ ';
      scoreDisplay.innerText = `Score: ${score}`;
      generateBoard();
      setTimer();
   }, 2000);
}

function setTimer() {
   idInterval = setInterval(function() {
      time++;
      timerDisplay.innerText = `${(time / 100).toFixed(2)}`;
   }, 10);
}

function resetTimer() {
   time = 0;
   clearInterval(idInterval);
}
