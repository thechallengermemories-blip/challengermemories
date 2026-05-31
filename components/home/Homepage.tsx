import { AboutTribute } from '@/components/home/AboutTribute'
import { CTAShareStory } from '@/components/home/CTAShareStory'
import { FeaturedStories } from '@/components/home/FeaturedStories'
import { HeroSection } from '@/components/home/HeroSection'
import { MissionSelector } from '@/components/home/MissionSelector'

const Homepage = () => {
  return (
    <>
    <HeroSection/>
    <MissionSelector/>
    <AboutTribute/>
    <FeaturedStories/>
    <CTAShareStory/>
    </>
  )
}

export default Homepage;