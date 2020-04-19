const User = require('../models/User')
const jwt = require('jsonwebtoken')
const keys = require('../config/keys').secret

module.exports = {

    login: async (req, res, next) => {

        const { email, password } = req.body

        const today = new Date()
        const expirationDate = new Date(today)
        expirationDate.setDate(today.getDate() + 60)

        await User.findOne({ email, password })
                .then(() => {
                    const payload = {
                        email, password
                    }
    
                    let data = jwt.sign(payload, keys, {
                        expiresIn: parseInt(expirationDate.getTime() / 1000, 10)
                    })

                    return res.json({
                        email: email,
                        token: `${data}`
                    })
    
                })
                .catch(error => res.json({
                    error
                }))

    },
    
    register: async (req, res, next) => {

        const { name, email, password } = req.body

        const today = new Date();
        const expirationDate = new Date(today);
        expirationDate.setDate(today.getDate() + 60);

        await User.insertMany({ name, email, password })
            .then(() => {

                const payload = {
                    name, email
                }

                let data = jwt.sign(payload, keys, {
                    expiresIn: parseInt(expirationDate.getTime() / 1000, 10)
                })

                return res.json({
                    email: email,
                    name: name,
                    token: `${data}`
                })

            })
            .catch(error => res.json({
                error
            }))
    },

    getUsers: async (req, res, next) => {
        await User.find({})
            .then(result => {
                return res.json({
                    result
                })
            })
            .catch(error => {
                error
            })
    },

    getUserById: async (req, res, next) => {
        const { _id } = req.params
        await User.findById({ _id })
            .then(result => {
                if (!result) return res.status(404).end()
                return res.json({
                    result
                })
            })
            .catch(error => res.json({
                error
            }))
    },

    dashboard: (req, res, next) => {
        jwt.verify(req.token, keys, err => {
            if (err) {
                res.status(401).json({
                    error: "Unauthorized Access - No Token Provided!"
                })
            } else {
                res.json({
                    events: events
                })
            }
        })
    }

   
}