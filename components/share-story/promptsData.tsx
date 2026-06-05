import { Clock, Globe, Sparkles, LucideIcon, Palette } from "lucide-react";

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
    id: "art",
    label: "Artistic Expression",
    icon: Palette,
    tagline: "Your photographs, drawings, and recordings make history tangible.",
    prompts: []
  }
];