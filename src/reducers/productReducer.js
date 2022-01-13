import {
  CREATE_PRODUCT,
  GET_ALL_PRODUCT,
  DELETE_PRODUCT,
  UPDATE_PRODUCT,
  GET_PRODUCTS_BY_COUNT,
} from "../constants/productConstants";

export default (state = [], action) => {
  switch (action.type) {
    case GET_ALL_PRODUCT:
      return action.payload;

    case CREATE_PRODUCT:
      return [...state, action.payload];
    case UPDATE_PRODUCT:
      return state.map((s) =>
        s._id === action.payload._id ? action.payload : s
      );

    case DELETE_PRODUCT:
      return state.filter((x) => x._id !== action.payload);

    default:
      return state;
  }
};
