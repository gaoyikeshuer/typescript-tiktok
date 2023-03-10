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
    const picture = useAppSelector((state) => state.user.picture)
    const dispatch = useAppDispatch()
  return (
    <div className='w-full flex justify-between items-center border-b-2 border-gray-200 py-2 px-4'>
      <Link href="/">
      <div className='w-[100px] md:w-[130px]'>
        <Image className='cursor-pointer'  src={Logo} layout="responsive" alt='TikTik'/>


        </div>
        </Link>
        {/* <div onClick={()=>{dispatch(addUser("ban"))}}>Search</div> */}
        <div>{user?( <div className='flex gap-5 md:gap-10'>
        <Link href="/upload">
            <button className='border-2 px-2 md:px-4 text-md font-semibold flex items-center'>
               <IoMdAdd className='text-xl' />{` `}
               <span className='hidden md:block'>
                Upload
               </span>
            </button>
        </Link>
        {picture &&(
            <Link href="/">
              <>
            <Image width={40} height={40} className="rounded-full" src={picture} alt="profile" layout='responsive' />
            </>
            </Link>
        )}
        <button type='button' className='px-2' onClick={() => {googleLogout()
        dispatch(addUser({sub:"",name:"", picture:""}))
        }}>
            <AiOutlineLogout color='red' fontSize={21}/>

        </button>
        </div>):(<GoogleLogin onSuccess={(response)=>(createOrGetUser(response, dispatch))} onError={() => console.log('error')}/>)}</div>
    </div>
  )
}

export default Navbar
