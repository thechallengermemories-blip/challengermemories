"use client";

import React from 'react';
import { Heart, Users, Rocket } from 'lucide-react';
import { TributeSection } from './TributeSection';

export const HeritageGallery = ({ stories }: any) => {
  // Define sections with explicit color mapping for Tailwind
  const sections = [
    {
      id: 'family',
      data: stories.type1,
      title: "The Inner Circle",
      subtitle: "Immediate Family",
      description: "Those who shared the quietest moments and the deepest bonds of home.",
      icon: Heart,
      accentColor: {
        text: "text-rose-400",
        bg: "bg-rose-500/10",
        border: "border-rose-500/20"
      },
      layout: "left" as const
    },
    {
      id: 'friends',
      data: stories.type2,
      title: "Soul Companions",
      subtitle: "Eternal Friends",
      description: "Bound by choice and strengthened by years of shared dreams and laughter.",
      icon: Users,
      accentColor: {
        text: "text-sky-400",
        bg: "bg-sky-500/10",
        border: "border-sky-500/20"
      },
      layout: "right" as const
    },
    {
      id: 'nasa',
      data: stories.type3,
      title: "Mission Partners",
      subtitle: "NASA Colleagues",
      description: "The architects of discovery who stood side-by-side reaching for the stars.",
      icon: Rocket,
      accentColor: {
        text: "text-indigo-400",
        bg: "bg-indigo-500/10",
        border: "border-indigo-500/20"
      },
      layout: "left" as const
    }
  ];

  return (
    <div className="space-y-40 py-24 relative">
      {sections.map((section) => (
        section.data && section.data.length > 0 && (
          <TributeSection 
            key={section.id}
            {...section}
            stories={section.data}
          />
        )
      ))}
    </div>
  );
};