'use client';
import { useState, useEffect } from 'react';

export default function ParticleField({
    count = 40,
    colors = ['#0071e3', '#5ac8fa', '#bf5af2', '#30d158', '#ff375f'],
    className = '',
}) {
    const [particles, setParticles] = useState([]);

    useEffect(() => {
        setParticles(
            Array.from({ length: count }, (_, i) => ({
                id: i,
                size: Math.random() * 4 + 2,
                color: colors[Math.floor(Math.random() * colors.length)],
                opacity: Math.random() * 0.3 + 0.3,
                left: Math.random() * 100,
                top: Math.random() * 100,
                duration: Math.random() * 15 + 10,
                delay: Math.random() * 8,
                driftX: (Math.random() - 0.5) * 80,
                driftY: (Math.random() - 0.5) * 80,
            }))
        );
    }, [count, colors.length]);

    return (
        <div
            className={className}
            style={{ position: 'absolute', inset: 0, overflow: 'hidden', pointerEvents: 'none' }}
            aria-hidden="true"
        >
            {particles.map(p => (
                <div
                    key={p.id}
                    style={{
                        position: 'absolute',
                        width: p.size,
                        height: p.size,
                        borderRadius: '50%',
                        background: p.color,
                        opacity: p.opacity,
                        left: `${p.left}%`,
                        top: `${p.top}%`,
                        animation: `particle-float ${p.duration}s ${p.delay}s linear infinite`,
                        willChange: 'transform',
                    }}
                />
            ))}
        </div>
    );
}
