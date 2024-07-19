const mongoose = require("mongoose");

mongoose
  .connect(process.env.MONGODB_URI, {
    dbName: "taskdb",
  })
  .then(() => {
    console.log(`Database Connected`);
  })
  .catch((err) => {
    console.log(`Error while connecting DB\n${err}`);
  });
