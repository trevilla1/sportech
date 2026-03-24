'use client';
import { motion } from 'framer-motion';
import Link from 'next/link';
import { Calendar, MapPin, Clock, Users, ArrowRight, Trophy, Zap } from 'lucide-react';
import PageHero from '@/components/ui/PageHero';
import GlassCard from '@/components/ui/GlassCard';
import ScrollReveal, { ScrollRevealItem } from '@/components/ui/ScrollReveal';
import GradientOrb from '@/components/ui/GradientOrb';

const upcomingEvents = [
    { title: 'Inter-Academy Soccer Tournament', date: 'Coming Soon', location: 'Academy Ground', sport: 'Soccer', color: '#0071e3', icon: Trophy },
    { title: 'Swimming Gala', date: 'Coming Soon', location: 'Aquatic Center', sport: 'Swimming', color: '#5ac8fa', icon: Trophy },
    { title: 'Annual Athletics Meet', date: 'Coming Soon', location: 'Athletics Track', sport: 'Athletics', color: '#ff9f0a', icon: Trophy },
    { title: 'Holiday Training Camp', date: 'Coming Soon', location: 'Academy Campus', sport: 'Multi-Sport', color: '#30d158', icon: Zap },
    { title: 'Gymnastics Showcase', date: 'Coming Soon', location: 'Gymnasium Hall', sport: 'Gymnastics', color: '#ff375f', icon: Trophy },
    { title: 'Basketball Championship', date: 'Coming Soon', location: 'Indoor Court', sport: 'Basketball', color: '#bf5af2', icon: Trophy },
];

const pastEvents = [
    { title: 'Opening Day Tournament', sport: 'Multi-Sport', result: 'Successful inaugural event' },
    { title: 'Festive Season Sports Camp', sport: 'All Sports', result: '200+ athletes participated' },
    { title: 'Regional Swimming Competition', sport: 'Swimming', result: '5 medals won' },
];

export default function EventsPage() {
    return (
        <>
            <PageHero label="Events & Competitions" title="Upcoming" titleAccent="Events" subtitle="Competitions, showcases, tournaments, and special events for all athletes." />

            <section style={{ padding: '60px 0 100px', background: 'var(--bg-primary)' }}>
                <div className="container">
                    <ScrollReveal><div className="section-header"><span className="section-label">Coming Up</span><h2 className="section-title">Upcoming <span className="gradient-text">Events</span></h2></div></ScrollReveal>
                    <ScrollReveal variant="fade-up" staggerChildren={80}>
                        <div className="grid-3">
                            {upcomingEvents.map(({ title, date, location, sport, color, icon: Icon }) => (
                                <ScrollRevealItem key={title}>
                                    <GlassCard tilt={false} style={{ padding: 28 }}>
                                        <div style={{ display: 'flex', alignItems: 'center', gap: 12, marginBottom: 16 }}>
                                            <div style={{ width: 44, height: 44, borderRadius: 12, background: `linear-gradient(135deg, ${color}20, ${color}08)`, border: `1px solid ${color}30`, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                                                <Icon size={20} color={color} />
                                            </div>
                                            <span style={{ padding: '3px 10px', borderRadius: 'var(--radius-full)', background: `${color}12`, color, fontSize: 'var(--text-xs)', fontWeight: 600 }}>{sport}</span>
                                        </div>
                                        <h3 style={{ fontWeight: 700, fontSize: 'var(--text-base)', color: 'var(--text-primary)', marginBottom: 12 }}>{title}</h3>
                                        <div style={{ display: 'flex', flexDirection: 'column', gap: 6, marginBottom: 16 }}>
                                            <div style={{ display: 'flex', alignItems: 'center', gap: 6, fontSize: 'var(--text-sm)', color: 'var(--text-tertiary)' }}><Calendar size={13} /> {date}</div>
                                            <div style={{ display: 'flex', alignItems: 'center', gap: 6, fontSize: 'var(--text-sm)', color: 'var(--text-tertiary)' }}><MapPin size={13} /> {location}</div>
                                        </div>
                                        <span style={{ padding: '4px 12px', borderRadius: 'var(--radius-full)', background: 'rgba(0,113,227,0.08)', color: 'var(--accent-blue)', fontSize: 'var(--text-xs)', fontWeight: 600 }}>Details Coming Soon</span>
                                    </GlassCard>
                                </ScrollRevealItem>
                            ))}
                        </div>
                    </ScrollReveal>
                </div>
            </section>

            <div style={{ height: 80, background: 'linear-gradient(to bottom, var(--bg-primary), var(--bg-secondary))' }} />

            {/* Past Events */}
            <section style={{ padding: '80px 0', background: 'var(--bg-secondary)' }}>
                <div className="container">
                    <ScrollReveal><div className="section-header"><span className="section-label">Highlights</span><h2 className="section-title">Past <span className="gradient-text">Events</span></h2></div></ScrollReveal>
                    <ScrollReveal variant="fade-up" staggerChildren={80}>
                        <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
                            {pastEvents.map(({ title, sport, result }) => (
                                <ScrollRevealItem key={title}>
                                    <GlassCard tilt={false} style={{ padding: '20px 28px' }}>
                                        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                                            <div style={{ display: 'flex', alignItems: 'center', gap: 14 }}>
                                                <Trophy size={18} color="var(--accent-blue)" />
                                                <div>
                                                    <h4 style={{ fontWeight: 600, fontSize: 'var(--text-base)', color: 'var(--text-primary)' }}>{title}</h4>
                                                    <span style={{ fontSize: 'var(--text-sm)', color: 'var(--text-tertiary)' }}>{sport}</span>
                                                </div>
                                            </div>
                                            <span style={{ fontSize: 'var(--text-sm)', color: 'var(--accent-blue)', fontWeight: 500 }}>{result}</span>
                                        </div>
                                    </GlassCard>
                                </ScrollRevealItem>
                            ))}
                        </div>
                    </ScrollReveal>
                </div>
            </section>

            {/* CTA */}
            <section style={{ padding: '100px 0', position: 'relative', overflow: 'hidden', background: '#000' }}>
                <GradientOrb color="#0071e3" size={400} x="30%" y="50%" opacity={0.15} blur={100} animation="orb-drift" duration="14s" />
                <div className="container" style={{ textAlign: 'center', position: 'relative', zIndex: 2 }}>
                    <ScrollReveal variant="scale">
                        <h2 style={{ fontFamily: 'var(--font-display)', fontWeight: 700, fontSize: 'clamp(2rem, 4vw, var(--text-4xl))', color: '#f5f5f7', letterSpacing: '-0.04em', marginBottom: 16 }}>Want to compete?</h2>
                        <p style={{ color: 'rgba(255,255,255,0.5)', maxWidth: 440, margin: '0 auto 40px' }}>Join the academy and participate in our competitions and events.</p>
                        <Link href="/join"><motion.div whileHover={{ y: -2 }} className="btn btn-primary btn-lg"><Zap size={16} /> Join Academy</motion.div></Link>
                    </ScrollReveal>
                </div>
            </section>
        </>
    );
}
