import { createSlice } from '@reduxjs/toolkit'

const initialState = {
  value: {},
  isLogin: false
}

export const authSlice = createSlice({
  name: 'auh',
  initialState,
  reducers: {
    loginUser: (state,action)=>{
        state.value = action.payload

        if (action.payload.token) {
            state.isLogin = true
        }
    },
    logoutUser: (state) => {
      state.value = null;
      state.isLogin = false;
    },
  },
})

// Action creators are generated for each case reducer function
export const {loginUser,logoutUser } = authSlice.actions

export default authSlice.reducer