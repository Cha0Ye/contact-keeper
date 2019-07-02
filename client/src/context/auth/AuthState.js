import React, { useReducer} from 'react';
import axios from 'axios';
import authReducer from './authReducer';
import AuthContext from './authContext';
import {
    REGISTER_SUCCESS, 
    REGISTER_FAIL,
    USER_LOADED, 
    AUTH_ERROR, 
    LOGIN_SUCCESS,
    LOGIN_FAIL, 
    LOGOUT, 
    CLEAR_ERRORS
} from '../types';

const AuthState = (props) => {
    const initialState = {
        token: localStorage.getItem('token'),
        isAuthenticated: null,
        loading: true, 
        user: null,
        error: null
    };
    
    const [state, dispatch] = useReducer(authReducer, initialState);

    // Load User 
    const loadUser = () => console.log('load user');
    

    // Register User
    const register = async (formData) => {

        // Configures axios to use headers Content-type to application/json 
        const config = {
            headers: {
                'Content-type': 'application/json' 
            }
        }
        try {
            const res = await axios.post('/api/users/', formData, config);
            dispatch({
                type: REGISTER_SUCCESS,
                payload: res.data
            })
        }
        catch(err) {
            dispatch({
                type: REGISTER_FAIL,
                payload: err.response.data.msg
            });
        }
    }
    // Login User
    const login = () => console.log('Login');


    // Logout 
    const logout = () => console.log('Logout');
    
    // Clear Errors
    const clearErrors = () => console.log('Clear errors');
    

    return (
        <AuthContext.Provider value={{
            token: state.token,
            isAuthenticated: state.isAuthenticated,
            loading: state.loading,
            user: state.user,
            error: state.error,
            register,
            loadUser,
            login,
            logout,
            clearErrors
        }}>
            { props.children }
        </AuthContext.Provider>
    );
};

export default AuthState;