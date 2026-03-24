'use client';
import { motion } from 'framer-motion';

export default function GradientOrb({
    color = '#0071e3',
    size = 500,
    x = '50%',
    y = '50%',
    opacity = 0.3,
    blur = 80,
    animation = 'orb-drift',
    duration = '18s',
    style = {},
}) {
    return (
        <div
            style={{
                position: 'absolute',
                left: x,
                top: y,
                width: size,
                height: size,
                transform: 'translate(-50%, -50%)',
                borderRadius: '50%',
                background: `radial-gradient(circle, ${color} 0%, transparent 70%)`,
                opacity,
                filter: `blur(${blur}px)`,
                mixBlendMode: 'screen',
                pointerEvents: 'none',
                animation: `${animation} ${duration} ease-in-out infinite`,
                willChange: 'transform',
                ...style,
            }}
            aria-hidden="true"
        />
    );
}
