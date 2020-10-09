const express = require('express')
const router = express.Router()
const findAnagrams = require('find-anagrams');
// const words_list = require('./words_array_file.js')
const words_list = require('../_files/words_array_file.js')


// Get one
router.get('/:word', async (req, res) => {
  try {
    let input_word = (req.params.word).toLowerCase();

    //working file import
    //console.log(words_list.contents.words_array)
    let all_words = words_list.contents.words_array


    // basic search works
    // let result = findAnagrams([
    //   'listen',
    //   'silent',
    //   'enlist',
    //   'word',
    //   'dog',
    //   'god',
    //   'server',
    //   'revers',
    //   "hat","ah","ha","th","at","a"
    // ], 'ha');
    // console.log(result)

    let valid_scrabble_words = []
    // findAnagrams will only return anagrams
    // result.push(findAnagrams(all_words, 'ha'))
    // console.log(result)

    //works
    //console.log(all_words.includes('a'))


    //works, splits up a words into all possible combinations
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
    //console.log(letters)

    //works, removes duplicates from letter combinations
    let uniqueCombinations = []
    letterCombinations.forEach((l) => {
      if (!uniqueCombinations.includes(l)) {
        uniqueCombinations.push(l)
      }
    })
    //console.log('unique combos ' + uniqueCombinations)




    // works, checks to see if the letterCombos are valid against the all_words
    //let letterCombiations = ["hat","ah","ha","th","at","a",'h','t','ht','ta','tha']
    uniqueCombinations.forEach(letterCombo => {
      if (all_words.includes(letterCombo)) {
        valid_scrabble_words.push(letterCombo)
      }
    });

    // sorting scrabble words by value
    // let arr = ["hat","ha","ah","at","a","th"]
    let wordsAndValues = {}
    let ranked_array = []
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

    var letter, i, sum = 0;
      for (i = 0; i < word.length; i++) {
        letter = word[i];
        sum += alphabet[letter];
      }
      //console.log(word, sum)
      wordsAndValues[word] = sum
      
      // 

    })

    // console.log(obj)
    //console.log(sum)
    // sort the values
    var valueSortedWords = [];
    for (var i in wordsAndValues) {
      valueSortedWords.push([i, wordsAndValues[i]]);
    }

    valueSortedWords.sort(function(a, b) {
        return b[1] - a[1];
    });

    console.log(valueSortedWords)

    let wordsToReturn = []

    valueSortedWords.forEach(word => {
      wordsToReturn.push(word[0].toString())
    })

    console.log('this is wordsToReturn ' + wordsToReturn)





    //console.log(valid_scrabble_words)
    //res.send(valid_scrabble_words)
    console.log(wordsToReturn)
    res.send(wordsToReturn)
    // working
    // res.send(req.params.id)
  } catch (err) {
    res.status(500).json({message: err.message})
  }  
})

// Get all
router.get('/', async (req, res) => {
  try {
    res.send('Hello! To get a value sorted anagram list of a word, enter a word to the end of the address at http://localhost:8080/words/. Try http://localhost:8080/words/hat')
  } catch (err) {
    res.status(500).json({message: err.message})
  }
})

// Stopped at 12 minutes: https://www.youtube.com/watch?v=fgTGADljAeg



// fetch('._files/words.json').then(res => res.json()).then(console.log)


 

module.exports = router