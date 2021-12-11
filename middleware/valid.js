
const Interview = require('../models/interviews')
const User = require('../models/users')

valid = async (req,res,next)=>{
    if(req.body.users.length<2)
        return res.status(400).send({
            error : 'Interview should have at least two users.'
        })
    users = req.body.users
    const start = req.body.start
    const end = req.body.end
    for( currentuser of users){
        user = await User.findById(currentuser._id)
        for( interviewID of user.interviews)
        {
            const interview = await Interview.findById(interviewID)
            if(!(interview.duration.end<=start || interview.duration.start>=end)){

                return  res.status(400).send({
                    error : 'User(s) ' + user.email + ' is not free at that time.'
                })
            }
        }
    }
    next()
}

module.exports = valid