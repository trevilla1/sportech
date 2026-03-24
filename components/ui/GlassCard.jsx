'use client';
import { useRef } from 'react';
import { motion, useMotionValue, useSpring, useTransform } from 'framer-motion';

export default function GlassCard({
    children,
    hover = true,
    glow = null,
    tilt = true,
    className = '',
    style = {},
    ...props
}) {
    const ref = useRef(null);
    const mouseX = useMotionValue(0);
    const mouseY = useMotionValue(0);

    const rotateX = useSpring(useTransform(mouseY, [-0.5, 0.5], [8, -8]), { damping: 20, stiffness: 150 });
    const rotateY = useSpring(useTransform(mouseX, [-0.5, 0.5], [-8, 8]), { damping: 20, stiffness: 150 });
    const highlightX = useSpring(useTransform(mouseX, [-0.5, 0.5], [0, 100]), { damping: 30, stiffness: 200 });
    const highlightY = useSpring(useTransform(mouseY, [-0.5, 0.5], [0, 100]), { damping: 30, stiffness: 200 });

    function handleMouseMove(e) {
        if (!tilt || !ref.current) return;
        const rect = ref.current.getBoundingClientRect();
        const x = (e.clientX - rect.left) / rect.width - 0.5;
        const y = (e.clientY - rect.top) / rect.height - 0.5;
        mouseX.set(x);
        mouseY.set(y);
    }

    function handleMouseLeave() {
        mouseX.set(0);
        mouseY.set(0);
    }

    const isTouch = typeof window !== 'undefined' && window.matchMedia?.('(pointer: coarse)').matches;
    const shouldTilt = tilt && !isTouch;

    return (
        <motion.div
            ref={ref}
            onMouseMove={shouldTilt ? handleMouseMove : undefined}
            onMouseLeave={shouldTilt ? handleMouseLeave : undefined}
            style={{
                background: 'var(--glass-bg)',
                backdropFilter: 'blur(24px) saturate(180%)',
                WebkitBackdropFilter: 'blur(24px) saturate(180%)',
                border: '1px solid var(--glass-border)',
                borderRadius: 20,
                padding: 32,
                boxShadow: 'var(--shadow-md)',
                position: 'relative',
                overflow: 'hidden',
                transformStyle: shouldTilt ? 'preserve-3d' : undefined,
                perspective: shouldTilt ? 1000 : undefined,
                rotateX: shouldTilt ? rotateX : 0,
                rotateY: shouldTilt ? rotateY : 0,
                willChange: 'transform',
                transition: 'border-color 0.3s, box-shadow 0.3s',
                ...style,
            }}
            whileHover={hover ? {
                borderColor: 'rgba(0,113,227,0.3)',
                boxShadow: glow
                    ? `0 0 40px ${glow}40, var(--shadow-lg)`
                    : 'var(--shadow-lg)',
            } : undefined}
            className={className}
            {...props}
        >
            {/* Specular highlight */}
            {shouldTilt && (
                <motion.div
                    style={{
                        position: 'absolute',
                        width: 200,
                        height: 200,
                        borderRadius: '50%',
                        background: 'radial-gradient(circle, rgba(255,255,255,0.08) 0%, transparent 70%)',
                        pointerEvents: 'none',
                        left: highlightX,
                        top: highlightY,
                        transform: 'translate(-50%, -50%)',
                        filter: 'blur(30px)',
                        zIndex: 1,
                    }}
                />
            )}

            {/* Glow effect */}
            {glow && (
                <motion.div
                    initial={{ scale: 1 }}
                    whileHover={{ scale: 1.3 }}
                    style={{
                        position: 'absolute',
                        top: -40,
                        left: '50%',
                        transform: 'translateX(-50%)',
                        width: 200,
                        height: 200,
                        borderRadius: '50%',
                        background: `radial-gradient(circle, ${glow}30 0%, transparent 70%)`,
                        filter: 'blur(40px)',
                        pointerEvents: 'none',
                        zIndex: 0,
                    }}
                />
            )}

            <div style={{ position: 'relative', zIndex: 2 }}>
                {children}
            </div>
        </motion.div>
    );
}
