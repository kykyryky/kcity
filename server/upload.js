const express = require('express');
const mongoose = require('mongoose');
const router = express.Router();
const multer  = require('multer');
const upload = multer();
const sharp = require('sharp');

const File = mongoose.model('File', { 
  image:{
      type: Buffer,
      required: true
  }
});

router.post('/image', upload.single('file'), function(req, res) {  
  const file = req.file;
  console.log(req.file);

  const data = {
    image: file.buffer
  }

  File.create(data, function (err, result, next) {
    if (err) {
      res.send(err);
    }
    res.send(result._id);
  });
});

router.get('/image/:uuid', function(req, res) {  
  const uuid = req.params.uuid;
  File.findOne({_id: uuid}, function (err, file) {
    sharp(file.image)
      .rotate()
      .resize(300, 200)
      .crop(sharp.strategy.entropy)
      .toBuffer()
      .then((data) => {
        res.contentType('image/png');
        res.end(data);
      });
  });
});

router.delete('/image/:uuid', function(req, res) {  
  const uuid = req.params.uuid;
  File.remove({_id: uuid}, function (err, file) {
    if (err) res.send(err);
    res.send();
  });
});

module.exports = router