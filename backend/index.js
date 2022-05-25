
const NodeGeocoder = require('node-geocoder');
const options = {
  provider: 'google',

  // Optional depending on the providers
  httpAdapter: 'https', // Default
  apiKey: '011dd3f9c6b14cedb1d207994224af80', // for Mapquest, OpenCage, Google Premier
  formatter: null         // 'gpx', 'string', ...
};


var geocoder = NodeGeocoder(options);

geocoder.geocode('Москва', function(err, res) {
    console.log(res);
  });