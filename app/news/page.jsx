'use client';
import { motion } from 'framer-motion';
import { Clock, ArrowRight, Tag, Newspaper, Zap } from 'lucide-react';
import Link from 'next/link';
import PageHero from '@/components/ui/PageHero';
import GlassCard from '@/components/ui/GlassCard';
import ScrollReveal, { ScrollRevealItem } from '@/components/ui/ScrollReveal';

const articles = [
    { title: 'Sportech Sports Academy Launches with 11 Sports', date: 'March 2026', category: 'Announcement', excerpt: 'The academy has officially opened its doors, offering world-class coaching across 11 sports for athletes aged 4–21.', featured: true, color: '#0071e3' },
    { title: 'First Inter-Academy Soccer Tournament Announced', date: 'Coming Soon', category: 'Events', excerpt: 'We are excited to announce our first-ever inter-academy soccer tournament bringing together talented athletes from across the region.', color: '#30d158' },
    { title: 'New Swimming Program Added for All Age Groups', date: 'March 2026', category: 'Programs', excerpt: 'Our new swimming program is now available across all three age tiers with certified coaches and a professional aquatic facility.', color: '#5ac8fa' },
    { title: 'Coaching Staff Spotlight: Meet Our Expert Team', date: 'March 2026', category: 'Staff', excerpt: 'Get to know the 15+ certified coaches who bring elite-level expertise to every session at Sportech Sports Academy.', color: '#bf5af2' },
    { title: 'Holiday Training Camp Registration Now Open', date: 'Coming Soon', category: 'Programs', excerpt: 'Register now for our intensive holiday training camps. Limited spots available across all 11 sports.', color: '#ff9f0a' },
    { title: 'Partnering with Local Schools for In-School Programs', date: 'March 2026', category: 'Partnerships', excerpt: 'Sportech is expanding its reach through partnerships with local schools, bringing quality sports training directly to students.', color: '#ff375f' },
];

export default function NewsPage() {
    const featured = articles.find(a => a.featured);
    const rest = articles.filter(a => !a.featured);

    return (
        <>
            <PageHero label="Latest Updates" title="Sportech" titleAccent="News" subtitle="Stay up to date with academy announcements, events, and achievements." />

            <section style={{ padding: '60px 0 100px', background: 'var(--bg-primary)' }}>
                <div className="container">
                    {/* Featured Article */}
                    {featured && (
                        <ScrollReveal variant="fade-up">
                            <GlassCard tilt={false} style={{ padding: 0, overflow: 'hidden', marginBottom: 48 }}>
                                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr' }}>
                                    <div style={{ background: `linear-gradient(135deg, ${featured.color}, ${featured.color}cc)`, padding: 40, display: 'flex', flexDirection: 'column', justifyContent: 'center', position: 'relative', overflow: 'hidden' }}>
                                        <div style={{ position: 'absolute', top: -40, right: -40, width: 200, height: 200, borderRadius: '50%', background: 'rgba(255,255,255,0.08)', filter: 'blur(40px)' }} />
                                        <Newspaper size={48} color="rgba(255,255,255,0.3)" style={{ marginBottom: 16 }} />
                                        <span style={{ padding: '4px 12px', borderRadius: 'var(--radius-full)', background: 'rgba(255,255,255,0.15)', color: '#fff', fontSize: 'var(--text-xs)', fontWeight: 600, alignSelf: 'flex-start', marginBottom: 16 }}>Featured</span>
                                    </div>
                                    <div style={{ padding: 40, display: 'flex', flexDirection: 'column', justifyContent: 'center' }}>
                                        <div style={{ display: 'flex', alignItems: 'center', gap: 10, marginBottom: 12 }}>
                                            <span style={{ padding: '3px 10px', borderRadius: 'var(--radius-full)', background: `${featured.color}12`, color: featured.color, fontSize: 'var(--text-xs)', fontWeight: 600 }}>{featured.category}</span>
                                            <span style={{ display: 'flex', alignItems: 'center', gap: 4, fontSize: 'var(--text-xs)', color: 'var(--text-tertiary)' }}><Clock size={11} /> {featured.date}</span>
                                        </div>
                                        <h2 style={{ fontFamily: 'var(--font-display)', fontWeight: 700, fontSize: 'var(--text-2xl)', letterSpacing: '-0.02em', marginBottom: 12, color: 'var(--text-primary)' }}>{featured.title}</h2>
                                        <p style={{ color: 'var(--text-secondary)', fontSize: 'var(--text-sm)', lineHeight: 'var(--leading-relaxed)', marginBottom: 20 }}>{featured.excerpt}</p>
                                        <span style={{ display: 'flex', alignItems: 'center', gap: 6, color: 'var(--accent-blue)', fontWeight: 600, fontSize: 'var(--text-sm)' }}>
                                            Read More <ArrowRight size={14} />
                                        </span>
                                    </div>
                                </div>
                            </GlassCard>
                        </ScrollReveal>
                    )}

                    {/* Articles Grid */}
                    <ScrollReveal variant="fade-up" staggerChildren={80}>
                        <div className="grid-3">
                            {rest.map(({ title, date, category, excerpt, color }) => (
                                <ScrollRevealItem key={title}>
                                    <GlassCard tilt={false} style={{ padding: 28, height: '100%', display: 'flex', flexDirection: 'column' }}>
                                        <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 14 }}>
                                            <span style={{ padding: '3px 10px', borderRadius: 'var(--radius-full)', background: `${color}12`, color, fontSize: 'var(--text-xs)', fontWeight: 600 }}>{category}</span>
                                            <span style={{ display: 'flex', alignItems: 'center', gap: 4, fontSize: 'var(--text-xs)', color: 'var(--text-tertiary)' }}><Clock size={11} /> {date}</span>
                                        </div>
                                        <h3 style={{ fontWeight: 700, fontSize: 'var(--text-base)', color: 'var(--text-primary)', marginBottom: 10, letterSpacing: '-0.01em' }}>{title}</h3>
                                        <p style={{ color: 'var(--text-secondary)', fontSize: 'var(--text-sm)', lineHeight: 'var(--leading-relaxed)', flex: 1, marginBottom: 16 }}>{excerpt}</p>
                                        <span style={{ display: 'flex', alignItems: 'center', gap: 6, color: 'var(--accent-blue)', fontWeight: 600, fontSize: 'var(--text-sm)' }}>
                                            Read More <ArrowRight size={14} />
                                        </span>
                                    </GlassCard>
                                </ScrollRevealItem>
                            ))}
                        </div>
                    </ScrollReveal>
                </div>
            </section>

            {/* CTA */}
            <section style={{ padding: '100px 0', background: '#000', position: 'relative' }}>
                <div className="container" style={{ textAlign: 'center', position: 'relative', zIndex: 2 }}>
                    <ScrollReveal variant="scale">
                        <h2 style={{ fontFamily: 'var(--font-display)', fontWeight: 700, fontSize: 'clamp(2rem, 4vw, var(--text-4xl))', color: '#f5f5f7', letterSpacing: '-0.04em', marginBottom: 16 }}>Don&apos;t miss out</h2>
                        <p style={{ color: 'rgba(255,255,255,0.5)', maxWidth: 440, margin: '0 auto 40px' }}>Join the academy and be the first to know about events and updates.</p>
                        <Link href="/join"><motion.div whileHover={{ y: -2 }} className="btn btn-primary btn-lg"><Zap size={16} /> Join Academy</motion.div></Link>
                    </ScrollReveal>
                </div>
            </section>
        </>
    );
}
