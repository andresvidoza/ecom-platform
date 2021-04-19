// Reducer
// Based on the type of action, the reducer will know what property of the state to update

// to use this reducer we need to add it to the store
export const cartReducer = (state = { cartItems: [], shippingAddress: {} }, action) => {
    switch(action.type){
        case 'CART_ADD_ITEM':
            const item = action.payload;

            // find if its already in cart
            const existItem = state.cartItems.find(x => x.product === item.product);

            if(existItem){
                // will allow to update qty if ever
                return { ...state, cartItems: [...state.cartItems.map( x => x.product === existItem.product? item : x)] };
            }else{
                return { ...state, cartItems: [...state.cartItems, item] }; // add the new item
            }
        case 'CART_REMOVE_ITEM': 
            return { 
                ...state, 
                cartItems: state.cartItems.filter(x => x.product !== action.payload) 
            };
        case 'CART_SAVE_SHIPPING_ADDRESS': 
        return { 
            ...state, // initial state 
            shippingAddress: action.payload // data from the form
        };
        case 'CART_SAVE_PAYMENT_METHOD': 
        return { 
            ...state, // initial state 
            paymentMethod: action.payload // data from the form
        };
        default:
            return state;
    }
}
