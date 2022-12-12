import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import cartItems from "../../cartItems";

const url = "https://course-api.com/react-useReducer-cart-project";

// here, we can add the initial state. In this case, we're setting it as a separate object
const initialState = {
  cartItems: [],
  amount: 0,
  total: 0,
  isLoading: true,
};

export const getCartItems = createAsyncThunk("cart/getCartItems", async () => {
  try {
    const res = await fetch(url).then((data) => data.json());
    return res;
  } catch (error) {
    console.log(error);
  }
});

const cartSlice = createSlice({
  name: "cart",
  initialState,
  // reducers -> an object with functions
  reducers: {
    clearCart: (state) => {
      // immer allows us to modify the state directly
      state.cartItems = []; //
      // whatever, we're going to return from the reducer will become the new state value
    },
    // remove
    removeItem: (state, action) => {
      // we could destructure the action.payload to {payload}
      const itemId = action.payload; // getting the payload as the id
      state.cartItems = state.cartItems.filter((item) => item.id !== itemId);
      // payload: what we pass as an argument into the dispatched function, in this case, the id
      // type: "cart/removeItem"
      // we can have functions that create an Action object
    },
    increase: (state, { payload }) => {
      // 1st. get the item which the id matches
      const cartItem = state.cartItems.find((item) => item.id === payload);
      cartItem.amount = cartItem.amount + 1;
    },
    decrease: (state, { payload }) => {
      const cartItem = state.cartItems.find((item) => item.id === payload);
      cartItem.amount = cartItem.amount - 1;
    },
    calculateTotals: (state) => {
      let amount = 0;
      let total = 0;
      // we go through our current cartItems
      state.cartItems.forEach((item) => {
        amount += item.amount;
        total += item.amount * item.price; //amount * price
      });
      state.amount = amount;
      state.total = total;
    },
  },
  extraReducers: {
    [getCartItems.pending]: (state) => {
      state.isLoading = true;
    },
    [getCartItems.fulfilled]: (state, action) => {
      state.isLoading = false;
      state.cartItems = action.payload;
    },
    [getCartItems.rejected]: (state) => {
      state.isLoading = false;
    },
  },
});

// console.log(cartSlice);
// when we console log it, we have:
// 1. actions
// 2. caseReducers
// 3. getInitialState
// 4. name
// 5. reducer = what is going to control the state in this slice

// we need to export our reducers, then use in the component we need
export const { clearCart, removeItem, increase, decrease, calculateTotals } =
  cartSlice.actions; //our reducer functions

export default cartSlice.reducer;
// exp default object.property
