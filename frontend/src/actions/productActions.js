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