import {SET_DATA} from '../actions/user';

const initialState = null;

export default (state = initialState, action) => {
  switch (action.type) {
    case SET_DATA:
      return action.user;
    default:
      return state;
  }
};