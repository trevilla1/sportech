'use client';
import { useEffect, useState, useRef } from 'react';
import { motion, useSpring } from 'framer-motion';

export default function CustomCursor() {
    const [visible, setVisible] = useState(false);
    const [hovering, setHovering] = useState(false);
    const cursorX = useSpring(0, { damping: 15, stiffness: 150 });
    const cursorY = useSpring(0, { damping: 15, stiffness: 150 });
    const ringX = useSpring(0, { damping: 20, stiffness: 80 });
    const ringY = useSpring(0, { damping: 20, stiffness: 80 });

    useEffect(() => {
        // Disable on touch devices
        if (window.matchMedia('(pointer: coarse)').matches) return;

        const onMouseMove = (e) => {
            cursorX.set(e.clientX);
            cursorY.set(e.clientY);
            ringX.set(e.clientX);
            ringY.set(e.clientY);
            if (!visible) setVisible(true);
        };

        const onMouseEnter = () => setVisible(true);
        const onMouseLeave = () => setVisible(false);

        // Track hover on interactive elements
        const onPointerOver = (e) => {
            const target = e.target;
            if (
                target.closest('a') ||
                target.closest('button') ||
                target.closest('[role="button"]') ||
                target.closest('.card') ||
                target.closest('.glass-card')
            ) {
                setHovering(true);
            }
        };
        const onPointerOut = (e) => {
            const target = e.target;
            if (
                target.closest('a') ||
                target.closest('button') ||
                target.closest('[role="button"]') ||
                target.closest('.card') ||
                target.closest('.glass-card')
            ) {
                setHovering(false);
            }
        };

        document.addEventListener('mousemove', onMouseMove, { passive: true });
        document.addEventListener('mouseenter', onMouseEnter);
        document.addEventListener('mouseleave', onMouseLeave);
        document.addEventListener('pointerover', onPointerOver, { passive: true });
        document.addEventListener('pointerout', onPointerOut, { passive: true });

        // Hide native cursor
        document.body.style.cursor = 'none';
        const styleEl = document.createElement('style');
        styleEl.textContent = '*, *::before, *::after { cursor: none !important; }';
        document.head.appendChild(styleEl);

        return () => {
            document.removeEventListener('mousemove', onMouseMove);
            document.removeEventListener('mouseenter', onMouseEnter);
            document.removeEventListener('mouseleave', onMouseLeave);
            document.removeEventListener('pointerover', onPointerOver);
            document.removeEventListener('pointerout', onPointerOut);
            document.body.style.cursor = '';
            styleEl.remove();
        };
    }, [visible, cursorX, cursorY, ringX, ringY]);

    if (typeof window !== 'undefined' && window.matchMedia?.('(pointer: coarse)').matches) {
        return null;
    }

    return (
        <div className="custom-cursor" style={{ position: 'fixed', inset: 0, pointerEvents: 'none', zIndex: 99999 }} aria-hidden="true">
            {/* Cursor dot */}
            <motion.div
                style={{
                    position: 'fixed',
                    left: cursorX,
                    top: cursorY,
                    width: hovering ? 16 : 8,
                    height: hovering ? 16 : 8,
                    borderRadius: '50%',
                    background: hovering ? '#bf5af2' : '#0071e3',
                    transform: 'translate(-50%, -50%)',
                    opacity: visible ? 1 : 0,
                    transition: 'width 0.2s, height 0.2s, background 0.2s, opacity 0.15s',
                    zIndex: 99999,
                    mixBlendMode: 'difference',
                }}
            />
            {/* Cursor ring */}
            <motion.div
                style={{
                    position: 'fixed',
                    left: ringX,
                    top: ringY,
                    width: hovering ? 48 : 32,
                    height: hovering ? 48 : 32,
                    borderRadius: '50%',
                    border: hovering ? 'none' : '1px solid rgba(0,113,227,0.4)',
                    background: hovering ? 'rgba(0,113,227,0.08)' : 'transparent',
                    transform: 'translate(-50%, -50%)',
                    opacity: visible ? 1 : 0,
                    transition: 'width 0.25s, height 0.25s, border 0.2s, background 0.2s, opacity 0.15s',
                    zIndex: 99998,
                }}
            />
        </div>
    );
}
