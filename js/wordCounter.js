document.getElementById("button").addEventListener("click", function() {
  var runCounter = new WordFrequencyCounter("wordCount", "output");
  runCounter.count();
});


class WordFrequencyCounter {

  constructor(input, output) {
    // first turn the input into lowercase, then split the words and make it into an array
    this.input = document.getElementById(input).value.toLowerCase().split(/[\n <>.,\?!#¤%&()="/]/);;
    this.output = document.getElementById(output);
  }

  /**
   * This function makes the functions putIntoArrays, sortAlphabetically and
   * displayWordsAndCount run when the HTML button is clicked
   */
  count() {
    this.putIntoArrays(); // calls on putIntoArrays function, which puts unique words and their respective count found in input into an array
    this.sortAlphabetically(); // calls on sortAlphabetically function, which sorts the words along with their respective count alphabetically
    this.displayWordsAndCount(); // calls on displayWordsAndCount function, which prints out the words and count with their respective first letter as headline
  }

  /**
   * This function pushes words and count into arrays
   */
  putIntoArrays() {
    this.words = []; // this initialises an array called words which will contain the unique words found in input
    this.count = []; // this initialises an array called count of which the i-th element will contain the number of appearances of the i-th word in the array 'words'
    for (var i = 0; i < this.input.length; i++) {
      if (this.words.includes(this.input[i]) == true) { // Checks if the word is already present in array 'words'
        this.count[this.words.indexOf(this.input[i])] += 1; // If so, add 1 to the respective count
      } else {
        this.words.push(this.input[i]); // Otherwise, append the array 'words' with the new word
        this.count.push(1); // and set the respective count to 1
      }
    }
  }

  /**
   * This function sorts the words alphabetically along with their respective counts
   */
  sortAlphabetically() {
    this.items = []; // initialise the array that will contain the objects
    for (var i = 0; i < this.words.length; i++) {
      // let the objects of array items contain the following properties: the sorted words, and the respective counts
      this.items[i] = {
        words: this.words[i],
        count: this.count[i]
      };
    }

    // For two inputs, a and b, it will put 'a' before 'b' in the sort order if the function(a,b ) would return -1,
    // it will put 'b' before 'a' if the function(a, b) would return 1,
    // and it gives no preference (doesn't care) if function (a,b) would return 0.
    this.items.sort(function(a, b) {
      // if some word1 is 'smaller' than some other word2 (lexicographically),
      // that first word1 must come before that other word, so function(word1, word2) should return -1
      if (a.words < b.words) {
        return -1;
      }
      if (a.words > b.words) {
        return 1;
      }
      return 0;
    });
  }

  /**
   * This function displays the result under their respective first letter
   */
  displayWordsAndCount() {
    this.output.innerHTML = "";
    this.lastLetter = "00"; // start off with something that will never match the first character of anything
    for (var i = 0; i < this.items.length; i++) {
      var print = document.getElementById("output");
      var currentLetter = this.items[i].words.charAt(0); // finds the first character of every word
      if (currentLetter.match(/[a-z,æøå]/) !== null) { // check if the first character of the word at the j-th element of this.items matches one of the characters
        if (currentLetter !== this.lastLetter) { // if the current first letter is not equal to the last first letter, do the following:
          this.lastLetter = currentLetter; // change lastLetter to the current first letter
          print.innerHTML += "<h2>" + currentLetter + "</h2>" + "<br>"; // then make a header for that letter
          print.innerHTML += this.items[i].words + " : " + this.items[i].count + "<br>"; // and display the word containing the new letter as well as the count
        } else {
          print.innerHTML += this.items[i].words + " : " + this.items[i].count + "<br>"; // otherwise, it is not a new letter, and do not make a header, just display the new word and its count
        }
      }
    }
  }
}
