import { AboutTribute } from '@/components/home/AboutTribute'
import { CTAShareStory } from '@/components/home/CTAShareStory'
import { FeaturedStories } from '@/components/home/FeaturedStories'
import { HeroSection } from '@/components/home/HeroSection'
import { MissionSelector } from '@/components/home/MissionSelector'
import { WhyChallengerMemoriesExists } from './WhyThisExists'
import { RecentlyAddedMemories } from './RecentlyAdded'
import { ArchiveStatistics } from './ArchieveStats'
import { InteractiveMemoryMap } from './memorymap'
import { WhyThisProjectExists } from './WhyThisProjectExists'

const Homepage = () => {
  return (
    <>
    <HeroSection/>
    <WhyThisProjectExists />
    <FeaturedStories/>
    <MissionSelector/>
    <WhyChallengerMemoriesExists/>
    <RecentlyAddedMemories/>
    <ArchiveStatistics/>
    <CTAShareStory/>
    <InteractiveMemoryMap/>
    {/* <AboutTribute/>
     */}
    </>
  )
}

export default Homepage;