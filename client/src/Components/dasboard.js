import React,{useState, useEffect} from 'react'
import axios from 'axios'
import DateTimePicker from 'react-datetime-picker'
import Button from 'react-bootstrap/Button'
import {interviews , user, updateInterview, deleteInterview} from '../utilities/url'

const Dashboard = () => {
    const url = user
    const baseURL = interviews
    const [ loading, setloading ] = useState(true)
    const [ items, setitem ] = useState([])
    const [ emails, setemailstate ] = useState([])
    const [ resume, setresumestate ] = useState('')
    const [start, setStart] = useState(new Date());
    const [end, setEnd] = useState(new Date());

    useEffect( ()=>{
        const fetch = async ()=>{
            try {
                const Axios = axios.create({baseURL : url})
                const result = await Axios.get()
                setloading(false)
                const users = result.data
                setitem(users)
                
            } catch (e) {
                console.log(e)
            }
        }
        fetch()
    },[])

    const handleAdd = (email)=>{
        setemailstate(pre=>[
            ...pre,email
        ])
    }

    const handleRemove = (email)=>{
        const auxEmail = emails.filter ( (item)=> item!==email)
        setemailstate(auxEmail)
    }

    function isValidHttpUrl(string) {
        let url;
        if(!string.includes('drive.google.com/file'))
            return false
        try {
          url = new URL(string);
        } catch (_) {
          return false;  
        }
        return url.protocol === "http:" || url.protocol === "https:";
    }

    const handleSubmit = ()=>{
        if(start>end)
         return alert('Start time should be before End time')
        if(resume.trim() && !isValidHttpUrl(resume) )
         return alert('Please enter a valid google drive resume URL')
        const users = items.filter( (item) => emails.includes(item.email))
        let formData = {
            users,
            start : start.getTime().toString(),
            end : end.getTime().toString(),
            resume
        }
        axios
        .post(baseURL, formData)
        .then((response) => {
            const aux =[]
            setemailstate(aux)
            alert('Interview was successfully created');
        })
        .catch((error) => {
          alert(error.response.data.error)
          console.log(error.response.data.error)
        });

      }
    
    const check=(email)=>{
        return emails.includes(email)
    }

    const changeFile = async (event)=>{
            const file = (event.target.value)
            setresumestate(file)
    }

    return loading? <div>
                        loading...
                    </div> : (
        <div>
            <h1 style={{fontFamily: "arial" , color : "royalblue"}}>Create Interviews here</h1><hr/>
            <h2 style={{fontFamily: "arial" , color : "#162252"}}>Users</h2>
           {
               items.map( (item,index)=>
               <p key={index}>
                   <span style={{fontFamily: "verdana"}}>{item.email}</span>
                   &nbsp;
                   {!check(item.email) && <Button variant="success" onClick={()=>handleAdd(item.email)}> Add </Button>}
                   {check(item.email) && <Button variant= "danger"onClick={()=>handleRemove(item.email)}> Remove </Button>}
               </p>
               )
           }
           <hr/>
           <h2 style={{fontFamily: "arial" , color : "#162252"}}>Select Duration</h2>
           <span style={{fontFamily: "verdana"}}>Start Time : </span>
            <DateTimePicker
                onChange={setStart}
                value={start}
            />
            <br/>
            <span style={{fontFamily: "verdana"}}>End Time : </span>
            <DateTimePicker
                onChange={setEnd}
                value={end}
            />
            <br/><br/>
            <div>
            <span style={{fontFamily: "verdana"}}>G-Drive Resume link : </span> 
                <input type ="text" name="file"  onChange={changeFile}></input>
            </div>
            <br/>
            <Button variant="primary" onClick = {()=>handleSubmit()}>Create Interview</Button>
        </div>
    )
}

export default Dashboard;