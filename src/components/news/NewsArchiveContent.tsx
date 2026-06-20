"use client";

import { useState, useRef, useEffect } from 'react';
import { useLanguage } from '@/context/LanguageContext';
import { translations } from '@/i18n/translations';
import PostCard from '@/components/news/PostCard';
import { Post } from '@/data/newsData';
import { clsx } from 'clsx';
import { Iconify } from '../ui/Iconify';
import { motion, AnimatePresence } from 'framer-motion';

interface NewsArchiveContentProps {
  initialPosts: Post[];
}

export default function NewsArchiveContent({ initialPosts }: NewsArchiveContentProps) {
  const { locale, isRTL } = useLanguage();
  const t = translations[locale].newsArchive;
  const [selectedYear, setSelectedYear] = useState<number | null>(null);
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  // Close dropdown when clicking outside
  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  // Extract unique years from posts, sorted descending
  const years = Array.from(
    new Set(
      initialPosts.map((post) => new Date(post.date).getFullYear())
    )
  ).sort((a, b) => b - a);

  // Count posts per year
  const postCountsByYear = initialPosts.reduce((acc, post) => {
    const year = new Date(post.date).getFullYear();
    acc[year] = (acc[year] || 0) + 1;
    return acc;
  }, {} as Record<number, number>);

  const [currentPage, setCurrentPage] = useState(1);
  const postsPerPage = 8;

  // Reset page when year filter changes
  useEffect(() => {
    setCurrentPage(1);
  }, [selectedYear]);

  // Smooth scroll to news top on page change
  useEffect(() => {
    const element = document.getElementById('news-archive-top');
    if (element) {
      element.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  }, [currentPage]);

  // Filtered posts based on selection
  const filteredPosts = selectedYear
    ? initialPosts.filter((post) => new Date(post.date).getFullYear() === selectedYear)
    : initialPosts;

  const totalPages = Math.ceil(filteredPosts.length / postsPerPage);

  // Pagination slicing
  const startIndex = (currentPage - 1) * postsPerPage;
  const endIndex = currentPage * postsPerPage;
  const remainingPosts = filteredPosts.slice(startIndex, endIndex);

  return (
    <main className="pt-32 pb-20 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto text-start">
      {/* Header Section */}
      <div id="news-archive-top" className="mb-12">
        <h1 className="text-4xl md:text-5xl font-bold text-[#0c1a2e] mb-4 tracking-tight">
          {t.title} <span className="text-[#162d4f]">{t.insights}</span>
        </h1>
        <p className="text-[#3a4f6a] text-lg max-w-2xl leading-relaxed font-medium">
          {t.description}
        </p>
      </div>

      {/* Year Filter Section */}
      {years.length > 0 && (
        <div className="mb-12 border-b border-[#0c1a2e]/5 pb-8 relative z-30">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
            
            {/* Title & Icon */}
            <div className="flex items-center gap-2 text-[#3a4f6a]">
              <Iconify icon="solar:filter-linear" className="text-lg text-[#3b82f6]" />
              <span className="text-xs font-bold uppercase tracking-widest">{t.filterBy}</span>
            </div>

            {/* Dropdown Element */}
            <div className="relative" ref={dropdownRef}>
              <button
                type="button"
                onClick={() => setIsOpen(!isOpen)}
                className={clsx(
                  "w-full sm:w-auto min-w-[220px] px-5 py-3 rounded-2xl text-xs font-bold transition-all duration-300 flex items-center justify-between gap-3 border bg-white shadow-sm border-[#0c1a2e]/10 text-[#0c1a2e] hover:border-[#0c1a2e]/20 hover:shadow-md cursor-pointer",
                  isOpen && "border-[#3b82f6] ring-2 ring-[#3b82f6]/10"
                )}
              >
                <div className="flex items-center gap-2.5">
                  <Iconify 
                    icon={selectedYear === null ? "solar:globus-linear" : "solar:calendar-date-linear"} 
                    className="w-4 h-4 text-[#3b82f6]" 
                  />
                  <span>
                    {selectedYear === null ? t.filterAll : `${t.filterYear}: ${selectedYear}`}
                  </span>
                </div>
                <div className="flex items-center gap-2">
                  <span className="px-2 py-0.5 rounded-lg text-[10px] font-extrabold bg-[#0c1a2e]/5 text-[#3a4f6a]">
                    {selectedYear === null ? initialPosts.length : (postCountsByYear[selectedYear] || 0)}
                  </span>
                  <Iconify 
                    icon="solar:alt-arrow-down-linear" 
                    className={clsx("w-3.5 h-3.5 text-[#3a4f6a] transition-transform duration-300", isOpen && "rotate-180")} 
                  />
                </div>
              </button>

              <AnimatePresence>
                {isOpen && (
                  <motion.div
                    initial={{ opacity: 0, y: 10, scale: 0.95 }}
                    animate={{ opacity: 1, y: 0, scale: 1 }}
                    exit={{ opacity: 0, y: 10, scale: 0.95 }}
                    transition={{ duration: 0.15, ease: 'easeOut' }}
                    className={clsx(
                      "absolute mt-2 min-w-[240px] max-h-[280px] overflow-y-auto rounded-2xl border border-[#0c1a2e]/10 bg-white/95 backdrop-blur-md p-2 shadow-[0_12px_40px_rgba(12,26,46,0.12)] z-50 text-start flex flex-col gap-1 no-scrollbar",
                      isRTL ? "left-0 origin-top-left" : "right-0 origin-top-right"
                    )}
                    style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}
                  >
                    {/* All Years Button */}
                    <button
                      type="button"
                      onClick={() => {
                        setSelectedYear(null);
                        setIsOpen(false);
                      }}
                      className={clsx(
                        "w-full px-4 py-2.5 rounded-xl text-xs font-bold flex items-center justify-between transition-colors duration-200 cursor-pointer",
                        selectedYear === null
                          ? "bg-[#0c1a2e] text-white shadow-sm"
                          : "text-[#3a4f6a] hover:bg-[#0c1a2e]/5 hover:text-[#0c1a2e]"
                      )}
                    >
                      <div className="flex items-center gap-2.5">
                        <Iconify icon="solar:globus-linear" className={clsx("w-4 h-4", selectedYear === null ? "text-white" : "text-[#3b82f6]")} />
                        <span>{t.filterAll}</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <span className={clsx(
                          "px-1.5 py-0.5 rounded text-[9px] font-extrabold",
                          selectedYear === null ? "bg-white/20 text-white" : "bg-[#0c1a2e]/5 text-[#3a4f6a]"
                        )}>
                          {initialPosts.length}
                        </span>
                        {selectedYear === null && (
                          <Iconify icon="solar:check-circle-bold" className="w-3.5 h-3.5 text-white" />
                        )}
                      </div>
                    </button>

                    {/* Individual Year Buttons */}
                    {years.map((year) => {
                      const isSelected = selectedYear === year;
                      const count = postCountsByYear[year] || 0;
                      return (
                        <button
                          key={year}
                          type="button"
                          onClick={() => {
                            setSelectedYear(year);
                            setIsOpen(false);
                          }}
                          className={clsx(
                            "w-full px-4 py-2.5 rounded-xl text-xs font-bold flex items-center justify-between transition-colors duration-200 cursor-pointer",
                            isSelected
                              ? "bg-[#0c1a2e] text-white shadow-sm"
                              : "text-[#3a4f6a] hover:bg-[#0c1a2e]/5 hover:text-[#0c1a2e]"
                          )}
                        >
                          <div className="flex items-center gap-2.5">
                            <Iconify icon="solar:calendar-date-linear" className={clsx("w-4 h-4", isSelected ? "text-white" : "text-[#3b82f6]")} />
                            <span>{year}</span>
                          </div>
                          <div className="flex items-center gap-2">
                            <span className={clsx(
                              "px-1.5 py-0.5 rounded text-[9px] font-extrabold",
                              isSelected ? "bg-white/20 text-white" : "bg-[#0c1a2e]/5 text-[#3a4f6a]"
                            )}>
                              {count}
                            </span>
                            {isSelected && (
                              <Iconify icon="solar:check-circle-bold" className="w-3.5 h-3.5 text-white" />
                            )}
                          </div>
                        </button>
                      );
                    })}
                  </motion.div>
                )}
              </AnimatePresence>
            </div>

          </div>
        </div>
      )}

      {/* Grid Content with Transitions */}
      <AnimatePresence mode="wait">
        <motion.div
          key={`${selectedYear ?? 'all'}-${currentPage}`}
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -15 }}
          transition={{ duration: 0.25 }}
        >
          {selectedYear === null ? (
            <div>
              {/* All News Archive */}
              {remainingPosts.length > 0 && (
                <div>
                  <h2 className="text-[10px] font-bold uppercase tracking-widest text-[#3a4f6a] mb-6 flex items-center gap-3">
                    <span>{t.allNews}</span>
                    <div className="h-px bg-[#0c1a2e]/10 flex-1"></div>
                  </h2>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                    {remainingPosts.map((post) => (
                      <PostCard key={post.id} post={post} />
                    ))}
                  </div>
                </div>
              )}
            </div>
          ) : (
            <div>
              <h2 className="text-[10px] font-bold uppercase tracking-widest text-[#3a4f6a] mb-6 flex items-center gap-3">
                <span>{t.filterYear}: {selectedYear} ({filteredPosts.length})</span>
                <div className="h-px bg-[#0c1a2e]/10 flex-1"></div>
              </h2>
              {remainingPosts.length > 0 ? (
                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                  {remainingPosts.map((post) => (
                    <PostCard key={post.id} post={post} />
                  ))}
                </div>
              ) : (
                <div className="py-20 text-center border border-[#0c1a2e]/10 rounded-3xl bg-white shadow-sm">
                  <p className="text-[#3a4f6a] italic font-medium">{t.noPosts}</p>
                </div>
              )}
            </div>
          )}
        </motion.div>
      </AnimatePresence>

      {/* Pagination Controls */}
      {totalPages > 1 && (
        <div className="flex flex-wrap items-center justify-center gap-1.5 mt-16 pt-8 border-t border-[#0c1a2e]/5" dir="ltr">
          {/* First Page Button */}
          <button
            onClick={() => setCurrentPage(1)}
            disabled={currentPage === 1}
            className={clsx(
              "w-10 h-10 rounded-xl flex items-center justify-center border transition-all duration-200 cursor-pointer bg-white",
              currentPage === 1
                ? "border-gray-200 text-gray-300 cursor-not-allowed bg-gray-50/50"
                : "border-[#0c1a2e]/10 text-[#0c1a2e] hover:border-[#3b82f6] hover:text-[#3b82f6] hover:shadow-sm"
            )}
            title="First Page"
          >
            <Iconify icon="solar:double-alt-arrow-left-bold" width={16} />
          </button>

          {/* Previous Page Button */}
          <button
            onClick={() => setCurrentPage((prev) => Math.max(prev - 1, 1))}
            disabled={currentPage === 1}
            className={clsx(
              "w-10 h-10 rounded-xl flex items-center justify-center border transition-all duration-200 cursor-pointer bg-white",
              currentPage === 1
                ? "border-gray-200 text-gray-300 cursor-not-allowed bg-gray-50/50"
                : "border-[#0c1a2e]/10 text-[#0c1a2e] hover:border-[#3b82f6] hover:text-[#3b82f6] hover:shadow-sm"
            )}
            title="Previous Page"
          >
            <Iconify icon="solar:alt-arrow-left-bold" width={16} />
          </button>

          {/* Page Numbers */}
          {Array.from({ length: totalPages }, (_, i) => i + 1).map((page) => {
            const isNearCurrent = Math.abs(page - currentPage) <= 1;
            const isFirstOrLast = page === 1 || page === totalPages;
            
            if (!isNearCurrent && !isFirstOrLast) {
              if (page === 2 || page === totalPages - 1) {
                return (
                  <span key={`dots-${page}`} className="px-1 text-[#3a4f6a]/40 text-sm font-bold select-none">
                    ...
                  </span>
                );
              }
              return null;
            }

            return (
              <button
                key={page}
                onClick={() => setCurrentPage(page)}
                className={clsx(
                  "w-10 h-10 rounded-xl text-sm font-bold transition-all duration-200 cursor-pointer",
                  currentPage === page
                    ? "bg-[#0c1a2e] text-white shadow-md shadow-[#0c1a2e]/10"
                    : "bg-white border border-[#0c1a2e]/10 text-[#0c1a2e] hover:border-[#3b82f6] hover:text-[#3b82f6] hover:shadow-sm"
                )}
              >
                {page}
              </button>
            );
          })}

          {/* Next Page Button */}
          <button
            onClick={() => setCurrentPage((prev) => Math.min(prev + 1, totalPages))}
            disabled={currentPage === totalPages}
            className={clsx(
              "w-10 h-10 rounded-xl flex items-center justify-center border transition-all duration-200 cursor-pointer bg-white",
              currentPage === totalPages
                ? "border-gray-200 text-gray-300 cursor-not-allowed bg-gray-50/50"
                : "border-[#0c1a2e]/10 text-[#0c1a2e] hover:border-[#3b82f6] hover:text-[#3b82f6] hover:shadow-sm"
            )}
            title="Next Page"
          >
            <Iconify icon="solar:alt-arrow-right-bold" width={16} />
          </button>

          {/* Last Page Button */}
          <button
            onClick={() => setCurrentPage(totalPages)}
            disabled={currentPage === totalPages}
            className={clsx(
              "w-10 h-10 rounded-xl flex items-center justify-center border transition-all duration-200 cursor-pointer bg-white",
              currentPage === totalPages
                ? "border-gray-200 text-gray-300 cursor-not-allowed bg-gray-50/50"
                : "border-[#0c1a2e]/10 text-[#0c1a2e] hover:border-[#3b82f6] hover:text-[#3b82f6] hover:shadow-sm"
            )}
            title="Last Page"
          >
            <Iconify icon="solar:double-alt-arrow-right-bold" width={16} />
          </button>
        </div>
      )}

      {/* General Empty state (if no posts exist at all) */}
      {initialPosts.length === 0 && (
        <div className="py-20 text-center border border-[#0c1a2e]/10 rounded-3xl bg-white shadow-sm">
          <p className="text-[#3a4f6a] italic font-medium">{t.noPosts}</p>
        </div>
      )}
    </main>
  );
}
