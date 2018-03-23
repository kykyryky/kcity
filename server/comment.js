const express = require('express');
const mongoose = require('mongoose');
const router = express.Router();
const Schema = mongoose.Schema;

const Comment = mongoose.model('Comment', { 
  topic: { type: Schema.Types.ObjectId, ref: 'Content' },
  parent: { type: Schema.Types.ObjectId, ref: 'Comment' },
  comment: 'string',
  date: 'date',
  show: 'boolean',
  author: { type: Schema.Types.ObjectId, ref: 'User' },
  childen: [{ type: Schema.Types.ObjectId, ref: 'Comment' }]
 });

router.post('/comment', function(req, res) {
  req.body.date = new Date();
  req.body.author = req.user._id
  Comment.create(req.body, function (err, data) {
    if (err) res.send(err);
    res.send(data);
  });  
});

router.get('/comment/:id', function (req, res) {    
  Comment.find({topic: req.params.id})
    .populate('author')
    .exec(function (err, contents) {
      if (err) res.send(err);
      res.send(contents);
    });
});

module.exports = router