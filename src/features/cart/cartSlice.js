import { createSlice } from "@reduxjs/toolkit";
import cartItems from "../../cartItems";

// here, we can add the initial state. In this case, we're setting it as a separate object
const initialState = {
  cartItems: cartItems,
  amount: 1,
  total: 0,
  isLoading: true,
};

const cartSlice = createSlice({
  name: "cart",
  initialState,
});

// console.log(cartSlice);
// when we console log it, we have:
// 1. actions
// 2. caseReducers
// 3. getInitialState
// 4. name
// 5. reducer = what is going to control the state in this slice

export default cartSlice.reducer;
// exp default object.property
