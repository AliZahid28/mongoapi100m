const express = require('express')
const mongoose = require('mongoose')
const MensRanking = require('../models/atheleteModel')

const router = new express.Router()

router.get('/', (req, res) => {
    res.send('api is running')
})

router.post('/athelete', async (req, res) => {
    try {
        const athelete = new MensRanking(req.body)
        const result = await athelete.save()
        res.status(201).send(result)
    } catch (e) {
        res.status(500).send(e)
    }
})

router.get('/athelete', async (req, res) => {
    try {
        const getAtheletes = await MensRanking.find()
        res.status(200).send(getAtheletes)
    } catch (e) {
        res.status(500).send(e)
    }
})


router.patch('/athelete/:id', async (req, res) => {
    try {
        const _id = req.params.id
        if (!mongoose.Types.ObjectId.isValid(_id)) {
            return res.status(400).send({ error: 'Invalid athlete ID' });
        }
        const updateAthelte = await MensRanking.findByIdAndUpdate(_id, req.body, {
            new: true,
            runValidators: true,
        })
        res.status(200).send(updateAthelte)
    } catch (err) {
        res.status(500).send(err)
    }
})

router.delete('/athelete/:id', async (req, res) => {
    try {
        const _id = req.params.id
        const deteletAthelete = await MensRanking.findByIdAndDelete(_id)
        res.status(200).send({ message: 'Athelete Delete' })
    } catch (err) {
        res.status(500).send(err)
    }
})

module.exports = router