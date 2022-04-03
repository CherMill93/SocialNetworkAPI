const { User, Thought } = require('../models/User')

const userController = {
//get all user
  getAllUser(req, res) {
    User.find({})
    .select('-__v')
    .sort({ _id: -1 })
    .then(dbUserData => res.json(dbUserData))
    .catch(err => {
      console.log(err);
      res.sendStatus(400);
    });
  },

  //get single user 
  getUserById({ params }, res) {
    User.findOne({ _id: params.id })
    .populate({
      path: 'thoughts',
      select: '-__v'
    })
    .then(dbUserData => {
      if (!dbUserData) {
        res.status(404).json({ message: 'Whooops! No user found! Try Again.'});
        return;
      }
      res.json(dbUserData);
    })
    .catch(err => {
      console.log(err);
      res.sendStatus(400);
    });
  }, 
  // createUser
  createUser({ body }, res) {
    User.create(body)
      .then(dbUserData => res.json(dbUserData))
      .catch(err => res.json(err));
  },

  // update User by id
  updateUser({ params, body }, res) {
    User.findOneAndUpdate({ _id: params.id }, body, { new: true, runValidators: true })
      .then(dbUserData => {
        if (!dbUserData) {
          res.status(404).json({ message: 'Uh oh! No Users with that ID :(' });
          return;
        }
        res.json(dbUserData);
      })
      .catch(err => res.json(err));
  },

  // delete User and related thoughts
  deleteUser({ params }, res) {
    Thought.deleteMany({ userId: params.id })
      .then(() => {
        User.findOneAndDelete({ userId: params.id })
          .then(dbUserData => {
            if (!dbUserData) {
              res.status(404).json({ message: 'Uh oh! No Users with that ID :(' });
              return;
            }
            res.json(dbUserData);
          });
      })
      .catch(err => res.json(err));
  }
}

module.exports = userController;