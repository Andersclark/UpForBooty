const router = require('express').Router();
const googleClient = require('@google/maps').createClient({
  key:'AIzaSyAXX1tIstIe91lBFIFKEMj5kSmbZsIvVyU',
  Promise: Promise
});
  router.route('/time/:city').get(async (req, res) => {

    let placequery = {
      input: req.params.city,
      inputtype: "textquery",
      fields: "geometry"
    }

    let placeResult = await googleClient.findPlace(placequery).asPromise()
      .catch(err => res.status(400).json('Error: ' + err));

    let time = Date.now()/1000;
    let timequery = {
      location: placeResult.json.candidates[0].geometry.location,
      timestamp: time
    }
    let result = await googleClient.timezone(timequery).asPromise()
      .catch(err => res.status(400).json('Error: ' + err));
      return res.json(result.json.timeZoneId)
  });
  module.exports = router;