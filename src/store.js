import { configureStore } from "@reduxjs/toolkit";
import cartReducer from "./features/cart/cartSlice"; //we're getting the reducer from the created slice

export const store = configureStore({
  reducer: {
    // we can access it by:
    // store.cart
    cart: cartReducer,
    // store.modal
    // modal:
  },
});
