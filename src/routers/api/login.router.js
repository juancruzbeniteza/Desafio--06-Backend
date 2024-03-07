// login.router.js
import express from 'express';
import passport from 'passport';
import flash from 'connect-flash';
import User from '../../data/mongo/models/users.models.js';

const server = express(); 
server.use(flash());


const loginrouter = express.Router();

loginrouter.get('/login', (req, res) => {
  res.render('login'); // Assuming you have a 'login' view in your views folder
});

loginrouter.post('/login', passport.authenticate('local', {
  successRedirect: '/', // Redirect to home page on successful login
  failureRedirect: '/login', // Redirect back to login page on failure
  failureFlash: true, // Enable flash messages for failure
}));

// GitHub authentication
loginrouter.get('/auth/github',
  passport.authenticate('github'));

loginrouter.get('/auth/github/callback',
  passport.authenticate('github', {
    successRedirect: '/', // Redirect to home page on successful GitHub login
    failureRedirect: '/login', // Redirect back to login page on failure
    failureFlash: true,
  })
);

export default loginrouter;
