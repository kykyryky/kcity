const express = require('express');
const mongoose = require('mongoose');
const router = express.Router();

var Content = mongoose.model('Content', { 
  title: 'string',
  description: 'string',
  content: 'string',
  tags: 'string',
  date: 'date',
  show: 'boolean',
  files: [String],
  coords: [String]
 });

router.post('/content', function(req, res) {
  req.body.date = new Date();
  Content.create(req.body, function (err, data) {
    if (err) res.send(err);
    res.send(data);
  });  
});

router.get('/content', function (req, res) {    
    Content.find({}, function (err, contents) {
      if (err) res.send(err);
      res.send(contents);
    });
});

router.get('/content/:id', function (req, res) {    
  Content.findOne({_id: req.params.id}, function (err, content) {
    if (err) res.send(err);
    res.send(content);
  });
});

module.exports = router