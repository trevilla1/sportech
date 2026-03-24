'use client';
import { useEffect, useRef } from 'react';
import Lenis from 'lenis';

export function useLenis() {
    const lenisRef = useRef(null);

    useEffect(() => {
        // Detect touch device
        const isTouch = window.matchMedia('(pointer: coarse)').matches;

        const lenis = new Lenis({
            lerp: isTouch ? 0.12 : 0.08,
            smoothWheel: true,
            syncTouch: false,
        });

        lenisRef.current = lenis;

        function raf(time) {
            lenis.raf(time);
            requestAnimationFrame(raf);
        }
        requestAnimationFrame(raf);

        return () => {
            lenis.destroy();
            lenisRef.current = null;
        };
    }, []);

    return lenisRef;
}
