import React from 'react'
import Image from 'next/image'
import Link from 'next/link'
import { GoogleLogin, googleLogout} from '@react-oauth/google'
import { useRouter } from 'next/router'
import {AiOutlineLogout} from 'react-icons/ai'
import {BiSearch} from 'react-icons/bi'
import {IoMdAdd} from 'react-icons/io'
import Logo from "../utils/tiktik-logo.png"
import { createOrGetUser } from '../utils'
import { useAppSelector, useAppDispatch } from '../store/hooks'
import { addUser } from '../store/userSlice'


const Navbar = () => {
    // const user = false;
    const user =useAppSelector((state)=>state.user.name)
    const dispatch = useAppDispatch()
  return (
    <div className='w-full flex justify-between items-center border-b-2 border-gray-200 py-2 px-4'>
      <Link href="/">
      <div className='w-[100px] md:w-[130px]'>
        <Image className='cursor-pointer'  src={Logo} layout="responsive" alt='TikTik'/>


        </div>
        </Link>
        {/* <div onClick={()=>{dispatch(addUser("ban"))}}>Search</div> */}
        <div>{user!="Hello World"?( user):(<GoogleLogin onSuccess={(response)=>(createOrGetUser(response, dispatch))} onError={() => console.log('error')}/>)}</div>
    </div>
  )
}

export default Navbar
