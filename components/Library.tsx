'use client'
import {TbPlaylist} from 'react-icons/tb'
import {AiOutlinePlus} from 'react-icons/ai'
import useAuthModal from '@/hooks/useAuthModal'
import { useUser } from '@/hooks/useUser'
import useUploadModal from '@/hooks/useUploadModal'
import { Song } from '@/types'
import MediaItem from './MediaItem'
import useOnPlay from '@/hooks/useOnPlay'


interface LibraryProps{
  songs: Song[];
}

const Library: React.FC<LibraryProps>  = ({
  songs
}) => {
  const authModal = useAuthModal()
  const uploadModal = useUploadModal()
  const {user, subscription} = useUser()


  const onPlay = useOnPlay(songs)

  const onClick = () => {
    // handle upload later

    if(!user){
      console.log('no user, need to log in or have an account to take part in this action')
      return authModal.onOpen()
    
    } else {
      // check for subscription
      console.log('you have logged in with JOLT but function not made yet')
      return uploadModal.onOpen()
    }

  }
  return (



    <div className="flex flex-col">
      <div
      className="
      flex
      items-center
      justify-between
      px-5
      pt-4     
      "
      >

        <div
        className="
        inline-flex
        items-center
        gap-x-2
        "
        >
          <TbPlaylist className='text-rose-900' size={30} />
          <p className='text-rose-900 font-medium text-md'>
            Your Library
          </p>
        </div>
        <AiOutlinePlus className='text-rose-900 hover:text-green-800 cursor-pointer transition' size={26} onClick={onClick} 
        />
      </div>

      <div className='

      flex
      flex-col
      gap-y-2
      mt-4
      px-3
      text-rose-500
      '>
       {songs.map((item) => (
        <MediaItem
        onClick={(id: string) => onPlay(id)}
        key={item.id}
        data={item}   
        />
       ))}


      </div>
      
    </div>
  )

}

export default Library


