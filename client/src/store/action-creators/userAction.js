import { $host } from '../../http'
import { userActionTypes } from '../reducer/userReducer'

export const fetchUserRegistration = (email, password) => async (dispatch) => {
    const response = await $host.post('/api/user/registration', { email, password })
    localStorage.setItem('token', response.data.accessToken)
    dispatch({ type: userActionTypes.FETCH_USER_REGISTRATION, payload: { user: response.data.user, isAuth: true } })
}

export const fetchUserLogin = (email, password) => async (dispatch) => {
    const response = await $host.post('/api/user/login', { email, password })
    localStorage.setItem('token', response.data.accessToken)
    dispatch({ type: userActionTypes.FETCH_USER_LOGIN, payload: { user: response.data.user, isAuth: true } })
}

export const fetchUserLogout = () => async (dispatch) => {
    await $host.post('/api/user/logout')
    localStorage.removeItem('token')
    dispatch({ type: userActionTypes.FETCH_USER_LOGOUT, payload: { user: {}, isAuth: false } })
}

export const fetchUserRefresh = () => async (dispatch) => {
    const response = await $host.get('/api/user/refresh')
    localStorage.setItem('token', response.data.accessToken)
    dispatch({ type: userActionTypes.FETCH_USER_REFRESH, payload: { user: response.data.user, isAuth: false } })
}

