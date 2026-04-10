// app/challenger/page.tsx
import { Navbar } from "@/components/layout/Navbar";
import MissionHero from "@/components/mission/MissionHero";
import CrewGrid from "@/components/mission/CrewGrid";
import MissionTimeline from "@/components/mission/MissionTimeline";
import StoriesPreviewList from "@/components/mission/StoriesPreviewList";
import { Footer } from "@/components/home/Footer";

export default function ChallengerPage() {
  return (
    <main className="bg-[#020617] min-h-screen">
      <Navbar />
      <MissionHero 
        title="Challenger"
        missionCode="STS-51-L"
        description="A journey that captured the hearts of a generation. Dedicated to the seven pioneers who reached for the stars and the teacher who aimed to bring the universe into our classrooms."
        date="January 28, 1986"
        crewCount={7}
        orbiter="Challenger OV-099"
        site="Kennedy Space Center, FL"
      />
      <CrewGrid mission="challenger" />
      <MissionTimeline mission="challenger" />
      <StoriesPreviewList mission="challenger" />
      <Footer />
    </main>
  );
}