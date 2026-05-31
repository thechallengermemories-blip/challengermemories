import { Clock, Globe, Sparkles, LucideIcon } from "lucide-react";

export interface PromptCategory {
  id: string;
  label: string;
  icon: LucideIcon;
  tagline: string;
  prompts: string[];
}

export const PROMPT_CATEGORIES: PromptCategory[] = [
  {
    id: "eyewitness",
    label: "I Remember 1986",
    icon: Clock,
    tagline: "For those who lived through the mission firsthand.",
    prompts: [
      "Where were you when you first heard the news? Who were you with, and what were they doing?",
      "What did your classroom, home, or workplace feel like at that exact moment? What sounds or silence followed?",
      "What small, sensory details—a television cart, cold weather, or a specific image—stayed with you?",
      "How did the event change your view of space exploration, teaching, or national optimism?"
    ]
  },
  {
    id: "nextgen",
    label: "Inherited Memory",
    icon: Globe,
    tagline: "For younger generations who learned about it later.",
    prompts: [
      "When and how did you first learn about Challenger? Was it through a parent, a teacher, or the internet?",
      "Does Challenger feel like distant history to you, or something emotionally present in your life?",
      "What stands out more to you: the tragedy itself, or the way people remember the crew's educational legacy?",
      "How does learning about Challenger change the way you think about human vulnerability, exploration, or ambition?"
    ]
  },
  {
    id: "creative",
    label: "Creative & Sensory",
    icon: Sparkles,
    tagline: "For artists, writers, and reflective tributes.",
    prompts: [
      "Interpret the concept of 'what was interrupted'—the educational vision and the journey.",
      "Explore the contrast between hope and fragility, or the sky and the classroom.",
      "Write an inherited memory—imagining the event through the eyes of a parent or grandparent.",
      "Describe a single unforgettable archival image or feeling and how it echoes across generations."
    ]
  }
];