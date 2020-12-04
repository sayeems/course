import React, { useState, useRef, useEffect, Children } from 'react'
import { useAuth } from '../contexts/AuthContext'
import { useHistory, Switch, Route } from 'react-router-dom'
import axios from 'axios'
import '../css/Dashboard.css'
import user from '../images/user.svg'
import logo from '../images/logo.png'
import MainItem from './MainItem'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faSearch, faUser, faCog, faSignOutAlt } from '@fortawesome/free-solid-svg-icons'
import { faFacebookF, faGoogle, faTwitter, faGithub, faHtml5, faCss3 } from '@fortawesome/free-brands-svg-icons'
import SkeletonMenu from '../skeleton/SkeletonMenu'
import TestChield from './TestChield'
import Welcome from './Welcome'


function Dashboard() {
    const [error, setError] = useState()
    const [menuData, setMenuData] = useState([])
    const [loading, setLoading] = useState()
    const [dropdown, setDropdown] = useState(false)
    const { currentUser, logout } = useAuth()
    const history = useHistory()
    const dropDownRef = useRef()
    //click anywhere to close dropdown
    useEffect(
        () => {
            const handler = (event) => {
                if (!dropDownRef.current.contains(event.target)) {
                    setDropdown(false)
                }
            }

            document.addEventListener('mousedown', handler)

            return () => {
                document.removeEventListener('mousedown', handler)
            }
        });

    useEffect(() => {
        const fetchMenuData = async () => {
            setLoading(true)
            const res = await axios.get('http://localhost/courseContent/wp-json/sayeem/courses/contentList')
            const sortedData = (res.data).sort(function (a, b) {
                return a.menu_order - b.menu_order
            })
            setMenuData(sortedData)
            // setTimeout(() => {
            //     setLoading(false)
            // }, 5000)
            setLoading(false)
        }
        return fetchMenuData()

    }, []);

    const toggleMenu = index => {
        setMenuData(menuData.map((menu, i) => {
            if (i === index) {
                menu.open = !menu.open
            }
            else {
                menu.open = false
            }
            return menu
        }))
    }

    async function handleLogout() {
        try {
            setError('')
            await logout()
            history.push('/signin')
        }
        catch {
            setError('Failed to logout')
        }
    }

    return (
        <div className="dashboard">
            {/* {error && <div className="errorBlock textCenter">{error}</div>} */}
            <div className="leftBar">
                <div className="logoContainer">
                    <img src={logo} alt="code with sayeem" />
                </div>
                <div className="mainMenuContainer">
                    {!loading && menuData.map((menu, i) => {
                        return (
                            <MainItem
                                key={menu.id}
                                name={menu.name}
                                iconName={menu.icon_name}
                                contentCount={menu.total_contents}
                                id={menu.id}
                                index={i}
                                toggleMenu={toggleMenu}
                                open={menu.open}
                                submenu={menu.submenu}
                            >
                            </MainItem>
                        )
                    })}
                    {loading && [1, 2, 3, 4, 5].map(sk => <SkeletonMenu key={sk} />)}
                </div>
            </div>
            <div className="headerContainer">
                <div className="nowShowing">
                    <FontAwesomeIcon icon={faHtml5} />
                    <h4>HTML5</h4>
                </div>
                <div className="searchBar">
                    <FontAwesomeIcon icon={faSearch} />
                    <input type="text" />
                </div>
                <div ref={dropDownRef} className="userGear">
                    <img src={user} className="userImg" alt="user" onClick={() => {
                        setDropdown(!dropdown)
                    }} onBlur={() => {
                        setDropdown(!dropdown)
                    }} />
                    {dropdown && <div className="dropDown">
                        <div className="dropDownItem">
                            <FontAwesomeIcon icon={faUser} />
                            <h5>Profile</h5>
                        </div>
                        <div className="dropDownItem">
                            <FontAwesomeIcon icon={faCog} />
                            <h5>Settings</h5>
                        </div>
                        <div className="dropDownItem" onClick={handleLogout}>
                            <FontAwesomeIcon icon={faSignOutAlt} />
                            <h5>Log Out</h5>
                        </div>
                    </div>}
                </div>
            </div>
            <div className="contentContainer">
                <Switch>
                    <Route exact path="/" component={Welcome} />
                    <Route path="/:id" component={TestChield} />
                </Switch>
            </div>
        </div>
    )
}

export default Dashboard
