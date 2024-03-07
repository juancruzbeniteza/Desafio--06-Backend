
import express from 'express';
import passport from 'passport';

const Sessrouter = express.Router();

Sessrouter.get('/current', passport.authenticate('current', { session: false }), (req, res) => {
  res.json({ user: req.user });
});

export default Sessrouter;
