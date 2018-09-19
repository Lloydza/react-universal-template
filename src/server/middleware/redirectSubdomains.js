// Used to redirect if a request is made to the wrong sub-domain

const redirectSubdomains = function (req, res, next) {
  /*
  // Example implementation:
  var host = req.get("host");
  if (host !== 'www.mywebsite.com') {
    return res.redirect(301, ['https://www.mywebsite.com', req.url].join(''));
  }
  */

  return next();
};

module.exports = redirectSubdomains;
