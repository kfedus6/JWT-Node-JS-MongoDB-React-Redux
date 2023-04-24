export const userActionTypes = {
    FETCH_USER_REGISTRATION: 'FETCH_USER_REGISTRATION',
    FETCH_USER_LOGIN: 'FETCH_USER_LOGIN',
    FETCH_USER_LOGOUT: 'FETCH_USER_LOGOUT',
    FETCH_USER_REFRESH: 'FETCH_USER_REFRESH'
}

const initialState = {
    user: {},
    isAuth: false
}

export const userReducer = (state = initialState, action) => {
    switch (action.type) {
        case userActionTypes.FETCH_USER_REGISTRATION: {
            return { ...state, ...action.payload }
        }
        case userActionTypes.FETCH_USER_LOGIN: {
            return { ...state, ...action.payload }
        }
        case userActionTypes.FETCH_USER_LOGOUT: {
            return { ...state, ...action.payload }
        }
        case userActionTypes.FETCH_USER_REFRESH: {
            return { ...state,...action.payload }
        }
        default: {
            return state
        }
    }
}