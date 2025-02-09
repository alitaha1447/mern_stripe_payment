import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  carts: [],
};
// console.log(carts);
const cartSlice = createSlice({
  name: "cartslice",
  initialState,
  reducers: {
    // add to cart
    addToCart: (state, action) => {
      const IteamIndex = state.carts.findIndex(
        (iteam) => iteam.id === action.payload.id
      );
      if (IteamIndex >= 0) {
        state.carts[IteamIndex].qnty += 1;
      } else {
        const temp = { ...action.payload, qnty: 1 };
        state.carts = [...state.carts, temp];
      }
    },

      // remove perticular iteams
      removeToCart:(state,action)=>{
        const data = state.carts.filter((ele)=>ele.id !== action.payload);
        state.carts = data
    },

     // remove single iteams
     removeSingleIteams:(state,action)=>{
        const IteamIndex_dec = state.carts.findIndex((iteam) => iteam.id === action.payload.id);
console.log(IteamIndex_dec)
        if(state.carts[IteamIndex_dec].qnty >=1){
            state.carts[IteamIndex_dec].qnty -= 1
        }

    },
  },
});

export const { addToCart,removeToCart,removeSingleIteams } = cartSlice.actions;
export default cartSlice.reducer;
