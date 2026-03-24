'use client';
import { motion, useScroll, useTransform, useInView } from 'framer-motion';
import { useRef, useEffect, useState } from 'react';
import Link from 'next/link';
import {
    Trophy, Users, Award, Star, ArrowRight, Zap, Target, Heart,
    ChevronRight, BookOpen, Calendar, Activity, Circle, Waves,
    CircleDot, Dumbbell, Footprints, Wind, Volleyball, Music, Shield,
} from 'lucide-react';
import GlassCard from '@/components/ui/GlassCard';
import GradientOrb from '@/components/ui/GradientOrb';
import ParticleField from '@/components/ui/ParticleField';
import ScrollReveal, { ScrollRevealItem } from '@/components/ui/ScrollReveal';
import ScrollBall from '@/components/ui/ScrollBall';
import { VelocityText, MagneticButton, FloatingShapes, SpringCounter, TiltScene } from '@/components/ui/Dynamics';

/* ─── SPORT ICONS ─────────────────────────────────────────── */
const sportIcons = {
    Soccer: { icon: Circle, color: '#0071e3' },
    Netball: { icon: CircleDot, color: '#bf5af2' },
    Volleyball: { icon: Volleyball, color: '#ff9f0a' },
    Swimming: { icon: Waves, color: '#5ac8fa' },
    Tennis: { icon: CircleDot, color: '#30d158' },
    Gymnastics: { icon: Activity, color: '#ff375f' },
    Futsal: { icon: Circle, color: '#0071e3' },
    Athletics: { icon: Footprints, color: '#ff9f0a' },
    Basketball: { icon: CircleDot, color: '#bf5af2' },
    'Rugby 7s': { icon: Shield, color: '#30d158' },
    Dancing: { icon: Music, color: '#ff375f' },
};
const sports = ['Soccer', 'Netball', 'Volleyball', 'Swimming', 'Tennis', 'Gymnastics', 'Futsal', 'Athletics', 'Basketball', 'Rugby 7s', 'Dancing'];

const stats = [
    { value: 500, suffix: '+', label: 'Active Athletes', icon: Users },
    { value: 11, suffix: '', label: 'Sports Offered', icon: Trophy },
    { value: 15, suffix: '+', label: 'Expert Coaches', icon: Award },
    { value: 3, suffix: '', label: 'Age Programs', icon: Star },
];

const features = [
    { icon: Target, title: 'Excellence', desc: 'We pursue the highest standard in everything we do — on and off the field.', color: '#0071e3' },
    { icon: Heart, title: 'Passion', desc: 'Sport is our language. We live it, breathe it, and share it with every athlete.', color: '#ff375f' },
    { icon: Users, title: 'Community', desc: 'We build more than athletes — we build families, friendships, and futures.', color: '#30d158' },
    { icon: Zap, title: 'Innovation', desc: 'Modern coaching methods, cutting-edge drills, and continuous improvement.', color: '#bf5af2' },
    { icon: BookOpen, title: 'Education', desc: 'We believe sport teaches life skills — discipline, teamwork, and resilience.', color: '#ff9f0a' },
    { icon: Calendar, title: 'Flexibility', desc: 'Programs designed around your schedule. Weekend, school, holiday, or intensive camps.', color: '#5ac8fa' },
];

const howItWorks = [
    { step: '01', title: 'Choose Your Sport', desc: 'Browse our 11 world-class sports disciplines and find the one that ignites your passion.' },
    { step: '02', title: 'Pick Your Program', desc: 'From weekend sessions to intensive training camps, select the program that fits your lifestyle.' },
    { step: '03', title: 'Train With Experts', desc: 'Our 15+ certified coaches bring elite-level expertise to every session, every day.' },
    { step: '04', title: 'Grow & Compete', desc: 'Progress through our 3-tier system, compete in events, and become the champion you were meant to be.' },
];

const testimonials = [
    { quote: 'Sportech has completely transformed how my children approach sports. The coaching quality is world-class.', author: 'Sarah M.', role: 'Parent of 2 athletes' },
    { quote: 'I started as a complete beginner in swimming and within a year I was competing. The coaches here truly care.', author: 'Daniel K.', role: 'Tier 2 Athlete' },
    { quote: 'The facilities, the environment, the community — everything about Sportech exceeds expectations.', author: 'Grace N.', role: 'Parent & Community Member' },
    { quote: 'My daughter has grown in confidence, discipline, and skill since joining the gymnastics program.', author: 'James O.', role: 'Parent' },
    { quote: 'The training camps are incredible. Intense, professional, and so much fun.', author: 'Aisha R.', role: 'Tier 3 Athlete' },
];

