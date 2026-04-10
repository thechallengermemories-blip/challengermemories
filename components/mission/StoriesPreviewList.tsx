"use client";

import React from 'react';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { MessageSquare, ArrowRight, Quote, Clock } from 'lucide-react';

interface Story {
  id: string;
  title: string;
  preview: string;
  author: string;
  date: string;
  readTime: string;
}

interface StoriesPreviewListProps {
  mission: 'challenger' | 'columbia';
}

const MOCK_STORIES: Record<'challenger' | 'columbia', Story[]> = {
  challenger: [
    {
      id: "1",
      title: "The Day the Classroom Fell Silent",
      preview: "I was in third grade, watching the grainy TV screen. Our teacher, Mrs. Gable, didn't say a word for an hour. It was the first time I realized how brave explorers truly are...",
      author: "Sarah J. Miller",
      date: "Oct 12, 2023",
      readTime: "4 min read"
    },
    {
      id: "2",
      title: "A Letter to Christa McAuliffe",
      preview: "You weren't just an astronaut; you were our teacher. Because of you, I spent thirty years in the classroom teaching my students to reach for the stars...",
      author: "Robert Chen",
      date: "Jan 28, 2024",
      readTime: "6 min read"
    },
    {
      id: "3",
      title: "The Blue Suit in my Dreams",
      preview: "My father worked on the SRB seals. The weight of that day stayed with our family, but so did the pride of what those seven souls stood for...",
      author: "David Vance",
      date: "Nov 05, 2023",
      readTime: "3 min read"
    }
  ],
  columbia: [
    {
      id: "4",
      title: "Watching the Texas Sky",
      preview: "We saw the streaks of light across the morning sky in Tyler, Texas. We didn't know then that we were witnessing the end of an era, but we felt the loss in our hearts...",
      author: "Elena Rodriguez",
      date: "Feb 01, 2024",
      readTime: "5 min read"
    },
    {
      id: "5",
      title: "The Legacy of Kalpana Chawla",
      preview: "As a young girl in India, Kalpana was my hero. She proved that the stars belong to everyone, no matter where you start your journey...",
      author: "Priya Sharma",
      date: "Dec 15, 2023",
      readTime: "4 min read"
    },
    {
      id: "6",
      title: "Sixteen Days of Science",
      preview: "While the world remembers the end, I want to remember the sixteen days of incredible discovery the crew gifted to humanity in orbit...",
      author: "Dr. Marcus Thorne",
      date: "Jan 10, 2024",
      readTime: "7 min read"
    }
  ]
};

const StoriesPreviewList = ({ mission }: StoriesPreviewListProps) => {
  const stories = MOCK_STORIES[mission];

  return (
    <section className="py-24 px-4 bg-[#020617] relative overflow-hidden">
      {/* Background Decoration */}
      <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-purple-600/5 rounded-full blur-[120px] pointer-events-none" />
      
      <div className="max-w-7xl mx-auto">
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-12 gap-6">
          <div>
            <div className="flex items-center gap-2 mb-4">
              <MessageSquare className="w-5 h-5 text-sky-400" />
              <span className="text-sky-400 font-bold uppercase tracking-[0.2em] text-xs">Voices of Remembrance</span>
            </div>
            <h2 className="text-4xl md:text-5xl font-serif text-white">Community Stories</h2>
          </div>
          
          <Link 
            href="/stories" 
            className="group flex items-center gap-2 text-slate-400 hover:text-white transition-colors"
          >
            <span className="text-sm font-medium">Read all tributes</span>
            <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
          </Link>
        </div>

        {/* Stories Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {stories.map((story, index) => (
            <StoryCard key={story.id} story={story} index={index} />
          ))}
        </div>

        {/* CTA Section */}
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="mt-16 p-8 rounded-3xl border border-slate-800 bg-slate-900/30 backdrop-blur-sm flex flex-col md:flex-row items-center justify-between gap-8"
        >
          <div className="flex items-center gap-6">
            <div className="w-12 h-12 rounded-full bg-sky-500/10 flex items-center justify-center">
                <Quote className="w-6 h-6 text-sky-500" />
            </div>
            <div>
                <h4 className="text-xl text-white font-medium">Have a story to share?</h4>
                <p className="text-slate-400 text-sm">Your memory helps keep their legacy alive for future generations.</p>
            </div>
          </div>
          <Link href="/share-story">
            <button className="px-8 py-4 bg-white text-black hover:bg-sky-400 hover:text-white transition-all duration-300 rounded-full font-semibold text-sm">
                Write Your Story
            </button>
          </Link>
        </motion.div>
      </div>
    </section>
  );
};

const StoryCard = ({ story, index }: { story: Story, index: number }) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ delay: index * 0.1, duration: 0.5 }}
    >
      <Link href={`/stories/${story.id}`}>
        <div className="group relative h-full p-8 rounded-2xl border border-slate-800 bg-slate-900/40 hover:bg-slate-900/60 hover:border-slate-700 transition-all duration-500 flex flex-col">
          {/* Quote Icon Background */}
          <div className="absolute top-6 right-8 opacity-5 group-hover:opacity-10 transition-opacity">
            <Quote className="w-12 h-12 text-white" />
          </div>

          {/* Card Content */}
          <div className="flex-1">
            <div className="flex items-center gap-4 mb-6">
                <div className="w-10 h-10 rounded-full bg-gradient-to-br from-slate-700 to-slate-800 border border-slate-600 flex items-center justify-center text-xs font-bold text-slate-300">
                    {story.author.charAt(0)}
                </div>
                <div>
                    <p className="text-sm text-slate-200 font-medium">{story.author}</p>
                    <div className="flex items-center gap-2 text-[10px] text-slate-500 uppercase tracking-wider">
                        <Clock className="w-3 h-3" />
                        {story.readTime}
                    </div>
                </div>
            </div>

            <h3 className="text-xl font-serif text-white mb-4 group-hover:text-sky-300 transition-colors leading-snug">
              {story.title}
            </h3>
            
            <p className="text-slate-400 text-sm leading-relaxed line-clamp-3 italic">
              "{story.preview}"
            </p>
          </div>

          <div className="mt-8 pt-6 border-t border-slate-800 flex justify-between items-center">
            <span className="text-xs text-slate-500">{story.date}</span>
            <span className="text-xs font-bold text-sky-500/80 group-hover:text-sky-400 flex items-center gap-1 uppercase tracking-widest">
                Read More <ArrowRight className="w-3 h-3" />
            </span>
          </div>
        </div>
      </Link>
    </motion.div>
  );
};

export default StoriesPreviewList;