const express = require('express');
const userController = require('../controllers/userController');

const router = express.Router();

router.get('/users', userController.user_index);

router.get('/users/:id', userController.user_details);

  router.delete('/users/:id',userController.user_delete)

  module.exports= router;