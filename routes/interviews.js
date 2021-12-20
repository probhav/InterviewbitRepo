const express = require('express');
const {sendInterviewMail,sendUpdateMail} = require('../emails/account');
const router = express.Router();

const valid = require('../middleware/valid')
const valid_update = require('../middleware/valid_update')
const Interview = require('../models/interviews')
const User = require('../models/users')

router.get('/', async (req, res) => {
  try {
    const interviews = await Interview.find({});
    res.status(200).send(interviews);
  } catch (e) {
      res.status(400).send(e);
  }
});

router.post('/delete', async (req,res)=>{
    try {
        interview = await Interview.findById(req.body.interviewID)
        // console.log(interview)
        for( const email of interview.emails)
        {
            const user = await User.findOne({email})
            user.interviews.splice(user.interviews.indexOf(interview._id),1)
            await user.save()
        }
        await Interview.findByIdAndDelete(interview._id)
        res.status(200).send()
    } catch (e) {
        res.status(500).send()
    }
})

router.post('/update',valid_update, async (req,res) => {
    try {
        emails=[]
        for( const user of req.body.users)
        {
            emails.push(user.email)
        }
        await Interview.findByIdAndUpdate(req.body.interviewID,{
            emails,
            duration : {
                start : req.body.start,
                end : req.body.end
            }
        })
        const interview = await Interview.findById(req.body.interviewID)
        for(const currentuser of req.body.users)
        {
            const user = await User.findById(currentuser._id)
            if(!(user.interviews.includes(interview._id)))
            user.interviews.push(interview._id)
            await user.save()
        }
        res.status(200).send()
    } catch (e) {
        res.status(500).send()
    }
})

router.post('/',valid, async (req,res) => {
    try {
        
        emails=[]
        for( const user of req.body.users)
        {
            emails.push(user.email)
        }
        const resumelink = req.body.resume
        resumelink.trim()
        let resume=''
        if(resumelink)
        resume = resumelink.slice(0 , resumelink.lastIndexOf('/view'))+"/preview"
        interview = await new Interview({ // scheduling a new interview
            emails,
            duration : {
                start : req.body.start,
                end : req.body.end
            },
            resume 
        }).save()
        for(const currentuser of req.body.users)
        {
            const user = await User.findById(currentuser._id)
            user.interviews.push(interview._id)  // pushing interview_id in each user(interview_id)
            await user.save()   
        }
        res.status(201).send()
    } catch (e) {
        res.status(500).send()
    }
})


module.exports = router;