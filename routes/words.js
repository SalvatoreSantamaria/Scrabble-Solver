const express = require('express')
const router = express.Router()
const words_list = require('../_files/words_array_file.js')

router.get('/', async (req, res) => {
  try {
    res.send('Hello! To get a value sorted anagram list of a word, enter a word to the end of the address at http://localhost:8080/words/. Try http://localhost:8080/words/hat')
  } catch (err) {
    res.status(500).json({message: err.message})
  }
})

router.get('/:word', async (req, res) => {
  try {
    let input_word = (req.params.word).toLowerCase();
    let all_words = words_list.contents.words_array
    let valid_scrabble_words = []

    //splits up all words into all possible combinations
    var tree = function(leafs) {
      var branches = [];
      if (leafs.length == 1) return leafs;
      for (var k in leafs) {
        var leaf = leafs[k];
        tree(leafs.join('').replace(leaf, '').split('')).concat("").map(function(subtree) {
          branches.push([leaf].concat(subtree));
        });
      }
      return branches;
    };
    let letterCombinations = tree(input_word.split('')).map(function(str) {
      if (str.length > 1) {
        return str.join('')
      } else {
        return str
      }
    })

    // removes duplicates from letter combinations
    let uniqueCombinations = []
    letterCombinations.forEach((l) => {
      if (!uniqueCombinations.includes(l)) {
        uniqueCombinations.push(l)
      }
    })

    // check to see if the letterCombos are valid against the all_words
    uniqueCombinations.forEach(letterCombo => {
      if (all_words.includes(letterCombo)) {
        valid_scrabble_words.push(letterCombo)
      }
    });

    // sort scrabble words by value
    let wordsAndValues = {}
    valid_scrabble_words.forEach(word => {
      let alphabet = {
        a: 1,
        b: 3,
        c: 3,
        d: 2,
        e: 1,
        f: 4,
        g: 2,
        h: 4,
        i: 1,
        j: 8,
        k: 5,
        l: 1,
        m: 3,
        n: 1,
        o: 1,
        p: 3,
        q: 10,
        r: 1,
        s: 1,
        t: 1,
        u: 1,
        v: 4,
        w: 4,
        x: 8,
        y: 4,
        z: 10
    }

    let letter, i, sum = 0;
      for (i = 0; i < word.length; i++) {
        letter = word[i];
        sum += alphabet[letter];
      }
      wordsAndValues[word] = sum
    });

    let valueSortedWords = [];

    for (let i in wordsAndValues) {
      valueSortedWords.push([i, wordsAndValues[i]]);
    }
    valueSortedWords.sort(function(a, b) {
        return b[1] - a[1];
    });
    console.log(valueSortedWords)

    // return words
    let wordsToReturn = []
    valueSortedWords.forEach(word => {
      wordsToReturn.push(word[0].toString())
    })

    res.send(wordsToReturn)

  } catch (err) {
    res.status(500).json({message: err.message})
  }  
})

module.exports = router