'use client';
import { motion } from 'framer-motion';
import { User, Trophy, Star, Award, ArrowRight, Zap } from 'lucide-react';
import Link from 'next/link';
import PageHero from '@/components/ui/PageHero';
import GlassCard from '@/components/ui/GlassCard';
import ScrollReveal, { ScrollRevealItem } from '@/components/ui/ScrollReveal';

const coaches = [
    { name: 'Coach Daniel Mensah', sport: 'Soccer', specialization: 'Tactical Development', color: '#0071e3' },
    { name: 'Coach Abena Owusu', sport: 'Netball', specialization: 'Team Strategy', color: '#bf5af2' },
    { name: 'Coach Eric Asante', sport: 'Volleyball', specialization: 'Explosive Power', color: '#ff9f0a' },
    { name: 'Coach Nana Ama Boateng', sport: 'Swimming', specialization: 'Stroke Technique', color: '#5ac8fa' },
    { name: 'Coach Kwame Asare', sport: 'Tennis / Table Tennis', specialization: 'Precision & Reflexes', color: '#30d158' },
    { name: 'Coach Serwa Antwi', sport: 'Gymnastics', specialization: 'Flexibility & Balance', color: '#ff375f' },
    { name: 'Coach Samuel Boa', sport: 'Futsal', specialization: 'Technical Mastery', color: '#0071e3' },
    { name: 'Coach Yaw Darko', sport: 'Athletics', specialization: 'Speed & Endurance', color: '#ff9f0a' },
    { name: 'Coach Frank Osei', sport: 'Basketball', specialization: 'Court Strategy', color: '#bf5af2' },
    { name: 'Coach Isaac Amo', sport: 'Rugby Sevens', specialization: 'Power & Resilience', color: '#30d158' },
    { name: 'Coach Akosua Boadu', sport: 'Dancing', specialization: 'Rhythm & Expression', color: '#ff375f' },
];

export default function StaffPage() {
    return (
        <>
            <PageHero label="Our Team" title="Expert" titleAccent="Coaches" subtitle="15+ certified coaches bringing elite-level expertise to every session." />

            <section style={{ padding: '60px 0 100px', background: 'var(--bg-primary)' }}>
                <div className="container">
                    <ScrollReveal variant="fade-up" staggerChildren={60}>
                        <div className="grid-3">
                            {coaches.map(({ name, sport, specialization, color }) => (
                                <ScrollRevealItem key={name}>
                                    <GlassCard tilt={false} style={{ padding: 28, textAlign: 'center' }}>
                                        <div style={{ width: 72, height: 72, borderRadius: '50%', background: `linear-gradient(135deg, ${color}, ${color}aa)`, display: 'flex', alignItems: 'center', justifyContent: 'center', margin: '0 auto 16px', border: `2px solid ${color}40` }}>
                                            <User size={32} color="#fff" />
                                        </div>
                                        <h4 style={{ fontWeight: 700, fontSize: 'var(--text-base)', color: 'var(--text-primary)', marginBottom: 4 }}>{name}</h4>
                                        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 6, marginBottom: 8 }}>
                                            <span style={{ padding: '2px 10px', borderRadius: 'var(--radius-full)', background: `${color}12`, color, fontSize: 'var(--text-xs)', fontWeight: 600 }}>{sport}</span>
                                        </div>
                                        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 6, fontSize: 'var(--text-sm)', color: 'var(--text-tertiary)' }}>
                                            <Star size={12} /> {specialization}
                                        </div>
                                    </GlassCard>
                                </ScrollRevealItem>
                            ))}
                        </div>
                    </ScrollReveal>
                </div>
            </section>

            {/* CTA */}
            <section style={{ padding: '100px 0', background: '#000', position: 'relative', overflow: 'hidden' }}>
                <div className="container" style={{ textAlign: 'center', position: 'relative', zIndex: 2 }}>
                    <ScrollReveal variant="scale">
                        <h2 style={{ fontFamily: 'var(--font-display)', fontWeight: 700, fontSize: 'clamp(2rem, 4vw, var(--text-4xl))', color: '#f5f5f7', letterSpacing: '-0.04em', marginBottom: 16 }}>Train with the best</h2>
                        <p style={{ color: 'rgba(255,255,255,0.5)', maxWidth: 440, margin: '0 auto 40px' }}>Our coaches are ready to help you reach your full potential.</p>
                        <Link href="/join"><motion.div whileHover={{ y: -2 }} className="btn btn-primary btn-lg"><Zap size={16} /> Join Academy</motion.div></Link>
                    </ScrollReveal>
                </div>
            </section>
        </>
    );
}
