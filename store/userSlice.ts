import { createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";
import type { RootState } from "./store";

interface UserState{

  name: string
}
const initialState: UserState={
    name:"Hello World"
}

export const userSlice =createSlice({
    name:'user',
    initialState,
    reducers:{
      addUser:(state, action:PayloadAction<string>)=>{
        state.name = action.payload
      }
    }
})

export const {addUser} = userSlice.actions
export const selectCount = (state: RootState) => state.user.name
export default userSlice.reducer