export const SET_DATA = 'SET_DATA';

export function setUserData(user) {
  return {
    type: SET_DATA,
    user
  };
}