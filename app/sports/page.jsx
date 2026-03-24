'use client';
import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import sportsData from '@/data/sports.json';
import { X, ChevronRight, SlidersHorizontal, Activity, Circle, Waves, CircleDot, Footprints, Shield, Music, Volleyball, ClipboardList, CheckCircle, Wrench, Users as UsersIcon } from 'lucide-react';
import Link from 'next/link';
import PageHero from '@/components/ui/PageHero';
import GlassCard from '@/components/ui/GlassCard';
import ScrollReveal from '@/components/ui/ScrollReveal';
import GradientOrb from '@/components/ui/GradientOrb';

const sportIconMap = {
    soccer: Circle, netball: CircleDot, volleyball: Volleyball, swimming: Waves,
    tennis: CircleDot, gymnastics: Activity, futsal: Circle, athletics: Footprints,
    basketball: CircleDot, rugby: Shield, dancing: Music,
};

const ageGroups = ['All', '4-9', '10-15', '16-21'];

export default function SportsPage() {
    const [selectedAge, setSelectedAge] = useState('All');
    const [selectedSport, setSelectedSport] = useState(null);

    const filtered = selectedAge === 'All' ? sportsData : sportsData.filter(s => s.ageGroups.includes(selectedAge));

    return (
        <>
            <PageHero label="What We Offer" title="11 World-Class" titleAccent="Sports" subtitle="Expert-coached programs across 11 disciplines for every age group and skill level." />

            <section style={{ padding: '60px 0 100px', background: 'var(--bg-primary)' }}>
                <div className="container">
                    {/* Filters */}
                    <ScrollReveal>
                        <div style={{ display: 'flex', alignItems: 'center', gap: 16, marginBottom: 48, flexWrap: 'wrap' }}>
                            <div style={{ display: 'flex', alignItems: 'center', gap: 8, color: 'var(--text-tertiary)', fontWeight: 600, fontSize: 'var(--text-sm)' }}>
                                <SlidersHorizontal size={16} /> Filter by Age:
                            </div>
                            <div style={{ display: 'flex', gap: 8 }}>
                                {ageGroups.map(age => (
                                    <motion.button key={age}
                                        whileHover={{ y: -1 }} whileTap={{ scale: 0.97 }}
                                        onClick={() => setSelectedAge(age)}
                                        style={{
                                            padding: '7px 18px', borderRadius: 980,
                                            background: selectedAge === age ? 'var(--accent-blue)' : 'var(--bg-card)',
                                            color: selectedAge === age ? '#fff' : 'var(--text-secondary)',
                                            border: `1px solid ${selectedAge === age ? 'var(--accent-blue)' : 'var(--border-subtle)'}`,
                                            fontWeight: 500, fontSize: 'var(--text-sm)', cursor: 'pointer',
                                            transition: 'all 0.2s',
                                        }}>
                                        {age === 'All' ? 'All Ages' : `Ages ${age}`}
                                    </motion.button>
                                ))}
                            </div>
                            <div style={{ marginLeft: 'auto', color: 'var(--text-tertiary)', fontSize: 'var(--text-sm)' }}>
                                Showing <strong style={{ color: 'var(--accent-blue)' }}>{filtered.length}</strong> sports
                            </div>
                        </div>
                    </ScrollReveal>

                    {/* Sports Grid */}
                    <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 20 }}>
                        <AnimatePresence>
                            {filtered.map((sport, i) => {
                                const Icon = sportIconMap[sport.id] || Activity;
                                return (
                                    <motion.div key={sport.id}
                                        layout
                                        initial={{ opacity: 0, y: 40 }}
                                        animate={{ opacity: 1, y: 0 }}
                                        exit={{ opacity: 0, scale: 0.95 }}
                                        transition={{ delay: (i % 3) * 0.08, duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
                                        onClick={() => setSelectedSport(sport)}
                                        style={{ cursor: 'pointer' }}>
                                        <GlassCard hover tilt={false} style={{ padding: 0, overflow: 'hidden' }}>
                                            {/* Header */}
                                            <div style={{ padding: '28px 24px 20px', position: 'relative' }}>
                                                <div style={{ display: 'flex', alignItems: 'center', gap: 14, marginBottom: 14 }}>
                                                    <div style={{ width: 52, height: 52, borderRadius: 14, background: `linear-gradient(135deg, ${sport.color}20, ${sport.color}08)`, border: `1px solid ${sport.color}30`, display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
                                                        <Icon size={24} color={sport.color} />
                                                    </div>
                                                    <div>
                                                        <h3 style={{ fontFamily: 'var(--font-display)', fontWeight: 700, fontSize: 'var(--text-lg)', color: 'var(--text-primary)', letterSpacing: '-0.01em' }}>{sport.name}</h3>
                                                        <span style={{ padding: '2px 10px', borderRadius: 'var(--radius-full)', background: `${sport.color}15`, color: sport.color, fontSize: 'var(--text-xs)', fontWeight: 600 }}>{sport.difficulty}</span>
                                                    </div>
                                                </div>
                                                <p style={{ color: 'var(--text-secondary)', fontSize: 'var(--text-sm)', lineHeight: 'var(--leading-relaxed)', marginBottom: 16 }}>{sport.description}</p>
                                                <div style={{ display: 'flex', flexWrap: 'wrap', gap: 6, marginBottom: 16 }}>
                                                    {sport.ageGroups.map(age => (
                                                        <span key={age} style={{ padding: '3px 10px', borderRadius: 'var(--radius-full)', background: 'rgba(0,113,227,0.08)', color: 'var(--accent-blue)', fontSize: 'var(--text-xs)', fontWeight: 600 }}>Ages {age}</span>
                                                    ))}
                                                </div>
                                                <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                                                    <div style={{ display: 'flex', alignItems: 'center', gap: 6, fontSize: 'var(--text-sm)', color: 'var(--text-tertiary)' }}>
                                                        <UsersIcon size={14} /> {sport.coach}
                                                    </div>
                                                    <span style={{ display: 'flex', alignItems: 'center', gap: 4, color: 'var(--accent-blue)', fontWeight: 600, fontSize: 'var(--text-sm)' }}>
                                                        Details <ChevronRight size={14} />
                                                    </span>
                                                </div>
                                            </div>
                                            <div style={{ height: 2, background: `linear-gradient(90deg, ${sport.color}, var(--accent-blue))` }} />
                                        </GlassCard>
                                    </motion.div>
                                );
                            })}
                        </AnimatePresence>
                    </div>

                    {/* CTA */}
                    <ScrollReveal variant="fade-up">
                        <div style={{ marginTop: 64, textAlign: 'center', padding: 56, borderRadius: 24, background: '#000', position: 'relative', overflow: 'hidden' }}>
                            <GradientOrb color="#0071e3" size={400} x="20%" y="50%" opacity={0.15} blur={80} animation="orb-drift" duration="14s" />
                            <GradientOrb color="#bf5af2" size={300} x="80%" y="40%" opacity={0.1} blur={80} animation="orb-drift-2" duration="18s" />
                            <div style={{ position: 'relative', zIndex: 2 }}>
                                <h3 style={{ fontFamily: 'var(--font-display)', fontWeight: 700, fontSize: 'var(--text-2xl)', color: '#f5f5f7', marginBottom: 12 }}>Ready to Choose Your Sport?</h3>
                                <p style={{ color: 'rgba(255,255,255,0.5)', marginBottom: 32 }}>Visit our office to register and discuss which program is right for you.</p>
                                <div style={{ display: 'flex', gap: 12, justifyContent: 'center' }}>
                                    <Link href="/join"><motion.div whileHover={{ y: -2 }} className="btn btn-primary">Join Academy</motion.div></Link>
                                    <Link href="/programs"><motion.div whileHover={{ y: -2 }} className="btn btn-ghost">View Programs</motion.div></Link>
                                </div>
                            </div>
                        </div>
                    </ScrollReveal>
                </div>
            </section>

            {/* Sport Detail Modal */}
            <AnimatePresence>
                {selectedSport && (() => {
                    const Icon = sportIconMap[selectedSport.id] || Activity;
                    return (
                        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
                            onClick={() => setSelectedSport(null)}
                            style={{ position: 'fixed', inset: 0, zIndex: 9000, background: 'rgba(0,0,0,0.7)', backdropFilter: 'blur(12px)', display: 'flex', alignItems: 'center', justifyContent: 'center', padding: 24 }}>
                            <motion.div initial={{ scale: 0.9, opacity: 0 }} animate={{ scale: 1, opacity: 1 }} exit={{ scale: 0.9, opacity: 0 }}
                                transition={{ duration: 0.3, ease: [0.16, 1, 0.3, 1] }}
                                onClick={e => e.stopPropagation()}
                                style={{ width: '100%', maxWidth: 640, maxHeight: '85vh', overflowY: 'auto', background: 'var(--bg-card)', border: '1px solid var(--glass-border)', borderRadius: 24, boxShadow: 'var(--shadow-xl)' }}>
                                {/* Header */}
                                <div style={{ padding: '24px 28px', borderBottom: '1px solid var(--border-subtle)', display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                                    <div style={{ display: 'flex', alignItems: 'center', gap: 14 }}>
                                        <div style={{ width: 48, height: 48, borderRadius: 12, background: `linear-gradient(135deg, ${selectedSport.color}20, ${selectedSport.color}08)`, border: `1px solid ${selectedSport.color}30`, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                                            <Icon size={24} color={selectedSport.color} />
                                        </div>
                                        <div>
                                            <h2 style={{ fontFamily: 'var(--font-display)', fontWeight: 700, fontSize: 'var(--text-xl)', color: 'var(--text-primary)' }}>{selectedSport.name}</h2>
                                            <span style={{ padding: '2px 10px', borderRadius: 'var(--radius-full)', background: `${selectedSport.color}15`, color: selectedSport.color, fontSize: 'var(--text-xs)', fontWeight: 600 }}>{selectedSport.difficulty}</span>
                                        </div>
                                    </div>
                                    <button onClick={() => setSelectedSport(null)} style={{ width: 36, height: 36, borderRadius: 10, background: 'var(--bg-secondary)', border: '1px solid var(--border-subtle)', display: 'flex', alignItems: 'center', justifyContent: 'center', cursor: 'pointer', color: 'var(--text-tertiary)' }}>
                                        <X size={16} />
                                    </button>
                                </div>
                                {/* Body */}
                                <div style={{ padding: '24px 28px', display: 'flex', flexDirection: 'column', gap: 24 }}>
                                    <p style={{ color: 'var(--text-secondary)', lineHeight: 'var(--leading-relaxed)' }}>{selectedSport.description}</p>
                                    {[
                                        { label: 'Rules', content: selectedSport.rules, icon: ClipboardList },
                                        { label: 'Benefits', list: selectedSport.benefits, icon: CheckCircle },
                                        { label: 'Equipment', list: selectedSport.equipment, icon: Wrench },
                                    ].map(({ label, content, list, icon: SIcon }) => (
                                        <div key={label}>
                                            <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 10 }}>
                                                <SIcon size={16} color="var(--accent-blue)" />
                                                <h4 style={{ fontWeight: 700, fontSize: 'var(--text-sm)', color: 'var(--accent-blue)' }}>{label}</h4>
                                            </div>
                                            {content && <p style={{ color: 'var(--text-secondary)', fontSize: 'var(--text-sm)', lineHeight: 'var(--leading-relaxed)' }}>{content}</p>}
                                            {list && (
                                                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 6 }}>
                                                    {list.map(item => (
                                                        <div key={item} style={{ display: 'flex', alignItems: 'center', gap: 6, fontSize: 'var(--text-sm)', color: 'var(--text-secondary)' }}>
                                                            <div style={{ width: 4, height: 4, borderRadius: '50%', background: 'var(--accent-blue)', flexShrink: 0 }} /> {item}
                                                        </div>
                                                    ))}
                                                </div>
                                            )}
                                        </div>
                                    ))}
                                    <div>
                                        <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 10 }}><UsersIcon size={16} color="var(--accent-blue)" /><h4 style={{ fontWeight: 700, fontSize: 'var(--text-sm)', color: 'var(--accent-blue)' }}>Age Groups</h4></div>
                                        <div style={{ display: 'flex', gap: 8 }}>
                                            {selectedSport.ageGroups.map(age => <span key={age} style={{ padding: '4px 12px', borderRadius: 'var(--radius-full)', background: 'rgba(0,113,227,0.08)', color: 'var(--accent-blue)', fontSize: 'var(--text-xs)', fontWeight: 600 }}>Ages {age}</span>)}
                                        </div>
                                    </div>
                                    <div style={{ padding: 16, borderRadius: 14, background: 'var(--bg-secondary)', border: '1px solid var(--border-subtle)', display: 'flex', alignItems: 'center', gap: 10 }}>
                                        <div style={{ width: 36, height: 36, borderRadius: '50%', background: 'var(--gradient-primary)', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
                                            <UsersIcon size={16} color="#fff" />
                                        </div>
                                        <div>
                                            <div style={{ fontSize: 'var(--text-xs)', color: 'var(--text-tertiary)' }}>Coach</div>
                                            <div style={{ fontWeight: 600, fontSize: 'var(--text-sm)', color: 'var(--text-primary)' }}>{selectedSport.coach}</div>
                                        </div>
                                    </div>
                                </div>
                                {/* Footer */}
                                <div style={{ padding: '16px 28px 24px', display: 'flex', gap: 12 }}>
                                    <Link href="/join" onClick={() => setSelectedSport(null)} style={{ flex: 1 }}><motion.div whileHover={{ y: -1 }} className="btn btn-primary" style={{ width: '100%', justifyContent: 'center' }}>Join This Sport</motion.div></Link>
                                    <button onClick={() => setSelectedSport(null)} className="btn btn-ghost">Close</button>
                                </div>
                            </motion.div>
                        </motion.div>
                    );
                })()}
            </AnimatePresence>
        </>
    );
}
