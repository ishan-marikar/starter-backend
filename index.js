// ⚙ Environment Configurations
global.Promise = require("bluebird");
require("dotenv-safe").config();
let { PORT, NODE_ENV } = process.env;

// ⚙ Project Details
const getVersion = require("git-repo-version");
const PACKAGE = require("./package.json");
const VERSION = getVersion();

// ⚙ Direct Dependencies
let server = require("express")();
let database = require("mongoose");

// ⚙ Project Dependencies
const config = require("./config");
const middleware = require("./middleware");
const logger = require("./utils/logging")("server");

// ⚙ Configurations
server = config.server(server);
database = config.database(database);

// ⚙ Middleware
// ➡ Prettify the payload
server.use(middleware.routeFormatter);
server.use(middleware.routeLoggerRequest);
server.use(middleware.routeLoggerResponse);

// ⚙ Routes
// ➡ API Information
server.get("/", (request, response, next) => {
  return response.json({
    data: "jello"
  });
});

// ➡ Route 404 Handler
server.use((request, response, next) => {
  return response.status(404).json({
    error: "route.not-found"
  });
});

// ➡ Router Error Handler
server.use((error, request, response) => {});

// ⚡ Listen to connections
server.listen(PORT, () => {
  logger.info("server.listen", {
    port: PORT,
    version: VERSION,
    environment: NODE_ENV
  });
});
