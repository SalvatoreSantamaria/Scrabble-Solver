const express = require('express')
const router = express.Router()
const findAnagrams = require('find-anagrams');
const words_list = require('./words_array_file.js')


// Get one
router.get('/:id', (req, res) => {

  let input_word = req.params.id;

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

  // works, checks to see if the letterCombos are valid against the all_words
  //let letterCombiations = ["hat","ah","ha","th","at","a",'h','t','ht','ta','tha']
  letterCombinations.forEach(letterCombo => {
    if (all_words.includes(letterCombo)) {
      valid_scrabble_words.push(letterCombo)
    }
  });

  console.log(valid_scrabble_words)
  res.send(valid_scrabble_words)
  // working
  // res.send(req.params.id)
  
})

// Get all
router.get('/', (req, res) => {
  res.send('Hello world')
})

// Stopped at 12 minutes: https://www.youtube.com/watch?v=fgTGADljAeg



// fetch('._files/words.json').then(res => res.json()).then(console.log)


 

module.exports = router