// PACKAGES
import React, { useEffect, useState } from 'react';

// ASSETS
import { MoonIcon, SunIcon } from '../assets/Icons';

const ThemeToggle = () => {
  const [isDarkMode, setIsDarkMode] = useState(false);

  useEffect(() => {
    const storedTheme = localStorage.getItem('color-theme');
    const prefersDarkMode = window.matchMedia('(prefers-color-scheme: dark)').matches;

    if (storedTheme === 'dark' || (!storedTheme && prefersDarkMode)) {
      setIsDarkMode(true);
      document.documentElement.classList.add('dark');
    } else {
      setIsDarkMode(false);
      document.documentElement.classList.remove('dark');
    }
  }, []);

  const handleToggle = () => {
    if (isDarkMode) {
      document.documentElement.classList.remove('dark');
      localStorage.setItem('color-theme', 'light');
    } else {
      document.documentElement.classList.add('dark');
      localStorage.setItem('color-theme', 'dark');
    }
    setIsDarkMode(!isDarkMode);
  };

  return (
    <button id="theme-toggle" onClick={handleToggle} className="text-dark-500 dark:text-dark-400 hover:bg-dark-600/10 focus:outline-none rounded-full text-sm p-2.5 fixed top-8 right-1 md:right-1 z-30">
      {isDarkMode ? <MoonIcon id="theme-toggle-dark-icon" className="w-5 h-5" /> : <SunIcon id="theme-toggle-light-icon" className="w-5 h-5" />}
    </button>
  );
};

export default ThemeToggle;
