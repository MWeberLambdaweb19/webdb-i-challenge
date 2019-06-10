const express = require('express');

const AccountModel = require('./data/accounts-model')

const server = express();

server.use(express.json())

server.get('/', (req, res) => {
   AccountModel.find()
   .then(item => {
       res.status(200).json({item, message: "It works"})
   })
   .catch(err => {
       res.status(500).json(err)
   })
})

// your code here

module.exports = server;