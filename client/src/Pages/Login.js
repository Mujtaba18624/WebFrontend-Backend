import React, { useState } from 'react';
import axios from 'axios';
import { setUserSession, setUserIDSession, getUser, removeUserSession, removeUserIDSession } from "../Utils/Common";
import ReactDOM from 'react-dom';


const Login = (props) => {

    const [error, setError] = useState(null);
    const [loading, setLoading] = useState(false);
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    const handleLogin = async () => {
        setError(null);
        setLoading(true);
        axios.post("http://localhost:4000/users/login", {
            email: email,
            password: password
        }).then(async response => {
            setLoading(false);
            setError(null);
            setLoading(true);
            const token = response.data.data.message.token;
            setUserSession(token);
            let config = {
                headers: {
                    Authorization: "basic " + token
                }
            }

            await axios.get("http://localhost:4000/users/user-profile", config, {
            }).then(response => {
                setLoading(false);
                // console.log(response.data.data.result.profile[0]);
                setUserIDSession(response.data.data.result.profile[0]);

            }).catch(error => {
                setLoading(false);
                console.log("errors >>> ", error)
            }// console.log('error >>>', error);
            )
            if (response.data.data.message.Type == 2)
                props.history.push('/dashboard');
            else {
                console.log("This isnt customer");
                removeUserIDSession();
                removeUserSession();
            }
        }).catch(error => {
            setLoading(false);
            if (error.response.status === 500 || error.response.status === 400 ) {
                setError(error.response.data.data.message)
            }
        }
        )

    }

    return (

        <div>
            <div className="login-form py-4">
                <div className="container">
                    <div className="row justify-content-center">
                        <div className="col-lg-5">
                            <div className="card shadow-sm">
                                <span className="shape"></span>
                                <div className="card-header text-center bg-transparent">
                                    <i className="fas fa-user-circle"></i>
                                    <h2>Login</h2>
                                </div>
                                <div className="card-body py-4">
                                    <form action="#">
                                        <div className="form-group">
                                            <label >Email</label>
                                            <input type="text" className="form-control shadow-none" value={email} onChange={e => setEmail(e.target.value)}
                                                placeholder="Email" /><br />
                                        </div>
                                        <div className="form-group">
                                            <label >Password </label>
                                            <input type="password" className="form-control shadow-none" value={password} onChange={e => setPassword(e.target.value)}
                                                placeholder="Password" /><br />
                                        </div>
                                        <div className="form-group">


                                           

                                            <a href="/register"><small>Don't have an account?</small> </a>
                                            <br /><br />
                                        </div>
                                        <div className="form-group">
                                            {error && <><h5 style={{ color: 'red' }}>{error}</h5></>}
                                            <button type="button" onClick={handleLogin} value={loading ? 'Loading...' : 'Login'} disabled={loading} className="btn">Login</button>
                                        </div>

                                    </form>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>


            </div>
        </div>

    )
}


export default Login;