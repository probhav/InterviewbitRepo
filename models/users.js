const mongoose = require('mongoose');
const Schema = mongoose.Schema

const userSchema = new Schema({
    name : {
        type : String,
        trim : true
    },
    email : {
        type : String,
        trim : true,
        lowercase :true,
        unique : true
    },
    interviews : [{   // initially empty: contains ids of different interview schedulded for a user
            type : Schema.Types.ObjectId, 
            ref : 'Interview'
    }]   
})

const User = mongoose.model('User',userSchema)

module.exports = User