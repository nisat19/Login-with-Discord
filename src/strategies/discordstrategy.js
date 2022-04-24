const DiscordStrategy = require("passport-discord").Strategy;
const passport = require("passport");

var scopes = ["identify", "guilds"];

passport.serializeUser((user, done) => {
  done(null, user);
});

passport.deserializeUser(async (user, done) => {
  done(null, user);
});

passport.use(
  new DiscordStrategy(
    {
      clientID: process.env.CLIENT_ID,
      clientSecret: process.env.CLIENT_SECRET,
      callbackURL: process.env.CLIENT_REDIRECT,
      scope: scopes,
    },
    async (accessToken, refreshToken, profile, done) => {
      done(null, {
        id: profile.id,
        username: profile.username,
      });
    }
  )
);
