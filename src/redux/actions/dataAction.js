import axios from 'axios';
import { GET_REQUEST_DATA , RECENTLY_ViEWED_DATA, ADD_CART_DATA, REMOVE_CART_ITEM, ADD_PRODUCT_FREQUENCY, PLACED_ORDER, ADD_CURRENT_USER} from "redux/actiontypes/actiontypes";
import { setItemInStorage } from 'storage/local-storage/localStorage';
import {get_data_url} from 'urlConfig/urlConfig'

const get_request_data_success = (data) => {
    return {
        type: GET_REQUEST_DATA,
        payload: data
    }
}
const add_recent_data_success = (recentlyData) => {
    return {
        type: RECENTLY_ViEWED_DATA,
        payload: recentlyData
    }
}
const add_cart_data_success = (cartData) => {
    return {
        type: ADD_CART_DATA,
        payload: cartData
    }
}
const remove_cart_item_success = (cartData) => {
    return {
        type: REMOVE_CART_ITEM,
        payload: cartData
    }
}
const add_frequency_success = (cartData) => {
    return {
        type: ADD_PRODUCT_FREQUENCY,
        payload: cartData
    }
}
const placed_order_success = (empty) => {
    return {
        type: PLACED_ORDER,
        payload: empty
    }
}

const nowUser = (user) => {
    return {
        type: ADD_CURRENT_USER,
        payload: user
    }
}
const getData = () => {
    return(dispatch => {
        axios.get(`${get_data_url}products`)
        .then((res) => {
            dispatch(get_request_data_success(res.data));
        })
        .catch(error=> {
            alert("data not get");
        })
        
    })
}

const addRecentlyView = (preRecent, newPro) => {
    return(dispatch => {
            dispatch(add_recent_data_success([...preRecent, newPro]));
    })
}
const addWholeCart = (cart) => {
    return(dispatch => {
        dispatch(add_cart_data_success(cart));
    })
}
const addCartData = (preCart, newPro) => {
    return(dispatch => {
      
        let isPresent = preCart.find(p => p.product.name === newPro.name);
        if(!isPresent) {
            let newCart = [...preCart, {product: newPro, freq: 1}];
            setItemInStorage('cart', JSON.stringify(newCart));
            dispatch(add_cart_data_success(newCart));
        }
    })
}

const removeProduct = (currCart, pro) => {
    return(dispatch => {
        let newCart = currCart.filter(c => c !== pro);
        setItemInStorage('cart', JSON.stringify(newCart));
        dispatch(remove_cart_item_success(newCart));
    })
}

const updateProductFrequency = (currCart, pro_id, pro, select) => {
    return(dispatch => {

        pro.freq += select;
        pro.freq += (pro.freq === 0 ? 1: 0);
        let upCart = currCart.filter((c, i) =>  (i !== pro_id));
        upCart.splice(pro_id, 0, pro);
        setItemInStorage('cart', JSON.stringify(upCart));
        dispatch(add_frequency_success(upCart));
    
    })
}
const placedItem  = () => {
    return(dispatch => {
        setItemInStorage('cart', []);
        dispatch(placed_order_success([]));

    })
}

export {getData, addRecentlyView, addCartData, removeProduct, updateProductFrequency, placedItem, addWholeCart, nowUser};