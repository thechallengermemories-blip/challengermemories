import { Navbar } from "@/components/layout/Navbar";
import MissionHero from "@/components/mission/MissionHero";
import CrewGrid from "@/components/mission/CrewGrid";
import MissionTimeline from "@/components/mission/MissionTimeline";
import StoriesPreviewList from "@/components/mission/StoriesPreviewList";
import { Footer } from "@/components/home/Footer";

export default function ColumbiaPage() {
  return (
    <main className="bg-[#020617] min-h-screen">
      <Navbar />

      {/* 
          MissionHero with all required props to satisfy TypeScript 
          and provide historical context for Columbia.
      */}
      <MissionHero 
        title="Columbia"
        missionCode="STS-107"
        description="A 16-day dedicated science mission that performed over 80 experiments in orbit. Columbia was the first space shuttle to fly, and its legacy remains a cornerstone of human spaceflight history."
        date="January 16, 2003"
        crewCount={7}
        orbiter="Columbia OV-102"
        site="Kennedy Space Center, FL"
      />

      {/* Grid of the 7 Columbia Heroes */}
      <CrewGrid mission="columbia" />

      {/* The path of the STS-107 mission */}
      <MissionTimeline mission="columbia" />

      {/* Community tributes specifically for Columbia */}
      <StoriesPreviewList mission="columbia" />

      <Footer />
    </main>
  );
}