/* ─── Scroll Indicator ──────────────────────────────────────── */
function ScrollIndicator() {
    const { scrollY } = useScroll();
    const opacity = useTransform(scrollY, [0, 200], [1, 0]);
    return (
        <motion.div style={{ position: 'absolute', bottom: 40, left: '50%', transform: 'translateX(-50%)', display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 8, opacity, zIndex: 5 }}>
            <div style={{ width: 22, height: 34, borderRadius: 11, border: '1.5px solid rgba(255,255,255,0.35)', position: 'relative', display: 'flex', justifyContent: 'center' }}>
                <motion.div animate={{ y: [0, 8, 0] }} transition={{ duration: 1.5, repeat: Infinity, ease: 'easeInOut' }} style={{ width: 3, height: 6, borderRadius: 2, background: 'rgba(255,255,255,0.6)', marginTop: 6 }} />
            </div>
            <span style={{ fontSize: 11, fontWeight: 400, color: 'rgba(255,255,255,0.35)', letterSpacing: '0.1em', textTransform: 'uppercase' }}>Scroll</span>
        </motion.div>
    );
}

/* ─── Sport Icon Component ──────────────────────────────────── */
function SportIcon({ name, size = 24 }) {
    const s = sportIcons[name] || { icon: Activity, color: '#0071e3' };
    const Icon = s.icon;
    return (
        <div style={{
            width: size * 2.2, height: size * 2.2, borderRadius: size * 0.5,
            background: `linear-gradient(135deg, ${s.color}20, ${s.color}08)`,
            border: `1px solid ${s.color}30`,
            display: 'flex', alignItems: 'center', justifyContent: 'center',
        }}>
            <Icon size={size} color={s.color} strokeWidth={1.8} />
        </div>
    );
}

/* ═══════════════════════════════════════════════════════════════
   HOMEPAGE
   ═══════════════════════════════════════════════════════════════ */
