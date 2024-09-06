import api from "../../../config/api";
import { ADD_PAYMENT_DETAILS_FAILURE, ADD_PAYMENT_DETAILS_REQUEST, ADD_PAYMENT_DETAILS_SUCCESS, GET_PAYMENT_DETAILS_REQUEST, GET_PAYMENT_DETAILS_SUCCESS, GET_WITHDRAWAL_HISTORY_REQUEST, GET_WITHDRAWAL_HISTORY_SUCCESS, GET_WITHDRAWAL_REQUEST_FAILURE, GET_WITHDRAWAL_REQUEST_REQUEST, GET_WITHDRAWAL_REQUEST_SUCCESS, WITHDRAWAL_FAILURE, WITHDRAWAL_PROCEED_FAILURE, WITHDRAWAL_PROCEED_SUCCESS, WITHDRAWAL_REQUEST, WITHDRAWAL_SUCCESS } from "./ActionType";
import PaymentDetails from "@/page/PaymentDetails/PaymentDetails";

export const withDrawalRequest = ({amount, jwt}) => async dispatch => {
    dispatch({type: WITHDRAWAL_REQUEST})
    try{
        const response = await api.post(`/api/withdrawal/${amount}`, null, {
            headers: {
                Authorization: `Bearer ${jwt}`
            }

        })
        console.log("withdrawal -----", response.data)
        dispatch({
            type: WITHDRAWAL_SUCCESS,
            payload: response.data
        })
    }catch(error){
        dispatch({
            type: WITHDRAWAL_FAILURE,
            payload: error.message
        })
    }
}

export const proceedWithdrawal = ({jwt}) => async dispatch => {
    dispatch({type: WITHDRAWAL_REQUEST})
    try{
        const response = await api.post(`/api/admin/withdrawal/${id}/proceed/${accept}`, null, {
            headers: {
                Authorization: `Bearer ${jwt}`
            }
        })
        console.log("proceed withdrawal-----", response.data)
        dispatch({
            type: WITHDRAWAL_PROCEED_SUCCESS,
            payload: response.data
        })
    }catch(error){
        dispatch({
            type: WITHDRAWAL_PROCEED_FAILURE,
            payload: error.message
        })
    }
}

export const getWithdrawalHistory = ({jwt}) => async dispatch => {
    dispatch({type: GET_WITHDRAWAL_HISTORY_REQUEST})
    try{
        const response = await api.get('/api/withdrawal', {
            headers: {
                Authorization: `Bearer ${jwt}`
            }
        })
        console.log("withdrawal history -----", response.data)
        dispatch({
            type: GET_WITHDRAWAL_HISTORY_SUCCESS,
            payload: response.data
        })
    }catch(error){
        dispatch({
            type: WITHDRAWAL_FAILURE,
            payload: error.message
        })
    }
}

export const getAllWithdrawalRequest = jwt => async dispatch => {
    dispatch({type: GET_WITHDRAWAL_REQUEST_REQUEST})
    try{
        const response = await api.get('/api/admin/withdrawal', {
            headers: {
                Authorization: `Bearer ${jwt}`
            }
        })
        console.log("withdrawal history -----", response.data)
        dispatch({
            type: GET_WITHDRAWAL_REQUEST_SUCCESS,
            payload: response.data
        })
    }catch(error){
        console.log(error)
        dispatch({
            type: GET_WITHDRAWAL_REQUEST_FAILURE,
            payload: error.message
        })
    }
}

export const addPaymentDetails = ({PaymentDetails, jwt}) => async dispatch => {
    dispatch({type: ADD_PAYMENT_DETAILS_REQUEST})
    try{
        const response = await api.post(`/api/payment-details`, PaymentDetails, {
            headers: {
                Authorization: `Bearer ${jwt}`
            }
        })
        console.log("payment details -----", response.data)
        dispatch({
            type: ADD_PAYMENT_DETAILS_SUCCESS,
            payload: response.data
        })
    }
    catch(error){
        console.log(error)
        dispatch({
            type: ADD_PAYMENT_DETAILS_FAILURE,
            payload: error.message
        })
    }
}

export const getPaymentDetails = ({jwt}) => async dispatch => {
    dispatch({type: GET_PAYMENT_DETAILS_REQUEST})
    try{
        const response = await api.get(`/api/payment-details`, {
            headers: {
                Authorization: `Bearer ${jwt}`
            }
        })
        console.log("get payment details -----", response.data)
        dispatch({
            type: GET_PAYMENT_DETAILS_SUCCESS,
            payload: response.data
        })
    }catch(error){
        console.log(error)
        dispatch({
            type: ADD_PAYMENT_DETAILS_FAILURE,
            payload: error.message
        })
    }
}