const express = require('express');
const bodyParser = require('body-parser');
const bcrypt = require('bcrypt-nodejs');
const cors = require("cors");
const knex = require('knex');

const register = require('./controllers/register');
const signIn = require('./controllers/signin');
const image = require('./controllers/image');
const profile = require('./controllers/profile');

// Modify this as according to database in your hosting.
const db = knex({
    client: 'pg',
    connection: {
        host : '127.0.0.1',
        user : 'postgres',
        password : 'password',
        database : 'smart-brain'
    }
});

const app = express();
const port = process.env.PORT || 8000;

app.use(bodyParser.json());
app.use(cors());

app.get('/', (req,res) => { 
    db.select('*').from('users')
    .then(data => {
        res.json(data);
    })
})

app.post('/register', (req, res) => { register.handleRegister(req, res, db, bcrypt) }); 

app.post('/signin', (req, res)  => { signIn.handleSignIn(req, res, db, bcrypt) });
  
app.get('/profile/:id', (req, res) => { profile.handleProfileGet(req, res, db) })   
 
app.put('/image', (req, res) => { image.handleImage(req, res, db)})

app.post('/imageurl', (req, res) => { image.handleApiCall(req, res) })

app.listen(port, () => {
    console.log(`Listening  on port: ${port}`);
})     