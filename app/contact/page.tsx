import ContactPage from '@/components/contact/contactpage'
import { Footer } from '@/components/home/Footer'
import { Navbar } from '@/components/layout/Navbar'
import React from 'react'

const page = () => {
  return (
    <>
    <Navbar/>
    <ContactPage/>
    <Footer/>
    </>
  )
}

export default page