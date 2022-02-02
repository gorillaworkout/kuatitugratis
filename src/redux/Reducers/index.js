import {combineReducers} from 'redux'
import AuthReducers from './AuthReducers'
import ProductReducers from './ProductReducers'
import CartReducers from './CartReducers';
// import ParcelReducers from './ParcelReducers'

export default combineReducers({
    Auth    : AuthReducers,
    Product : ProductReducers,
    Cart    : CartReducers
    // Parcel  : ParcelReducers
});