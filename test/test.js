var chai = require("chai");
var chaiHttp = require("chai-http");
var plugin = require("chai-jq");
var chaiFiles = require('chai-files');
var expect = require("chai").expect;
var myApp = require("../app").myApp;
var server = require("../server/webServer");
var router = require("../routes/index");



var should = chai.should();
var file = chaiFiles.file;
var dir = chaiFiles.dir;
var assert = chai.assert;



chai.use(chaiHttp);
chai.use(plugin);

function clickElement(element) {
    try {
        element.trigger("click");
    } catch(err) {
        var event = new MouseEvent("click", {view: window, cancelable: true, bubbles: true});
        element.dispatchEvent(event);
    }
}



suite("Test all pages resolve + error handling", function() {
  test("Notes being rendered", function(){
      chai.request("http://localhost:9000")
      .get("/notes")
        .end(function(err,res) {
          expect(res).to.have.status(200);

        });
  });
  test("Register being rendered", function(){
      chai.request("http://localhost:9000")
      .get("/register")
        .end(function(err,res) {
          expect(res).to.have.status(200);

        });
  });
  test("Login being rendered", function(){
      chai.request("http://localhost:9000")
      .get("/login")
        .end(function(err,res) {
          expect(res).to.have.status(200);

        });
  });
  test("Index being rendered", function(){
      chai.request("http://localhost:9000")
      .get("/")
        .end(function(err,res) {
          expect(res).to.have.status(200);

        });
  });
  test("Get notes being rendered", function(){
      chai.request("http://localhost:9000")
      .get("/getNotes")
        .end(function(err,res) {
          expect(res).to.have.status(200)

        });
  });

  test("/fakefile should have status: '404'", function(){
      chai.request("http://localhost:9000")
      .get("/fakefile")
        .end(function(err,res) {
          expect(res).to.have.status(404)

        });
  });
});


suite("Testing doc types", function() {
  test("/getNotes should be type: 'JSON' ", function(){
      chai.request("http://localhost:9000")
      .get("/getNotes")
        .end(function(err,res) {
          expect(res).to.be.json;
          should.not.exist(err);
        });
  });
  test("/notes should be type: 'HTML' ", function(){
      chai.request("http://localhost:9000")
      .get("/notes")
        .end(function(err,res) {
          expect(res).to.be.html;
        });
  });
  test("/register should be type: 'HTML' ", function(){
      chai.request("http://localhost:9000")
      .get("/register")
        .end(function(err,res) {
          expect(res).to.be.html;
        });
  });
  test("/login should be type: 'HTML' ", function(){
      chai.request("http://localhost:9000")
      .get("/login")
        .end(function(err,res) {
          expect(res).to.be.html;
        });
  });

  test("/ should be type: 'HTML' ", function(){
      chai.request("http://localhost:9000")
      .get("/")
        .end(function(err,res) {
          expect(res).to.be.html;
        });
  });
});

suite("Main files should exist and not be empty ", function() {
  test("app.js should exist and not be empty ", function(){
      chai.request("http://localhost:9000")
      .get("/")
        .end(function(err,res) {
          expect(file('app.js')).to.exist
          expect(file('app.js')).to.not.be.empty;
       });
  });
  test("index.js should exist and not be empty ", function(){
      chai.request("http://localhost:9000")
      .get("/")
        .end(function(err,res) {
          expect(file('index.js')).to.exist;
          expect(file('index.js')).to.not.be.empty;
       });
  });
  test("package.json should exist and not be empty ", function(){
      chai.request("http://localhost:9000")
      .get("/")
        .end(function(err,res) {
          expect(file('package.json')).to.exist;
          expect(file('package.json')).to.not.be.empty;
       });
  });
  test("index.html should exist and not be empty ", function(){
      chai.request("http://localhost:9000")
      .get("/")
        .end(function(err,res) {
          expect(file('index.html')).to.exist;
          expect(file('index.html')).to.not.be.empty;
       });
  });
  test("webServer.file should exist and not be empty ", function(){
      chai.request("http://localhost:9000")
      .get("/")
        .end(function(err,res) {
          expect(file('webServer')).to.exist;
          expect(file('webServer')).to.not.be.empty;
       });
  });
});

suite("All directories should exist", function() {
  test("models directory should exist ", function(){
      chai.request("http://localhost:9000")
      .get("/")
        .end(function(err,res) {
          expect(dir('models')).to.exist;
        });
   });
   test("views directory should exist ", function(){
       chai.request("http://localhost:9000")
       .get("/")
         .end(function(err,res) {
           expect(dir('views')).to.exist;
         });
    });
    test("server directory should exist ", function(){
        chai.request("http://localhost:9000")
        .get("/")
          .end(function(err,res) {
            expect(dir('server')).to.exist;
          });
     });
     test("routes directory should exist ", function(){
         chai.request("http://localhost:9000")
         .get("/")
           .end(function(err,res) {
             expect(dir('routes')).to.exist;
           });
      });
      test("test directory should exist ", function(){
          chai.request("http://localhost:9000")
          .get("/")
            .end(function(err,res) {
              expect(dir('test')).to.exist;
            });
       });
       test("public directory should exist ", function(){
           chai.request("http://localhost:9000")
           .get("/")
             .end(function(err,res) {
               expect(dir('public')).to.exist;
             });
        });
        test("public CSS directory should exist ", function(){
            chai.request("http://localhost:9000")
            .get("/")
              .end(function(err,res) {
                expect(dir('/public/css')).to.exist;
              });
         });
         test("public JS directory should exist ", function(){
             chai.request("http://localhost:9000")
             .get("/")
               .end(function(err,res) {
                 expect(dir('/public/js')).to.exist;
               });
          });

});

suite("Views and node_modules should not be empty", function() { // These are being tested as they have not been
  test("node_modules directory is not empty ", function(){       // In other tests
      chai.request("http://localhost:9000")
      .get("/")
        .end(function(err,res) {
          expect(dir('node_modules')).to.not.be.empty;
        });
  });
  test("views directory is not empty ", function(){
      chai.request("http://localhost:9000")
      .get("/")
        .end(function(err,res) {
          expect(dir('views')).to.not.be.empty;
        });
  });
  test("generic layout view is not empty ", function(){ //Testing .jade files as these are not explicitly seen on front end
      chai.request("http://localhost:9000")
      .get("/")
        .end(function(err,res) {
          expect(file('genericLayout.jade')).to.not.be.empty;
        });
  });
  test("login view is not empty ", function(){
      chai.request("http://localhost:9000")
      .get("/")
        .end(function(err,res) {
          expect(file('login.jade')).to.not.be.empty;
        });
  });
  test("register view is not empty ", function(){
      chai.request("http://localhost:9000")
      .get("/")
        .end(function(err,res) {
          expect(file('register.jade')).to.not.be.empty;
        });
  });
  test("notes view is not empty ", function(){
      chai.request("http://localhost:9000")
      .get("/")
        .end(function(err,res) {
          expect(file('notes.jade')).to.not.be.empty;
        });
  });
  test("error view is not empty ", function(){
      chai.request("http://localhost:9000")
      .get("/")
        .end(function(err,res) {
          expect(file('error.jade')).to.not.be.empty;
        });
  });
});
