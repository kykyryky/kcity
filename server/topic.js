const express = require('express');
const mongoose = require('mongoose');
const router = express.Router();
const Schema = mongoose.Schema;

const Content = mongoose.model('Content', { 
  title: 'string',
  description: 'string',
  content: 'string',
  tags: 'string',
  date: 'date',
  show: 'boolean',
  author: { type: Schema.Types.ObjectId, ref: 'User' },
  files: [String],
  coords: [String]
 });

router.post('/topic', function(req, res) {
  req.body.date = new Date();
  req.body.author = req.user._id
  Content.create(req.body, function (err, data) {
    if (err) res.send(err);
    res.send(data);
  });  
});

router.get('/topic', function (req, res) {    
    Content.find({})
    .populate('author')
    .exec(function (err, contents) {
      if (err) res.send(err);
      res.send(contents);
    });
});

router.get('/topic/:id', function (req, res) {    
  Content.findOne({_id: req.params.id})
  .populate('author')
  .exec(function (err, content) {
    if (err) res.send(err);
    res.send(content);
  });
});

module.exports = router