const express = require('express')
const mongoose = require('mongoose')
const signInModel = require('../models/signInModel')
const bcrypt = require('bcryptjs')


const router = new express.Router()

router.post('/users', async (req, res) => {
    try {
        if (req.body.password == req.body.confirmpassword) {
            const newuser = new signInModel(req.body)

            const token = await newuser.generateToken()

            const response = await newuser.save()
            res.status(201).send(response)
        } else {
            res.status(400).send('bad request')
        }
    } catch (err) {
        res.status(500).send(err)
    }
})

router.post('/login', async (req, res) => {
    try {
        const { email, password } = req.body
        const user = await signInModel.findOne({ email })
        const isMatch = await bcrypt.compare(password, user.password)

        const token = await user.generateToken()


        if (isMatch) {
            res.status(200).send(user)
        } else {
            res.status(400).send(
                { message: 'Invalid Login Credentials' }
            )
        }

    } catch (e) {
        res.status(500).send(e)
    }
})

router.get('/users', async (req, res) => {
    try {
        const users = await signInModel.find()
        res.status(200).send(users)
    } catch (e) {
        res.status(500).send(e)
    }
})

module.exports = router

