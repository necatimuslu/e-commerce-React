import { COUPON_APPLIED } from "../constants/couponConstants";

export const couponReducer = (state = false, action) => {
  switch (action.type) {
    case COUPON_APPLIED:
      return action.payload;
    default:
      return state;
  }
};
