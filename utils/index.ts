import axios from 'axios';
import jwt_decode from 'jwt-decode'

//where we fetch our google response

export const createOrGetUser =async ({response}:{response:any}) => {
  const decoded =  jwt_decode(response.credential)
  console.log(decoded)
}