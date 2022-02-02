import { GET_REQUEST_DATA , RECENTLY_ViEWED_DATA, ADD_CART_DATA, REMOVE_CART_ITEM, ADD_PRODUCT_FREQUENCY, PLACED_ORDER, ADD_CURRENT_USER} from "redux/actiontypes/actiontypes";

const initialDataState = {
    data : [],
    recently_view_data: [],
    cart_data: [],
    user: {}
}

const dataReducer = (state = initialDataState, action) => {

    switch (action.type) {
        case GET_REQUEST_DATA:
            return {
                ...state,
                data: action.payload
            }
        case RECENTLY_ViEWED_DATA:
            return {
                ...state,
                recently_view_data: action.payload
            }
        case ADD_CART_DATA:
            return {
                ...state,
                cart_data: action.payload
            }
        case REMOVE_CART_ITEM:
            return {
                ...state,
                cart_data: action.payload
            }
        case ADD_PRODUCT_FREQUENCY:
            return {
                ...state,
                cart_data: action.payload
            }
        case PLACED_ORDER:
            return{
                ...state,
                cart_data: action.payload
            }
        case ADD_CURRENT_USER:
            return {
                ...state,
                user: action.payload
            }
        default:
            return state;
    }
}

export default dataReducer;