import React, { useEffect, useState } from 'react'
import { fetchUserLogin, fetchUserLogout, fetchUserRegistration, fetchUserRefresh } from './store/action-creators/userAction'
import { useDispatch, useSelector } from 'react-redux'

const App = () => {
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const dispatch = useDispatch()

    const { user, isAuth } = useSelector(state => state.user)

    useEffect(() => {
        if (localStorage.getItem('token')) {
            dispatch(fetchUserRefresh())
        }
    }, [])

    const registration = () => {
        dispatch(fetchUserRegistration(email, password))
    }

    const login = () => {
        dispatch(fetchUserLogin(email, password))
    }

    const logout = () => {
        dispatch(fetchUserLogout())
    }

    return (
        <div>
            {isAuth
                ?
                <>
                    <button onClick={logout}>exit</button>
                </>
                :
                <>
                    <input onChange={(e) => setEmail(e.target.value)} type="email" />
                    <input onChange={(e) => setPassword(e.target.value)} type="password" />
                    <button onClick={registration}>Registration</button>
                    <input onChange={(e) => setEmail(e.target.value)} type="email" />
                    <input onChange={(e) => setPassword(e.target.value)} type="password" />
                    <button onClick={login}>login</button>
                </>
            }
        </div>
    )
}

export default App