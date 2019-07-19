const router = require('express').Router();
let User = require('../models/user.model');

// get all
router.route('/').get((req, res) => {
  User.find()
    .then(users => res.json(users))
    .catch(err => res.status(400).json(`Error: ${err}`));
});

// create
router.route('/add').post((req, res) => {
  const username = req.body.username;

  const newUser = new User({username});

  newUser.save()
    .then(() => res.json('User added!'))
    .catch(err => res.status(400).json(`Error: ${err}`));
});

// get single user
router.route('/:id').get((req, res) => {
  User.findById(req.params.id)
    .then(user => res.json(user))
    .catch(err => res.status(400).json(`Error: ${err}`));
});

// delete
router.route('/:id').delete((req, res) => {
  User.findByIdAndDelete(req.params.id)
    .then(user => res.json(`User deleted -> ${user.username}`))
    .catch(err => res.status(400).json(`Error: ${err}`));
});

// update
router.route('/update/:id').post((req, res) => {
  User.findByIdAndUpdate(req.params.id)
    .then(user => {
      user.username = req.body.username;

      user.save()
        .then(() => res.json("User updated!"))
        .catch(err => res.status(400).json(`Error: ${err}`));
    })
    .catch(err => res.status(400).json(`Error: ${err}`));
})

module.exports = router;