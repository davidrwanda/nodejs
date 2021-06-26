const express = require('express');

const router = express.Router();

 router.get('/', (re, res, next) =>{
    res.send('<h1>Hello from Express </h1>');
  });


  module.exports = router;