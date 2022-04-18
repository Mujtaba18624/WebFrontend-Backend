import React, { useState } from 'react';
import axios from 'axios';
import { setUserIDSession, getUser, removeUserSession, removeUserIDSession, getToken } from "../Utils/Common";

const Dashboard = (props) => {
    const [error, setError] = useState(null);
    const [loading, setLoading] = useState(false);
    // const [email, setEmail] = useState('');
    // const [password, setPassword] = useState('');
    const user = getUser();
    const token = getToken();


    const handleLogout = async() => {
        setLoading(true);

        let config = {
            headers: {
                Authorization: "basic " + token
            }
        }
        await axios.delete("http://localhost:4000/users/logout", config, {
        }).then(response => {
            setLoading(false);

            removeUserSession();
            removeUserIDSession();

        }).catch(error => {
            setLoading(false);
            console.log("errors >>> ", error)
        }// console.log('error >>>', error);
        )
        props.history.push('/login');
    }

    return (
        <div>
            <h1> CUSTOMER </h1> <br /><br />
            Welcome {user.Name}! <br /><br />
            Your Address is:  {user.Address}. <br /><br />
            Your Email is:  {user.Email} <br /><br />
            Your Phone is:  {user.Contact} <br /><br />
            <input
                type="button"
                onClick={handleLogout}
                value="Logout" />
        </div>
    )
}

export default Dashboard;