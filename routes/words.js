const express = require('express')
const router = express.Router()
const findAnagrams = require('find-anagrams');




// Get all
router.get('/', (req, res) => {

  let result = findAnagrams([
    'listen',
    'silent',
    'enlist',
    'word',
    'dog',
    'god',
    'server',
    'revers',
    "hat","ah","ha","th","at","a"
  ], 'ha');
  
  console.log(result)



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