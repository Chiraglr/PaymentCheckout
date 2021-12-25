export const PUSH_NOTIFICATION = 'PUSH_NOTIFICATION';
export const CLOSE_NOTIFICATION = 'CLOSE_NOTIFICATION';
export const ADD_ITEM = 'ADD_ITEM';
export const REMOVE_ITEM = 'REMOVE_ITEM';

export const pushNotification = (notification) => {
  return {
    type: PUSH_NOTIFICATION,
    notification
  };
};

export const closeNotification = (key) => {
  return {
    type: CLOSE_NOTIFICATION,
    key
  };
};

export const  addItem = (index) => {
  return {
    type: ADD_ITEM,
    index
  }
}

export const removeItem = (index) => {
  return {
    type: REMOVE_ITEM,
    index
  };
}
