import React, { useEffect, useState } from 'react'
import { fetchUserRefresh } from './store/action-creators/userAction'
import { useDispatch, useSelector } from 'react-redux'
import Registration from './components/Registration'
import Login from './components/Login'
import Users from './components/Users'
import Loading from './components/Loading'

const App = () => {
    const [check, setCheck] = useState(true)

    const dispatch = useDispatch()

    const { users, user, isAuth, isLoading } = useSelector(state => state.user)

    useEffect(() => {
        if (localStorage.getItem('token')) {
            dispatch(fetchUserRefresh())
        }
    }, [])

    return (
        <div className='app'>
            {isLoading ?
                <>
                    <div>
                        <Loading />
                    </div>
                </>
                :
                isAuth
                    ?
                    <>
                        <Users user={user} users={users} />
                    </>
                    :
                    check
                        ?
                        <Registration setCheck={setCheck} check={check} />
                        :
                        <Login setCheck={setCheck} check={check} />
            }
        </div>
    )
}

export default App