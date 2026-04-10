import { Footer } from '@/components/home/Footer'
import { Navbar } from '@/components/layout/Navbar'
import StoryDetailPage from '@/components/stories/storyDetailpage'
import React from 'react'

const page = () => {
  return (
    <>
    <Navbar/>
    <StoryDetailPage/>
    <Footer/>
    </>
  )
}

export default page