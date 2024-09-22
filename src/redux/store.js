import { createStore, combineReducers } from 'redux';
import authReducer from './reducers/authReducer';
import mediaReducer from './reducers/mediaReducer';

const rootReducer = combineReducers({
  auth: authReducer,
  media: mediaReducer
});


const store = createStore(
  rootReducer,
  window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__() || (f => f)
);

export default store;
