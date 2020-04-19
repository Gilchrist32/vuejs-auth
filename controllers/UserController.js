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
                .then(user => {

                    if (user.email === email && user.password === password) {
                        
                        const payload = {
                            email, password
                        }
        
                        let token = jwt.sign(payload, keys, {
                            expiresIn: parseInt(expirationDate.getTime() / 1000, 10)
                        })
    
                        return res.json({
                            email: user.email,
                            name: user.name,
                            token: `${token}`
                        })
                        
                    } 

                })
                .catch(error => res.json({
                    error: "Invalid credentials" 
                }))

    },
    
    register: async (req, res, next) => {

        const { name, email, password } = req.body

        const today = new Date();
        const expirationDate = new Date(today);
        expirationDate.setDate(today.getDate() + 60);

    
        await User.insertMany({ name, email, password })
            .then(user => {

                let errorsToSend = []

                if (user.email === email) {
                    errorsToSend.push('An account with this email already exists.')
                } 
                if (user.password.length < 5) {
                    errorsToSend.push('Password too short.')
                }
                if (errorsToSend.length > 0) { // check if there are any errors
                    res.status(400).json({ errors: errorsToSend }) // send errors back with status code
                } else {
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
                }

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