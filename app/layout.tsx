import type { Metadata } from 'next'
import { Figtree } from 'next/font/google'
import './globals.css'
import Sidebar from '@/components/Sidebar'
import SupabaseProvider from '@/providers/SupabaseProvider'

import ModalProvider from '@/providers/ModalProvider'
import UserProvider from '@/providers/UserProvider'
import ToasterProvider from '@/providers/ToasterProvider'
import getSongsByUserId from '@/actions/getSongsByUserId'
import Player from '@/components/Player'
import getActiveProductsWithPrices from '@/actions/getActiveProductsWithPrices'


const figtree = Figtree({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: 'J O L T: Justins: Online Listening Tunes',
  description: 'Justins: Online Listening Tunes',
}

export const revalidate = 0;

export default async function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  const userSongs = await getSongsByUserId()
  const products = await getActiveProductsWithPrices()

  




  return (
    <html lang="en">
      <body className={figtree.className}>
        {/* this will wrap  */}
        <ToasterProvider />
        <SupabaseProvider>
          <UserProvider>
            <ModalProvider products={products}/>
        <Sidebar songs={userSongs}>
          {children}
        </Sidebar>
        <Player />
        </UserProvider>
        </SupabaseProvider>
        </body>
    </html>
  )
}

