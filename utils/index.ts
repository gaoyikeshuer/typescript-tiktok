import axios from 'axios';
import jwt_decode from 'jwt-decode'
import { useAppDispatch } from '../store/hooks';
import { addUser } from '../store/userSlice';


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
  dispatch(addUser(name))

  await axios.post(`http://localhost:3000/api/auth`, user)//using axios to pass the data we get
}