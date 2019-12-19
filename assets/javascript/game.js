LETTERS = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
letters = "abcdefghijklmnopqrstuvwxyz"; //In two lines. Variable names I will never surpass.
greeting = "Press any letter to play!"
admonishment = "Please enter a letter."
winCount = 0;
wordList = ["GALLOWS","GIBBET","TREE","HANGMAN","NOOSE","LYNCHING","TRAPDOOR","EXECUTION","ASPHYXIATION","CONDEMNED","CAPITAL","STRANGULATION"]; //These have to be uppercase.

game = {
    previousGuesses: "",
    letterGuess: "",
    word: "",
    flip: true,
    tries: 0,

    aboutLetters: function() { //flip is just for toggling this.
        this.flip = !this.flip;
        var a = document.getElementById("potato"); // I can't figure out how to call by <h3>
        if(this.flip) {
            a.innerText = greeting;
        }
        else {
            a.innerText = admonishment;
        }
    },

    displayWord: function() {//When they need to see how long their new word is, and when they get a letter.
        var underScorey = "";
        for(i = 0; i < this.word.length; i++) {//this whole thing figures out what letters they have and displays it
            if(this.previousGuesses.indexOf(this.word[i]) < 0) {
                underScorey += "_";
            }
            else {
                underScorey += this.word[i]
            }
        }
        var a = document.getElementById("word");
        a.innerText = underScorey;

        if(underScorey.indexOf("_") < 0) {//If there are no underscores left, they've guessed the whole word. They win!
            winCount++;
            var a = document.getElementById("wins");
            a.innerText = winCount;
            this.start();
        }
    },

    start: function() { //this randomly picks a word, and prepares all the local variables (except the user input, letterGuess)
        var a = document.getElementById("potato");  //These two lines only really need to happen once, with the start down there,
        a.innerText = greeting;                     //but I wanted as much as possible in the object.
        this.previousGuesses = "";
        this.word = wordList[Math.floor(Math.random() * wordList.length)];
        this.displayWord();
        this.tries = Math.floor((26 - this.word.length)/2) + 1; // Fewer tries for longer words--could be better if it dealt with repeated letters.
        this.countDown();
    },

    countDown: function() { //If the guess isn't in the word. Also called once by start()
        this.tries -= 1; //This function is where countdown is displayed, for space, so this.tries has to be set to one more than 
        var a = document.getElementById("countdown"); //what it will actually be.
        a.innerText = this.tries;
        if(!this.tries) { //Loss condition. No loss counter, huh?
            this.start();
        }
},

    newGuess: function(a) {
        this.letterGuess = a;

        if(letters.indexOf(this.letterGuess) >= 0) { //This makes lowercase into uppercase
            this.letterGuess = LETTERS[letters.indexOf(this.letterGuess)]; 
        }
        else if (LETTERS.indexOf(this.letterGuess) < 0) {
            if(this.flip) {
                this.aboutLetters(); //It's gotta be a letter
            }
            return; //If it isn't a letter, don't do anything with it.
        }
        if(!this.flip) {
            this.aboutLetters(); //This is set up if flip is true, <h4> will display the greeting, and flip is False when the user
        }                        //inputs something besides a letter.

        if(this.previousGuesses.indexOf(this.letterGuess) < 0) { //If it's a new letter, it isn't or it is in the word, respectively.
            this.previousGuesses += this.letterGuess;
            if(this.word.indexOf(this.letterGuess) < 0) {
                this.countDown();
            }
            else {
                this.displayWord();
            }
            var a = document.getElementById("guessed");
            a.innerText = this.previousGuesses;
        }

    },
}

game.start(); //This only needs to happen here once; the game automatically starts again after each previous one.
document.onkeyup = function(){
    game.newGuess(event.key); //This happens whenever the player presses a button
}