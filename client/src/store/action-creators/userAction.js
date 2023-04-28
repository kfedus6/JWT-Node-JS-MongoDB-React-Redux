import $host from '../../http/index'
import axios from 'axios'
import { userActionTypes } from '../reducer/userReducer'
import { API_URL } from '../../http/index'

export const fetchUserRegistration = (objUser) => async (dispatch) => {
    dispatch({ type: userActionTypes.FETCH_USER_LOADING, payload: { isLoading: true } })
    try {
        const response = await $host.post('/registration', objUser)
        localStorage.setItem('token', response.data.accessToken)
        dispatch({ type: userActionTypes.FETCH_USER_REGISTRATION, payload: { user: response.data.user, isAuth: true, isLoading: false } })
    } catch (e) {
        dispatch({ type: userActionTypes.FETCH_USER_LOADING, payload: { error: e.message } })
    }
}

export const fetchUserLogin = (objUser) => async (dispatch) => {
    dispatch({ type: userActionTypes.FETCH_USER_LOADING, payload: { isLoading: true } })
    try {
        const response = await $host.post('/login', objUser)
        localStorage.setItem('token', response.data.accessToken)
        dispatch({ type: userActionTypes.FETCH_USER_LOGIN, payload: { user: response.data.user, isAuth: true, isLoading: false } })
    } catch (e) {
        dispatch({ type: userActionTypes.FETCH_USER_LOADING, payload: { error: e.message } })
    }
}

export const fetchUserLogout = () => async (dispatch) => {
    dispatch({ type: userActionTypes.FETCH_USER_LOADING, payload: { isLoading: true } })
    try {
        await $host.post('/logout',)
        localStorage.removeItem('token')
        dispatch({ type: userActionTypes.FETCH_USER_LOGOUT, payload: { user: {}, isAuth: false, isLoading: false } })
    } catch (e) {
        dispatch({ type: userActionTypes.FETCH_USER_LOADING, payload: { error: e.message } })
    }
}

export const fetchUserRefresh = () => async (dispatch) => {
    const response = await axios.get(`${API_URL}/refresh`, { withCredentials: true })
    localStorage.setItem('token', response.data.accessToken)
    dispatch({ type: userActionTypes.FETCH_USER_REFRESH, payload: { user: response.data.user, isAuth: true, isLoading: false } })
}

export const fetchUsers = () => async (dispatch) => {
    dispatch({ type: userActionTypes.FETCH_USER_LOADING, payload: { isLoading: true } })
    try {
        const response = await $host.get(`${API_URL}/users`)
        dispatch({ type: userActionTypes.FETCH_USER_REFRESH, payload: { users: response.data, isLoading: false } })
    } catch (e) {
        dispatch({ type: userActionTypes.FETCH_USER_LOADING, payload: { error: e.message } })
    }
}

