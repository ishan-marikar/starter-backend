const mung = require("express-mung");

let bodyModifier = (body, request, response) => {
  if (typeof body.error !== "undefined") {
    body = {
      statusCode: response.statusCode,
      success: false,
      payload: body
    };
  } else {
    body = {
      statusCode: response.statusCode,
      success: true,
      payload: body
    };
  }
  return body;
};

module.exports = mung.json(bodyModifier, { mungError: true });
