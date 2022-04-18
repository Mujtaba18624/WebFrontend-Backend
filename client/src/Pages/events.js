
import React, { useState } from 'react';
import axios from 'axios';
import { getEvent, setUserSession, setUserIDSession, getUser, removeUserSession, removeUserIDSession } from "../Utils/Common";
import Events  from '../Components/EventComponent.js';

const events = () => {

  //const [error, setError] = useState(null);
  //const [loading, setLoading] = useState(false);
  // const [email, setEmail] = useState('');
  // const [password, setPassword] = useState('');

  

  
  const event2 = getEvent();
  const getEvents = event2.map((sol) => <Events TITLE={sol.TITLE} EVENT_SUBTEXT={sol.EVENT_SUBTEXT} EVENT_CATEGORY={sol.EVENT_CATEGORY} EVENT_IMAGE_THUMB={sol.EVENT_IMAGE_THUMB}/>);
  return (
    <div>
      <h1><center> Welcome to the Events page!</center> </h1>

      <div><h1><center>Events</center> </h1> 
            <br /><br />
        
            {
                getEvents

            }
             
           
        </div>


      {/* <div class="login-form py-4">
  <div class="container">
    <div class="row justify-content-center">
      <div class="col-lg-5">
        <div class="card shadow-sm">
          <span class="shape"></span>
          <div class="card-header text-center bg-transparent">
            <i class="fas fa-user-circle"></i>
            <h2>Login Form</h2>
          </div>
          <div class="card-body py-4">
            <form action="#">
              <div class="form-group">
                <label for="name">Email</label>
                <input type="text" class="form-control shadow-none" placeholder="Email"/>
              </div>
              <div class="form-group">
                <label for="name">Password</label>
                 <input type="password" class="form-control shadow-none" placeholder="Password"/>
              </div>
              <div class="form-group">
                <div class="custom-control custom-checkbox">
                  <input type="checkbox" class="custom-control-input" id="customCheck1"/>
                  <label class="custom-control-label" for="customCheck1">Remember me</label>
                </div>
              </div>
              <div class="form-group">
                <button type="submit" class="btn">Submit</button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  </div>
</div> */}

    </div>
  )
}

export default events;