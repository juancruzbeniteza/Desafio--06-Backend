import passport from 'passport';
import { Strategy as LocalStrategy } from 'passport-local';
import { createHash, verifyHash } from '../utils/hash.utils.js';
import { ExtractJwt, Strategy as JWTStrategy } from 'passport-jwt';
import users from '../data/mongo/users.mongo.js';
import { Strategy as GoogleStrategy } from "passport-google-oauth20";
import { createToken } from '../utils/token.utils.js';

const { GOOGLE_ID, GOOGLE_CLIENT, SECRET } = process.env;

// Local Strategy for registration
passport.use(
  'register',
  new LocalStrategy(
    { passReqToCallback: true, usernameField: 'email' },
    async (req, email, password, done) => {
      try {
        const existingUser = await users.readByEmail({ email });
        if (existingUser) {
          return done(null, false, { message: 'User already exists', statusCode: 400 });
        }
        const userData = { ...req.body, password: createHash(password) };
        const newUser = await users.create(userData);
        return done(null, newUser);
      } catch (error) {
        return done(error);
      }
    }
  )
);

// Local Strategy for login
passport.use(
  "login",
  new LocalStrategy(
    { passReqToCallback: true, usernameField: "email", passwordField: "password" },
    async (req, email, password, done) => {
      try {
        const user = await users.readByEmail({ email });
        if (user?.verified && verifyHash(password, user.password)) {
          const token = createToken({ email, role: user.role });
          req.token = token;
          return done(null, user);
        } else {
          return done(null, false, { message: "Wrong credentials" });
        }
      } catch (error) {
        return done(error);
      }
    }
  )
);

// Google Strategy for OAuth
passport.use(
  new GoogleStrategy(
    {
      clientID: GOOGLE_ID,
      clientSecret: GOOGLE_CLIENT,
      callbackURL: 'http://localhost:8080/api/sessions/google/callback',
      passReqToCallback: true
    },
    async (req, accessToken, refreshToken, profile, done) => {
      try {
        let user = await users.readByEmail({ email: profile.emails[0].value });
        if (!user) {
          user = {
            email: profile.emails[0].value,
            name: profile.displayName,
            photo: profile.picture,
            password: createHash(profile.id) // createHash can be any hashing function you use
          };
          user = await users.create(user);
        }
        const token = createToken({ email: user.email, role: user.role });
        req.token = token;
        return done(null, user);
      } catch (error) {
        return done(error);
      }
    }
  )
);

// JWT Strategy for protected routes
passport.use(
  'jwt',
  new JWTStrategy(
    {
      jwtFromRequest: ExtractJwt.fromExtractors([(req) => req?.cookies[token]]),
      secretOrKey: SECRET
    },
    async (payload, done) => {
      try {
        const user = await users.readByEmail({ email: payload.email });
        if (user) {
          user.password = null;
          return done(null, user);
        } else {
          return done(null, false);
        }
      } catch (error) {
        return done(error);
      }
    }
  )
);
// Serialize user into the sessions
passport.serializeUser((user, done) => {
  done(null, user._id);
});

// Deserialize user from the sessions
passport.deserializeUser(async (id, done) => {
  try {
    const user = await users.readById(id);
    done(null, user);
  } catch (error) {
    done(error);
  }
});
export default passport;
