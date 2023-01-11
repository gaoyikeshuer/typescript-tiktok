import axios from 'axios';
import jwt_decode from 'jwt-decode'
import { useAppDispatch } from '../store/hooks';
import { addUser } from '../store/userSlice';

export const BASE_URL = process.env.NEXT_PUBLIC_BASE_URL

//where we fetch our google response

export const createOrGetUser =async (response:any, dispatch:any) => {
  const decoded :{name:string, picture: string, sub:string} =  jwt_decode(response.credential)
  const {name, picture, sub} = decoded
  const user ={
    _id: sub,
    _type:'user',
    userName: name,
    image: picture
  }
  
  // const dispatch= useAppDispatch()
  dispatch(addUser({sub,name,picture})) // I suppose the reason why I can't use useAppDispatch is because this file is a function not a tsx file?

  await axios.post(`${BASE_URL}/api/auth`, user)//using axios to pass the data we get
}