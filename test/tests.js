let chai = require("chai");
let testCase = require("mocha").describe;
let chaiHttp = require("chai-http");
let should = chai.should();
const fetch = require("node-fetch");

chai.use(chaiHttp);

// test for GET	/posts
/*
  input: get/posts
  output: 1. Status code=200;
          2. Array is lenght=100 
*/
testCase("/GET posts", function () {
  it("it should GET all the posts", (done) => {
    chai
      .request("https://jsonplaceholder.typicode.com")
      .get("/posts")
      .end((err, res) => {
        res.should.have.status(200);
        res.body.should.be.a("array").have.lengthOf(100);
        done();
      });
  });

/*
input: correct id  and title
output: 1. Status code=200;
        2. Array of objects
          every object have:
            a) property id and body 
            b) value id=input id and title=input title
*/
  it("it should GET post  on CORRECT id and CORRECT title", (done) => {
    const title = "laboriosam dolor voluptates";
    const id = 10;
    chai
      .request("https://jsonplaceholder.typicode.com")
      .get(`/posts?userId=${id}&title=${title}`)
      .end((err, res) => {
        res.should.have.status(200);
        res.body.should.be.have.have.lengthOf(1);
        res.body.forEach((el) => {
          el.should.include({ userId: id });
          el.should.include({ title: title });
          el.should.have.property("id");
          el.should.have.property("body");
        });
        setTimeout(
          () =>
            console.log(
              "\x1b[33m\x1b[40m%s\x1b[0m",
              `ID=${id};title="${title}"\n`,
              res.body
            ),
          0
        );
        done();
      });
  });

/*
input: empty id  and correct title
output: 1. Status code=200;
        2. Empty array
*/
  it("it should GET random post on CORRECT title and EMPTY id", (done) => {
    const title = "laboriosam dolor voluptates";
    const id = "";
    chai
      .request("https://jsonplaceholder.typicode.com")
      .get(`/posts?userId=${id}&title=${title}`)
      .end((err, res) => {
        res.should.have.status(200);
        res.body.should.be.empty;
        done();
      });
  });

/*
input:  correct id  and empty title
output: 1. Status code=200;
        2. Empty array
*/
  it("it should GET random post on  EMPTY title and CORRECT id", (done) => {
    const title = "";
    const id = "10";
    chai
      .request("https://jsonplaceholder.typicode.com")
      .get(`/posts?userId=${id}&title=${title}`)
      .end((err, res) => {
        res.should.have.status(200);
        res.body.should.be.empty;
        done();
      });
  });

/*
input: empty id  and empty title
output: 1. Status code=200;
        2. Empty array
*/
  it("it should GET random post on EMPTY title and EMPTY id", (done) => {
    const title = "";
    const id = "";
    chai
      .request("https://jsonplaceholder.typicode.com")
      .get(`/posts?userId=${id}&title=${title}`)
      .end((err, res) => {
        res.should.have.status(200);
        res.body.should.be.empty;
        done();
      });
  });
});

