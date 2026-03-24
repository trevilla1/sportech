'use client';
import { motion } from 'framer-motion';
import GradientOrb from './GradientOrb';

export default function PageHero({ label, title, titleAccent, subtitle }) {
    return (
        <section style={{
            paddingTop: 140, paddingBottom: 80,
            position: 'relative', overflow: 'hidden',
            background: '#000', minHeight: 340,
        }}>
            <GradientOrb color="#0071e3" size={600} x="25%" y="40%" opacity={0.15} blur={120} animation="orb-drift" duration="18s" />
            <GradientOrb color="#bf5af2" size={400} x="75%" y="30%" opacity={0.1} blur={100} animation="orb-drift-2" duration="22s" />
            <div style={{
                position: 'absolute', inset: 0,
                backgroundImage: 'linear-gradient(rgba(255,255,255,0.02) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.02) 1px, transparent 1px)',
                backgroundSize: '80px 80px', pointerEvents: 'none',
            }} />

            <div className="container" style={{ position: 'relative', zIndex: 2, textAlign: 'center' }}>
                <motion.div initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}>
                    <span className="section-label" style={{ color: 'var(--accent-teal)', marginBottom: 20 }}>{label}</span>
                </motion.div>
                <motion.h1
                    initial={{ opacity: 0, y: 40 }} animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.1, duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
                    style={{
                        fontFamily: 'var(--font-display)', fontSize: 'clamp(2.4rem, 5vw, 4rem)',
                        fontWeight: 700, lineHeight: 1.08, letterSpacing: '-0.04em',
                        color: '#f5f5f7', marginBottom: 16,
                    }}
                >
                    {title} {titleAccent && <span className="rainbow-text">{titleAccent}</span>}
                </motion.h1>
                {subtitle && (
                    <motion.p initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.3, duration: 0.6 }}
                        style={{ color: 'rgba(255,255,255,0.5)', fontSize: 'var(--text-lg)', maxWidth: 560, margin: '0 auto', lineHeight: 'var(--leading-relaxed)' }}>
                        {subtitle}
                    </motion.p>
                )}
            </div>

            <div style={{ position: 'absolute', bottom: 0, left: 0, right: 0, height: 120, background: 'linear-gradient(to bottom, transparent, var(--bg-primary))', pointerEvents: 'none' }} />
        </section>
    );
}
