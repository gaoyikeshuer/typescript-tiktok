import type { NextApiRequest, NextApiResponse } from 'next'
import { client } from '../../../utils/client';
import { postDetailQuery } from '../../../utils/queries';

//this is next.js api handler
export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {

    if(req.method ==='GET'){
    const {id} = req.query; // we want to fetch the id from query
    const query = postDetailQuery(id)
       const data = await client.fetch(query)
        res.status(200).json(data[0]) // we want to return the first element in the array
    }

}