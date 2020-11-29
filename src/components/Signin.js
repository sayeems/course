import React, { useRef, useState } from 'react'
import '../css/Signup.css'
import { Link, useHistory } from 'react-router-dom'
import { useAuth } from '../contexts/AuthContext'

function Signin() {
    //refs
    const emailRef = useRef()
    const passwordRef = useRef()
    //call context
    const { signin } = useAuth()
    //states
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState();
    const history = useHistory()
    async function handleSubmit(e) {
        e.preventDefault()

        try {
            setError('')
            setLoading(true)
            await signin(emailRef.current.value, passwordRef.current.value)
            history.push('/')
        }
        catch {
            setError('Failed to Log in')
        }
        setLoading(false)

    }
    return (
        <div className="signupWrapper">
            <div className="box">
                <div className="box-header">
                    <h2 className="textCenter">Sign In</h2>
                </div>
                <div className="box-body">
                    {error && <div className="errorBlock textCenter">{error}</div>}
                    <form className="form signupForm formVertical" onSubmit={handleSubmit}>
                        <div className="form-content">
                            <label htmlFor="email" id="email">Email</label>
                            <input type="email" required ref={emailRef} />
                        </div>
                        <div className="form-content">
                            <label htmlFor="password">Password</label>
                            <input type="password" id="password" required ref={passwordRef} />
                        </div>
                        <div className="form-content">
                            <button disabled={loading} className="btn btn-blue w-100" type="submit">Sign In</button>
                        </div>
                    </form>
                </div>
                <div className="box-footer textCenter">
                    Need an account? <Link to="/signup">Sign Up</Link>
                </div>
            </div>
        </div>
    )
}

export default Signin
