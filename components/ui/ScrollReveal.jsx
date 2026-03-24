'use client';
import { motion } from 'framer-motion';

const variants = {
    'fade-up': { hidden: { opacity: 0, y: 60 }, visible: { opacity: 1, y: 0 } },
    'fade-in': { hidden: { opacity: 0 }, visible: { opacity: 1 } },
    'scale': { hidden: { opacity: 0, scale: 0.92 }, visible: { opacity: 1, scale: 1 } },
    'slide-left': { hidden: { opacity: 0, x: -60 }, visible: { opacity: 1, x: 0 } },
    'slide-right': { hidden: { opacity: 0, x: 60 }, visible: { opacity: 1, x: 0 } },
};

export default function ScrollReveal({
    children,
    variant = 'fade-up',
    delay = 0,
    duration = 600,
    once = true,
    className = '',
    style = {},
    staggerChildren = 0,
}) {
    const v = variants[variant] || variants['fade-up'];

    return (
        <motion.div
            className={className}
            style={style}
            initial="hidden"
            whileInView="visible"
            viewport={{ once, margin: '-100px' }}
            variants={{
                hidden: v.hidden,
                visible: {
                    ...v.visible,
                    transition: {
                        delay: delay / 1000,
                        duration: duration / 1000,
                        ease: [0.16, 1, 0.3, 1],
                        staggerChildren: staggerChildren / 1000,
                    },
                },
            }}
        >
            {children}
        </motion.div>
    );
}

export function ScrollRevealItem({ children, className = '', style = {} }) {
    return (
        <motion.div
            className={className}
            style={style}
            variants={{
                hidden: { opacity: 0, y: 40, scale: 0.96 },
                visible: {
                    opacity: 1, y: 0, scale: 1,
                    transition: { duration: 0.6, ease: [0.16, 1, 0.3, 1] },
                },
            }}
        >
            {children}
        </motion.div>
    );
}
