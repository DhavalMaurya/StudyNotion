import { createSlice } from "@reduxjs/toolkit";

intialState = {
    cart: localStorage.getItem("cart") ? JSON.parse(localStorage.getItem("cart")):[],
    total: localStorage.getItem("total") ? JSON.parse(localStorage.getItem("total")):0,
    totalItems: localStorage.getItem("totalItems") ? JSON.parse(localStorage.getItem("totalItems")):0,
}

const cartSlice = createSlice({
    name : cart,
    initialState,
    reducers :{
        addToCart : (state ,action)=>{
            const course = action.payload
        }
    }
})