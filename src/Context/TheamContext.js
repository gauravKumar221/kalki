'use client';
import { createContext, useState, useEffect } from 'react';
import { usePathname } from 'next/navigation';

export const TheamContext = createContext();

const TheamProvider = ({ children }) => {
  const [theme, setTheme] = useState(null);
  const [isLoaded, setIsLoaded] = useState(false);

  const pathname = usePathname();
  const [showPage, setShowPage] = useState(false);

  // Load theme on mount
  useEffect(() => {
    const savedTheme = localStorage.getItem('theme') || 'dark';
    setTheme(savedTheme);
    document.body.classList.remove('light', 'dark');
    document.body.classList.add(savedTheme);
    setIsLoaded(true);
  }, []);

  // Update theme dynamically
  useEffect(() => {
    if (theme) {
      document.body.classList.remove('light', 'dark');
      document.body.classList.add(theme);
      localStorage.setItem('theme', theme);
    }
  }, [theme]);

  // Toggle between light/dark
  const toggleTheme = () => {
    setTheme(prev => (prev === 'light' ? 'dark' : 'light'));
  };

  // Page transition animation on route change
  useEffect(() => {
    setShowPage(false);
    const timer = setTimeout(() => setShowPage(true), 50); // Delay for effect
    return () => clearTimeout(timer);
  }, [pathname]);

  // Don’t render children until theme is loaded
  if (!isLoaded) return null;

  return (
    <TheamContext.Provider value={{ theme, toggleTheme }}>
    <div
  className={`transition-all duration-700 ease-in-out transform ${
    showPage ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'
  }`}
>
  {children}
</div>
    </TheamContext.Provider>
  );
};

export default TheamProvider;
