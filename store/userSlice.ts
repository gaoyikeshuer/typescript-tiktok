import { createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";
import type { RootState } from "./store";

interface UserState{
  sub:string,
  name: string,
  picture:string
}
const initialState: UserState={
    sub:"",
    name:"",
    picture:""

}

export const userSlice =createSlice({
    name:'user',
    initialState,
    reducers:{
      addUser:(state, action:PayloadAction< {sub:string,name:string,picture:string}>)=>{
        state.sub = action.payload.sub
        state.name = action.payload.name
        state.picture = action.payload.picture

      }
    }
})

export const {addUser} = userSlice.actions
export const selectCount = (state: RootState) => state.user.name
export default userSlice.reducer