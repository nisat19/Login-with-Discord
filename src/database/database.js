const mongoose = require("mongoose");

// mongodb://localhost:27017/discordauth

module.exports = mongoose.connect(
  "mongodb://localhost:27017/discordauth",
  {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  }
);
