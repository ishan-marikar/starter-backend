"use strict";
module.exports = mongoose => {
  const logger = require("../../utils").logger("database");
  mongoose.Promise = global.Promise;
  mongoose.connect(
    process.env.MONGODB_URI,
    {
      autoReconnect: true,
      reconnectTries: Number.MAX_VALUE,
      bufferMaxEntries: 0
    }
  );

  mongoose.connection.on("connected", () => {
    logger.info("database.connect", {
      host: mongoose.connection.host,
      name: mongoose.connection.name,
      port: mongoose.connection.port
    });
  });

  // If the connection throws an error
  mongoose.connection.on("error", error => {
    logger.error("database.error", error);
  });

  // When the connection is disconnected
  mongoose.connection.on("disconnected", () => {
    logger.info("database.disconnect");
  });

  process.on("SIGINT", function() {
    mongoose.connection.close(() => {
      console.log("Connection disconnected through app termination");
      process.exit(0);
    });
  });
};
