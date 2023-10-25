const { HTTP_STATUS_UNAUTHORIZED } = require('http2').constants;

class UnauthorisedError extends Error {
  constructor(message) {
    super(message);
    this.statusCode = HTTP_STATUS_UNAUTHORIZED;
  }
}

module.exports = UnauthorisedError;
