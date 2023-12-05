"use client"


import {Toaster} from 'react-hot-toast'


const ToasterProvider = () => {

  return (

    <Toaster
    toastOptions={{
      style: {
        background: '#F56565',
        color: '#FFFAEE',
      }
    }}
    />
  )

}

export default ToasterProvider; 