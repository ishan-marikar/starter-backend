const logger = require("../../utils/logging")("route:response");
const mung = require("express-mung");

let routeResponseLogger = (body, request, response) => {
  logger.info("body", body);
  return body;
};

module.exports = mung.json(routeResponseLogger, { mungError: true });
