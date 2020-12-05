import React, { useRef, useState, useEffect } from 'react'
import '../css/Auth.css'
import { Link, useHistory } from 'react-router-dom'
import { useAuth } from '../contexts/AuthContext'
import study from '../images/study.svg'
import user from '../images/user.svg'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faUser, faLock } from '@fortawesome/free-solid-svg-icons'
import { faFacebookF, faGoogle, faTwitter, faGithub } from '@fortawesome/free-brands-svg-icons'

function Signin() {
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
            setError('username & password did not match')
        }
        setLoading(false)

    }
    return (
        <div className={pageTransition ? 'authPage animateAuth' : 'authPage'}>
            <div className="pannelContainer">
                <div className="leftPannel">
                    <div className="leftContent">
                        <h3>Don't have an account?</h3>
                        <p>You can create one in no time. So what are you waiting for? click the button below and get your account, it's free!</p>
                        <Link className="btn transparent" to="/signup">Sign Up</Link>
                    </div>
                    <img className="image" src={study} alt="study" />
                </div>
            </div>
            <div className="formContainer">
                <div className="signinSignup">
                    <form className="authForm" onSubmit={handleSubmit}>
                        <img className="formUser" src={user} alt="user" />
                        <h2 className="title">Sign In</h2>
                        <div className="inputField">
                            <FontAwesomeIcon icon={faUser} />
                            <input type="email" required ref={emailRef} placeholder="Email address" />
                        </div>
                        <div className="inputField">
                            <FontAwesomeIcon icon={faLock} />
                            <input type="password" id="password" required ref={passwordRef} placeholder="Password" />
                        </div>
                        {error && <div className="textCenter dangerError">{error}</div>}
                        <button disabled={loading} className="btn solid" type="submit">{loading ? 'Signing in...' : 'Sign in'}</button>
                        <p className="social-text">Sign in with social media accounts</p>
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

export default Signin
