'use client';
import { useState } from 'react';
import { motion } from 'framer-motion';
import { User, Trophy, Medal, Star, Filter, Zap, ArrowRight } from 'lucide-react';
import Link from 'next/link';
import PageHero from '@/components/ui/PageHero';
import GlassCard from '@/components/ui/GlassCard';
import ScrollReveal, { ScrollRevealItem } from '@/components/ui/ScrollReveal';

const athletes = [
    { name: 'Kwame A.', sport: 'Soccer', tier: 'Tier 3', achievement: 'Inter-Academy MVP', color: '#0071e3' },
    { name: 'Akosua B.', sport: 'Swimming', tier: 'Tier 2', achievement: '3 Gold Medals', color: '#5ac8fa' },
    { name: 'Yaw C.', sport: 'Athletics', tier: 'Tier 3', achievement: '100m Record Holder', color: '#ff9f0a' },
    { name: 'Ama D.', sport: 'Netball', tier: 'Tier 2', achievement: 'Team Captain', color: '#bf5af2' },
    { name: 'Kojo E.', sport: 'Basketball', tier: 'Tier 3', achievement: 'Championship MVP', color: '#bf5af2' },
    { name: 'Efua F.', sport: 'Gymnastics', tier: 'Tier 1', achievement: 'Floor Champion', color: '#ff375f' },
    { name: 'Kofi G.', sport: 'Tennis', tier: 'Tier 2', achievement: 'Regional Finalist', color: '#30d158' },
    { name: 'Adwoa H.', sport: 'Dancing', tier: 'Tier 3', achievement: 'National Competitor', color: '#ff375f' },
    { name: 'Yaa I.', sport: 'Volleyball', tier: 'Tier 2', achievement: 'Best Setter Award', color: '#ff9f0a' },
];

const tierFilters = ['All', 'Tier 1', 'Tier 2', 'Tier 3'];

export default function PlayersPage() {
    const [filter, setFilter] = useState('All');
    const filtered = filter === 'All' ? athletes : athletes.filter(a => a.tier === filter);

    return (
        <>
            <PageHero label="Our Athletes" title="Meet Our" titleAccent="Players" subtitle="The talented athletes who make Sportech Sports Academy world-class." />

            <section style={{ padding: '60px 0 100px', background: 'var(--bg-primary)' }}>
                <div className="container">
                    {/* Filters */}
                    <ScrollReveal>
                        <div style={{ display: 'flex', alignItems: 'center', gap: 12, marginBottom: 48, flexWrap: 'wrap' }}>
                            <div style={{ display: 'flex', alignItems: 'center', gap: 6, color: 'var(--text-tertiary)', fontWeight: 600, fontSize: 'var(--text-sm)' }}>
                                <Filter size={14} /> Filter:
                            </div>
                            {tierFilters.map(t => (
                                <motion.button key={t} whileHover={{ y: -1 }} whileTap={{ scale: 0.97 }} onClick={() => setFilter(t)}
                                    style={{ padding: '7px 18px', borderRadius: 980, background: filter === t ? 'var(--accent-blue)' : 'var(--bg-card)', color: filter === t ? '#fff' : 'var(--text-secondary)', border: `1px solid ${filter === t ? 'var(--accent-blue)' : 'var(--border-subtle)'}`, fontWeight: 500, fontSize: 'var(--text-sm)', cursor: 'pointer', transition: 'all 0.2s' }}>
                                    {t}
                                </motion.button>
                            ))}
                            <div style={{ marginLeft: 'auto', color: 'var(--text-tertiary)', fontSize: 'var(--text-sm)' }}>
                                <strong style={{ color: 'var(--accent-blue)' }}>{filtered.length}</strong> athletes
                            </div>
                        </div>
                    </ScrollReveal>

                    {/* Grid */}
                    <div className="grid-3">
                        {filtered.map(({ name, sport, tier, achievement, color }, i) => (
                            <motion.div key={name} initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: (i % 3) * 0.08, duration: 0.5, ease: [0.16, 1, 0.3, 1] }}>
                                <GlassCard tilt={false} style={{ padding: 28, textAlign: 'center' }}>
                                    <div style={{ width: 72, height: 72, borderRadius: '50%', background: `linear-gradient(135deg, ${color}, ${color}aa)`, display: 'flex', alignItems: 'center', justifyContent: 'center', margin: '0 auto 16px', border: `2px solid ${color}40` }}>
                                        <User size={32} color="#fff" />
                                    </div>
                                    <h4 style={{ fontWeight: 700, fontSize: 'var(--text-base)', color: 'var(--text-primary)', marginBottom: 6 }}>{name}</h4>
                                    <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 6, marginBottom: 8 }}>
                                        <span style={{ padding: '2px 10px', borderRadius: 'var(--radius-full)', background: `${color}12`, color, fontSize: 'var(--text-xs)', fontWeight: 600 }}>{sport}</span>
                                        <span style={{ padding: '2px 10px', borderRadius: 'var(--radius-full)', background: 'var(--bg-secondary)', color: 'var(--text-tertiary)', fontSize: 'var(--text-xs)', fontWeight: 600, border: '1px solid var(--border-subtle)' }}>{tier}</span>
                                    </div>
                                    <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 6, fontSize: 'var(--text-sm)', color: 'var(--accent-blue)' }}>
                                        <Medal size={13} /> {achievement}
                                    </div>
                                </GlassCard>
                            </motion.div>
                        ))}
                    </div>
                </div>
            </section>

            {/* CTA */}
            <section style={{ padding: '100px 0', background: '#000', position: 'relative' }}>
                <div className="container" style={{ textAlign: 'center', position: 'relative', zIndex: 2 }}>
                    <ScrollReveal variant="scale">
                        <h2 style={{ fontFamily: 'var(--font-display)', fontWeight: 700, fontSize: 'clamp(2rem, 4vw, var(--text-4xl))', color: '#f5f5f7', letterSpacing: '-0.04em', marginBottom: 16 }}>See yourself here?</h2>
                        <p style={{ color: 'rgba(255,255,255,0.5)', maxWidth: 440, margin: '0 auto 40px' }}>Join 500+ athletes building their legacy at Sportech.</p>
                        <Link href="/join"><motion.div whileHover={{ y: -2 }} className="btn btn-primary btn-lg"><Zap size={16} /> Join Academy</motion.div></Link>
                    </ScrollReveal>
                </div>
            </section>
        </>
    );
}
