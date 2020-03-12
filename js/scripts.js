var _this;
var maxChances = 6;

var gameController = {
    form: document.querySelector('form'),
    input: document.querySelector('[name="guess"]'),
    word: document.querySelector('.word'),
    chances: document.querySelector('.chances'),
    previousGuesses: document.querySelector('.previous-guesses'),
}

function Hangman() {
    // properties
    this.runGame = true;
    this.words = ["apple", "pineapples", "apples", "kiwi", "peach", "bananas", "reserved", "pears", "mangoes", "Guava", "mountain", "hills", "valleys", "rivers", "streams", "lakes"];
    this.word = '';
    this.displayString = '';
    this.chances = maxChances;
    this.previousGuesses = [];

    //Methods
    this.run = function () {
        this.setup();
        _this = this;
        gameController.form.addEventListener('submit', this.guessLetter); //We can add the event listener to the form instead of the button becauses the button is type="submit"
    };

    this.setup = function () {
        // Reset the game back to a strating position
        gameController.previousGuesses.innerHTML = '';
        this.previousGuesses = [];
        this.chances = maxChances;
        this.displayString = '';
        // Get a new word
        var i = Math.floor(Math.random() * this.words.length);
        this.word = this.words[i];
        //How do we display enough empty spaces
        for (var i = 0; i < this.word.length; i++) this.displayString += '_'; //for loops do need {} braces IF we only have 1 line of code inside the loop. "this.displayString += '_';" is actually INSDE THE LOOP

        gameController.word.textContent = this.displayString;// get our value to show on screen
        gameController.chances.textContent = this.chances;// get our value to show on screen
        // get our values to show in console
        console.log(this.word);
    };


    this.guessLetter = function (event) {
        event.preventDefault();
        //Checked if the guessed lettr is in the word
        var letterOfWord = gameController.input.value;
        var lowerLetters = letterOfWord.toLowerCase();

        _this.previousGuesses.push(letterOfWord);
        console.log(_this.previousGuesses);
        
        if (_this.word.includes(lowerLetters)) {
            
            //Update the display string (showin the letters)
            for (var i = 0; i < _this.word.length; i++) {
                // Loop through each letter in our word, one by one
                var currentChar = _this.word.substr(i, 1);
                //If he current chaacter matches what we have guessed
                if (currentChar === lowerLetters) {
                    _this.displayString = //Slice the pieces that we need
                        _this.displayString.slice(0, i) +   // is grabbing al the underscores BEFORE our matched characters
                        currentChar + //
                        _this.displayString.slice(i + 1, _this.displayString.length);


                    // We still have to output our code to the browser
                    gameController.word.textContent = _this.displayString;
                    
                }
            }


            // Has the word been completely solved?
            if (!gameController.word.textContent.includes('_')) {
                // Wins
                _this.win();
            }
        } else {
            // Letter is not in word
            //Burn one chance
            _this.chances--;
            //update user interface
            gameController.chances.textContent = _this.chances;

            //Check for Game Over

            if (_this.chances < 0) {
                // Loses
                _this.lose();
            }
        }
        gameController.input.value = '';

    };

    // this.win() = function () {
    //     if (confirm('You Win! Play again?')) {
    //         this.setup();
    //     }
    // };


    // this.lose() = function () {
    //     if (confirm('You lose! Play again?')) {
    //         this.setup();
    //     }
    // };

};

//END OF FILE
var game = new Hangman();
game.run();

//https://developer.mozilla.org/en-US/docs/Web/Guide/HTML/Editable_contentt

// windows.onload = function() {
//     var element = document.getElementById('editable');
//     //Toggle contentEditable = true on click
//     element.onclick = function(e) {
//         this.contentEditable = true;
//         this.focus();
//         this.style.backgroundColor = '#E0E0E0';

//     }
// }