require("dotenv").config();
const express = require("express");
const app = express();
const PORT = process.env.PORT || 3001;
const session = require("express-session");
const passport = require("passport");
const discordstrategy = require("./strategies/discordstrategy");
const db = require("./database/database");
const path = require("path");

db.then(() => console.log("Connected to Database")).catch((err) =>
  console.log(err)
);

// Routes
const authRoute = require("./routes/auth");
const dashboardRoute = require("./routes/dashboard");

app.use(
  session({
    secret: "SecretKey",
    cookie: {
      maxAge: 60000 * 60 * 24,
    },
    saveUninitialized: false,
    name: "discord.oauth2",
  })
);

// Passport
app.use(passport.initialize());
app.use(passport.session());

// Views
app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "views"));
app.set(express.static, path.join(__dirname, "public"));

// Middleware Routes
app.use("/auth", authRoute);
app.use("/dashboard", dashboardRoute);

app.get("/", isAuthorized, (req, res) => {
  res.render("home", {
    users: [
      {
        name: "Hello",
        email: "sda@gds.com",
      },
    ],
  });
});

function isAuthorized(req, res, next) {
  if (req.user) {
    res.redirect("/dashboard");
  } else {
    next();
  }
}

app.listen(PORT, () => {
  console.log(`Listenting to requests on port ${PORT}`);
});
