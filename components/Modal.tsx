import * as Dialog from '@radix-ui/react-dialog'
import {IoMdClose} from 'react-icons/io'


interface ModalProps {
  isOpen: boolean;
  onChange: (open: boolean) => void;
  title: string;
  description: string;
  children: React.ReactNode;
}

const Modal: React.FC<ModalProps>= ({
  isOpen,
  onChange,
  title,
  description,
  children
}) => {

  return(
  <Dialog.Root
  open={isOpen}
  defaultOpen={isOpen}
  onOpenChange={onChange}
  >
    <Dialog.Portal>
      <Dialog.Overlay
      className='
      bg-neutral-900/90
      background-blur-sm
      fixed
      inset-0   
      '  
      />
    <Dialog.Content className='
        fixed
        drop-shadow-md
        border
        border-rose-400
        top-[50%]
        left-[50%]
        max-h-full
        h-full
        md:h-auto
        md:max-h-[85vh]
        w-full
        md:2-[90vw]
        md:max-w-[450px]
        translate-x-[-50%]
        translate-y-[-50%]
        rounded-md
        bg-rose-800
        p-[25px]
        focus:outline-none
    '
    >
      <div className='text-center leading-normal mb-5'>
        <Dialog.Title className='text-md font-bold mb-4'>{title}</Dialog.Title>
        <Dialog.Description className='
        '>{description}</Dialog.Description>
        </div>
        <div>{children}</div>
        <Dialog.Close asChild>
        <button
          className='
            text-blue-400
            hover:text-blue-700
            absolute
            top-[10px]
            right-[10px]
            inline-flex
            h-[25px]
            w-[25px]
            appearance-none
            items-center      
            justify-center
            rounded-full
            focus:outline-none
            transition-transform
            transform-gpu
            hover:scale-280
          '
        >
          <IoMdClose />
        </button>


        </Dialog.Close>


    </Dialog.Content>
    </Dialog.Portal>
    

    


  </Dialog.Root>
  )
}
export default Modal