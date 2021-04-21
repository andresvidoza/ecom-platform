import axios from 'axios';

export const listProducts = () => async (dispatch) => {
    try{
        dispatch({ type: 'PRODUCT_LIST_REQUEST'})
        // Make axios request
        const { data } = await axios.get('/api/products') // only proceed once this is resolved (promise)
        
        dispatch({ 
            type: 'PRODUCT_LIST_SUCCESS',
            payload: data,
        })
    }catch(error){
        dispatch({ 
            type: 'PRODUCT_LIST_FAIL',
            payload: error.response && error.response.data.message ? error.response.data.message : error.message
        })
    }
}

export const listProductDetails = (id) => async (dispatch) => {
    try{
        dispatch({ type: 'PRODUCT_DETAILS_REQUEST'})
        // Make axios request
        const { data } = await axios.get(`/api/products/${id}`) // only proceed once this is resolved (promise)
        
        dispatch({ 
            type: 'PRODUCT_DETAILS_SUCCESS',
            payload: data,
        })
    }catch(error){
        dispatch({ 
            type: 'PRODUCT_DETAILS_FAIL',
            payload: error.response && error.response.data.message ? error.response.data.message : error.message
        })
    }
}

export const deleteProduct = (id) => async (dispatch, getState) => { // result coming from paypal
    try {

        dispatch({
            type: 'PRODUCT_DELETE_REQUEST',
        })
        // get user info
        const {  userLogin: { userInfo } } = getState()

        // pass the token
        const config = {
            headers: {
                Authorization: `Bearer ${userInfo.token}`
            }
        }

        await axios.delete(`/api/products/${id}`, config)

        dispatch({
            type: 'PRODUCT_DELETE_SUCCESS'
        })

    } catch (error) {
        dispatch({ 
            type: 'PRODUCT_DELETE_FAIL',
            payload: error.response && error.response.data.message ? error.response.data.message : error.message
        })
    }
}

export const createProduct = () => async (dispatch, getState) => { // result coming from paypal
    try {

        dispatch({
            type: 'PRODUCT_CREATE_REQUEST',
        })
        // get user info
        const {  userLogin: { userInfo } } = getState()

        // pass the token
        const config = {
            headers: {
                Authorization: `Bearer ${userInfo.token}`
            }
        }

        const { data } = await axios.post(`/api/products`, {} , config) // empty object cause of the sample data

        dispatch({
            type: 'PRODUCT_CREATE_SUCCESS',
            payload: data
        })

    } catch (error) {
        dispatch({ 
            type: 'PRODUCT_CREATE_FAIL',
            payload: error.response && error.response.data.message ? error.response.data.message : error.message
        })
    }
}

export const updateProduct = (product) => async (dispatch, getState) => { // result coming from paypal
    try {

        dispatch({
            type: 'PRODUCT_UPDATE_REQUEST',
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

        const { data } = await axios.put(`/api/products/${product._id}`,product , config);

        dispatch({
            type: 'PRODUCT_UPDATE_SUCCESS',
            payload: data
        })

    } catch (error) {
        dispatch({ 
            type: 'PRODUCT_UPDATE_FAIL',
            payload: error.response && error.response.data.message ? error.response.data.message : error.message
        })
    }
}

export const createProductReview = (productId, review) => async (dispatch, getState) => { // result coming from paypal
    try {

        dispatch({
            type: 'PRODUCT_CREATE_REVIEW_REQUEST',
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

        const { data } = await axios.post(`/api/products/${productId}/reviews`, review , config);

        dispatch({
            type: 'PRODUCT_CREATE_REVIEW_SUCCESS'
        })

    } catch (error) {
        dispatch({ 
            type: 'PRODUCT_CREATE_REVIEW_FAIL',
            payload: error.response && error.response.data.message ? error.response.data.message : error.message
        })
    }
}