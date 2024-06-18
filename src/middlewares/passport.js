import passport from "passport";
import { Strategy as LocalStrategy } from "passport-local";
import { createHash, verifyHash } from "../utils/hash.utils.js";
import { Strategy as JwtStrategy, ExtractJwt } from "passport-jwt";
import repository from "../repositories/users.rep.js";
import errors from "../utils/errors/errors.js";
import { createToken } from "../utils/token.utils.js";
import { Strategy as GoogleStrategy } from "passport-google-oauth2";
const { GOOGLE_ID, GOOGLE_CLIENT, SECRET } = process.env;

// Serialize user: Store user.id in the session
passport.serializeUser((user, done) => {
  done(null, user.id);
});

// Deserialize user: Retrieve user from the database using user.id
passport.deserializeUser(async (id, done) => {
  try {
    const user = await repository.findById(id); // Adjust this to your actual repository method
    if (user) {
      done(null, user);
    } else {
      done(null, false); // User not found
    }
  } catch (error) {
    done(error);
  }
});

// Local strategy for user registration
passport.use(
  "register",
  new LocalStrategy(
    { passReqToCallback: true, usernameField: "email" },
    async (req, email, password, done) => {
      try {
        let user = await repository.readByEmail({ email });
        if (!user) {
          let data = req.body;
          user = await repository.create(data);
          done(null, user);
        } else {
          done(null, false, errors.existPass);
        }
      } catch (error) {
        done(error);
      }
    }
  )
);

// Local strategy for user login
passport.use(
  "login",
  new LocalStrategy(
    { passReqToCallback: true, usernameField: "email" },
    async (req, email, password, done) => {
      try {
        const user = await repository.readByEmail({ email });
        if (user?.verified && verifyHash(password, user.password)) {
          const token = createToken({ email, role: user.role });
          req.token = token;
          done(null, user);
        } else {
          done(null, false, errors.auth);
        }
      } catch (error) {
        done(error);
      }
    }
  )
);

// Google OAuth2 strategy
passport.use(
  "google",
  new GoogleStrategy(
    {
      passReqToCallback: true,
      clientID: GOOGLE_ID,
      clientSecret: GOOGLE_CLIENT,
      callbackURL: "http://localhost:8080/api/sessions/google/cb",
    },
    async (req, accessToken, refreshToken, profile, done) => {
      try {
        let user = await repository.readByEmail({
          email: profile.id + "@gmail.com",
        });
        if (!user) {
          user = {
            email: profile.id + "@gmail.com",
            name: profile.name.givenName,
            photo: profile.coverPhoto,
            password: createHash(profile.id),
          };
          user = await repository.create(user);
        }
        req.session.email = user.email;
        req.session.role = user.role;
        done(null, user);
      } catch (error) {
        done(error);
      }
    }
  )
);

// JWT strategy
passport.use(
  "jwt",
  new JwtStrategy(
    {
      jwtFromRequest: ExtractJwt.fromExtractors([
        (req) => req?.cookies["token"],
      ]),
      secretOrKey: SECRET,
    },
    async (payload, done) => {
      try {
        const user = await repository.readByEmail({ email: payload.email });
        if (user) {
          done(null, user);
        } else {
          done(null, false);
        }
      } catch (error) {
        done(error);
      }
    }
  )
);

export default passport;
