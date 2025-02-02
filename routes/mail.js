const { sendMail } = require('../controller/mailContoller');

const route = require('express').Router();

route.post('/sendMail', sendMail)

module.exports = route