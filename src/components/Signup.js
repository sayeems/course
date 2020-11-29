import React, { useRef, useState } from 'react'
import '../css/Signup.css'
import { Link, useHistory } from 'react-router-dom'
import { useAuth } from '../contexts/AuthContext'

function Signup() {
    //refs
    const emailRef = useRef()
    const passwordRef = useRef()
    const confirmRef = useRef()
    //call context
    const { signup } = useAuth()
    //states
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState();
    const history = useHistory()

    async function handleSubmit(e) {
        e.preventDefault()
        if (passwordRef.current.value !== confirmRef.current.value) {
            return setError('Password did not match')
        }
        try {
            setError('')
            setLoading(true)
            await signup(emailRef.current.value, passwordRef.current.value)
            history.push('/')
        }
        catch {
            setError('Failed to create your account')
        }
        setLoading(false)

    }
    return (
        <div className="signupWrapper">
            <div className="box">
                <div className="box-header">
                    <h2 className="textCenter">Sign Up</h2>
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
                            <label htmlFor="confirm">Confirm Password</label>
                            <input type="password" id="confirm" required ref={confirmRef} />
                        </div>
                        <div className="form-content">
                            <button disabled={loading} className="btn btn-blue w-100" type="submit">Sign Up</button>
                        </div>
                    </form>
                </div>
                <div className="box-footer textCenter">
                    Already have an account? <Link to="/signin">Sign In</Link>
                </div>
            </div>
        </div>
    )
}

export default Signup
