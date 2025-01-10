const mongodb = require('mongodb');
const MongoClient = mongodb.MongoClient;

let _db;

const mongoConnect = callback => {
  // Make sure to URL-encode your password
  const password = encodeURIComponent('Survival@360');
  const uri = `mongodb+srv://KankanaRc:${password}@cluster0.s0tii.mongodb.net/shop?retryWrites=true&w=majority&appName=Cluster0`;

  MongoClient.connect(uri)
    .then(client => {
      _db = client.db();
      console.log('Connected');
      callback();
    })
    .catch(err => {
      console.log('Connection failed:', err);
      throw err;
    });
}
const getDb = () =>{
  if(_db){
    return _db;
  }
  throw 'No database found';
}

exports.mongoConnect = mongoConnect;
exports.getDb = getDb;
