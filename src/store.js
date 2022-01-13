import { createStore, combineReducers, applyMiddleware } from "redux";
import thunk from "redux-thunk";
import { composeWithDevTools } from "redux-devtools-extension";
import userReducer from "./reducers/userReducer";
import productReducer from "./reducers/productReducer";
import { searchReducer } from "./reducers/searchReducer";
import { cartReducer } from "./reducers/cartReducer";
import { drawerReducer } from "./reducers/drawerReducer";
import { couponReducer } from "./reducers/couponReducer";
import { CODReducer } from "./reducers/CODreducer";
const reducers = combineReducers({
  user: userReducer,
  products: productReducer,
  search: searchReducer,
  cart: cartReducer,
  drawer: drawerReducer,
  coupons: couponReducer,
  COD: CODReducer,
});

const store = createStore(
  reducers,
  composeWithDevTools(applyMiddleware(thunk))
);
export default store;
