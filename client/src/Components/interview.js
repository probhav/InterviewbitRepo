import React from 'react'
import { makeStyles } from '@material-ui/core/styles';
//interview body
const useStyle = makeStyles((theme) => ({
    yoyo: {
      flexGrow: 1,
      padding:40 
    },
  }));


const Interview = ({item}) => {
    
    const date = new Date(parseInt(item.duration.start)).toDateString()
    const start = new Date(parseInt(item.duration.start)).toLocaleTimeString('en-IN', { hour: 'numeric', hour12: true, minute: 'numeric' })
    const end = new Date(parseInt(item.duration.end)).toLocaleTimeString('en-IN', { hour: 'numeric', hour12: true, minute: 'numeric' })
    const classes = useStyle();
    return (
        <div className={classes.yoyo}>
            <span style={{fontFamily: "verdana"}}>Participants : </span>
                {item.emails.map( (email,index) =>(<span style={{fontFamily: "verdana"}} key={index} >{email} &nbsp;&nbsp; </span> ))}
            <br/>
            <span style={{fontFamily: "verdana"}}> Day : {date}<br/> </span>
            Start time :
            <span style={{fontFamily: "courier"}}> {start}<br/> </span>
            End time : 
            <span style={{fontFamily: "courier"}}> {end}<br/> </span>
            { item.resume.trim() && 
            <div>
                <br/>
                <span style={{fontFamily: "verdana"}}>Resume : </span><br/>
                <iframe src = {item.resume}>{item.resume}</iframe>
            </div>}
            <hr/>
        </div>
    )
}

export default Interview;