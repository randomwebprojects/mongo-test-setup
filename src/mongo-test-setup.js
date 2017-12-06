const mongo = require('mongodb').MongoClient;

function deepClone(object){
  return JSON.parse(JSON.stringify(object));
}

module.exports = function(urlString) {

  function removeAll (callback) {
    mongo.connect(urlString, function(connectionError, db) {
      if(connectionError){
        console.log(connectionError)
      }else{
        db.dropDatabase(function() {
          db.close(function() {
            callback();
          });
        });
      }
    });
  }

  function loadCollection (collectionName, data, callback) {
    var clonedData = data;
    mongo.connect(urlString, function (err, db) {
      var collection = db.collection(collectionName);
      collection.insertMany(clonedData, function (err, results) {
        db.close(function() {
          callback(err, results.ops);
        });
      });
    });
  }

  function retriveCollection (collectionName, callback) {
    mongo.connect(urlString, function (err, db) {
      var collection = db.collection(collectionName);
      collection.find({}).toArray(function (err, results) {
        db.close(function() {
          callback(err, results);
        });
      });
    });
  }


  return {
    removeAll,
    loadCollection,
    retriveCollection
  }
};
