// Reducer
// Based on the type of action, the reducer will know what property of the state to update

// to use this reducer we need to add it to the store
export const productListReducer = (state={ products: [] }, action) => {
    switch(action.type){
        case 'PRODUCT_LIST_REQUEST':
            return { loading: true, products: [] };
        case 'PRODUCT_LIST_SUCCESS': 
            return { loading: false, products: action.payload };
        case 'PRODUCT_LIST_FAIL': 
            return { loading: false, error: action.payload };
        default:
            return state;
    }
}

export const productDetailsReducer = (state={ product: { reviews: [] } }, action) => {
    switch(action.type){
        case 'PRODUCT_DETAILS_REQUEST':
            return { loading: true, ...state };
        case 'PRODUCT_DETAILS_SUCCESS': 
            return { loading: false, product: action.payload };
        case 'PRODUCT_DETAILS_FAIL': 
            return { loading: false, error: action.payload };
        default:
            return state;
    }
}

export const productDeleteReducer = (state={}, action) => {
    switch(action.type){
        case 'PRODUCT_DELETE_REQUEST':
            return { loading: true };
        case 'PRODUCT_DELETE_SUCCESS': 
            return { loading: false, success: true };
        case 'PRODUCT_DELETE_FAIL': 
            return { loading: false, error: action.payload };
        default:
            return state;
    }
}

export const productCreateReducer = (state={}, action) => {
    switch(action.type){
        case 'PRODUCT_CREATE_REQUEST':
            return { loading: true };
        case 'PRODUCT_CREATE_SUCCESS': 
            return { loading: false, success: true, product: action.payload };
        case 'PRODUCT_CREATE_FAIL': 
            return { loading: false, error: action.payload };
        case 'PRODUCT_CREATE_RESET': 
            return { };
        default:
            return state;
    }
}

export const productUpdateReducer = (state={ product: {} }, action) => {
    switch(action.type){
        case 'PRODUCT_UPDATE_REQUEST':
            return { loading: true };
        case 'PRODUCT_UPDATE_SUCCESS': 
            return { loading: false, success: true, product: action.payload };
        case 'PRODUCT_UPDATE_FAIL': 
            return { loading: false, error: action.payload };
        case 'PRODUCT_UPDATE_RESET': 
            return { product: {} };
        default:
            return state;
    }
}