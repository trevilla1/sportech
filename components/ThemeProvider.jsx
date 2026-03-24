'use client';
import { createContext, useContext, useEffect, useState, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

const ThemeContext = createContext({ theme: 'dark', toggle: () => { } });

export function ThemeProvider({ children }) {
    const [theme, setTheme] = useState('dark');
    const [mounted, setMounted] = useState(false);

    useEffect(() => {
        // Read from localStorage first, then system preference
        const saved = localStorage.getItem('sportech-theme');
        if (saved) {
            setTheme(saved);
            document.documentElement.setAttribute('data-theme', saved);
        } else {
            const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
            const initial = prefersDark ? 'dark' : 'light';
            setTheme(initial);
            document.documentElement.setAttribute('data-theme', initial);
        }
        setMounted(true);
    }, []);

    const toggle = useCallback(() => {
        setTheme(prev => {
            const next = prev === 'dark' ? 'light' : 'dark';
            localStorage.setItem('sportech-theme', next);
            document.documentElement.setAttribute('data-theme', next);
            return next;
        });
    }, []);

    // Prevent flash: render children hidden until mounted
    if (!mounted) {
        return (
            <div suppressHydrationWarning style={{ visibility: 'hidden' }}>
                {children}
            </div>
        );
    }

    return (
        <ThemeContext.Provider value={{ theme, toggle }}>
            <div data-theme={theme} style={{ minHeight: '100vh', background: 'var(--bg-primary)', color: 'var(--text-primary)', transition: 'background 0.3s, color 0.3s' }}>
                {children}
            </div>
        </ThemeContext.Provider>
    );
}

export const useTheme = () => useContext(ThemeContext);
