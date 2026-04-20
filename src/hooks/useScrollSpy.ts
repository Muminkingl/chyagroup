import { useState, useEffect } from 'react';

/**
 * useScrollSpy tracks which section is currently in view
 * @param ids List of section IDs to track
 * @param offset Vertical offset to trigger the active state early/late
 */
export const useScrollSpy = (ids: string[], offset: number = 200) => {
  const [activeId, setActiveId] = useState<string>(ids[0] || '');

  useEffect(() => {
    const handleScroll = () => {
      const scrollPosition = window.scrollY + offset;

      // Find the section that currently contains the scroll position
      const currentSection = ids.find((id) => {
        const element = document.getElementById(id);
        if (element) {
          const { offsetTop, offsetHeight } = element;
          return scrollPosition >= offsetTop && scrollPosition < offsetTop + offsetHeight;
        }
        return false;
      });

      if (currentSection && currentSection !== activeId) {
        setActiveId(currentSection);
      }
    };

    window.addEventListener('scroll', handleScroll);
    // Initial check
    handleScroll();

    return () => window.removeEventListener('scroll', handleScroll);
  }, [ids, offset, activeId]);

  return activeId;
};
