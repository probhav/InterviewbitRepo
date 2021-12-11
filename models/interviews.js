const mongoose = require('mongoose');
const Schema = mongoose.Schema

const interviewSchema = new Schema({
    emails : [{
        type :String,
        trim : true,
        lowercase :true,
    }],
    duration : {
        start : String,
        end : String
    },
    resume : String
})

const Interview = mongoose.model('Interview',interviewSchema)

module.exports = Interview