import { AboutTribute } from '@/components/home/AboutTribute'
import { CTAShareStory } from '@/components/home/CTAShareStory'
import { FeaturedStories } from '@/components/home/FeaturedStories'
import { Footer } from '@/components/home/Footer'
import { HeroSection } from '@/components/home/HeroSection'
import { MissionSelector } from '@/components/home/MissionSelector'
import { Navbar } from '@/components/layout/Navbar'
import React from 'react'

const page = () => {
  return (
    <>
    <Navbar/>
    <HeroSection/>
    <MissionSelector/>
    <AboutTribute/>
    <FeaturedStories/>
    <CTAShareStory/>
    <Footer/>
    </>
  )
}

export default page