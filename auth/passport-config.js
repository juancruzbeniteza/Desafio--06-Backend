import passport from 'passport';
import { Strategy as LocalStrategy } from 'passport-local';
import bcrypt from 'bcrypt';
import GitHubStrategy from 'passport-github2';
import { Manager } from '../src/data/memory/user.memory.js';
import jwt from 'jsonwebtoken'; // Import the necessary JWT module
import { ExtractJwt, Strategy as JwtStrategy } from 'passport-jwt';

function initialize(passport, getUserByEmail, getUserById) {
  // Local Strategy
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
      // Assuming you have a function getUserByGitHubId
      // that retrieves a user by their GitHub ID
      const user = getUserByGitHubId(profile.id);

      return done(null, user);
    }
  ));

  // JWT Strategy for "current"
  const jwtOptions = {
    jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
    secretOrKey: process.env.JWT_SECRET || 'a-strong-jwt-secret',
};
  passport.use('current', new JwtStrategy(jwtOptions, (payload, done) => {
    // Assuming you have a function getUserById
    getUserById(payload.sub)
      .then((user) => {
        if (user) {
          return done(null, user);
        } else {
          return done(null, false);
        }
      })
      .catch((error) => done(error, false));
  }));

  // Serialize and Deserialize users
  passport.serializeUser((user, done) => done(null, user._id));
  passport.deserializeUser(async (id, done) => {
    const user = await getUserById(id);
    done(null, user);
  });
}

export default initialize;
