// ThemeToggle.tsx
'use client';

import { useEffect, useState } from 'react';

const ThemeToggle = () => {
  const [isDark, setIsDark] = useState(false);

  useEffect(() => {
    const savedTheme = localStorage.getItem('theme');
    if (savedTheme) {
      setIsDark(savedTheme === 'dark');
    } else {
      setIsDark(window.matchMedia('(prefers-color-scheme: dark)').matches);
    }
  }, []);

  const toggleTheme = () => {
    const newTheme = isDark ? 'light' : 'dark';
    setIsDark(!isDark);
    document.documentElement.classList.toggle('dark', !isDark);
    localStorage.setItem('theme', newTheme);
  };

  return (
    <button onClick={toggleTheme} className="p-2 rounded-full bg-gray-200 dark:bg-gray-800">
      {isDark ? '🌞' : '🌙'}
    </button>
  );
};

export default ThemeToggle;
