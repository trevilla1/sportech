'use client';
import { motion, useScroll, useTransform, useSpring } from 'framer-motion';
import { useRef, useEffect, useState } from 'react';

/**
 * Text that speeds up velocity-style as user scrolls.
 * Creates a dynamic marquee that reacts to scroll speed.
 */
export function VelocityText({ children, baseSpeed = 2, className = '' }) {
    const { scrollY } = useScroll();
    const [direction, setDirection] = useState(1);
    const [speed, setSpeed] = useState(baseSpeed);
    const lastY = useRef(0);

    useEffect(() => {
        return scrollY.on('change', (latest) => {
            const diff = latest - lastY.current;
            setDirection(diff > 0 ? 1 : -1);
            setSpeed(baseSpeed + Math.min(Math.abs(diff) * 0.15, 30));
            lastY.current = latest;
        });
    }, [scrollY, baseSpeed]);

    return (
        <div style={{ overflow: 'hidden', width: '100%' }}>
            <motion.div
                animate={{ x: direction > 0 ? '-50%' : '0%' }}
                transition={{ repeat: Infinity, repeatType: 'loop', duration: 40 / speed, ease: 'linear' }}
                className={className}
                style={{ display: 'flex', width: 'max-content', gap: 48 }}
            >
                {children}
                {children}
            </motion.div>
        </div>
    );
}

/**
 * A magnetic button that pulls toward the cursor.
 */
export function MagneticButton({ children, strength = 0.3, style = {}, ...props }) {
    const ref = useRef(null);
    const [pos, setPos] = useState({ x: 0, y: 0 });

    const handleMouse = (e) => {
        const rect = ref.current?.getBoundingClientRect();
        if (!rect) return;
        const cx = rect.left + rect.width / 2;
        const cy = rect.top + rect.height / 2;
        setPos({
            x: (e.clientX - cx) * strength,
            y: (e.clientY - cy) * strength,
        });
    };

    const reset = () => setPos({ x: 0, y: 0 });

    return (
        <motion.div
            ref={ref}
            onMouseMove={handleMouse}
            onMouseLeave={reset}
            animate={{ x: pos.x, y: pos.y }}
            transition={{ type: 'spring', stiffness: 200, damping: 15, mass: 0.5 }}
            style={{ display: 'inline-block', ...style }}
            {...props}
        >
            {children}
        </motion.div>
    );
}

/**
 * Floating 3D shapes that drift around a container.
 */
export function FloatingShapes({ count = 6 }) {
    const shapes = Array.from({ length: count }, (_, i) => ({
        id: i,
        size: 20 + Math.random() * 40,
        x: Math.random() * 100,
        y: Math.random() * 100,
        delay: Math.random() * 4,
        duration: 6 + Math.random() * 8,
        shape: ['circle', 'diamond', 'ring'][i % 3],
        color: ['#0071e3', '#5ac8fa', '#bf5af2', '#30d158', '#ff375f', '#ff9f0a'][i % 6],
    }));

    return (
        <div style={{ position: 'absolute', inset: 0, pointerEvents: 'none', overflow: 'hidden' }}>
            {shapes.map(({ id, size, x, y, delay, duration, shape, color }) => (
                <motion.div
                    key={id}
                    animate={{
                        y: [0, -30, 10, -20, 0],
                        x: [0, 15, -10, 20, 0],
                        rotateZ: [0, 45, -30, 60, 0],
                        scale: [1, 1.1, 0.9, 1.05, 1],
                    }}
                    transition={{ duration, repeat: Infinity, delay, ease: 'easeInOut' }}
                    style={{
                        position: 'absolute',
                        left: `${x}%`,
                        top: `${y}%`,
                        width: size,
                        height: size,
                        opacity: 0.15,
                        ...(shape === 'circle' ? {
                            borderRadius: '50%',
                            background: `linear-gradient(135deg, ${color}, ${color}44)`,
                            boxShadow: `0 0 30px ${color}20`,
                        } : shape === 'diamond' ? {
                            borderRadius: 4,
                            background: `linear-gradient(135deg, ${color}30, ${color}10)`,
                            border: `1px solid ${color}30`,
                            transform: 'rotate(45deg)',
                        } : {
                            borderRadius: '50%',
                            border: `2px solid ${color}40`,
                            background: 'transparent',
                        }),
                    }}
                />
            ))}
        </div>
    );
}

/**
 * Number counter with spring bounce physics.
 */
export function SpringCounter({ value, suffix = '', style = {} }) {
    const ref = useRef(null);
    const [inView, setInView] = useState(false);
    const [display, setDisplay] = useState(0);

    useEffect(() => {
        const observer = new IntersectionObserver(
            ([entry]) => { if (entry.isIntersecting) setInView(true); },
            { threshold: 0.3 }
        );
        if (ref.current) observer.observe(ref.current);
        return () => observer.disconnect();
    }, []);

    useEffect(() => {
        if (!inView) return;
        let frame;
        let start = 0;
        const step = value / 60; // ~1s at 60fps
        const tick = () => {
            start += step;
            if (start >= value) {
                setDisplay(value);
                return;
            }
            setDisplay(Math.floor(start));
            frame = requestAnimationFrame(tick);
        };
        frame = requestAnimationFrame(tick);
        return () => cancelAnimationFrame(frame);
    }, [inView, value]);

    return (
        <motion.span
            ref={ref}
            style={style}
            animate={inView ? { scale: [1, 1.15, 1] } : {}}
            transition={{ duration: 0.4, delay: 0.8 }}
        >
            {display}{suffix}
        </motion.span>
    );
}

/**
 * 3D tilt scene container — everything inside tilts with perspective.
 */
export function TiltScene({ children, maxTilt = 12, style = {} }) {
    const ref = useRef(null);
    const [tilt, setTilt] = useState({ x: 0, y: 0 });

    const handleMouse = (e) => {
        const rect = ref.current?.getBoundingClientRect();
        if (!rect) return;
        const px = (e.clientX - rect.left) / rect.width - 0.5;
        const py = (e.clientY - rect.top) / rect.height - 0.5;
        setTilt({ x: -py * maxTilt, y: px * maxTilt });
    };

    const reset = () => setTilt({ x: 0, y: 0 });

    return (
        <motion.div
            ref={ref}
            onMouseMove={handleMouse}
            onMouseLeave={reset}
            animate={{ rotateX: tilt.x, rotateY: tilt.y }}
            transition={{ type: 'spring', stiffness: 200, damping: 20 }}
            style={{
                perspective: 1200,
                transformStyle: 'preserve-3d',
                ...style,
            }}
        >
            {children}
        </motion.div>
    );
}
