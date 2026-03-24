'use client';
import { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence, useAnimation } from 'framer-motion';
import GradientOrb from './ui/GradientOrb';

const DURATION = 7200; // Total splash duration ms

const orbs = [
    { color: '#ff375f', size: 600, x: '15%', y: '20%', opacity: 0.4, animation: 'orb-drift', duration: '12s' },
    { color: '#ff9f0a', size: 500, x: '70%', y: '15%', opacity: 0.35, animation: 'orb-drift-2', duration: '14s' },
    { color: '#ffd60a', size: 400, x: '25%', y: '55%', opacity: 0.3, animation: 'orb-drift-3', duration: '16s' },
    { color: '#30d158', size: 550, x: '65%', y: '55%', opacity: 0.35, animation: 'orb-drift', duration: '15s' },
    { color: '#0071e3', size: 700, x: '80%', y: '75%', opacity: 0.4, animation: 'orb-drift-2', duration: '18s' },
    { color: '#bf5af2', size: 500, x: '20%', y: '80%', opacity: 0.35, animation: 'orb-drift-3', duration: '13s' },
];

const tagline = 'Where Champions Are Born';

export default function WelcomePage() {
    const [show, setShow] = useState(true);
    const [phase, setPhase] = useState(0); // 0=dark, 1=orbs, 2=logo, 3=tagline, 4=line, 5=pulse, 6=exit
    const timerRef = useRef(null);
    const skipRef = useRef(false);

    useEffect(() => {
        // Check if welcome was already shown this session
        if (sessionStorage.getItem('sportech-welcome-seen')) {
            setShow(false);
            return;
        }

        const timings = [
            { phase: 1, delay: 200 },
            { phase: 2, delay: 800 },
            { phase: 3, delay: 1400 },
            { phase: 4, delay: 1800 },
            { phase: 5, delay: 2400 },
            { phase: 6, delay: 3000 },
        ];

        timings.forEach(({ phase: p, delay }) => {
            setTimeout(() => {
                if (!skipRef.current) setPhase(p);
            }, delay);
        });

        timerRef.current = setTimeout(() => {
            if (!skipRef.current) {
                setShow(false);
                sessionStorage.setItem('sportech-welcome-seen', '1');
            }
        }, DURATION);

        return () => clearTimeout(timerRef.current);
    }, []);

    const handleSkip = () => {
        skipRef.current = true;
        clearTimeout(timerRef.current);
        setPhase(6);
        setTimeout(() => {
            setShow(false);
            sessionStorage.setItem('sportech-welcome-seen', '1');
        }, 600);
    };

    if (!show) return null;

    const progressPercent = Math.min(100, (phase / 6) * 100);

    return (
        <AnimatePresence>
            {show && (
                <motion.div
                    key="welcome"
                    initial={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0, scale: 1.05 }}
                    transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
                    style={{
                        position: 'fixed',
                        inset: 0,
                        zIndex: 9999,
                        background: '#000000',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        overflow: 'hidden',
                    }}
                    aria-label="Welcome animation"
                >
                    {/* Phase 1: Rainbow Orbs */}
                    {orbs.map((orb, i) => (
                        <motion.div
                            key={i}
                            initial={{ opacity: 0 }}
                            animate={{
                                opacity: phase >= 1
                                    ? phase >= 5 ? orb.opacity + 0.15 : orb.opacity
                                    : 0,
                            }}
                            transition={{ duration: 1.2, delay: i * 0.1, ease: [0.16, 1, 0.3, 1] }}
                            style={{
                                position: 'absolute',
                                left: orb.x,
                                top: orb.y,
                                width: orb.size,
                                height: orb.size,
                                transform: 'translate(-50%, -50%)',
                                borderRadius: '50%',
                                background: `radial-gradient(circle, ${orb.color} 0%, transparent 70%)`,
                                filter: 'blur(80px)',
                                mixBlendMode: 'screen',
                                pointerEvents: 'none',
                                animation: phase >= 1 ? `${orb.animation} ${orb.duration} ease-in-out infinite` : 'none',
                            }}
                        />
                    ))}

                    {/* Phase 2: Logo Materialization */}
                    <div style={{
                        position: 'relative', zIndex: 10,
                        display: 'flex', flexDirection: 'column', alignItems: 'center',
                    }}>
                        <motion.div
                            initial={{ opacity: 0, scale: 0.85, y: 20, filter: 'blur(20px)' }}
                            animate={phase >= 2 ? {
                                opacity: 1, scale: phase >= 5 ? 1.015 : 1,
                                y: 0, filter: 'blur(0px)',
                            } : {}}
                            transition={{
                                opacity: { duration: 0.6, ease: [0.16, 1, 0.3, 1] },
                                scale: { duration: phase >= 5 ? 0.6 : 0.7, ease: [0.16, 1, 0.3, 1] },
                                y: { duration: 0.6, ease: [0.16, 1, 0.3, 1] },
                                filter: { duration: 0.7, ease: [0.16, 1, 0.3, 1] },
                            }}
                        >
                            <h1 style={{
                                fontFamily: 'Poppins, -apple-system, sans-serif',
                                fontSize: 'clamp(48px, 8vw, 96px)',
                                fontWeight: 700,
                                color: '#ffffff',
                                letterSpacing: '-0.04em',
                                lineHeight: 1,
                                textShadow: '0 0 60px rgba(0,113,227,0.4), 0 0 120px rgba(191,90,242,0.2), 0 0 200px rgba(90,200,250,0.15)',
                                marginBottom: 24,
                            }}>
                                Sportech
                            </h1>
                        </motion.div>

                        {/* Phase 3: Tagline — character stagger */}
                        <div style={{
                            display: 'flex', justifyContent: 'center', flexWrap: 'wrap',
                            fontSize: 'clamp(16px, 2.5vw, 22px)',
                            fontWeight: 300,
                            letterSpacing: '0.15em',
                            color: 'rgba(255,255,255,0.7)',
                            height: 32,
                        }}>
                            {tagline.split('').map((char, i) => (
                                <motion.span
                                    key={i}
                                    initial={{ opacity: 0, y: 12 }}
                                    animate={phase >= 3 ? { opacity: 1, y: 0 } : {}}
                                    transition={{
                                        delay: i * 0.03,
                                        duration: 0.4,
                                        ease: [0.16, 1, 0.3, 1],
                                    }}
                                    style={{
                                        display: 'inline-block',
                                        whiteSpace: char === ' ' ? 'pre' : 'normal',
                                    }}
                                >
                                    {char}
                                </motion.span>
                            ))}
                        </div>

                        {/* Phase 4: Rainbow Line from center */}
                        <motion.div
                            initial={{ scaleX: 0 }}
                            animate={phase >= 4 ? { scaleX: phase >= 5 ? 1.015 : 1 } : { scaleX: 0 }}
                            transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
                            style={{
                                width: 'clamp(200px, 30vw, 300px)',
                                height: 1,
                                marginTop: 28,
                                background: 'linear-gradient(90deg, #ff375f, #ff9f0a, #ffd60a, #30d158, #5ac8fa, #0071e3, #bf5af2)',
                                transformOrigin: 'center',
                                borderRadius: 2,
                            }}
                        />
                    </div>

                    {/* Skip Button */}
                    <motion.button
                        onClick={handleSkip}
                        initial={{ opacity: 0 }}
                        animate={{ opacity: phase >= 1 ? 1 : 0 }}
                        whileHover={{
                            borderColor: 'rgba(255,255,255,0.35)',
                            color: 'rgba(255,255,255,0.7)',
                            background: 'rgba(255,255,255,0.05)',
                        }}
                        style={{
                            position: 'absolute',
                            bottom: 40,
                            right: 40,
                            display: 'flex',
                            alignItems: 'center',
                            gap: 10,
                            padding: '8px 16px',
                            borderRadius: 24,
                            border: '1px solid rgba(255,255,255,0.15)',
                            background: 'transparent',
                            color: 'rgba(255,255,255,0.45)',
                            fontSize: 13,
                            fontWeight: 400,
                            cursor: 'pointer',
                            fontFamily: 'inherit',
                            transition: 'all 0.15s',
                        }}
                    >
                        {/* Countdown circle */}
                        <svg width="18" height="18" viewBox="0 0 36 36" style={{ transform: 'rotate(-90deg)' }}>
                            <circle cx="18" cy="18" r="16" fill="none" stroke="rgba(255,255,255,0.1)" strokeWidth="2" />
                            <circle
                                cx="18" cy="18" r="16" fill="none"
                                stroke="rgba(255,255,255,0.4)" strokeWidth="2"
                                strokeDasharray="100"
                                strokeLinecap="round"
                                style={{
                                    animation: `countdown-circle ${DURATION / 1000}s linear forwards`,
                                }}
                            />
                        </svg>
                        Skip
                    </motion.button>
                </motion.div>
            )}
        </AnimatePresence>
    );
}
