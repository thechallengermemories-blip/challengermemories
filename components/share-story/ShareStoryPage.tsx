"use client";
import { StoryPageHeader } from "@/components/share-story/storyHeader";
import { StoryForm } from "@/components/share-story/storySubmissionForm";
import React, { useState } from "react";


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
    </main>
  );
}