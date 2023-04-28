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
        <div>
            <div>
                <h2>Користувач зареєструваний {user.email}</h2>
            </div>
            <div>
                <button onClick={logout}>exit</button>
                <button onClick={getUsers}>getUsers</button>
            </div>
            <div>
                {users.map(item => {
                    return (
                        <div key={item._id}>
                            {item.email}
                        </div>
                    )
                })}
            </div>
        </div>
    )
}

export default Users