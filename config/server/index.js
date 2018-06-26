const helmet = require("helmet");
const bodyParser = require("body-parser");

let expressConfig = express => {
  express.use(helmet());
  express.use(bodyParser.json());
  return express;
};

module.exports = expressConfig;
