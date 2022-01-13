import { SET_VISIBLE } from "../constants/drawerConstants";

export const drawerReducer = (state = false, action) => {
  switch (action.type) {
    case SET_VISIBLE:
      return action.payload;
    default:
      return state;
  }
};
