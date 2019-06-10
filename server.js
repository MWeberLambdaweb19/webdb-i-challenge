// importing modules
const express = require('express');

// importing files
const AccountModel = require('./data/accounts-model')

// binding modules to server
const server = express();

// binding use of json to server
server.use(express.json())

// CREATE
server.post('/', (req, res) => {
    const body = req.body
    const {name} = req.body
    const {budget} = req.body
    if (!name) {
        res.status(400).json({message: "Name field required (string)!"})
    }
    if (!budget) {
        res.status(400).json({message: "Budget field required (integer)!"})
    }
    AccountModel.add(body)
    .then(newItem => {
        res.status(201).json({newItem, message: "new item added"})
    })
    .catch(err => {
        res.status(500).json({err})
    })
})
// READ
// get all
server.get('/', (req, res) => {
   AccountModel.find()
   .then(item => {
       res.status(200).json(item)
   })
   .catch(err => {
       res.status(500).json(err)
   })
})

// get by id
server.get('/:id', (req, res) => {
    const {id} = req.params
    AccountModel.findById(id)
    .then(account => {
        res.status(200).json(account)
    })
    .catch(err => {
        res.status(500).json(err)
    })
})
// UPDATE
server.put('/:id', (req, res) => {
    const {id} = req.params
    const changes = req.body
    const {name} = req.body
    const {budget} = req.body
    if (!name) {
        res.status(400).json({message: "Name field requires updating (string)!"})
    }
    if (!budget) {
        res.status(400).json({message: "Budget field requires updating (integer)!"})
    }
    AccountModel.update(id, changes)
    .then(updatedItem => {
        res.status(201).json({updatedItem, message: "item updated!"})
    })
    .catch(err => {
        res.status(500).json({err})
    })
})
// DELETE
server.delete('/:id', (req, res) => {
    const {id} = req.params
    AccountModel.remove(id)
    .then(
        res.status(200).json()
    )
    .catch(err => {
        res.status(500).json(err)
    })
})

module.exports = server;