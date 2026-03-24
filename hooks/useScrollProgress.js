'use client';
import { useScroll, useTransform } from 'framer-motion';

export function useScrollProgress(ref) {
    const { scrollYProgress } = useScroll(
        ref ? { target: ref, offset: ['start start', 'end end'] } : undefined
    );
    return scrollYProgress;
}
