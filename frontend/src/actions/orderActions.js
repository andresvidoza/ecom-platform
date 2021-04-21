import axios from 'axios';

export const createOrder = (order) => async (dispatch, getState) => {
    try {

        dispatch({
            type: 'ORDER_CREATE_REQUEST',
        })

        const {  userLogin: { userInfo } } = getState()

        const config = {
            headers: {
                'Content-Type': 'application/json',
                Authorization: `Bearer ${userInfo.token}`
            }
        }

        const { data } = await axios.post(`/api/orders`, order, config)

        dispatch({
            type: 'ORDER_CREATE_SUCCESS',
            payload: data
        })

    } catch (error) {
        dispatch({ 
            type: 'ORDER_CREATE_FAIL',
            payload: error.response && error.response.data.message ? error.response.data.message : error.message
        })
    }
}

export const getOrderDetails = (id) => async (dispatch, getState) => {
    try {

        dispatch({
            type: 'ORDER_DETAILS_REQUEST',
        })
        // get user info
        const {  userLogin: { userInfo } } = getState()

        // pass the token
        const config = {
            headers: {
                Authorization: `Bearer ${userInfo.token}`
            }
        }

        const { data } = await axios.get(`/api/orders/${id}`, config)

        dispatch({
            type: 'ORDER_DETAILS_SUCCESS',
            payload: data
        })

    } catch (error) {
        dispatch({ 
            type: 'ORDER_DETAILS_FAIL',
            payload: error.response && error.response.data.message ? error.response.data.message : error.message
        })
    }
}

export const payOrder = (orderId, paymentResult) => async (dispatch, getState) => { // result coming from paypal
    try {

        dispatch({
            type: 'ORDER_PAY_REQUEST',
        })
        // get user info
        const {  userLogin: { userInfo } } = getState()

        // pass the token
        const config = {
            headers: {
                'Content-Type': 'application/json',
                Authorization: `Bearer ${userInfo.token}`
            }
        }

        const { data } = await axios.put(`/api/orders/${orderId}/pay`, paymentResult, config)

        dispatch({
            type: 'ORDER_PAY_SUCCESS',
            payload: data
        })

    } catch (error) {
        dispatch({ 
            type: 'ORDER_PAY_FAIL',
            payload: error.response && error.response.data.message ? error.response.data.message : error.message
        })
    }
}

export const deliverOrder = (order) => async (dispatch, getState) => { // result coming from paypal
    try {

        dispatch({
            type: 'ORDER_DELIVER_REQUEST',
        })
        // get user info
        const {  userLogin: { userInfo } } = getState()

        // pass the token
        const config = {
            headers: {
                Authorization: `Bearer ${userInfo.token}`
            }
        }

        const { data } = await axios.put(`/api/orders/${order._id}/deliver`, {}, config)

        dispatch({
            type: 'ORDER_DELIVER_SUCCESS',
            payload: data
        })

    } catch (error) {
        dispatch({ 
            type: 'ORDER_DELIVER_FAIL',
            payload: error.response && error.response.data.message ? error.response.data.message : error.message
        })
    }
}

export const listMyOrders = () => async (dispatch, getState) => { // result coming from paypal
    try {

        dispatch({
            type: 'ORDER_LIST_MY_REQUEST',
        })
        // get user info
        const {  userLogin: { userInfo } } = getState()

        // pass the token
        const config = {
            headers: {
                Authorization: `Bearer ${userInfo.token}`
            }
        }

        const { data } = await axios.get(`/api/orders/myorders`, config)

        dispatch({
            type: 'ORDER_LIST_MY_SUCCESS',
            payload: data
        })

    } catch (error) {
        dispatch({ 
            type: 'ORDER_LIST_MY_FAIL',
            payload: error.response && error.response.data.message ? error.response.data.message : error.message
        })
    }
}

export const listOrders = () => async (dispatch, getState) => { // result coming from paypal
    try {

        dispatch({
            type: 'ORDER_LIST_REQUEST',
        })
        // get user info
        const {  userLogin: { userInfo } } = getState()

        // pass the token
        const config = {
            headers: {
                Authorization: `Bearer ${userInfo.token}`
            }
        }

        const { data } = await axios.get(`/api/orders`, config)

        dispatch({
            type: 'ORDER_LIST_SUCCESS',
            payload: data
        })

    } catch (error) {
        dispatch({ 
            type: 'ORDER_LIST_FAIL',
            payload: error.response && error.response.data.message ? error.response.data.message : error.message
        })
    }
}