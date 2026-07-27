"use client";

import React, { useState } from "react";
import { StoryPageHeader } from "@/components/share-story/storyHeader";
import { WhyYourStoryMatters } from "@/components/share-story/WhyYourStoryMatters";
import { StoryForm } from "@/components/share-story/storySubmissionForm";

export default function ShareStoryPage() {
  const [selectedPrompt, setSelectedPrompt] = useState<string | null>(null);

  const handleSelectPrompt = (prompt: string) => {
    setSelectedPrompt(prompt);
    
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
      {/* 1. Header with prompt selector */}
      <StoryPageHeader 
        onSelectPrompt={handleSelectPrompt} 
        selectedPrompt={selectedPrompt} 
      />
      
      {/* 3. Story submission form */}
      <StoryForm
        selectedPrompt={selectedPrompt} 
        onClearPrompt={handleClearPrompt} 
      />
    </main>
  );
}