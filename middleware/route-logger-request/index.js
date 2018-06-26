const logger = require("../../utils/logging")("route:request");

let routeRequestLogger = (request, response, next) => {
  logger.info("headers", request.headers);
  if (Object.keys(request.body).length > 0) {
    logger.info("body", request.body);
  }
  return next();
};

module.exports = routeRequestLogger;
