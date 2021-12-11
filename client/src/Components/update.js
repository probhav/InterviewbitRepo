import React,{useState, useEffect} from 'react'
import axios from 'axios'
import Interview from './interview'
import DateTimePicker from 'react-datetime-picker'
import Button from 'react-bootstrap/Button'
import {interviews , user, updateInterview, deleteInterview} from '../utilities/url'

const Update = () => {
    const url = interviews
    const userURL = user
    const baseURL = updateInterview
    const deleteURL = deleteInterview
    const [ loading, setloading ] = useState(true)
    const [ items, setitem ] = useState([])
    const [ active , setActive] = useState()
    const [ users, setUsers ] = useState([])
    const [ updated, setUpdated ] = useState(false)
    const [ emails, setemailstate ] = useState([])
    const [ start, setStart] = useState(new Date());
    const [ end, setEnd] = useState(new Date());

    useEffect( ()=>{
        const fetch = async ()=>{
            try {
                const Axios = axios.create({baseURL : url})
                const result = await Axios.get()
                setitem(result.data)
            } catch (e) {
                console.log('error')
            }
        }
        fetch()
        const fetchUsers = async ()=>{
            try {
                const Axios = axios.create({baseURL : userURL})
                const result = await Axios.get()
                setloading(false)
                setUsers(result.data)
            } catch (e) {
                console.log('error')
            }
        }
        fetchUsers()
    },[updated])


    const handleAdd = (email)=>{
        setemailstate(pre=>[
            ...pre,email
        ])
    }

    const handleRemove = (email)=>{
        const auxEmail = emails.filter ( (item)=> item!==email)
        setemailstate(auxEmail)
    }

    const check = (item) => (active!==item)

    const checkUser=(email)=>{
        return emails.includes(email)
    }

    const clicked = (item)=> {
        setStart(new Date(parseInt(item.duration.start)))
        setEnd(new Date(parseInt(item.duration.end)))
        setemailstate(item.emails)
        setActive(item)
    }
    const unclicked = (item)=> {
        setStart(new Date())
        setEnd(new Date())
        setemailstate([])
        setActive(null)
    }

    const handleSubmit = ()=>{
        if(start>end)
         return alert('Start time should be before End time')
        const auxusers = users.filter( (item) => emails.includes(item.email))
        let formData = {
            users :auxusers,
            start : start.getTime().toString(),
            end : end.getTime().toString(),
            interviewID : active._id
        }
        axios
        .post(baseURL, formData)
        .then((response) => {
            alert('Interview was successfully updated');
            const aux =!updated
            setUpdated(aux)
        })
        .catch((error) => {
          alert(error.response.data.error)
          console.log(error.response.data.error)
        });

    }

    const handleDelete = ()=>{
        let formData = {
            interviewID : active._id
        }
        console.log(formData)
        axios
        .post(deleteURL, formData)
        .then((response) => {
            alert('Interview was successfully deleted');
            const aux =!updated
            setUpdated(aux)
        })
        .catch((error) => {
          alert(error.response.data.error)
          console.log(error.response.data.error)
        });

    }

    return loading?<div>loading...</div> : (
        
        <div>
            <h1 style={{fontFamily: "arial" , color : "royalblue"}}>Interviews</h1><hr/>
            {items.map( (item,index) =>(
            <div key ={index}>
                {check(item) && <Button variant="warning" onClick = {()=>clicked(item)}>Edit</Button>}
                {!check(item) && 
                <div>
                    <Button variant="danger" onClick = {()=>unclicked(item)}>Close</Button> 
                    <h2 style={{fontFamily: "arial" , color : "#162252"}}>Users</h2>
                    {
                        users.map( (user,index)=>
                        <p key={index}>
                            <span style={{fontFamily: "verdana"}}>{user.email}</span>
                            &nbsp;
                            {!checkUser(user.email) && <Button variant="success" onClick={()=>handleAdd(user.email)}> Add </Button>}
                            {checkUser(user.email) && <Button variant="danger" onClick={()=>handleRemove(user.email)}> Remove </Button>}
                        </p>
                    )}
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
                    <Button variant="primary" onClick = {()=>handleSubmit()}>Update Interview</Button>
                    <br/><br/>
                    <Button variant="danger" onClick = {()=>handleDelete()}>Delete Interview</Button>
                    <br/><br/>
                </div>}
                <Interview key = {index} item = {item} /> 
            </div>
            ))}
        </div>
    )
}

export default Update;