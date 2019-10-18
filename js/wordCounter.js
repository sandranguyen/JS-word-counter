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
    this.putIntoArrays();
    this.sortAlphabetically();
    this.displayWordsAndCount(); 
  }

  /**
   * This function pushes words and count into arrays
   */
  putIntoArrays() {
    this.words = []; 
    this.count = [];
    for (var i = 0; i < this.input.length; i++) {
      if (this.words.includes(this.input[i]) == true) { // Checks if the word is already present in array 'words'
        this.count[this.words.indexOf(this.input[i])] += 1;
      } else {
        this.words.push(this.input[i]);
        this.count.push(1); 
      }
    }
  }

  /**
   * This function sorts the words alphabetically along with their respective counts
   */
  sortAlphabetically() {
    this.items = []; 
    for (var i = 0; i < this.words.length; i++) {
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
      var currentLetter = this.items[i].words.charAt(0); 
      if (currentLetter.match(/[a-z,æøå]/) !== null) {
        if (currentLetter !== this.lastLetter) {
          this.lastLetter = currentLetter; 
          print.innerHTML += "<h2>" + currentLetter + "</h2>" + "<br>";
          print.innerHTML += this.items[i].words + " : " + this.items[i].count + "<br>"; 
        } else {
          print.innerHTML += this.items[i].words + " : " + this.items[i].count + "<br>";
        }
      }
    }
  }
}
