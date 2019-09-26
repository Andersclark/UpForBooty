const router = require('express').Router();
let Booty = require('../models/Booty');

router.route('/').get((req, res) => {
  Booty.find()
    .then(booty => res.json(booty))
    .catch(err => res.status(400).json('Error: ' + err));
});

router.route('/view/:id').get((req, res) => {
  Booty.findById(req.params.id)
    .then(booty => res.json(booty))
    .catch(err => res.status(400).json('Error: ' + err));
});

router.route('/update/:id').put((req, res) => {
  Booty.findByIdAndUpdate(req.params.id, req.body)
  .then(booty => res.json('Updated successfully!'))
  .catch(err => res.status(400).json('Error: ' + err));
})

router.route('/add').post((req, res) => {
  const firstName = req.body.firstName;
  const lastName = req.body.lastName;
  const phoneNo = req.body.phoneNo;
  const skypeHandle = req.body.skypeHandle;
  const email = req.body.email;
  const city = req.body.city;
  const country = req.body.country;
  const timezone = req.body.timezone;

  const newBooty = new Booty({
    firstName, lastName, phoneNo, skypeHandle, email, city, country, timezone
  });

  newBooty.save()
  .then(() => res.json('Booty added!'))
  .catch(err => res.status(400).json('Error: ' + err));
});

module.exports = router;