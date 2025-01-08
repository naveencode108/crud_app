import {createSlice} from '@reduxjs/toolkit';

const initialState={
    token:localStorage.getItem('login_token')?localStorage.getItem('login_token'):null,
    loading:false,
}

const authSlice=createSlice({
    name:'auth',
    initialState:initialState,
    reducers:{
        setToken:(state,action)=>{
            state.token=action.payload
        },
        setLoading:(state,action)=>{
            state.loading=action.payload
        }
    }
});


export const {setToken,setLoading}=authSlice.actions;

export default authSlice.reducer;