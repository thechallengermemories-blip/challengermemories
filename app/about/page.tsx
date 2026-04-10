import AboutPage from '@/components/about/aboutpage'
import { Footer } from '@/components/home/Footer'
import { Navbar } from '@/components/layout/Navbar'
import React from 'react'

const page = () => {
  return (
   <>
    <Navbar/>
    <AboutPage/>
    <Footer/>
   </>
  )
}

export default page