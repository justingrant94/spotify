
'use client'

import Image from "next/image";
import { useRouter } from "next/navigation";
import {FaPlay} from 'react-icons/fa'





interface ListItemProps {
  image: string;
  name: string;
  href: string;
  // tags 
}

const ListItem: React.FC<ListItemProps> = ({
  image,
  name,
  href,
  // tags

}) => {
  const router = useRouter()

  const onClick = () => {
    router.push(href)
  }


  return (
    // added a relative button 
    <button 
    onClick={(onClick)}
    className="
    text-rose-400
    text-md
    font-semibold
    relative
    group
    flex
    items-center
    rounded-md
    overflow-hidden
    gap-x-4
    bg-neutral-100/10
    hover:bg-neutral-100/20
    transition

    ">
      <div className="
      relative
      min-h-[64px]
      min-w-[64px] 
      ">
        <Image
        className="object-cover"
        fill
        src={image}
        alt="Image"
        sizes="(max-width: 600px) 100vw, (max-width: 1024px) 50vw, 25vw"
        />
      </div>
      <p className="font-medium truncate py-5">
        {name}
      </p>
      {/* play button */}
      <div className="
      absolute
      transition
      opacity-0
      rounded-full
      flex
      items-center
      justify-center
      bg-rose-400
      p-4
      drop-shadow-md
      right-5
      group-hover:opacity-100
      hover:scale-110
      hover:animate-pulse
      hover:bg-gradient-to-r from-rose-400 via-pink-500 to-blue-500 
      animation: pulse 1.0s infinite;
      ">
        <FaPlay className="text-white" /> {/* Add proper spacing around FaPlay icon */}

      </div>






    </button>
  )
}

export default ListItem