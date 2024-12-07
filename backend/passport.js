const passport = require("passport");
const GoogleStrategy = require("passport-google-oauth20").Strategy;
const User = require("./models/User"); // Adjust path if necessary
const Sponsor = require("./models/Sponsor"); // Adjust path if necessary
const generateToken = require("./utils/generateToken"); // Token generation function

passport.use(
  new GoogleStrategy(
    {
      clientID: process.env.GOOGLE_CLIENT_ID,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET,
      callbackURL: "http://localhost:5000/api/auth/google/callback",
    },
    async (accessToken, refreshToken, profile, done) => {
      try {
        // Check if the email belongs to a sponsor (you can customize this check)
        const existingSponsor = await Sponsor.findOne({
          email: profile.emails[0].value,
        });

        if (existingSponsor) {
          return done(null, existingSponsor); // If it's a sponsor, return the sponsor
        }

        // If the user exists, login the existing user
        const existingUser = await User.findOne({
          email: profile.emails[0].value,
        });

        if (existingUser) {
          return done(null, existingUser); // Return the existing user
        }

        // If the user doesn't exist, create a new user without a password
        const newUser = new User({
          name: profile.displayName,
          email: profile.emails[0].value,
          password: null, // No password needed for Google login
          status: "Active",
        });

        await newUser.save(); // Save the new user to the database
        return done(null, newUser); // Return the new user profile
      } catch (error) {
        return done(error);
      }
    }
  )
);

// Serialize user data into the session
passport.serializeUser((data, done) => {
  done(null, data);
});

// Deserialize user data from the session
passport.deserializeUser((data, done) => {
  done(null, data);
});

module.exports = passport;
