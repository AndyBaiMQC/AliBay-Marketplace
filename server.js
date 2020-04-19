let express = require('express');
let app = express();
const multer = require('multer');
const path = require('path');
const bodyParser = require('body-parser');
let mongo = require('mongodb');
const postCharge = require('./stripe');
require('dotenv').config();
const bcrypt = require('bcrypt');
const stripe = require('stripe')('sk_test_s0FYhFBESMT2Ld07TZReUUPx00PwadmhQ0');
const salt = 2;

let MongoClient = mongo.MongoClient;
let db;

var storage = multer.diskStorage({
  destination: './public/images/uploaded'
  ,
  filename: function (req, file, cb) {
    cb(null, Date.now() + path.extname(file.originalname));
  },
});

const upload = multer({storage: storage});

app.use('/', express.static('build')); // Needed for the HTML and JS files
app.use('/public', express.static('public')); // Needed for local assets

app.use(bodyParser.json());

app.use((_, res, next) => {
  res.header('Access-Control-Allow-Origin', '*');
  res.header(
    'Access-Control-Allow-Headers',
    'Origin, X-Requested-With, Content-Type, Accept',
  );
  next();
});
// Your endpoints go after this line
// payment
app.post('/stripe/charge', postCharge);

app.post('/stripe/secret', async (req, res) => {
  const intent = await stripe.paymentIntents.create({
    amount: req.body.amount * 100,
    currency: 'usd',
    // Verify your integration in this guide by including this parameter
    metadata: {integration_check: 'accept_a_payment'},
  });
  console.log(intent)
    res.json({client_secret: intent.client_secret});
});

app.post('/getCart', async (req, res) => {
  try {
    const { body } = req;
    const l = await db.collection('users').findOne({_id: new mongo.ObjectID(body.user) });

    res.json({
      msg: l.carts
    })
  } catch (e) {
    res.json({
      errorMsg: e
    })
  }
});

app.post('/cart', async (req, res) => {
  try {
    const { body } = req;
    const doc = await db.collection('users').findOne({_id: new mongo.ObjectID(body.user) });
    if (!doc.carts) {
      doc.carts = [];
    }
    const item = doc.carts.filter(item => item._id === body._id);
    console.log(item, 'iii')
    if (item.length) {
      item[0].number++;
    } else {
      body.number = 1;
      doc.carts.push(body);
    }
    await db.collection('users').save(doc);
    res.json({
      msg: doc.carts
    })
  } catch (e) {
    console.log(e)
    res.json({
      errorMsg: e
    })
  }

});

app.post('/removeCart', async (req, res) => {
  try {

    const { body } = req;

    const item = await db.collection('users').findOne({_id: mongo.ObjectID(body.user)});
    const index = item.carts.findIndex(item => item._id === body._id);
    if (index !== -1) {
      item.carts.splice(index, 1);
    }
    await db.collection('users').save(item);
    res.json({
      msg: item
    })
  } catch (e) {

    res.json({
      errorMsg: e
    })
  }
});

app.post('/checkCart', async (req, res) => {
  const { body } = req;
  const search = body.list.map(item => new mongo.ObjectID(item._id));
  const list = await db.collection('goods').find({_id: {$in: search}}).toArray();
  const lst = [];
  const bool = list.every(item => {
    const f = body.list.filter(l => l._id === item._id.toString());
    const b = f[0].number <= item.quantity;
    if (!b) lst.push(f[0]);
    return b;
  });
  res.json({
    msg: bool,
    list: lst,
  })
})

