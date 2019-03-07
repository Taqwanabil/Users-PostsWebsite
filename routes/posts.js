const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');


const post = require('../models/post');
const user = require('../models/user');

router.get('/', (req, res, next) => {
    post.find()
        .select("title body _id")
        .populate('fname')
        .exec()
        .then(docs => {
            res.status(200).json({
                count: docs.length,
                posts: docs.map(doc => {
                    return {
                        _id: doc._id,
                        title: doc.title,
                        body: doc.body,
                        request: {
                            type: 'GET',
                            url: 'http://localhost:4000/posts/' + doc._id
                        }
                    }
                })
            })

        })
        .catch(err => {
            res.status(500).json(err)


        })
});
router.post('/', (req, res, next) => {
    // to make sure that a user is actually exitst for a post 
    user.findById(req.body.userId)
        .then(user => {
            if (!user) {
                return res.status(404).json({
                    message: 'user not found',
                });
            }
            const post = new post({
                _id: mongoose.Types.ObjectId(),
                title: req.body.title,
                body: req.body.body,
                user: req.body.userId
            })
            return post
                .save()
        })
        .then(result => {
            console.log(result);
            res.status(201).json({
                message: 'post Created',
                createdpost: {
                    _id: result._id,
                    user: result.user,
                    title: req.result.title,
                    body: req.result.body,
                },
                request: {
                    type: 'GET',
                    url: 'http://localhost:4000/posts/' + result._id
                }
            });

        })
        .catch(err => {
            res.status(500).json({
                error: err
            })
        })

});

router.get('/:postId', (req, res, next) => {
    post.findById(req.params.postId)
    .populate('user')  // to get all detailed data of user in certain post
        .exec()
        .then(post => {
            if (!post) {
                return res.status(404).json({
                    message: 'post not found',
                });
            }
            res.status(200).json({
                post: post,
                request: {
                    type: 'GET',
                    url: 'http://localhost:4000/posts'

                }
            })
        })
        .catch(err => {
            res.status(500).json({
                error: err
            })
        })
});
router.delete('/:postId', (req, res, next) => {
    post.remove({
            _id: req.params.postId
        })
        .exec()
        .then(result => {
            res.status(200).json({
                message: "post Deleted",
                request: {
                    type: 'POST',
                    url: "http://localhost:4000/posts",
                    body: {
                        userId: "ID",
                        body: "String",
                        title:"String"
                    }
                }
            })
        })
        .catch(err => {
            res.status(500).json({
                error: err
            })
        })

});


function redirectToList() {
    window.location.href = "http://localhost:4000/users";
}
module.exports = router;