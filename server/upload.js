const express = require('express');
const mongoose = require('mongoose');
const router = express.Router();
const multer  = require('multer');
const upload = multer();
const sharp = require('sharp');
const fs = require('fs')

/*TODO*/
const cache = require('cache-control');

const File = mongoose.model('File', { 
  image:{
      type: Buffer,
      required: true
  }
});

router.post('/image', upload.single('file'), function(req, res) {  
  const file = req.file;

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

function findInCache(prefix) {
  const func = (req, res, next) => {
    const uuid = req.params.uuid;
    const width = parseInt(req.params.width);
    const height = parseInt(req.params.height);
    const path = `${prefix}}/${uuid}${width}${height}`;

    if (fs.existsSync(path)) {
      fs.readFile(path, (err, data) => {
        if (err) throw err;
        res.end(data);
      });
    } else {
      next();
    }
  }

  return func;
}

function crop(req, res, next) {
  const uuid = req.params.uuid;
  const width = parseInt(req.params.width);
  const height = parseInt(req.params.height);
  const path = `cache/crop/${uuid}${width}${height}`;  

  File.findOne({_id: uuid}, function (err, file) {
    sharp(file.image)
      .rotate()
      .resize(width, height)
      .crop(sharp.strategy.entropy)
      .toBuffer()
      .then((data) => {
        fs.writeFile(path, data, (err) => {
          if (err) throw err;
          res.end(data);
        });      
      });
  });
}

router.get('/image/:uuid/crop/:width/:height', [findInCache('cache/crop'), crop]);

function resize(req, res, next) {
  const uuid = req.params.uuid;
  const width = parseInt(req.params.width);
  const height = req.params.height ? parseInt(req.params.height) : null;
  const path = `cache/resize/${uuid}${width}${height}`;  

  File.findOne({_id: uuid}, function (err, file) {
    sharp(file.image)
      .rotate()
      .resize(width, height)
      .max()
      .toBuffer()
      .then((data) => {
        fs.writeFile(path, data, (err) => {
          if (err) throw err;
          res.end(data);
        });      
      });
  });
}

router.get('/image/:uuid/resize/:width/:height?', [findInCache('cache/resize'), resize]);

router.get('/image/:uuid', function(req, res) {    
  const uuid = req.params.uuid;

  console.log('Return image');

  File.findOne({_id: uuid}, function (err, file) {
      res.end(file.image);
  });
});

router.delete('/image/:uuid', function(req, res) {  
  const uuid = req.params.uuid;
  File.remove({_id: uuid}, function (err, file) {
    if (err) res.send(err);
    res.send();
  });
});

router.use(cache({
  '/image/**': 10000,
  '/**': 500 // Default to caching all items for 500 
}));

module.exports = router