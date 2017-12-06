const mocha = require('mocha');
const chai = require('chai');
const should = require('chai').should();
const expect = require('chai').expect;
const path = require('path');
const chaiSubset = require('chai-subset');
chai.use(chaiSubset);

const mongoTestSetup = require('../index.js');
var urlString = 'mongodb://localhost:27017/mongotestsetup';

describe('mongoTestSetup', function() {
  var mongoSetup;

  before('create instace of mongoTestSetup', function() {
    mongoSetup  = mongoTestSetup(urlString);
  });

  describe('removeAll', function() {
    it('removes drops database contents', function(done) {
      mongoSetup.removeAll(done);
    });
  });

  describe('load collection', function() {
    var collectionData = [{title: 'data', subdata: [{a: 1}, {a: 2}]}, {title: 'otherdata'}];
    var collectionName = 'mycollection';

    before('clean data', function(done) {
      mongoSetup.removeAll(function() {
          done();
        })
    });

    it('can retrive collection', function(done) {
      mongoSetup.loadCollection(collectionName, collectionData, function(err, loadedData) {
        expect(err).to.not.exist;
        expect(loadedData).to.be.an('array').to.have.lengthOf(2);
        expect(loadedData).to.containSubset(collectionData);
        done();
      });
    });

  });

  describe('retive collection', function() {
    var collectionData = [{title: 'data', subdata: [{a: 1}, {a: 2}]}, {title: 'otherdata'}];
    var collectionName = 'mycollection';

    before('clean and write data', function(done) {
      mongoSetup.removeAll(function() {
        mongoSetup.loadCollection(collectionName, collectionData, function(err, results) {
          done();
        })
      });
    });

    it('can retrive collection', function(done) {
      mongoSetup.retriveCollection(collectionName, function(err, retrivedData) {
        expect(err).to.not.exist;
        expect(retrivedData).to.be.an('array').to.have.lengthOf(2);
        expect(retrivedData).to.containSubset(collectionData);
        done();
      });
    });

  });

});
