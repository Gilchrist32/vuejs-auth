const Event = require('../models/Event')

module.exports = {
    getEvents: async (req, res, next) => {
        await Event.find({})
            .then(events => {
                return res.json({
                    events: events
                })
            })
    },

    addEvent: async (req, res, next) => {
        const { title, time, date } = req.body
        await Event.insertMany({
            title, time, date
        }).then(result => {
            return res.json({
                result
            })
        }).catch(error => res.json({
            error
        }))
    }
}