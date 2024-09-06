import axios from 'axios';
import { 
    REGISTER_REQUEST, 
    LOGIN_REQUEST, 
    REGISTER_SUCCESS, 
    REGISTER_FAILURE, 
    LOGIN_FAILURE, 
    LOGIN_SUCCESS, 
    GET_USER_REQUEST, 
    GET_USER_SUCCESS, 
    GET_USER_FAILURE, 
    LOGOUT 
} from './ActionTypes';

const baseUrl = "http://localhost:5454";

export const register = (userData) => async (dispatch) => {
    dispatch({ type: REGISTER_REQUEST });
    try {
        const response = await axios.post(`${baseUrl}/auth/signup`, userData);
        const user = response.data;
        console.log(user);

        dispatch({ type: REGISTER_SUCCESS, payload: user.jwt });
        localStorage.setItem("jwt", user.jwt);
    } catch (error) {
        dispatch({ type: REGISTER_FAILURE, payload: error.message });
        console.log(error);
    }
};

export const login = (userData) => async (dispatch) => {
    dispatch({ type: LOGIN_REQUEST });
    try {
        const response = await axios.post(`${baseUrl}/auth/signin`, userData.data);
        const user = response.data;
        console.log(user);

        dispatch({ type: LOGIN_SUCCESS, payload: user.jwt });
        localStorage.setItem("jwt", user.jwt);
        userData.navigate("/");
    } catch (error) {
        dispatch({ type: LOGIN_FAILURE, payload: error.message });
        console.log(error);
    }
};

export const getUser = (jwt) => async (dispatch) => {
    dispatch({ type: GET_USER_REQUEST });
    try {
        const response = await axios.get(`${baseUrl}/api/users/profile`, {
            headers: {
                Authorization: `Bearer ${jwt}`
            }
        });
        const user = response.data;
        dispatch({ type: GET_USER_SUCCESS, payload: user });
    } catch (error) {
        dispatch({ type: GET_USER_FAILURE, payload: error.message });
        console.log(error);
    }
};

export const logout = () => (dispatch) => {
    localStorage.clear();
    dispatch({ type: LOGOUT });
};