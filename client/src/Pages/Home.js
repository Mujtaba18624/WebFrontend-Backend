
import React, { useState } from 'react';
import axios from 'axios';
import { setEventSession,setUserSession, setUserIDSession, getUser, removeUserSession, removeUserIDSession } from "../Utils/Common";


const Home = (props) => {

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  
  const handleevent = async() => {
    setLoading(true);

 
    await axios.get("http://localhost:4000/users/events",  {
    }).then(response => {
        setLoading(false);
        setEventSession(response.data.data.result.data);
        console.log(response.data.data.result.data);
    }).catch(error => {
        setLoading(false);
        console.log("errors >>> ", error)
    }// console.log('error >>>', error);
    )
    props.history.push('/events');
}


  return (
    <div>
      <h1><center> Welcome to the home page!</center> </h1>
      <input
                type="button"
                onClick={handleevent}
                value="Show events" />


    </div>
  )
}

export default Home;