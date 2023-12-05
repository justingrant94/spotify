'use client'
import useUploadModal from "@/hooks/useUploadModal"
import Modal from "./Modal"

import uniqid from 'uniqid'
import {FieldValues,SubmitHandler,useForm} from 'react-hook-form'
import { useState } from "react"
import Input from "./Input"
import Button from "./Button"

import {toast} from 'react-hot-toast';
import { useUser } from "@/hooks/useUser"
import { useSupabaseClient } from "@supabase/auth-helpers-react"
import { useRouter } from "next/navigation"


const UploadModal = () => {
  const uploadModal = useUploadModal()
  const [isLoading, setIsLoading ] = useState(false)
  const {user } = useUser()
  const supabaseClient = useSupabaseClient()
  const router = useRouter()

  const { 
    register,
    handleSubmit,
    reset,
    formState: {errors},
  } = useForm<FieldValues>({
    defaultValues: {
      author: '',
      title: '',
      year: '',
      song: null,
      image: null,

    }
  })

  const onChange=(open: boolean) =>{
    if(!open){
      reset()
      uploadModal.onClose(); 
    }
  }


  const onSubmit: SubmitHandler<FieldValues> = async (values) => {
    try {
      setIsLoading(true)

      const imageFile = values.image?.[0]
      const songFile = values.song?.[0]

      if(!imageFile || !songFile || !user ){
        toast.error('missing fields')
        return;
      }
      const uniqueID = uniqid()
      // uploading songs
      const {
        data: songData,
        error: songError,
      } = await supabaseClient
      .storage
      .from('songs')
      .upload(`song-${values.title}-${uniqueID}`, songFile, {
        cacheControl: '3600',
        upsert: false
      })
      if(songError){
        setIsLoading(false)
        return toast.error('Failed song upload')
      }

      // uploading image

      const {
        data: imageData,
        error: imageError,
      } = await supabaseClient
      .storage
      // images bucket
      .from('images')
      .upload(`image-${values.title}-${uniqueID}`, imageFile, {
        cacheControl: '3600',
        upsert: false
      })
      if(imageError){
        setIsLoading(false)
        return toast.error('Failed image upload')
      }


      const {
        error: supabaseError

      } = await supabaseClient
      .from('songs')
      .insert({
        user_id: user.id,
        title: values.title,
        author: values.author,
        image_path: imageData.path,
        song_path: songData.path
      })
      if(supabaseError){
        setIsLoading(false)
        return toast.error(supabaseError.message)
      }

      router.refresh()
      setIsLoading(false)
      toast.success('song created')
      reset()
      uploadModal.onClose()
    } catch (error) {
      toast.error('soething went wrong')
    } finally {
      setIsLoading(false)
    }

  }

  return (
    <Modal
    title="Add a song"
    description="Upload an mp3 file"
    isOpen={uploadModal.isOpen}
    onChange={onChange}    
    >
      <form
      onSubmit={handleSubmit(onSubmit)}
      className="flex flex-col gap-y-4"
      
      
      >
        <Input
        id='title'
        disabled={isLoading}
        {...register('title', {required: true})}
        placeholder='Song Title'
        />
        
        <Input
        id='author'
        disabled={isLoading}
        {...register('author', {required: true})}
        placeholder='Name of Artist'
        />
        
        <Input
          id='year'
          disabled={isLoading}
          {...register('year', {
            required: 'Song Year is required',
            pattern: {
              value: /^[0-9]+$/,
              message: 'Please enter a valid year (numeric characters only).',
            },
            maxLength: {
              value: 4,
              message: 'Year should be 4 digits long.',
            },
          })}
          placeholder='Song Year'
        />
        {errors.year && (
          <h1 style={{ color: 'white', fontSize: '0.75rem' }}>
            {`${errors.year.message} No characters should be in this field.`}
          </h1>
        )}
        
        
       
        <div>
          <div className="pb-1 mb-3">
              select a song file
          </div>
          <Input
        id='song'
        type="file"
        disabled={isLoading}
        accept=".mp3"
        {...register('song', {required: true})}
        placeholder='Upload Song file'
        />
        </div>

        {/* image file */}
        <div>
          <div className="pb-1 mb-3">
              select an image
          </div>
          <Input
        id='image'
        type="file"
        disabled={isLoading}
        accept="image/*"
        {...register('image', {required: true})}
        />
        </div>
        <div className="flex items-center">
          <Button disabled={isLoading} type="submit" className="items-center">
            Create
          </Button>
        </div>

      </form>
    </Modal>
  )
}


export default UploadModal