// login.router.js
import express from 'express';
import passport from 'passport';
import flash from 'connect-flash';

server.use(flash());


const router = express.Router();

router.get('/login', (req, res) => {
  res.render('login'); // Assuming you have a 'login' view in your views folder
});

router.post('/login', passport.authenticate('local', {
  successRedirect: '/', // Redirect to home page on successful login
  failureRedirect: '/login', // Redirect back to login page on failure
  failureFlash: true, // Enable flash messages for failure
}));

// GitHub authentication
router.get('/auth/github',
  passport.authenticate('github'));

router.get('/auth/github/callback',
  passport.authenticate('github', {
    successRedirect: '/', // Redirect to home page on successful GitHub login
    failureRedirect: '/login', // Redirect back to login page on failure
    failureFlash: true,
  })
);

export default router;
