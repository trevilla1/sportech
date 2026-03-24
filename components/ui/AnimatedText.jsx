'use client';
import { motion, useInView } from 'framer-motion';
import { useRef, useMemo } from 'react';

export default function AnimatedText({
    text,
    as: Tag = 'p',
    variant = 'fade-up',
    delay = 0,
    className = '',
    style = {},
}) {
    const ref = useRef(null);
    const isInView = useInView(ref, { once: true, margin: '-80px' });

    const MotionTag = motion.create(Tag);

    // Split text for stagger variants
    const chars = useMemo(() => text.split(''), [text]);
    const words = useMemo(() => text.split(' '), [text]);

    if (variant === 'char-reveal') {
        return (
            <Tag ref={ref} className={className} style={{ ...style, display: 'flex', flexWrap: 'wrap' }} aria-label={text}>
                {chars.map((char, i) => (
                    <motion.span
                        key={i}
                        initial={{ opacity: 0, y: 20 }}
                        animate={isInView ? { opacity: 1, y: 0 } : {}}
                        transition={{
                            delay: delay / 1000 + i * 0.03,
                            duration: 0.4,
                            ease: [0.16, 1, 0.3, 1],
                        }}
                        style={{ display: 'inline-block', whiteSpace: char === ' ' ? 'pre' : 'normal' }}
                        aria-hidden="true"
                    >
                        {char}
                    </motion.span>
                ))}
            </Tag>
        );
    }

    if (variant === 'word-reveal') {
        return (
            <Tag ref={ref} className={className} style={{ ...style, display: 'flex', flexWrap: 'wrap', gap: '0 0.3em' }} aria-label={text}>
                {words.map((word, i) => (
                    <motion.span
                        key={i}
                        initial={{ opacity: 0, y: 16 }}
                        animate={isInView ? { opacity: 1, y: 0 } : {}}
                        transition={{
                            delay: delay / 1000 + i * 0.06,
                            duration: 0.5,
                            ease: [0.16, 1, 0.3, 1],
                        }}
                        style={{ display: 'inline-block' }}
                        aria-hidden="true"
                    >
                        {word}
                    </motion.span>
                ))}
            </Tag>
        );
    }

    if (variant === 'gradient-shift') {
        return (
            <MotionTag
                ref={ref}
                className={`rainbow-text ${className}`}
                style={style}
                initial={{ opacity: 0, y: 30 }}
                animate={isInView ? { opacity: 1, y: 0 } : {}}
                transition={{ delay: delay / 1000, duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
            >
                {text}
            </MotionTag>
        );
    }

    // Default: fade-up
    return (
        <MotionTag
            ref={ref}
            className={className}
            style={style}
            initial={{ opacity: 0, y: 30 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ delay: delay / 1000, duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
        >
            {text}
        </MotionTag>
    );
}
