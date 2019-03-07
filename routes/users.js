
const express = require('express')

const User = require('../models/user');

const router = express.Router();

const mongoose = require('mongoose');

router.get('/', (req, res, next) => {
    User.find()
        .select("fname lname email _id age")
        .exec()
        .then(docs => {
            res.status(200).json({
                count: docs.length,
                users: docs.map(doc => {
                    return {
                        _id: doc._id,
                        FirstName: doc.fname,
                        LastName: doc.lname,
                        email:doc.email,
                        age:doc.age,
                        request: {
                            type: 'GET',
                            url: 'http://localhost:4000/users/' + doc._id
                        }
                    }
                })
            })
        })
        .catch(err => {
            res.status(500).json(err);
        })
})

router.post("/",(req, res, next) => {
    const user = new User({
        _id: new mongoose.Types.ObjectId(),
        fname: req.body.fname,
        lname:req.body.lname,
        email:req.body.email,
        age: req.body.age,
    });

    user
        .save()
        .then(result => {
            console.log(result);
            res.status(201).json({
                message: 'user Created',
                createduser: {
                    _id: result._id,
                    userFirstName: result.fname,
                    userLastName:result.lname,
                    userage: result.age,

                },
                request: {
                    type: 'GET',
                    url: 'http://localhost:4000/users/' + result._id
                }
            });

        })
        .catch(err => console.log(err));

});

router.get("/:userId", (req, res, next) => {
    const id = req.params.userId;
    User.findById(id)
      .select('fname lname age _id email')
      .exec()
      .then(doc => {
        console.log("From database", doc);
        if (doc) {
          res.status(200).json({
              user: doc,
              request: {
                  type: 'GET',
                  url: 'http://localhost:4000/users'
              }
          });
        } else {
          res
            .status(404)
            .json({ message: "No valid entry found for provided ID" });
        }
      })
      .catch(err => {
        console.log(err);
        res.status(500).json({ error: err });
      });
  });
router.patch("/:userId", (req, res, next) => {
    const id = req.params.userId;
    const updateOps = {};
    for (const ops of req.body) {
      updateOps[ops.propName] = ops.value;
    }
    User.update({ _id: id }, { $set: updateOps })
      .exec()
      .then(result => {
        res.status(200).json({
            message: 'user updated',
            request: {
                type: 'GET',
                url: 'http://localhost:4000/users/' + id
            }
        });
      })
      .catch(err => {
        console.log(err);
        res.status(500).json({
          error: err
        });
      });
  });
router.delete('/:userId', (req, res, next) => {
    const id = req.params.userId;
    User.remove({
            _id: id
        })
        .exec()
        .then(result => {
            console.log(result);
            res.status(200).json(result);
        })
        .catch(err => {
            console.log(err)
            res.status(500).json(err);
        })
});

module.exports = router;


