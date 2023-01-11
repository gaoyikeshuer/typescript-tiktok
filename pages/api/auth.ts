import type { NextApiRequest, NextApiResponse } from 'next'
import { client } from '../../utils/client'
import { allUsersQuery } from './../../utils/queries';

//this is next.js api handler
export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {

    if(req.method ==='POST'){
      
        const doc=  req.body; //get the post it's our 'body'
     
      client.createIfNotExists(doc).then(()=> {
        res.status(200).json('Login success')
    })//creat a new user inside sanity base
       
        
    }

}