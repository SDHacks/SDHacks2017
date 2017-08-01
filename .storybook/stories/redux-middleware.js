import { Provider } from 'react-redux';
import { createStore, applyMiddleware, combineReducers } from 'redux';
import thunkMiddleware from 'redux-thunk';
import { reducer as formReducer } from 'redux-form';

export default createStore(combineReducers({
  form: formReducer
}), applyMiddleware(thunkMiddleware));