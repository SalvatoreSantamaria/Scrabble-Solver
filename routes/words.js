const express = require('express')
const router = express.Router()
const findAnagrams = require('find-anagrams');
const words_list = require('./words_array_file.js')


// Get all
router.get('/', (req, res) => {

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
  let letterCombinations = tree("hat".split('')).map(function(str) {
    return str.join('')
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


  res.send('Hello world')
})

// Get one
router.get('/:id', (req, res) => {
  res.send(req.params.id)
})

// Stopped at 12 minutes: https://www.youtube.com/watch?v=fgTGADljAeg


// steps here
// add words file to project, and get all the words to show with get all
// accept input in api
// use input to filter words
// use input to return word filters
// filter with str.includes()
// pseudo:
// break apart input string into h,a,t ha, ht, etc, and other combos 
// see if the the word list includes any combos
// if includes any combos, then push to an arr 
// then return array
// improve word filter to sort correctly

// fetch('._files/words.json').then(res => res.json()).then(console.log)


 

module.exports = router