'use client'

import useSongById from "@/hooks/UseGetSongById"
import useLoadSongUrl from "@/hooks/useLoadSongUrl"
import usePlayer from "@/hooks/usePlayer"
import PlayerContent from "./PlayerContent"


const Player = () => {

  const player = usePlayer()
  const {song} = useSongById(player.activeId)

  // song path

  const songUrl = useLoadSongUrl(song!)


  // if not song slected nothing will play
  if(!song || !songUrl || !player.activeId){
    return null
  }



  return (
    <div className="fixed bottom-0 bg-rose-500 w-full py-2 h-[80px] px-4">
      
      <PlayerContent
      // ket att 
      key={songUrl}
      song={song}
      songUrl={songUrl}
      
      
      />
      
      
       </div>
  )
}

export default Player