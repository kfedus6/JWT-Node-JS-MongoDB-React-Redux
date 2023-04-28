import React, { useEffect, useState } from 'react'
import { fetchUserRefresh } from './store/action-creators/userAction'
import { useDispatch, useSelector } from 'react-redux'
import Registration from './components/Registration'
import Login from './components/Login'
import Users from './components/Users'

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
        <div>
            {isLoading ?
                <>
                    <div>
                        <h1>Загрузка...</h1>
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