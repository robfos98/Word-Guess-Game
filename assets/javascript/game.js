LETTERS = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
letters = "abcdefghijklmnopqrstuvwxyz";
greeting = "Press any letter to play!"
admonishment = "Please enter a letter."
winCount = 0;
wordList = ["apple","banana","curt","dippleripple"];

game = {
    previousGuesses: "",
    letterGuess: "",
    wrongGuesses: "",
    word: "",
    flip: false,

    aboutLetters: function() {
        this.flip = !this.flip;
        var a = document.getElementsByTagName("h4");
        if(this.flip) {
            a.innerText = greeting;
        }
        else {
            a.innerText = admonishment;
        }
    },

    displayWord: function() {
        console.log(this.word);
        console.log(this.wrongGuesses);
    },

    start: function() {
        this.aboutLetters();
        console.log(wordList);
        this.word = wordList[Math.floor(Math.random() * wordList.length)];
        this.displayWord();
        console.log(this.word);
    },

    countDown: function() {
        console.log("countdown")
    },

    newGuess: function(a) {
        this.letterGuess = a;

        if(letters.indexOf(this.letterGuess) >= 0) {
            this.letterGuess = LETTERS[letters.indexOf(this.letterGuess)];
            if(!this.flip) {
                aboutLetters();
            }
        }
        else if (LETTERS.indexOf(this.letterGuess) < 0 && this.flip) {
            this.aboutLetters();
        }

        if(this.previousGuesses.indexOf(this.letterGuess) < 0) {
            this.previousGuesses += this.letterGuess;
            if(this.word.indexOf(this.letterGuess) < 0) {
                this.wrongGuesses += this.letterGuess;
                this.countDown();
            }
            else {
                this.displayWord();
            }
        
        }

    },
}

game.start();
document.onkeyup = function(){
    game.newGuess(event.key);
}