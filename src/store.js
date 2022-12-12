import { configureStore } from "@reduxjs/toolkit";
import cartReducer from "./features/cart/cartSlice"; //we're getting the reducer from the created slice
import modalReducer from "./features/modal/modalSlice";

export const store = configureStore({
  reducer: {
    cart: cartReducer,
    modal: modalReducer,
  },
});
