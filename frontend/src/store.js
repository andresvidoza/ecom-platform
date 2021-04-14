// A store is a state container which holds the application's state
import { createStore, combineReducers, applyMiddleware } from 'redux';
// If you are app does not interact with a server or use API call, you wouldn't need redux-thunk because you don't need async actions. Problems come when any server-side(REST API) is involved.
import thunk from 'redux-thunk';
import { composeWithDevTools } from 'redux-devtools-extension';
import { productListReducer, productDetailsReducer } from './reducers/productReducers'

const reducer = combineReducers({ // reducer is a function that takes the current instance of a store and returns an updated store
    productList: productListReducer,
    productDetails: productDetailsReducer,
}) // allow multiple reducers to be used 

// set an initial state - remember that it is immutable so to change state we need to create copy of it.
const initialState = {}

const middleware = [thunk]; // all your middlewares

// Whenever a store is created in Redux, you need to specify the reducer.
const store = createStore(reducer, initialState, composeWithDevTools(applyMiddleware(...middleware))); // put initial state when it loads and use the dev tools

export default store;