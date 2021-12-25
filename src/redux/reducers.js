import { closeNotification, CLOSE_NOTIFICATION, PUSH_NOTIFICATION, ADD_ITEM, REMOVE_ITEM } from './actions';
import { combineReducers, createStore } from 'redux';
import Locker from 'lockr';

const notifications = (state = [], action) => {
  switch(action?.type) {
  case PUSH_NOTIFICATION:
    setTimeout(() => store.dispatch(closeNotification(action?.notification?.key)), 4000);
    return [action.notification, ...state];
  case CLOSE_NOTIFICATION:
    return [...state].filter(({key}) => key !== action.key);
  default:
    return state;
  }
}

let checkoutStored = Locker.get('checkout');
if(!checkoutStored){
  Locker.set('checkout', JSON.stringify(checkoutStored));
  checkoutStored = [];
} else {
  checkoutStored = JSON.parse(checkoutStored);
}
console.log(checkoutStored);

const checkout = (state = checkoutStored, action) => {
  switch(action?.type) {
    case ADD_ITEM:
      if(state.indexOf(action?.index)>-1)
        return state;
      Locker.set('checkout', JSON.stringify([...state, action?.index]));
      return [...state, action?.index];
    case REMOVE_ITEM: {
      let it = state.indexOf(action?.index);
      if(it == -1)
        return state;
      let copy = [...state];
      copy.splice(it, 1);
      Locker.set('checkout', JSON.stringify(copy));
      return copy;
    }
    default:  
      return state;
  }
}

const rootReducer = combineReducers({
  notifications,
  checkout
});
const store = createStore(
  rootReducer,
  process.env.NODE_ENV === 'development' && window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__()
);

export default store;
