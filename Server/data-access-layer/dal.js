const mongoose = require("mongoose");

function connectAsync() {
  return new Promise((resolve, reject) => {
    const options = {
      useNewUrlParser: true,
      useUnifiedTopology: true,
      useCreateIndex: true,
    };

    mongoose.connect(config.database.connectionString, options, (err, db) => {
      if (err) {
        reject(err);
        return;
      }
      resolve(db);
    });
  });
}

connectAsync()
  .then((db) => console.log("Connected to MongoDB!"))
  .catch((err) => console.log(err));
