'use client';
import { motion, useScroll, useTransform, useSpring, AnimatePresence } from 'framer-motion';
import { useState, useEffect, useMemo } from 'react';
import Image from 'next/image';

const BALL_COUNT = 12;

export default function ScrollBall({ size = 110 }) {
    const [phase, setPhase] = useState('falling'); // falling → merging → ready

    const balls = useMemo(() => Array.from({ length: BALL_COUNT }, (_, i) => ({
        id: i,
        x: 8 + (i / BALL_COUNT) * 80 + (Math.random() - 0.5) * 12,
        size: 35 + Math.random() * 55,
        delay: i * 0.35,                   // stagger: each ball starts 0.35s after the last
        drift: (Math.random() - 0.5) * 60, // gentle horizontal drift in px
        spin: (Math.random() - 0.5) * 180, // gentle rotation
    })), []);

    const { scrollYProgress } = useScroll();
    const smooth = useSpring(scrollYProgress, { stiffness: 40, damping: 18 });
    const rotate = useTransform(smooth, [0, 1], [0, 1440]);
    const sx = useTransform(smooth, [0, 0.15, 0.35, 0.55, 0.75, 1], ['6vw', '72vw', '15vw', '62vw', '8vw', '45vw']);
    const sy = useTransform(smooth, [0, 1], ['10vh', '78vh']);
    const ss = useTransform(smooth, [0, 0.5, 1], [1, 1.15, 0.9]);

    useEffect(() => {
        // Last ball finishes falling at: (BALL_COUNT-1)*0.35 + 3.5s duration ≈ 7.35s
        // Give 1s pause, then merge
        const mergeAt = (BALL_COUNT - 1) * 0.35 + 3.5 + 1.0;
        const readyAt = mergeAt + 1.8;
        const t1 = setTimeout(() => setPhase('merging'), mergeAt * 1000);
        const t2 = setTimeout(() => setPhase('ready'), readyAt * 1000);
        return () => { clearTimeout(t1); clearTimeout(t2); };
    }, []);

    return (
        <>
            {/* ─── FALLING BALLS ─── */}
            <AnimatePresence>
                {phase !== 'ready' && balls.map(({ id, x, size: bSize, delay, drift, spin }) => (
                    <motion.div
                        key={id}
                        initial={{
                            opacity: 0,
                            y: -120,
                            x: `calc(${x}vw)`,
                            rotate: 0,
                            scale: 0.6,
                        }}
                        animate={phase === 'falling' ? {
                            opacity: 1,
                            y: '110vh',
                            x: `calc(${x}vw + ${drift}px)`,
                            rotate: spin,
                            scale: 1,
                        } : {
                            // Merge: all fly toward center
                            opacity: id === 0 ? 1 : 0,
                            y: '35vh',
                            x: '48vw',
                            rotate: 0,
                            scale: id === 0 ? 1 : 0.2,
                        }}
                        transition={phase === 'falling' ? {
                            duration: 4,
                            delay,
                            ease: 'linear',
                        } : {
                            duration: 1.4,
                            delay: id * 0.04,
                            ease: [0.16, 1, 0.3, 1],
                        }}
                        exit={{
                            opacity: 0,
                            scale: 0,
                            transition: { duration: 0.4 },
                        }}
                        style={{
                            position: 'fixed',
                            top: 0,
                            left: 0,
                            zIndex: 3,
                            pointerEvents: 'none',
                            width: bSize,
                            height: bSize,
                            filter: 'drop-shadow(0 10px 20px rgba(0,0,0,0.25))',
                        }}
                    >
                        <div style={{ width: bSize, height: bSize, borderRadius: '50%', overflow: 'hidden' }}>
                            <Image
                                src="/soccer-ball.png"
                                alt=""
                                width={Math.ceil(bSize)}
                                height={Math.ceil(bSize)}
                                style={{ width: '100%', height: '100%', objectFit: 'cover' }}
                                priority
                                draggable={false}
                            />
                        </div>
                    </motion.div>
                ))}
            </AnimatePresence>

            {/* ─── SCROLL-FOLLOWING BALL ─── */}
            {phase === 'ready' && (
                <motion.div
                    initial={{ opacity: 0, scale: 0.5, x: '48vw', y: '35vh' }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
                    style={{
                        position: 'fixed', top: 0, left: 0,
                        x: sx, y: sy, scale: ss,
                        zIndex: 2, pointerEvents: 'none',
                        width: size, height: size,
                        filter: 'drop-shadow(0 20px 40px rgba(0,0,0,0.35))',
                    }}
                >
                    <motion.div style={{ rotate, width: size, height: size, borderRadius: '50%', overflow: 'hidden' }}>
                        <Image
                            src="/soccer-ball.png" alt="" width={size} height={size}
                            style={{ width: size, height: size, objectFit: 'contain' }}
                            priority draggable={false}
                        />
                    </motion.div>
                </motion.div>
            )}
        </>
    );
}
