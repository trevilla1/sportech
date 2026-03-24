'use client';
import { useState, useEffect, useCallback } from 'react';

export function useMousePosition(ref) {
    const [position, setPosition] = useState({ x: 0, y: 0 });

    useEffect(() => {
        const el = ref?.current;
        let rafId;

        const handleMouseMove = (e) => {
            if (rafId) cancelAnimationFrame(rafId);
            rafId = requestAnimationFrame(() => {
                if (el) {
                    const rect = el.getBoundingClientRect();
                    setPosition({
                        x: e.clientX - rect.left,
                        y: e.clientY - rect.top,
                    });
                } else {
                    setPosition({ x: e.clientX, y: e.clientY });
                }
            });
        };

        const target = el || window;
        target.addEventListener('mousemove', handleMouseMove, { passive: true });
        return () => {
            target.removeEventListener('mousemove', handleMouseMove);
            if (rafId) cancelAnimationFrame(rafId);
        };
    }, [ref]);

    return position;
}
