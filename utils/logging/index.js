const bunyan = require("bunyan");

module.exports = name => {
  let logger = bunyan.createLogger({ name: name });
  return logger;
};
