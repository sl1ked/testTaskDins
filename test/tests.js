var chai = require("chai");
var testCase = require("mocha").describe;
var chaiHttp = require("chai-http");
var should = chai.should();
const fetch = require("node-fetch");

chai.use(chaiHttp);

// test for GET	/posts
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

  // it("it should GET random post on ID", (done) => {
  //   const maxValueID = 10;
  //   // I'm not sure! May be, random userId is bad
  //   const randomIntNumber = parseInt(Math.random() * maxValueID + 1);
  //   chai
  //     .request("https://jsonplaceholder.typicode.com")
  //     .get(`/posts?userId=` +randomIntNumber)
  //     .end((err, res) => {
  //       res.should.have.status(200);
  //       res.body.should.be.not.empty;
  //       res.body.forEach(el=> {
  //         el.should.include({"userId":randomIntNumber}); 
  //       });
  //       console.log("search ID=",randomIntNumber)
  //       const numberPrintPost=2;
  //       const startSlicePosition=0;
  //       console.log(res.body.slice(startSlicePosition,numberPrintPost))
  //       done();
  //     });
  // });
  // it("it should GET random post on Not correct ID", (done) => {
  //   const NoCorectID = -1;
  //   chai
  //     .request("https://jsonplaceholder.typicode.com")
  //     .get(`/posts?userId=` +NoCorectID)
  //     .end((err, res) => {
  //       res.should.have.status(200);
  //       done();
  //     });
  // });
  // it("it should GET random post  on title", (done) => {
  //   const title="laboriosam dolor voluptates"
  //   chai
  //     .request("https://jsonplaceholder.typicode.com")
  //     .get(`/posts?title=` +title)
  //     .end((err, res) => {
  //       res.should.have.status(200);
  //       res.body.should.be.not.empty;
  //       console.log(res.body)
  //       done();
  //     });
  // });
  /*
  
  */
  it("it should GET random post  on id and title", (done) => {
    const title="laboriosam dolor voluptates";
    const id=10;
    chai
      .request("https://jsonplaceholder.typicode.com")
      .get(`/posts?userId=${id}&title=${title}`)
      .end((err, res) => {
        res.should.have.status(200);
        res.body.should.be.have.have.lengthOf(1);
        res.body.forEach(el=> {
                  el.should.include({"userId":id});
                  el.should.include({"title":title});
                  el.should.have.property("id");
                  el.should.have.property("body");
                });
        console.log('\x1b[33m\x1b[40m%s\x1b[0m ',`ID:${id} title="${title}"`)
        console.log(res.body)
        done();
      });
  });

  it("it should GET random post on NOT correct title and id", (done) => {
    const title="laboriosam dolor voluptates";
    const id=-1;
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