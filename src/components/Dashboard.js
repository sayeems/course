import React, { useState, useRef, useEffect } from 'react'
import { useAuth } from '../contexts/AuthContext'
import { useHistory, Switch, Route } from 'react-router-dom'
import axios from '../axios'
import '../css/Dashboard.css'
import user from '../images/user.svg'
import logo from '../images/logo.png'
import MainItem from './MainItem'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faSearch, faUser, faCog, faSignOutAlt, faGlobe } from '@fortawesome/free-solid-svg-icons'
import SkeletonMenu from '../skeleton/SkeletonMenu'
import Content from './Content'
import Welcome from './Welcome'
import NotFound from './NotFound'


function Dashboard() {
    const [error, setError] = useState()
    const [menuData, setMenuData] = useState([])
    const [loading, setLoading] = useState()
    const [headerTitle, setheaderTitle] = useState({})
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
            // console.log('loading menu...')
            setheaderTitle({ title: 'Welcome', headerIcon: 'jira' })
            const res = await axios.get('contentList')
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

    //selecting clicked item
    const toggleMenu = index => {
        setMenuData(menuData.map((menu, i) => {
            if (i === index) {
                menu.open = !menu.open
                setheaderTitle({
                    headerIcon: menu.icon,
                    title: menu.name
                })
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
                                icon={menu.icon}
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
                    <div className="followSocial">
                        <div className="socialMediaIcons">
                            <a rel="noopener noreferrer" className="socialIcon" href="https://www.facebook.com/sayeems" target="_blank">
                                <FontAwesomeIcon icon={['fab', 'facebook-f']} />
                            </a>
                            <a rel="noopener noreferrer" className="socialIcon" href="https://www.instagram.com/iamsayeem/" target="_blank">
                                <FontAwesomeIcon icon={['fab', 'instagram']} />
                            </a>
                            <a rel="noopener noreferrer" className="socialIcon" href="https://github.com/sayeems" target="_blank">
                                <FontAwesomeIcon icon={['fab', 'github']} />
                            </a>
                            <a rel="noopener noreferrer" className="socialIcon" href="https://www.linkedin.com/in/sayeems/" target="_blank">
                                <FontAwesomeIcon icon={['fab', 'linkedin-in']} />
                            </a>
                            <a rel="noopener noreferrer" className="socialIcon" href="http://sayeem.com/#about-me" target="_blank">
                                <FontAwesomeIcon icon={faGlobe} />
                            </a>
                        </div>
                    </div>
                </div>
            </div>
            <div className="headerContainer">
                <div className="nowShowing">
                    {!loading &&
                        <>
                            <FontAwesomeIcon icon={['fab', `${headerTitle.headerIcon || 'jira'}`]} />
                            <h2>{headerTitle.title}</h2>
                        </>
                    }
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
                <div className="header-bottom-shadow"></div>
                <Switch>
                    <Route exact path="/" component={Welcome} />
                    <Route exact path="/:id" component={Content} />
                    <Route path="**" component={NotFound} />
                </Switch>
            </div>
        </div>
    )
}

export default Dashboard