export default function HomePage() {
    const heroRef = useRef(null);
    const { scrollYProgress } = useScroll({ target: heroRef, offset: ['start start', 'end start'] });
    const heroY = useTransform(scrollYProgress, [0, 1], ['0%', '30%']);
    const heroOpacity = useTransform(scrollYProgress, [0, 0.7], [1, 0]);
    const heroScale = useTransform(scrollYProgress, [0, 1], [1, 0.9]);

    const howItWorksRef = useRef(null);
    const { scrollYProgress: hiwProgress } = useScroll({ target: howItWorksRef, offset: ['start start', 'end end'] });
    const hiwX = useTransform(hiwProgress, [0, 1], ['0%', '-75%']);

    return (
        <>
            {/* ═══ 3D ROLLING BALL ═══ */}
            <ScrollBall size={80} color="#0071e3" />

            {/* ═══ HERO ═══ */}
            <section ref={heroRef} style={{ height: '100svh', minHeight: 600, position: 'relative', overflow: 'hidden', background: '#000' }}>
                {/* 3D floating shapes in the background */}
                <FloatingShapes count={8} />

                <div style={{ position: 'absolute', inset: 0 }}>
                    <GradientOrb color="#0071e3" size={900} x="15%" y="25%" opacity={0.25} blur={140} animation="orb-drift" duration="18s" />
                    <GradientOrb color="#bf5af2" size={600} x="75%" y="20%" opacity={0.18} blur={100} animation="orb-drift-2" duration="22s" />
                    <GradientOrb color="#5ac8fa" size={500} x="80%" y="70%" opacity={0.15} blur={100} animation="orb-drift-3" duration="16s" />
                    <GradientOrb color="#ff375f" size={300} x="50%" y="80%" opacity={0.08} blur={80} animation="orb-drift" duration="25s" />
                    {/* Grid overlay */}
                    <div style={{ position: 'absolute', inset: 0, backgroundImage: 'linear-gradient(rgba(255,255,255,0.015) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.015) 1px, transparent 1px)', backgroundSize: '60px 60px', pointerEvents: 'none' }} />
                </div>

                <motion.div style={{ y: heroY, opacity: heroOpacity, scale: heroScale }} className="container">
                    <TiltScene maxTilt={5} style={{ position: 'relative', zIndex: 2, display: 'flex', flexDirection: 'column', alignItems: 'flex-start', justifyContent: 'center', height: '100svh', maxWidth: 740, paddingTop: 52 }}>
                        <motion.div initial={{ opacity: 0, y: 30, filter: 'blur(10px)' }} animate={{ opacity: 1, y: 0, filter: 'blur(0px)' }} transition={{ delay: 0, duration: 1, ease: [0.16, 1, 0.3, 1] }}>
                            <span style={{ display: 'inline-flex', alignItems: 'center', gap: 8, padding: '6px 16px', borderRadius: 980, background: 'rgba(0,113,227,0.12)', border: '1px solid rgba(0,113,227,0.2)', color: '#5ac8fa', fontSize: 13, fontWeight: 600, letterSpacing: '0.02em', marginBottom: 28 }}>
                                <span style={{ width: 6, height: 6, borderRadius: '50%', background: '#30d158', animation: 'pulse 2s infinite' }} />
                                Now Enrolling — All 11 Sports
                            </span>
                        </motion.div>

                        <motion.h1 initial={{ opacity: 0, y: 50, filter: 'blur(12px)' }} animate={{ opacity: 1, y: 0, filter: 'blur(0px)' }} transition={{ delay: 0.1, duration: 1, ease: [0.16, 1, 0.3, 1] }}
                            style={{ fontFamily: 'var(--font-display)', fontSize: 'clamp(3.2rem, 8vw, 5.5rem)', fontWeight: 700, lineHeight: 1.02, letterSpacing: '-0.05em', color: '#f5f5f7', marginBottom: 0 }}>
                            Where athletes
                        </motion.h1>
                        <motion.h1 initial={{ opacity: 0, y: 50, filter: 'blur(12px)' }} animate={{ opacity: 1, y: 0, filter: 'blur(0px)' }} transition={{ delay: 0.2, duration: 1, ease: [0.16, 1, 0.3, 1] }}
                            style={{ fontFamily: 'var(--font-display)', fontSize: 'clamp(3.2rem, 8vw, 5.5rem)', fontWeight: 700, lineHeight: 1.02, letterSpacing: '-0.05em', marginBottom: 0 }}>
                            <span style={{
                                background: 'linear-gradient(90deg, #0071e3, #5ac8fa, #bf5af2, #ff375f, #ff9f0a, #30d158)',
                                backgroundSize: '200% 100%',
                                animation: 'rainbow-shift 4s linear infinite',
                                WebkitBackgroundClip: 'text',
                                WebkitTextFillColor: 'transparent',
                                backgroundClip: 'text',
                            }}>become legends.</span>
                        </motion.h1>

                        <motion.p initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.5, duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
                            style={{ fontSize: 'clamp(1rem, 2vw, 1.15rem)', color: 'rgba(255,255,255,0.45)', maxWidth: 500, lineHeight: 1.7, fontWeight: 400, marginBottom: 40, marginTop: 24 }}>
                            World-class training across 11 sports. Expert coaching, flexible programs, and a community dedicated to building the next generation of champions.
                        </motion.p>

                        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.7, duration: 0.6 }} style={{ display: 'flex', gap: 16, flexWrap: 'wrap' }}>
                            <MagneticButton strength={0.15}>
                                <Link href="/join">
                                    <motion.div whileTap={{ scale: 0.96 }} className="btn btn-primary btn-lg">
                                        <Zap size={16} /> Start Training
                                    </motion.div>
                                </Link>
                            </MagneticButton>
                            <MagneticButton strength={0.15}>
                                <Link href="/sports">
                                    <motion.div whileTap={{ scale: 0.96 }} className="btn btn-ghost btn-lg" style={{ color: 'rgba(255,255,255,0.7)', borderColor: 'rgba(255,255,255,0.12)' }}>
                                        Explore Sports <ArrowRight size={15} />
                                    </motion.div>
                                </Link>
                            </MagneticButton>
                        </motion.div>
                    </TiltScene>
                </motion.div>

                {/* Scroll-driven hero badge: the 3 sport icons floating */}
                <motion.div style={{ position: 'absolute', right: '8%', top: '50%', transform: 'translateY(-50%)', zIndex: 2, opacity: heroOpacity }}
                    initial={{ opacity: 0, scale: 0.8 }} animate={{ opacity: 1, scale: 1 }} transition={{ delay: 1, duration: 0.8 }}>
                    <TiltScene maxTilt={8}>
                        <div style={{ position: 'relative', width: 260, height: 260 }}>
                            {[
                                { name: 'Soccer', x: 0, y: 0, s: 70, delay: 0 },
                                { name: 'Swimming', x: 140, y: -30, s: 55, delay: 0.8 },
                                { name: 'Basketball', x: 80, y: 120, s: 60, delay: 1.6 },
                                { name: 'Athletics', x: -20, y: 160, s: 50, delay: 2.0 },
                                { name: 'Tennis', x: 180, y: 100, s: 45, delay: 2.4 },
                            ].map(({ name, x, y, s, delay }) => (
                                <motion.div key={name}
                                    initial={{ opacity: 0, scale: 0 }}
                                    animate={{ opacity: 1, scale: 1 }}
                                    transition={{ delay: 1.2 + delay * 0.3, duration: 0.6, type: 'spring', stiffness: 200 }}
                                    style={{ position: 'absolute', left: x, top: y }}>
                                    <motion.div animate={{ y: [0, -8, 0] }} transition={{ duration: 3 + delay, repeat: Infinity, ease: 'easeInOut' }}>
                                        <SportIcon name={name} size={s * 0.4} />
                                    </motion.div>
                                </motion.div>
                            ))}
                            {/* Connecting lines */}
                            <svg style={{ position: 'absolute', inset: -20, width: 300, height: 300, pointerEvents: 'none' }}>
                                <motion.line x1="35" y1="35" x2="167" y2="5" stroke="rgba(0,113,227,0.15)" strokeWidth="1" strokeDasharray="4 4"
                                    initial={{ pathLength: 0 }} animate={{ pathLength: 1 }} transition={{ delay: 2, duration: 1 }} />
                                <motion.line x1="35" y1="35" x2="110" y2="150" stroke="rgba(191,90,242,0.15)" strokeWidth="1" strokeDasharray="4 4"
                                    initial={{ pathLength: 0 }} animate={{ pathLength: 1 }} transition={{ delay: 2.2, duration: 1 }} />
                                <motion.line x1="167" y1="5" x2="210" y2="130" stroke="rgba(90,200,250,0.15)" strokeWidth="1" strokeDasharray="4 4"
                                    initial={{ pathLength: 0 }} animate={{ pathLength: 1 }} transition={{ delay: 2.4, duration: 1 }} />
                            </svg>
                        </div>
                    </TiltScene>
                </motion.div>

                <ScrollIndicator />
                <div style={{ position: 'absolute', bottom: 0, left: 0, right: 0, height: 200, background: 'linear-gradient(to bottom, transparent, #000)', pointerEvents: 'none' }} />
            </section>

            {/* ═══ VELOCITY SPORTS TICKER ═══ */}
            <section style={{ padding: '40px 0', background: '#000', overflow: 'hidden', borderTop: '1px solid rgba(255,255,255,0.04)', borderBottom: '1px solid rgba(255,255,255,0.04)' }}>
                <VelocityText baseSpeed={3}>
                    {sports.map((name) => {
                        const si = sportIcons[name] || { icon: Activity, color: '#0071e3' };
                        const Icon = si.icon;
                        return (
                            <div key={name} style={{ display: 'flex', alignItems: 'center', gap: 10, padding: '8px 24px', borderRadius: 980, border: '1px solid rgba(255,255,255,0.06)', background: 'rgba(255,255,255,0.02)', whiteSpace: 'nowrap' }}>
                                <Icon size={16} color={si.color} strokeWidth={1.5} />
                                <span style={{ fontSize: 14, fontWeight: 500, color: 'rgba(255,255,255,0.5)', letterSpacing: '-0.01em' }}>{name}</span>
                            </div>
                        );
                    })}
                </VelocityText>
            </section>

            {/* ═══ STATS ═══ */}
            <section style={{ padding: '80px 0', background: 'var(--bg-primary)' }}>
                <div className="container">
                    <ScrollReveal variant="fade-up">
                        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4,1fr)', background: 'var(--glass-bg)', backdropFilter: 'blur(24px) saturate(180%)', WebkitBackdropFilter: 'blur(24px) saturate(180%)', border: '1px solid var(--glass-border)', borderRadius: 20, overflow: 'hidden', boxShadow: 'var(--shadow-lg)' }}>
                            {stats.map(({ value, suffix, label, icon: Icon }, i) => (
                                <motion.div key={label}
                                    whileHover={{ background: 'var(--bg-card-hover)', scale: 1.02 }}
                                    transition={{ type: 'spring', stiffness: 300, damping: 20 }}
                                    style={{ padding: '40px 24px', textAlign: 'center', borderRight: i < 3 ? '1px solid var(--border-subtle)' : 'none', cursor: 'default' }}>
                                    <motion.div
                                        whileHover={{ rotate: [0, -10, 10, 0], transition: { duration: 0.5 } }}
                                        style={{ width: 48, height: 48, borderRadius: 14, background: 'rgba(0,113,227,0.08)', border: '1px solid var(--border-subtle)', display: 'flex', alignItems: 'center', justifyContent: 'center', margin: '0 auto 16px' }}>
                                        <Icon size={22} color="var(--accent-blue)" />
                                    </motion.div>
                                    <div style={{ fontFamily: 'var(--font-display)', fontWeight: 700, fontSize: 'clamp(2rem, 4vw, 3rem)', lineHeight: 1, color: 'var(--text-primary)' }}>
                                        <SpringCounter value={value} suffix={suffix} />
                                    </div>
                                    <div style={{ color: 'var(--text-tertiary)', fontWeight: 500, marginTop: 8, fontSize: 'var(--text-sm)' }}>{label}</div>
                                </motion.div>
                            ))}
                        </div>
                    </ScrollReveal>
                </div>
            </section>

            {/* ═══ SPORTS GRID ═══ */}
            <section style={{ padding: '60px 0 80px', background: 'var(--bg-primary)' }}>
                <div className="container">
                    <ScrollReveal>
                        <div className="section-header">
                            <span className="section-label">What We Offer</span>
                            <h2 className="section-title">11 World-Class <span className="gradient-text">Sports</span></h2>
                            <p className="section-subtitle">Expert coaching across every discipline, for every level.</p>
                        </div>
                    </ScrollReveal>
                    <ScrollReveal variant="fade-up" staggerChildren={60}>
                        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4,1fr)', gap: 12 }}>
                            {sports.map((name) => (
                                <ScrollRevealItem key={name}>
                                    <Link href="/sports">
                                        <motion.div
                                            whileHover={{ y: -6, borderColor: `${(sportIcons[name]?.color || '#0071e3')}40`, boxShadow: `0 20px 60px ${(sportIcons[name]?.color || '#0071e3')}15` }}
                                            whileTap={{ scale: 0.97 }}
                                            style={{ padding: '28px 16px', textAlign: 'center', background: 'var(--bg-card)', border: '1px solid var(--border-subtle)', borderRadius: 16, cursor: 'pointer', transition: 'all 0.3s', display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 10 }}>
                                            <SportIcon name={name} size={22} />
                                            <div style={{ fontWeight: 500, fontSize: 'var(--text-sm)', color: 'var(--text-primary)' }}>{name}</div>
                                        </motion.div>
                                    </Link>
                                </ScrollRevealItem>
                            ))}
                            <ScrollRevealItem>
                                <Link href="/sports">
                                    <motion.div whileHover={{ y: -6, scale: 1.03 }} whileTap={{ scale: 0.97 }}
                                        style={{ padding: '28px 16px', textAlign: 'center', background: 'var(--accent-blue)', borderRadius: 16, cursor: 'pointer', boxShadow: '0 0 40px rgba(0,113,227,0.25)', display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 10, justifyContent: 'center', height: '100%' }}>
                                        <ArrowRight size={22} color="#fff" />
                                        <div style={{ fontWeight: 600, fontSize: 'var(--text-sm)', color: '#fff' }}>View All</div>
                                    </motion.div>
                                </Link>
                            </ScrollRevealItem>
                        </div>
                    </ScrollReveal>
                </div>
            </section>

            <div style={{ height: 120, background: 'linear-gradient(to bottom, var(--bg-primary), var(--bg-secondary))' }} />

            {/* ═══ FEATURES — 3D TILT CARDS ═══ */}
            <section style={{ padding: '80px 0 140px', background: 'var(--bg-secondary)', position: 'relative' }}>
                <FloatingShapes count={4} />
                <div className="container" style={{ position: 'relative', zIndex: 2 }}>
                    <ScrollReveal>
                        <div className="section-header">
                            <span className="section-label">Our Values</span>
                            <h2 className="section-title">What Makes Us <span className="gradient-text">Different</span></h2>
                            <p className="section-subtitle">Six pillars that define the Sportech experience.</p>
                        </div>
                    </ScrollReveal>
                    <ScrollReveal variant="fade-up" staggerChildren={100}>
                        <div className="grid-3">
                            {features.map(({ icon: Icon, title, desc, color }) => (
                                <ScrollRevealItem key={title}>
                                    <GlassCard glow={color} style={{ padding: 32, height: '100%' }}>
                                        <motion.div
                                            whileHover={{ rotate: [0, -15, 15, -5, 0], transition: { duration: 0.6 } }}
                                            style={{ width: 56, height: 56, borderRadius: 16, background: `linear-gradient(135deg, ${color}22, ${color}08)`, border: `1px solid ${color}25`, display: 'flex', alignItems: 'center', justifyContent: 'center', marginBottom: 20 }}>
                                            <Icon size={26} color={color} strokeWidth={1.5} />
                                        </motion.div>
                                        <h3 style={{ fontFamily: 'var(--font-display)', fontWeight: 700, fontSize: 'var(--text-xl)', marginBottom: 10, letterSpacing: '-0.02em', color: 'var(--text-primary)' }}>{title}</h3>
                                        <p style={{ color: 'var(--text-secondary)', fontSize: 'var(--text-sm)', lineHeight: 'var(--leading-relaxed)' }}>{desc}</p>
                                    </GlassCard>
                                </ScrollRevealItem>
                            ))}
                        </div>
                    </ScrollReveal>
                </div>
            </section>

            <div style={{ height: 120, background: 'linear-gradient(to bottom, var(--bg-secondary), var(--bg-primary))' }} />

            {/* ═══ HOW IT WORKS — HORIZONTAL SCROLL ═══ */}
            <section ref={howItWorksRef} style={{ height: `${howItWorks.length * 100}vh`, position: 'relative', background: 'var(--bg-primary)' }}>
                <div style={{ position: 'sticky', top: 0, height: '100vh', overflow: 'hidden', display: 'flex', flexDirection: 'column', justifyContent: 'center' }}>
                    <div className="container">
                        <ScrollReveal>
                            <div className="section-header" style={{ marginBottom: 48 }}>
                                <span className="section-label">The Journey</span>
                                <h2 className="section-title">How It <span className="gradient-text">Works</span></h2>
                            </div>
                        </ScrollReveal>
                        <motion.div style={{ display: 'flex', gap: 32, x: hiwX, width: 'max-content' }}>
                            {howItWorks.map(({ step, title, desc }) => (
                                <div key={step} style={{ width: 'min(360px, 80vw)', flexShrink: 0, position: 'relative' }}>
                                    <GlassCard style={{ padding: 40, height: '100%' }}>
                                        <div style={{ fontFamily: 'var(--font-display)', fontWeight: 800, fontSize: 80, color: 'var(--accent-blue)', opacity: 0.06, position: 'absolute', top: 10, right: 16, lineHeight: 1 }}>{step}</div>
                                        <div style={{ width: 44, height: 44, borderRadius: 12, background: 'var(--accent-blue)', display: 'flex', alignItems: 'center', justifyContent: 'center', marginBottom: 20, color: '#fff', fontFamily: 'var(--font-display)', fontWeight: 700, fontSize: 14, boxShadow: '0 0 30px rgba(0,113,227,0.3)' }}>{step}</div>
                                        <h3 style={{ fontFamily: 'var(--font-display)', fontWeight: 700, fontSize: 'var(--text-2xl)', letterSpacing: '-0.02em', marginBottom: 12, color: 'var(--text-primary)' }}>{title}</h3>
                                        <p style={{ color: 'var(--text-secondary)', fontSize: 'var(--text-base)', lineHeight: 'var(--leading-relaxed)' }}>{desc}</p>
                                    </GlassCard>
                                </div>
                            ))}
                        </motion.div>
                    </div>
                </div>
            </section>

            <div style={{ height: 120, background: 'linear-gradient(to bottom, var(--bg-primary), var(--bg-secondary))' }} />

            {/* ═══ PROGRAMS — VELOCITY TEXT + SPLIT ═══ */}
            <section style={{ padding: '80px 0', background: 'var(--bg-secondary)', overflow: 'hidden' }}>
                <ScrollReveal>
                    <div className="section-header">
                        <span className="section-label">Our Programs</span>
                        <h2 className="section-title">Programs For <span className="gradient-text">Every Lifestyle</span></h2>
                    </div>
                </ScrollReveal>

                {/* Velocity-driven scrolling sports strip */}
                <div style={{ margin: '20px 0 60px' }}>
                    <VelocityText baseSpeed={2}>
                        {sports.map((name) => {
                            const si = sportIcons[name] || { icon: Activity, color: '#0071e3' };
                            const Icon = si.icon;
                            return (
                                <div key={name} style={{ display: 'flex', alignItems: 'center', gap: 8, padding: '10px 20px', borderRadius: 'var(--radius-full)', border: '1px solid var(--border-subtle)', background: 'var(--bg-card)', whiteSpace: 'nowrap' }}>
                                    <Icon size={14} color={si.color} /> <span style={{ fontSize: 13, fontWeight: 500, color: 'var(--text-secondary)' }}>{name}</span>
                                </div>
                            );
                        })}
                    </VelocityText>
                </div>

                <div className="container">
                    <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 64, alignItems: 'center' }}>
                        <ScrollReveal variant="slide-left">
                            <span className="section-label">5 Program Types</span>
                            <h3 style={{ fontFamily: 'var(--font-display)', fontWeight: 700, fontSize: 'var(--text-3xl)', letterSpacing: '-0.03em', marginTop: 12, marginBottom: 28, color: 'var(--text-primary)' }}>
                                Designed around <span className="gradient-text">your schedule</span>
                            </h3>
                            {['Weekend Programs', 'In School Programs', 'Holiday Programs', 'Training Camps', 'Sports Trips'].map((prog, i) => (
                                <motion.div key={prog} initial={{ opacity: 0, x: -30 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }}
                                    transition={{ delay: i * 0.1, duration: 0.6, ease: [0.16, 1, 0.3, 1] }}>
                                    <motion.div
                                        whileHover={{ x: 8, background: 'var(--bg-card-hover)' }}
                                        style={{ display: 'flex', alignItems: 'center', gap: 12, padding: '16px 12px', borderBottom: '1px solid var(--border-subtle)', borderRadius: 8, cursor: 'default', transition: 'background 0.2s' }}>
                                        <div style={{ width: 8, height: 8, borderRadius: '50%', background: 'var(--accent-blue)', flexShrink: 0 }} />
                                        <span style={{ fontWeight: 500, color: 'var(--text-primary)', fontSize: 'var(--text-base)' }}>{prog}</span>
                                        <ChevronRight size={14} style={{ marginLeft: 'auto', color: 'var(--text-tertiary)' }} />
                                    </motion.div>
                                </motion.div>
                            ))}
                            <MagneticButton strength={0.1} style={{ marginTop: 32 }}>
                                <Link href="/programs"><motion.div whileHover={{ y: -2 }} className="btn btn-primary">View All Programs <ArrowRight size={14} /></motion.div></Link>
                            </MagneticButton>
                        </ScrollReveal>

                        <ScrollReveal variant="slide-right">
                            <TiltScene maxTilt={6}>
                                <GlassCard tilt={false} style={{ padding: 0, overflow: 'hidden', position: 'relative', background: 'linear-gradient(160deg, #0071e3, #5ac8fa)', border: 'none' }}>
                                    <ParticleField count={15} colors={['rgba(255,255,255,0.6)', 'rgba(255,255,255,0.3)']} />
                                    <div style={{ padding: 40, position: 'relative', zIndex: 1 }}>
                                        <Trophy size={48} color="rgba(255,255,255,0.9)" style={{ marginBottom: 16 }} />
                                        <h3 style={{ fontFamily: 'var(--font-display)', fontWeight: 700, fontSize: 'var(--text-2xl)', color: '#fff', letterSpacing: '-0.02em', marginBottom: 20 }}>3 Age Tiers</h3>
                                        {[
                                            { tier: 'Tier 1', ages: '4-9', desc: 'Foundation & Fun' },
                                            { tier: 'Tier 2', ages: '10-15', desc: 'Skill Development' },
                                            { tier: 'Tier 3', ages: '16-21', desc: 'Elite Performance' },
                                        ].map(({ tier, ages, desc }) => (
                                            <motion.div key={tier}
                                                whileHover={{ x: 4 }}
                                                style={{ padding: '14px 0', borderBottom: '1px solid rgba(255,255,255,0.12)', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                                                <div>
                                                    <div style={{ fontWeight: 600, fontSize: 'var(--text-sm)', color: '#fff' }}>{tier}: Ages {ages}</div>
                                                    <div style={{ fontSize: 12, color: 'rgba(255,255,255,0.5)', marginTop: 2 }}>{desc}</div>
                                                </div>
                                                <span style={{ background: 'rgba(255,255,255,0.15)', padding: '3px 10px', borderRadius: 'var(--radius-full)', fontSize: 11, fontWeight: 600, color: '#fff' }}>11 Sports</span>
                                            </motion.div>
                                        ))}
                                        <MagneticButton strength={0.1} style={{ marginTop: 24, width: '100%' }}>
                                            <Link href="/join"><motion.div whileHover={{ scale: 1.02 }} style={{ padding: 14, borderRadius: 12, background: 'rgba(255,255,255,0.15)', border: '1px solid rgba(255,255,255,0.25)', color: '#fff', fontWeight: 600, textAlign: 'center', cursor: 'pointer', fontSize: 'var(--text-sm)', backdropFilter: 'blur(10px)' }}>
                                                Enroll Now <ArrowRight size={14} style={{ display: 'inline', verticalAlign: 'middle' }} />
                                            </motion.div></Link>
                                        </MagneticButton>
                                    </div>
                                </GlassCard>
                            </TiltScene>
                        </ScrollReveal>
                    </div>
                </div>
            </section>

            <div style={{ height: 120, background: 'linear-gradient(to bottom, var(--bg-secondary), var(--bg-primary))' }} />

            {/* ═══ TESTIMONIALS ═══ */}
            <section style={{ padding: '80px 0 140px', background: 'var(--bg-primary)' }}>
                <div className="container">
                    <ScrollReveal>
                        <div className="section-header">
                            <span className="section-label">What People Say</span>
                            <h2 className="section-title">Trusted by <span className="gradient-text">Families</span></h2>
                        </div>
                    </ScrollReveal>
                    <ScrollReveal variant="fade-up" staggerChildren={100}>
                        <div style={{ columns: '3 280px', columnGap: 20 }}>
                            {testimonials.map(({ quote, author, role }, i) => (
                                <ScrollRevealItem key={i}>
                                    <GlassCard tilt={false} style={{ padding: 28, marginBottom: 20, breakInside: 'avoid' }}>
                                        <div style={{ fontFamily: 'var(--font-display)', fontWeight: 700, fontSize: 48, lineHeight: 0.8, color: 'var(--accent-blue)', opacity: 0.15, marginBottom: 8 }}>&ldquo;</div>
                                        <p style={{ fontSize: 'var(--text-base)', color: 'var(--text-primary)', lineHeight: 'var(--leading-relaxed)', marginBottom: 20 }}>{quote}</p>
                                        <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
                                            <div style={{ width: 40, height: 40, borderRadius: '50%', background: 'linear-gradient(135deg, #0071e3, #5ac8fa)', display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#fff', fontWeight: 700, fontSize: 'var(--text-sm)' }}>{author.charAt(0)}</div>
                                            <div><div style={{ fontWeight: 600, fontSize: 'var(--text-sm)', color: 'var(--text-primary)' }}>{author}</div><div style={{ fontSize: 12, color: 'var(--text-tertiary)' }}>{role}</div></div>
                                        </div>
                                    </GlassCard>
                                </ScrollRevealItem>
                            ))}
                        </div>
                    </ScrollReveal>
                </div>
            </section>

            {/* ═══ CINEMATIC CTA ═══ */}
            <section style={{ padding: '160px 0', position: 'relative', overflow: 'hidden', background: '#000' }}>
                <FloatingShapes count={10} />
                <ParticleField count={30} colors={['#ff375f', '#ff9f0a', '#30d158', '#5ac8fa', '#0071e3', '#bf5af2']} />
                <GradientOrb color="#ff375f" size={500} x="10%" y="30%" opacity={0.12} blur={100} animation="orb-drift" duration="14s" />
                <GradientOrb color="#0071e3" size={700} x="75%" y="50%" opacity={0.18} blur={120} animation="orb-drift-2" duration="18s" />
                <GradientOrb color="#bf5af2" size={400} x="50%" y="20%" opacity={0.1} blur={100} animation="orb-drift-3" duration="20s" />
                <div className="container" style={{ textAlign: 'center', position: 'relative', zIndex: 2 }}>
                    <ScrollReveal variant="scale">
                        <span className="section-label" style={{ marginBottom: 24 }}>Ready to Start?</span>
                        <h2 style={{ fontFamily: 'var(--font-display)', fontWeight: 700, fontSize: 'clamp(2.5rem, 5vw, 4.5rem)', lineHeight: 1.05, letterSpacing: '-0.05em', color: '#f5f5f7', marginBottom: 20 }}>
                            Begin your journey<br />today.
                        </h2>
                        <p style={{ color: 'rgba(255,255,255,0.4)', fontSize: 'var(--text-lg)', maxWidth: 440, margin: '0 auto 48px', lineHeight: 'var(--leading-relaxed)' }}>Walk into our office, pick a sport, and become part of a community that builds champions.</p>
                        <div style={{ display: 'flex', gap: 16, justifyContent: 'center', flexWrap: 'wrap' }}>
                            <MagneticButton strength={0.15}>
                                <Link href="/join"><motion.div whileTap={{ scale: 0.96 }} className="btn btn-primary btn-lg">
                                    <Zap size={16} /> Join Academy
                                </motion.div></Link>
                            </MagneticButton>
                            <MagneticButton strength={0.15}>
                                <Link href="/contact"><motion.div whileTap={{ scale: 0.96 }} className="btn btn-ghost btn-lg" style={{ color: 'rgba(255,255,255,0.7)', borderColor: 'rgba(255,255,255,0.12)' }}>
                                    Contact Us <ArrowRight size={16} />
                                </motion.div></Link>
                            </MagneticButton>
                        </div>
                    </ScrollReveal>
                </div>
            </section>
        </>
    );
}
