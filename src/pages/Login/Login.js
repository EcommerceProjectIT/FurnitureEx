import { auth } from '../../utils/firebase';
import React from 'react'
import { useState } from 'react'
import { Link, useHistory } from 'react-router-dom'

const Login = () => {

    const [email,setEmail] = useState('');
    const [password,setPassword] = useState('');

    const [errorMsg,setErrorMsg] = useState('');
    const [successMsg,setSuccessMsg] = useState('');
    const history = useHistory();

    const handleLogin = (e) => {
        e.preventDefault();
        auth.signInWithEmailAndPassword(email,password)
        .then(() => {
            setSuccessMsg('Login successfull.You will now be automatically redirected to Home');
            setEmail('');
            setPassword('');
            setErrorMsg('');
            setTimeout(() => {
                setSuccessMsg('');
                history.push('/')
            }, 2000);
        })
        .catch(error =>{
            setErrorMsg(error.message)
        })
    }
    return (
        <div className="main">
            <div className="card">
                <h1>Login</h1>
                {
                    successMsg&& <div className="success msg">{successMsg}
                    <br /></div> 
                }
                <form onSubmit={handleLogin}>
                    <div className="form_field email">
                        <h3>Email: </h3>
                        <input type="email" id="email" required onChange={(e) =>setEmail(e.target.value)}
                        />
                    </div>

                    <div className="form_field password">
                        <h3>Password: </h3>
                        <input type="password" id="password" required onChange={(e) =>setPassword(e.target.value)}
                        />
                    </div>
                    <button type="submit">Login</button>
                    <br /><br /><hr />
                    <div className="footer">
                    New user? <Link to="signup">Register</Link>
                    </div>
                </form>
                {
                    errorMsg&& <div className="error msg">{errorMsg}
                    <br /></div> 
                }
            </div>
        </div>
    )
}

export default Login
