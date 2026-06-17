"use client";

import { CrewFooter } from "@/components/layout/crewfooter";
import { StoryPageHeader } from "@/components/share-story/storyHeader";
import { StoryForm } from "@/components/share-story/storySubmissionForm";
// import { StoryForm } from "@/components/forms/StoryForm";
// import { StoryPageHeader } from "@/components/forms/StoryPageHeader";
import React, { useState } from "react";
// import { StoryPageHeader } from "./StoryPageHeader"; // Adjust paths accordingly
// import { StoryForm } from "./StoryForm";

export default function ShareStoryPage() {
  const [selectedPrompt, setSelectedPrompt] = useState<string | null>(null);

  const handleSelectPrompt = (prompt: string) => {
    setSelectedPrompt(prompt);
    
    // Smooth scroll down to form section
    const formSection = document.getElementById("story-form-section");
    if (formSection) {
      formSection.scrollIntoView({ behavior: "smooth", block: "start" });
    }
  };

  const handleClearPrompt = () => {
    setSelectedPrompt(null);
  };

  return (
    <main className="min-h-screen bg-[#020617] overflow-x-hidden">
      {/* Interactive header block containing prompt selectors */}
      <StoryPageHeader 
        onSelectPrompt={handleSelectPrompt} 
        selectedPrompt={selectedPrompt} 
      />
      
      {/* Form Submission Block */}
      <StoryForm
        selectedPrompt={selectedPrompt} 
        onClearPrompt={handleClearPrompt} 
      />
      <CrewFooter/>
    </main>
  );
}