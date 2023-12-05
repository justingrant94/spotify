"use client"
import React, { useEffect, useState } from 'react';

import { useRouter } from "next/navigation";
import { RxCaretLeft, RxCaretRight } from 'react-icons/rx';
import { HiHome } from 'react-icons/hi';
import { BiSearch } from 'react-icons/bi';
import Button from './Button';
import useAuthModal from '@/hooks/useAuthModal';
import { twMerge } from "tailwind-merge";

import { useSupabaseClient } from "@supabase/auth-helpers-react";
import { useUser } from "@/hooks/useUser";
import { FaUserAlt } from 'react-icons/fa';
import {toast} from 'react-hot-toast';
import usePlayer from '@/hooks/usePlayer';



interface HeaderProps {
  children: React.ReactNode;
  className?: string;
}

const Header: React.FC<HeaderProps> = ({
  children,
  className
}) => {
  const player = usePlayer()
  const authModal = useAuthModal()
  const router = useRouter()



  const supabaseClient = useSupabaseClient()

  const {user} = useUser()


  const handleLogout = async () => {
    const {error} = await supabaseClient.auth.signOut()
    player.reset()


    // reeset any playing songs // when u
    router.refresh()

    if(error){
      toast.error(error.message)
      } else {
        toast.success('Logged Out')
      }
    }

  

  const GlowingText: React.FC = () => {
    const [currentColor, setCurrentColor] = useState('blue-200');
  
    useEffect(() => {
      const intervalId = setInterval(() => {
        // Array of colors to cycle through
        const complementaryColors = [
          'green-500', 'green-600', 'green-700', 'green-800', 'green-900',
          'teal-500', 'teal-600', 'teal-700', 'teal-800', 'teal-900',
          'yellow-500', 'yellow-600', 'yellow-700', 'yellow-800', 'yellow-900',
          'blue-500', 'blue-600', 'blue-700', 'blue-800', 'blue-900',
          'gray-500', 'gray-600', 'gray-700', 'gray-800', 'gray-900',
          'red-500', 'red-600', 'red-700', 'red-800', 'red-900',
          'purple-500', 'purple-600', 'purple-700', 'purple-800', 'purple-900',
          'indigo-500', 'indigo-600', 'indigo-700', 'indigo-800', 'indigo-900',
          'pink-500', 'pink-600', 'pink-700', 'pink-800', 'pink-900',
          'orange-500', 'orange-600', 'orange-700', 'orange-800', 'orange-900',
          
        ];
        
        // You can use the complementaryColors array in your Tailwind CSS classes or any other context as needed
        
        // Get the next color in the array
        const nextColorIndex = ( complementaryColors.indexOf(currentColor) + 1) %  complementaryColors.length;
        const nextColor =  complementaryColors[nextColorIndex];
  
        // Update the current color
        setCurrentColor(nextColor);
      }, 3000);
  
      // Clear the interval when the component is unmounted
      return () => clearInterval(intervalId);
    }, [currentColor]);
  
    // above is the end of color change
  
    return <div className={`flex gap-x-4 items-center text-${currentColor} animate-glow`}>
      <Button
      onClick={handleLogout}
      className='bg-blue px-6 py-2'
      >
      Logout
      </Button>
      <Button 
      onClick={() => router.push('/account')}
      className='bg-blue'
      >
        <FaUserAlt />
      </Button>
      
      </div>;
  };

  return (
    <div
    className={twMerge(`
      h-fit
      bg-gradient-to-b
      from-red-400
      p-4
    `
    , className)}
    >

      <div className='
        w-full
        mb-4
        flex
        items-center
        justify-between
      '>

        <div className='
          hidden
          md:flex
          gap-x-2
          items-center 
        '>
          <button onClick={() => router.back()} 
            className='rounded-full bg-cyan-950 flex items-center justify-center hover:opacity-75 transition'>
            <RxCaretLeft className='text-rose-500' size={35}/>
          </button>

          <button  onClick={() => router.forward()} 
            className='rounded-full bg-cyan-950 flex items-center justify-center hover:opacity-75 transition'>
            <RxCaretRight className='text-rose-500' size={35}/>
          </button>
        </div>

        <div className='flex md:hidden gap-x-2 items-center'>
          <button className='rounded-full p-2 bg-white items-center justify-center hover:opacity-75 transition'>
            <HiHome className='text-rose-500' size={30}/>
          </button>

          <button className='rounded-full p-2 bg-white items-center justify-center hover:opacity-75 transition'>
            <BiSearch className='text-rose-500' size={30}/>
          </button>
        </div>

        <div
          className='flex justify-between items-center gap-x-4
          '
        >
          {user ? (
            <GlowingText />
          ): (
            <>
              <div>
                <Button
                  onClick={authModal.onOpen} 
                  className='bg-transparent font-medium'
                >
                  Sign up   
                </Button>
              </div> 
              <div>
                <Button
                  onClick={authModal.onOpen} 
                  className='bg-white font-medium px-6 py-2 text-black'
                >
                  Log In
                </Button>
              </div> 
            </>
          )}
        </div>
      </div>
      {children}
    </div>
  );
};

export default Header;



