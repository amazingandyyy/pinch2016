var express = require('express');
var router = express.Router();

var User = require('../models/user');

router.get('/', (req, res) => {
    User.find({}, (err, users) => {
        res.status(err ? 400 : 200).send(err || users);
    });
});

// // /api/users/profile
router.get('/own', User.authMiddleware, (req, res) => {
    console.log('req.user:', req.user);
    res.send(req.user);
})
// router.put('/profile/own', User.isLoggedIn, (req, res) => {
//     console.log('req.body: ', req.body);
//     var userObj = req.body
//     User.findByIdAndUpdate(userObj._id, userObj)
//         .exec((err, user) => {
//             res.status(err ? 400 : 200).send(err || user);
//         });
// })
//
// router.get('/profile/:id', (req, res) => {
//     // console.log('ddd');
//     console.log('req: ', req.params);
//     var userId =req.params.id;
//     console.log(userId);
//     User.findById(userId)
//         .exec((err, user) => {
//             res.status(err ? 400 : 200).send(err || user);
//         });
// })

module.exports = router;
