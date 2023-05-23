const express = require('express');
const clienController = require('../controller/clientController');

const router = express.Router();

router.route('/user').post(clienController.createClient);

router.route('/allUsers').get(clienController.getAllClients);

router.route('/user').get(clienController.getClinet);

module.exports = router;
