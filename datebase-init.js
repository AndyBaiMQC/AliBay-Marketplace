const bcrypt = require('bcrypt');

let userNames = ['winnifred', 'lorene', 'cyril', 'vella', 'erich', 'pedro', 'madaline', 'leoma', 'merrill', 'jacquie'];
let users = [];
let goods = [];
let items = ['closes', 'shoes'];
const salt = 'passwords';

userNames.forEach(name => {
  let u = {};
  u.username = name;
  u.password = bcrypt.hashSync(name, salt);
  u.carts = [];
  u.purchaseList = [];
  users.push(u);
});

items.forEach(type => {
  let u = {};
  u.type = type;
  u.product = 'product';
  u.description = 'description';
  u.price = 50;
  u.img = 'https://images.unsplash.com/photo-1562886889-4ff7af0602ef?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=2089&q=80';
  goods.push(u);
});

let mongo = require('mongodb');
let MongoClient = mongo.MongoClient;
let db;

MongoClient.connect('mongodb://localhost:27017/', function (err, client) {
  if (err) throw err;

  db = client.db('shop');

  db.listCollections().toArray(function (err, result) {
    if (result.length == 0) {
      db.collection('users').insertMany(users, function (err, result) {
        if (err) {
          throw err;
        }

        console.log(result.insertedCount + ' users successfully added.');
        client.close();
      });
      db.collection('goods').insertMany(goods, function (err, result) {
        if (err) {
          throw err;
        }

        console.log(result.insertedCount + ' goods successfully added.');
        client.close();
      });
      return;
    }

    let numDropped = 0;
    let toDrop = result.length;
    result.forEach(collection => {
      db.collection(collection.name).drop(function (err, delOK) {
        if (err) {
          throw err;
        }

        console.log('Dropped collection: ' + collection.name);
        numDropped++;

        if (numDropped == toDrop) {
          db.collection('users').insertMany(users, function (err, result) {
            if (err) {
              throw err;
            }

            console.log(result.insertedCount + ' users successfully added.');
            client.close();
          });

          db.collection('goods').insertMany(goods, function (err, result) {
            if (err) {
              throw err;
            }

            console.log(result.insertedCount + ' goods successfully added.');
            client.close();
          });
        }
      });
    });
  });
});
