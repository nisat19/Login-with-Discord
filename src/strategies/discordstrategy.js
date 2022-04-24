const DiscordStrategy = require("passport-discord").Strategy;
const passport = require("passport");
const DiscordUser = require("../models/DiscordUser");

var scopes = ["identify", "guilds"];

passport.serializeUser((user, done) => {
  done(null, user);
});

passport.deserializeUser(async (user, done) => {
  // const user = DiscordUser.findById(id);
  // if (user) {
    done(null, user);
  // }
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
      // try {
      //   const user = await DiscordUser.findOne({ discordId: profile.id });
      //   if (user) {
      //     done(null, user);
      //   } else {
      //     const newUser = await DiscordUser.create({
      //       discordId: profile.id,
      //       username: profile.username,
      //     });
      //     const savedUser = await newUser.save();
      //     done(null, savedUser);
      //   }
      // } catch (error) {
      //   done(error, null);
      // }
    }
  )
);
