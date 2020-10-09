let chai = require("chai");
let chaiHttp = require("chai-http");
let server = require("../server.js")
let api = require("../routes/words.js");
const { response } = require("express");

chai.should()
chai.expect()
chai.use(chaiHttp);

describe('GET to /words', () => {
  it("It should send a response", (done) => {
    chai.request('http://localhost:8080')
      .get("/words/")
      .end((err, response) => {
        response.should.have.status(200)
      done();
    })
  });
});

describe('GET to /words', () => {
  it("It should return a set of instructions", (done) => {
    chai.request('http://localhost:8080')
    .get("/words/")
    .end((err, response) => {
      response.text.should.be.eq('Hello! To get a value sorted anagram list of a word, enter a word to the end of the address at http://localhost:8080/words/. Try http://localhost:8080/words/hat');
      done();
    });
  });
});

describe('GET to /words/:word', () => {
  it("It should send a response", (done) => {
    const word = 'hat'
    chai.request('http://localhost:8080')
      .get("/words/" + word)
      .end((err, response) => {
        response.should.have.status(200)
      done();
    })
  });
});

describe('GET request with a valid word to /words/:word', () => {
  it("It should return an empty arr", (done) => {
    const word = 'hat'
    chai.request('http://localhost:8080')
    .get("/words/" + word)
    .end((err, response) => {
      response.text.should.be.eq('["hat","ha","ah","th","at","a"]')
      done();
    });
  });
});

describe('GET request with captial letters to /words/:word', () => {
  it("It should return a list of anagram and substring words", (done) => {
    const word = 'HAT'
    chai.request('http://localhost:8080')
    .get("/words/" + word)
    .end((err, response) => {
      response.text.should.be.eq('["hat","ha","ah","th","at","a"]')
      done();
    });
  });
});

describe('GET request with captial letters and lowercase letters to /words/:word', () => {
  it("It should return a list of anagram and substring words", (done) => {
    const word = 'haT'
    chai.request('http://localhost:8080')
    .get("/words/" + word)
    .end((err, response) => {
      response.text.should.be.eq('["hat","ha","ah","th","at","a"]')
      done();
    });
  });
});

describe('GET request with a single letter to /words/:word', () => {
  it("It should return a single letter", (done) => {
    const word = 'a'
    chai.request('http://localhost:8080')
    .get("/words/" + word)
    .end((err, response) => {
      response.text.should.be.eq('["a"]')
      done();
    });
  });
});

describe('GET request with letters that cannot spell a word to /words/:word', () => {
  it("It should return an empty arr", (done) => {
    const word = 'zzz'
    chai.request('http://localhost:8080')
    .get("/words/" + word)
    .end((err, response) => {
      response.text.should.be.eq('[]')
      done();
    });
  });
});
