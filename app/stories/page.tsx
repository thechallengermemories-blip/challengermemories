"use client";

import React, { useState, useEffect, useCallback } from 'react';
import { Navbar } from '@/components/layout/Navbar';
import { Footer } from '@/components/home/Footer';
import { PageHeader } from '@/components/forms/pageheader';
import { HeritageGallery } from '@/components/stories/HeritageGallery';
import { PublicChronicles } from '@/components/stories/PublicChronicles';
import { motion, AnimatePresence } from 'framer-motion';
import { Loader2 } from 'lucide-react';

const StoriesPage = () => {
  const [publicStories, setPublicStories] = useState([]);
  const [familyStories, setFamilyStories] = useState({ type1: [], type2: [], type3: [] });
  const [loading, setLoading] = useState(true);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [searchQuery, setSearchQuery] = useState("");

  const fetchStories = useCallback(async (query: string, page: number) => {
    setLoading(true);
    try {
      const params = new URLSearchParams({
        mission: 'challenger',
        page: page.toString(),
        ...(query && { search: query })
      });

      const response = await fetch(`/api/stories?${params.toString()}`);
      const result = await response.json();
      
      if (result.success) {
        const allStories = result.data;
        setPublicStories(allStories.filter((s: any) => s.category === 'public'));
        
        const heritage = allStories.filter((s: any) => s.category === 'heritage');
        setFamilyStories({
          type1: heritage.filter((s: any) => s.relation === 'immediate-family'),
          type2: heritage.filter((s: any) => s.relation === 'friend'),
          type3: heritage.filter((s: any) => s.relation === 'colleague'),
        });
        setTotalPages(result.totalPages || 1);
      }
    } catch (error) {
      console.error("Archive synchronization failed:", error);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchStories(searchQuery, currentPage);
  }, [searchQuery, currentPage, fetchStories]);

  return (
    <main className="min-h-screen bg-[#020617] text-slate-200 selection:bg-sky-500/30">
      {/* Cinematic Background */}
      <div className="fixed inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-[-10%] left-[-10%] w-[40%] h-[40%] bg-sky-500/10 blur-[120px] rounded-full" />
        <div className="absolute bottom-[-10%] right-[-10%] w-[40%] h-[40%] bg-indigo-500/10 blur-[120px] rounded-full" />
      </div>

      <Navbar />
      
      <div className="relative z-10">
        <PageHeader onSearch={(q) => { setSearchQuery(q); setCurrentPage(1); }} />

        {!searchQuery && (
          <HeritageGallery stories={familyStories} loading={loading} />
        )}

        <PublicChronicles 
          stories={publicStories} 
          loading={loading} 
          currentPage={currentPage}
          totalPages={totalPages}
          onPageChange={setCurrentPage}
        />
      </div>

      <Footer />
    </main>
  );
};

export default StoriesPage;