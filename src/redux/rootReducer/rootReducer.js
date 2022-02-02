import { combineReducers } from 'redux'  
import  dataReducer  from 'redux/reducer/dataReducer';


export const rootReducer = combineReducers({
    Data: dataReducer
})
