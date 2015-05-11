/*jshint sub: true */
var url = require('url'),
    aws = require('aws-sdk');

aws.config.update({
    accessKeyId: process.env.STATISTICS_ID, 
    secretAccessKey: process.env.STATISTICS_KEY,
});

AWS.config.update({region: 'eu-west-1'});

var util = exports = module.exports = {},
    lambda = new aws.Lambda();

// Normalizes unimportant differences in URLs - e.g. ensures
// http://google.com/ and http://google.com normalize to the same string
util.normalizeUrl = function (u) {
    return url.format(url.parse(u, true));
};

// Gets the URL to prerender from a request, stripping out unnecessary parts
util.getUrl = function (req) {
    var decodedUrl
      , parts;

    try {
        decodedUrl = decodeURIComponent(req.url);
    } catch (e) {
        decodedUrl = req.url;
    }

    parts = url.parse(decodedUrl, true);

    // Remove the _escaped_fragment_ query parameter
    if (parts.query && parts.query.hasOwnProperty('_escaped_fragment_')) {
        if (parts.query['_escaped_fragment_']) parts.hash = '#!' + parts.query['_escaped_fragment_'];
        delete parts.query['_escaped_fragment_'];
        delete parts.search;
    }

    var newUrl = url.format(parts);
    if (newUrl[0] === '/') newUrl = newUrl.substr(1);
    return newUrl;
};

util.log = function() {
  if (process.env.DISABLE_LOGGING) {
    return;
  }

  var data = {
    hostname: process.env.HOSTNAME,
    error: !!Array.prototype.slice.call(arguments, 1),
  };

  lambda.invoke({
    FunctionName: 'prerender-results-statistics',
    Payload: JSON.stringify(data)
  }, function (error) {
    if (error) { console.log(error); }
  })

  console.log.apply(console.log, [new Date().toISOString()].concat(Array.prototype.slice.call(arguments, 0)));
};
