
import passport from 'passport';
import { Strategy as LocalStrategy } from 'passport-local';
import bcrypt from 'bcrypt';
import GitHubStrategy from 'passport-github2';
import { getUserByEmail, getUserById } from '../src/data/memory/user.memory';

function initialize(passport, getUserByEmail, getUserById) {
  passport.use(
    new LocalStrategy({ usernameField: 'email' }, async (email, password, done) => {
      const user = getUserByEmail(email);
      if (!user) {
        return done(null, false, { message: 'Usuario no encontrado' });
      }

      try {
        if (await bcrypt.compare(password, user.password)) {
          return done(null, user);
        } else {
          return done(null, false, { message: 'Contraseña incorrecta' });
        }
      } catch (error) {
        return done(error);
      }
    })
  );

// GitHub Strategy
passport.use(new GitHubStrategy(
  {
    clientID: process.env.GITHUB_CLIENT_ID,
    clientSecret: process.env.GITHUB_CLIENT_SECRET,
    callbackURL: process.env.GITHUB_CALLBACK_URL,
  },
  (accessToken, refreshToken, profile, done) => {
    // Find or create user based on GitHub profile
    const user = getUserByGitHubId(profile.id);

    return done(null, user);
  }
));

  passport.serializeUser((user, done) => done(null, user.id));
  passport.deserializeUser((id, done) => done(null, getUserById(id)));
}

export default initialize;