app.post('/clearCart', async (req, res) => {
  try {

    const { body } = req;

    const search = body.list.map(item => new mongo.ObjectID(item._id));
    const list = await db.collection('goods').find({_id: {$in: search}}).toArray();
    await list.reduce(async (acc, item) => {
      return acc.then(async () => {
        const f = body.list.filter(l => l._id === item._id.toString());
        item.quantity =  item.quantity - f[0].number;
        if (item.quantity === 0) {
          return db.collection('goods').deleteOne({_id: item._id})
        } else {
          return db.collection('goods').save(item);
        }
      })
    }, new Promise((resolve) => resolve()));
    const item = await db.collection('users').findOne({_id: mongo.ObjectID(body.user)});
    item.carts = [];
    await db.collection('users').save(item);
    res.json({
      msg: item
    })
  } catch (e) {

    res.json({
      errorMsg: e
    })
  }
})
// login signup
app.post('/register', async (req, res) => {
  const {
    username,
    password,
    email
  } = req.body;
  if (username && password) {
    const {
      username,
      password,
    } = req.body;
    const list = await db.collection('users').find({username: username}).toArray();
    if (!list.length) {
      const user = await db.collection('users').insertOne({
        username: username.toLowerCase(),
        password: bcrypt.hashSync(password, salt),
        email,
        carts: []
      });
      res.json({
        msg: 'Registered'
      });
    } else {
      res.json({
        errorMsg: 'Username is duplicate'
      });
    }
  } else {
    res.json({
      errorMsg: 'Username or password missing'
    });
  }

});

app.post('/login', (req, res) => {
  const {
    username,
    password,
  } = req.body;
  if (username || password) {
    db.collection('users').find({username: username}).toArray((err, user) => {
      if (user.length && bcrypt.compareSync(password, user[0].password)) {
        res.json({
          msg: user[0]._id
        })
      } else {
        res.sendStatus(404)
      }
    });
  } else {
    res.json({
      errorMsg: 'Please input the username and password',
    });
  }

});

// add items
app.post('/addGoods', upload.single('file'), async (req, res) => {

  try {
    const user = await db.collection('users').findOne({_id: new mongo.ObjectID(req.body.user)});
    const doc = await db.collection('goods').insertOne({
      ...req.body,
      email: user.email,
      image: req.file.path
    });
    res.json({
      msg: doc.ops[0]
    });
  } catch (e) {
    res.json({
      errorMsg: e
    });
  }

});

// get item list
app.get('/goods', async (req, res) => {
  const {
    query,
  } = req;
  let list = [];

  if (query.type || query.seller) {
    list = await db.collection('goods').find({...query}).toArray();
  } else if (query.product) {
    list = await db.collection('goods').find({product: { $regex: query.product, $options: 'i' }}).toArray();
  } else {
    list = await db.collection('goods').find().toArray();
  }
  res.json({
    msg: list
  })
});

app.get('/goods/:id', async (req, res) => {
  try {
    const {
      id,
    } = req.params;
    const doc = await db.collection('goods').findOne({_id: mongo.ObjectID(id)});
    res.json({
      msg: doc
    })
  } catch (e) {
    res.json({
      msg: e
    })
  }
});

app.get('/getSellerList', async (req, res) => {
  try {
    const doc = await db.collection('goods').find().toArray();
    res.json({
      msg: doc.map(item => item.seller)
    })
  } catch (e) {
    res.json({
      msg: e
    })
  }

})
// Your endpoints go before this line
app.post('/addReview', async (req, res) => {
  try {
    const { body } = req;
    if (!body._id) {
      throw new Error('no id')
    }
    const doc = await db.collection('goods').findOne({_id: new mongo.ObjectID(body._id)});
    if(doc.reviews) {
      doc.reviews.push(body.review);
    } else {
      doc.reviews = [body.review];
    }
    doc.rank = doc.reviews.reduce((acc, cur) => acc += Number(cur || 0), 0) / doc.reviews.length;
    await db.collection('goods').save(doc);
    res.json({
      msg: doc
    })
  } catch (e) {
    console.log(e)
    res.json({
      errorMsg: e
    })
  }

});
app.get('*', (req, res, next) => { // needed for react router
  res.sendFile(__dirname + '/build/index.html');
});


MongoClient.connect('mongodb+srv://admin:admin@cluster0-8hkd8.gcp.mongodb.net/test', { useUnifiedTopology: true, useNewUrlParser: true, }, (err, client) => {
  if (!err) {
    db = client.db('shop');
    app.listen(4000, '0.0.0.0', () => console.log(`listening on port 4000!`));
  }
});
