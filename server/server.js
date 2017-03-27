const express = require('express');
const path = require('path');
const bodyParser = require('body-parser');
const nodeRouter = require('./nodeRouter.js');
const cookieParser = require('cookie-parser');
const request = require('request');
const hashPass = require('./middleware/hashPass.js');
const hashPassNewUser = require('./middleware/hashPassNewUser.js');
const db = require('./dbUtils.js');
console.log('starting server');
const app = express();
app.set('port', (process.env.PORT || 5000));

app.use(cookieParser());
app.use(bodyParser.json());
app.use(express.static(path.join(__dirname, '../client/dist')));

app.use('/node', nodeRouter);
app.get('/', (req, res) => {
  res.sendFile(path.resolve(__dirname, '../client/index.html'));
});

app.post('/send', (req, res) => {
  let rate = req.body.rate;
  let output = req.body.output;
  console.log('rate', rate);
  console.log('output', output);
  console.log('output0.value', output[0].value);
  console.log('stringAddress', output[0].address)
  let options = {
    url: 'http://localhost:5000/node/wallet/primary/send',
    method: 'POST',
    json: {
      'rate': rate,
      'outputs': [{
        'value': output[0].value,
        'address': output[0].address
      }]
    }
  }
  request(options, function(error, response, body){
    if(error) throw new Error(error);
    console.log('body', body);
    console.log('response', response);
  })
  res.send('nice try');
})

//USER LOGIN
app.post('/login', hashPass, function(req, res) {
  var user = req.body.user;
  var pass = req.body.pass;
  var salt = req.body.salt;
  console.log('SIGNUPusername:', user);
  console.log('SIGNUPpassword:', pass);

  db.validateUser(user, pass, salt, function(err, success, user_id){
    if(err){
      console.log('unable to validate');
      res.status(401).send('try again buddy');
    } else if (success) {
      console.log('made it this far, correctly entered user/pass', user_id);
      res.status(200).send({user_id: user_id, transaction_history: [1,2,3,4]});
    } else if (!success) {
      console.log('dont think that was the right combo', user_id);
      res.status(401).send(success);
    }
  });
});

//NEW USER SIGN UP
app.post('/signup', hashPassNewUser, function(req, res) {
  var user = req.body.user;
  var pass = req.body.pass;
  var salt = req.body.salt;
  console.log('username:', user);
  console.log('password:', pass);
  // console.log('salt:', salt);

  //CHECK DB FOR USERNAME
  db.checkUsername(user, function(err, valid){
    if(err){
      console.log(err);
      res.sendStatus(401);
      res.end('Validation Failure');
    } else if (valid) {
      //ADD USERNAME AND PASSWORD TO DB
      console.log('ready to add');
      db.addUser(user, pass, salt, function(err, success, id){
        if(err){
          console.log(err);
        } else if (success) {
          //GET USER_ID

          res.status(201);
          res.send({ user_id: id });
        }
      })
    }
  })
})

//INSERT POST INTO DB
app.post('/items/users', function (req, res) {
  var userQuery = req.body.term;
  var userId = req.body.id;
  db.insert(userQuery, userId, function(err, success) {
    if(err){
      console.log(err)
      res.sendStatus(400);
      res.send('Insert Error');
    }
    if(success){
      console.log('successful insertion', success);
      db.selectAll(userId, function(error, messages){
        if(error){
          console.log(error);
        }
        console.log('bout to send messages', messages);
        res.send(messages);
      })
    }
  })
});

//GET WALLET BAL
app.post('/wallet', function(req, res){
  let address = req.body.address;
  console.log('address', address);


  res.send({balance: 3});
})


app.listen(app.get('port'), '127.0.0.1', () => {
  console.log('Node app is running on port', app.get('port')); // eslint-disable-line no-console
});
