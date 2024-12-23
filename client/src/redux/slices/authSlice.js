import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    signupData : null,
    loading : false,
    token : localStorage.getItem("token") ? JSON.parse(localStorage.getItem("token")) : null,
    expiryTime :localStorage.getItem("expiryTime") ? JSON.parse(localStorage.getItem("expiryTime")) : null,
}

const authSlice = createSlice({
    name : 'auth',
    initialState : initialState,
    reducers : {
        setSingupData (state , value){
            state.signupData = value.payload;
        },
        setLoading (state , value){
            state.loading = value.payload;
        },
        setToken(state , action){
            state.token = action.payload;
        }
    }
})

export const {setToken , setSingupData ,setLoading} = authSlice.actions;
export default authSlice.reducer;