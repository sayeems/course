import React, { useState } from 'react'
import { useAuth } from '../contexts/AuthContext'
import { useHistory } from 'react-router-dom'


function Dashboard() {
    const [error, setError] = useState()
    const { currentUser, logout } = useAuth()
    const history = useHistory()

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
        <div>
            {error && <div className="errorBlock textCenter">{error}</div>}
            <h1>Dashboard of</h1>
            {/* <p>{currentUser.email}</p> */}
            <button className="btn btn-blue" onClick={handleLogout}>Logout</button>
        </div>
    )
}

export default Dashboard
