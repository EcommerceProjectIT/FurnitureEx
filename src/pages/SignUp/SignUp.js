import React, { useState } from 'react'
import { Link, useHistory } from 'react-router-dom'
import { auth, db } from '../../utils/firebase'
import './SignUp.css'

const SignUp = () => {
    const [fullname,setFullname] = useState('');
    const [email,setEmail] = useState('');
    const [password,setPassword] = useState('');

    const [errorMsg,setErrorMsg] = useState('');
    const [successMsg,setSuccessMsg] = useState('');

    const history = useHistory();

    const handleSignUp = (e) => {
        e.preventDefault();
        auth.createUserWithEmailAndPassword(email,password)
        .then((credentials) =>{
            console.log(credentials);
            db.collection('users').doc(credentials.uid).set({
                Fullmame: fullname,
                Email: email,
                Password: password
            }).then(() =>{
                setSuccessMsg("SignUp successfull.You will now be automatically redirected to Login")
                setEmail('');
                setFullname('');
                setPassword('');
                setErrorMsg('');
                setTimeout(() => {
                    setSuccessMsg('');
                    history.push('/login')
                }, 2000);
            }).catch(error =>{
                setErrorMsg(error.message)
            })
        })
        .catch((error) =>{
            setErrorMsg(error.message)
        })
    }

    return (
        <div className="main">
            <div className="card">
                <h1>Create Account</h1>
                {
                    successMsg&& <div className="success msg">{successMsg}
                    <br /></div> 
                }
                <form onSubmit={handleSignUp} >
                    <div className="form_field name">
                    <h3>Name: </h3>
                        <input type="text" id="name" required onChange={(e) =>setFullname(e.target.value)}
                        />
                    </div>

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
                    <button type="submit">Register</button>
                    <br /><br /><hr />
                    <div className="footer">
                    Already a user? <Link to="login">Login</Link>
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

export default SignUp
