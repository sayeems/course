import React, { useRef, useState, useEffect } from 'react'
import '../css/Auth.css'
import { Link, useHistory } from 'react-router-dom'
import { useAuth } from '../contexts/AuthContext'
import reading from '../images/reading.svg'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faUser, faLock } from '@fortawesome/free-solid-svg-icons'
import { faFacebookF, faGoogle, faTwitter, faGithub } from '@fortawesome/free-brands-svg-icons'

function Signup() {
    //testanimation
    const [pageTransition, setPageTransition] = useState(false);
    useEffect(() => {
        setPageTransition(true)
        return () => {
            setPageTransition(false)
        }
    }, [])
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
        <div className={pageTransition ? 'authPage signUp animateAuth' : 'authPage signUp'}>
            <div className="pannelContainer">
                <div className="leftPannel">
                    <div className="leftContent">
                        <h3>Already have an account?</h3>
                        <p>Welcome! you are probably in the wrong place right now. You should be in the sign in page. Just hit the button below!</p>
                        <Link className="btn transparent" to="/signin">Sign In</Link>
                    </div>
                    <img className="image" src={reading} alt="reading" />
                </div>
            </div>
            <div className="formContainer">
                <div className="signinSignup">
                    {error && <div className="errorBlock textCenter">{error}</div>}
                    <form className="form signupForm formVertical" onSubmit={handleSubmit}>
                        <h2 className="title">Sign Up</h2>
                        <div className="inputField">
                            <FontAwesomeIcon icon={faUser} />
                            <input type="email" required ref={emailRef} placeholder="Email address" />
                        </div>
                        <div className="inputField">
                            <FontAwesomeIcon icon={faLock} />
                            <input type="password" required ref={passwordRef} placeholder="Password" />
                        </div>
                        <div className="inputField">
                            <FontAwesomeIcon icon={faLock} />
                            <input type="password" required ref={confirmRef} placeholder="Confirm Password" />
                        </div>
                        <button disabled={loading} className="btn solid" type="submit">Sign Up</button>
                        <p className="social-text">Sign Up is easy with social media</p>
                        <div className="socialMediaIcons">
                            <a className="socialIcon" href="#">
                                <FontAwesomeIcon icon={faFacebookF} />
                            </a>
                            <a className="socialIcon" href="#">
                                <FontAwesomeIcon icon={faGoogle} />
                            </a>
                            <a className="socialIcon" href="#">
                                <FontAwesomeIcon icon={faTwitter} />
                            </a>
                            <a className="socialIcon" href="#">
                                <FontAwesomeIcon icon={faGithub} />
                            </a>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    )
}

export default Signup
