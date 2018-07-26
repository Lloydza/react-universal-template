// Used to make sure the request accesses the SSL version of the site

var forceSsl = function (req, res, next) {
  /*
  // Example implementation:
  var host = req.get("host");
  if (req.headers['x-forwarded-proto'] !== 'https') {
    return res.redirect(301, ['https://', req.get('Host'), req.url].join(''));
  }
  */

  return next();
};

module.exports = forceSsl;
