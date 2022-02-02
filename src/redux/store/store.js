import { applyMiddleware, createStore, compose } from 'redux'  
import logger from 'redux-logger'
import thunk from 'redux-thunk'
import {rootReducer} from 'redux/rootReducer/rootReducer'


const enhancers = compose(
    applyMiddleware(thunk,logger),
    window.devToolsExtension ? window.__REDUX_DEVTOOLS_EXTENSION__() : (f) => f
);
 
const store = createStore(rootReducer, enhancers)  

export default store