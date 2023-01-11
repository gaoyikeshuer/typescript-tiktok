import React from 'react'
import { useState, useEffect, useRef } from 'react'
import { useRouter } from 'next/router'
import Image from 'next/image'
import Link from 'next/link'
import { GoVerified } from 'react-icons/go'
import { MdOutlineCancel } from 'react-icons/md'
import { BsFillPlayFill } from 'react-icons/bs'
import { HiVolumeUp, HiVolumeOff } from 'react-icons/hi'
import { BASE_URL } from '../../utils'
import axios from 'axios'
import {Video} from '../../types'

interface IProps{
    postDetails: Video
}

const Detail = ({postDetails}:IProps) => {
    const[post, setPost] = useState(postDetails)
    const[playing, setPlaying] = useState(false)
    const [isVideoMuted, setIsVideoMuted] = useState(false)
    const videoRef = useRef<HTMLVideoElement>(null) //must to state video type
    const router = useRouter()
    const onVideoClick = ()=>{
        if(playing){
            videoRef?.current?.pause()
            setPlaying(false)
        }
        else{
            videoRef?.current?.play()
            setPlaying(true)
        }
    }
    if(!post) return null

    useEffect(()=>{
        if(post &&videoRef?.current){// if we have a valid video selected
            videoRef.current.muted = isVideoMuted
    
        }
        },[isVideoMuted, post]) // if we go to a different detail page, we want to rerun this to check whether it's muted
  return (
    <div className='flex w-full absolute left-0 top-0 bg-white flex-wrap lg:flex-nowrap'>
      <div className='relative flex-2 w-[1000px] lg:w-9/12 flex justify-center items-center bg-black'>
     <div className='absolute top-6 left-2 lg:left-6 flex gap-6 z-50'>
<p className='cursor-pointer' onClick={() => router.back()}><MdOutlineCancel className='text-white text-[35px]'/></p>
     </div>
     <div className='relative'>
        <div className='lg:h-[100vh] h-[60vh]'>
      <video ref={videoRef} loop onClick={onVideoClick} src={post.video.asset.url} className='w-[100%] h-[90vh] pt-10 items-center flex justify-center'></video>
        </div>
      
        <div className='absolute top-[45%] left-[45%] cursor-pointer'>
        {!playing &&( <button onClick={onVideoClick}><BsFillPlayFill className='text-gray text-6xl lg:text-8xl'/></button>)}
        </div>
     </div>

       <div className='absolute bottom-5 lg:bottom-10 right-5 lg:right-10 cursor-pointer'>
          {isVideoMuted?(<button onClick={() => setIsVideoMuted(false)}><HiVolumeOff className='text-white text-2xl lg:text-4xl'/></button>):(<button onClick={() => setIsVideoMuted(true)} >
            <HiVolumeUp className='text-white text-2xl lg:text-4xl'/>
          </button>)}
       </div>

      </div>
      <div className='relative w-[1000px] md:w-[900px] lg:w-[700px]'>
        <div className='lg:mt-20 mt-10'>
        <div className='flex gap-3 p-2 cursor-pointer font-semibold rounded'>
         <div className='md:w-20 md:h-20 w-16 h-16'>
          <Link href='/'>
            <>
            <Image width={30} height={30} className="rounded-full" src={post.postedBy.image} alt="profile" layout='responsive' />
            </>
          </Link>
         </div>
         <div>
            <Link href='/'>
                <div className='mt-3 flex flex-col  gap-2'>
                    <p className='flex gap-2 items-center md:text-md font-bold text-primary'>{post.postedBy.userName}{` `}   <GoVerified className='text-blue-400 text-md'/></p>
                  <p className='capitalize font-medium text-xs text-gray-500 hidden md:block'>{post.postedBy.userName}</p>
                </div>
            </Link>
         </div>
        </div>
        <p className='px-10 text-md text-gray-600'>
            {post.caption}
        </p>
        </div>

      </div>
    </div>
  )
}
export const getServerSideProps =async ({params:{id}}:{params:{id:string}}) => {
    const {data} = await axios.get(`${BASE_URL}/api/post/${id}`)//If you pass the query with the id
    return{
        props:{postDetails:data}
    }
    
}
export default Detail
