import $host from '../../http/index'
import axios from 'axios'
import { userActionTypes } from '../reducer/userReducer'
import { API_URL } from '../../http/index'

export const fetchUserRegistration = (email, password) => async (dispatch) => {
    const response = await $host.post('/registration', { email, password })
    localStorage.setItem('token', response.data.accessToken)
    dispatch({ type: userActionTypes.FETCH_USER_REGISTRATION, payload: { user: response.data.user, isAuth: true } })
}

export const fetchUserLogin = (email, password) => async (dispatch) => {
    const response = await $host.post('/login', { email, password })
    localStorage.setItem('token', response.data.accessToken)
    dispatch({ type: userActionTypes.FETCH_USER_LOGIN, payload: { user: response.data.user, isAuth: true } })
}

export const fetchUserLogout = () => async (dispatch) => {
    await $host.post('/logout',)
    localStorage.removeItem('token')
    dispatch({ type: userActionTypes.FETCH_USER_LOGOUT, payload: { user: {}, isAuth: false } })
}

export const fetchUserRefresh = () => async (dispatch) => {
    //const response = await $host.get('/api/user/refresh',)
    const response = await axios.get(`${API_URL}/refresh`, { withCredentials: true })
    localStorage.setItem('token', response.data.accessToken)
    dispatch({ type: userActionTypes.FETCH_USER_REFRESH, payload: { user: response.data.user, isAuth: false } })
}

