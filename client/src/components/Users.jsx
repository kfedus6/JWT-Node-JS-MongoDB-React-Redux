import React from 'react'
import { useDispatch } from 'react-redux'
import { fetchUsers, fetchUserLogout } from '../store/action-creators/userAction'

const Users = ({ users, user }) => {
    const dispatch = useDispatch()

    const logout = () => {
        dispatch(fetchUserLogout())
    }

    const getUsers = () => {
        dispatch(fetchUsers())
    }
    return (
        <div className='container-users'>
            <div>
                <h2>Користувач зареєструваний {user.email}</h2>
            </div>
            <div className='btn'>
                <button onClick={logout}>exit</button>
                <button onClick={getUsers}>getUsers</button>
            </div>
            <div>
                {users.map(item => {
                    return (
                        <div key={item._id}>
                            <ul>
                                <li>{item.email}</li>
                            </ul>
                        </div>
                    )
                })}
            </div>
        </div>
    )
}

export default Users