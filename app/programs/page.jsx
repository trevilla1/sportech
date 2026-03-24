'use client';
import { motion } from 'framer-motion';
import Link from 'next/link';
import { Calendar, Clock, Users, MapPin, ArrowRight, Zap, CalendarDays, Tent, Plane, School, CheckCircle } from 'lucide-react';
import PageHero from '@/components/ui/PageHero';
import GlassCard from '@/components/ui/GlassCard';
import ScrollReveal, { ScrollRevealItem } from '@/components/ui/ScrollReveal';
import GradientOrb from '@/components/ui/GradientOrb';

const programs = [
    { id: 'weekend', icon: Calendar, title: 'Weekend Programs', subtitle: 'Saturdays & Sundays', color: '#0071e3', desc: 'Perfect for students who want consistent training without disrupting school days. Weekend sessions run Saturday and Sunday mornings across all 11 sports.', features: ['Both Saturday & Sunday sessions', 'Year-round availability', 'All 11 sports available', 'All 3 age tiers'] },
    { id: 'inschool', icon: School, title: 'In School Programs', subtitle: 'Weekday Training', color: '#bf5af2', desc: 'Structured weekday training sessions designed to complement school schedules. Delivered either at the academy or partnered school venues.', features: ['Monday to Friday', 'After-school sessions', 'School partnership available', 'All age tiers'] },
    { id: 'holiday', icon: CalendarDays, title: 'Holiday Programs', subtitle: 'School Breaks', color: '#30d158', desc: 'Intensive training during school holiday periods. High frequency, high quality training when athletes have maximum availability.', features: ['All major school holidays', 'Daily training sessions', 'Intensive skill development', 'All sports & age groups'] },
    { id: 'camps', icon: Tent, title: 'Training Camps', subtitle: 'Intensive Camps', color: '#ff375f', desc: 'Multi-day focused training camps for serious athletes seeking accelerated improvement. Small group intensive sessions with top coaches.', features: ['3–7 day durations', 'Small group sizes', 'Elite coach access', 'Performance tracking'] },
    { id: 'trips', icon: Plane, title: 'Sports Trips', subtitle: 'Travel & Compete', color: '#5ac8fa', desc: 'Travel and training opportunities that combine sport development with exposure to competitions outside the local area.', features: ['Domestic travel', 'Inter-academy competitions', 'Cultural exposure', 'Team bonding'] },
];

const tiers = [
    { tier: 'Tier 1', ages: '4–9', title: 'Foundation & Fun', desc: 'Introductory programs focused on developing basic movement skills, coordination, and a love for sport.', color: '#0071e3' },
    { tier: 'Tier 2', ages: '10–15', title: 'Skill Development', desc: 'Intermediate programs building specialized skills, tactical awareness, and competitive mindset.', color: '#bf5af2' },
    { tier: 'Tier 3', ages: '16–21', title: 'Elite Performance', desc: 'Advanced programs for serious athletes targeting high-level competition with S&C and sports psychology.', color: '#5ac8fa' },
];

export default function ProgramsPage() {
    return (
        <>
            <PageHero label="Training Programs" title="Programs Built" titleAccent="Around You" subtitle="5 flexible program types, all 11 sports, 3 age tiers — designed to fit every lifestyle." />

            {/* Program Types */}
            <section style={{ padding: '60px 0 100px', background: 'var(--bg-primary)' }}>
                <div className="container">
                    <ScrollReveal>
                        <div className="section-header">
                            <span className="section-label">5 Program Types</span>
                            <h2 className="section-title">Choose Your <span className="gradient-text">Program</span></h2>
                            <p className="section-subtitle">All programs are available across all 11 sports and all age tiers.</p>
                        </div>
                    </ScrollReveal>

                    <div style={{ display: 'flex', flexDirection: 'column', gap: 20 }}>
                        {programs.map(({ id, icon: Icon, title, subtitle, color, desc, features }, i) => (
                            <ScrollReveal key={id} variant="fade-up" delay={i * 60}>
                                <GlassCard tilt={false} style={{ padding: 0 }}>
                                    <div style={{ display: 'grid', gridTemplateColumns: '80px 1fr auto', gap: 28, padding: '28px 32px', alignItems: 'center' }}>
                                        <div style={{ width: 64, height: 64, borderRadius: 16, background: `linear-gradient(135deg, ${color}20, ${color}08)`, border: `1px solid ${color}30`, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                                            <Icon size={28} color={color} />
                                        </div>
                                        <div>
                                            <div style={{ display: 'flex', alignItems: 'center', gap: 12, marginBottom: 8 }}>
                                                <h3 style={{ fontFamily: 'var(--font-display)', fontWeight: 700, fontSize: 'var(--text-lg)', color: 'var(--text-primary)' }}>{title}</h3>
                                                <span style={{ padding: '3px 10px', borderRadius: 'var(--radius-full)', background: `${color}12`, color, fontSize: 'var(--text-xs)', fontWeight: 600 }}>{subtitle}</span>
                                            </div>
                                            <p style={{ color: 'var(--text-secondary)', fontSize: 'var(--text-sm)', lineHeight: 'var(--leading-relaxed)', marginBottom: 14 }}>{desc}</p>
                                            <div style={{ display: 'flex', flexWrap: 'wrap', gap: 8 }}>
                                                {features.map(f => (
                                                    <span key={f} style={{ display: 'flex', alignItems: 'center', gap: 5, fontSize: 'var(--text-xs)', color: 'var(--text-tertiary)', background: 'var(--bg-secondary)', padding: '4px 10px', borderRadius: 'var(--radius-full)', border: '1px solid var(--border-subtle)' }}>
                                                        <CheckCircle size={11} color="var(--accent-blue)" /> {f}
                                                    </span>
                                                ))}
                                            </div>
                                        </div>
                                        <div style={{ textAlign: 'center', minWidth: 120 }}>
                                            <div style={{ fontSize: 'var(--text-xs)', color: 'var(--text-tertiary)', marginBottom: 6 }}>Fees from</div>
                                            <div style={{ fontFamily: 'var(--font-display)', fontWeight: 700, fontSize: 'var(--text-base)', color }}>Visit Office</div>
                                            <div style={{ fontSize: 'var(--text-xs)', color: 'var(--text-tertiary)', marginBottom: 14 }}>for pricing</div>
                                            <Link href="/join"><motion.div whileHover={{ y: -1 }} style={{ padding: '8px 20px', borderRadius: 'var(--radius-full)', background: color, color: '#fff', fontWeight: 600, fontSize: 'var(--text-xs)', textAlign: 'center', cursor: 'pointer' }}>Enroll</motion.div></Link>
                                        </div>
                                    </div>
                                </GlassCard>
                            </ScrollReveal>
                        ))}
                    </div>
                </div>
            </section>

            <div style={{ height: 80, background: 'linear-gradient(to bottom, var(--bg-primary), var(--bg-secondary))' }} />

            {/* Age Tiers */}
            <section style={{ padding: '80px 0', background: 'var(--bg-secondary)' }}>
                <div className="container">
                    <ScrollReveal><div className="section-header"><span className="section-label">Age-Based Training</span><h2 className="section-title">3 Age <span className="gradient-text">Tiers</span></h2></div></ScrollReveal>
                    <ScrollReveal variant="fade-up" staggerChildren={100}>
                        <div className="grid-3">
                            {tiers.map(({ tier, ages, title, desc, color }, i) => (
                                <ScrollRevealItem key={tier}>
                                    <div style={{ borderRadius: 20, overflow: 'hidden', background: 'var(--bg-card)', border: '1px solid var(--border-subtle)' }}>
                                        <div style={{ padding: '28px 24px 20px', background: `linear-gradient(135deg, ${color}, ${color}cc)` }}>
                                            <div style={{ fontSize: 'var(--text-xs)', fontWeight: 700, color: 'rgba(255,255,255,0.6)', textTransform: 'uppercase', letterSpacing: '0.1em', marginBottom: 6 }}>{tier}</div>
                                            <h3 style={{ fontFamily: 'var(--font-display)', fontWeight: 700, fontSize: 'var(--text-2xl)', color: '#fff', marginBottom: 4 }}>Ages {ages}</h3>
                                            <div style={{ color: 'rgba(255,255,255,0.85)', fontWeight: 500, fontSize: 'var(--text-sm)' }}>{title}</div>
                                        </div>
                                        <div style={{ padding: '24px' }}>
                                            <p style={{ color: 'var(--text-secondary)', fontSize: 'var(--text-sm)', lineHeight: 'var(--leading-relaxed)', marginBottom: 20 }}>{desc}</p>
                                            <div style={{ display: 'flex', alignItems: 'center', gap: 8, padding: '10px 14px', background: 'rgba(0,113,227,0.06)', borderRadius: 10, marginBottom: 16 }}>
                                                <CheckCircle size={14} color={color} />
                                                <span style={{ fontSize: 'var(--text-sm)', fontWeight: 600, color }}>All 11 sports available</span>
                                            </div>
                                            <Link href="/join"><motion.div whileHover={{ y: -1 }} style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 8, padding: 12, borderRadius: 'var(--radius-full)', background: color, color: '#fff', fontWeight: 600, fontSize: 'var(--text-sm)', cursor: 'pointer' }}>
                                                Join {tier} <ArrowRight size={14} />
                                            </motion.div></Link>
                                        </div>
                                    </div>
                                </ScrollRevealItem>
                            ))}
                        </div>
                    </ScrollReveal>
                </div>
            </section>

            <div style={{ height: 80, background: 'linear-gradient(to bottom, var(--bg-secondary), var(--bg-primary))' }} />

            {/* Schedule + CTA */}
            <section style={{ padding: '80px 0', background: 'var(--bg-primary)' }}>
                <div className="container">
                    <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 24 }}>
                        <ScrollReveal variant="slide-left">
                            <GlassCard tilt={false} style={{ padding: 36, height: '100%' }}>
                                <div style={{ display: 'flex', alignItems: 'center', gap: 12, marginBottom: 20 }}>
                                    <div style={{ width: 44, height: 44, borderRadius: 12, background: 'rgba(0,113,227,0.08)', border: '1px solid rgba(0,113,227,0.15)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                                        <Calendar size={22} color="var(--accent-blue)" />
                                    </div>
                                    <h3 style={{ fontFamily: 'var(--font-display)', fontWeight: 700, fontSize: 'var(--text-lg)', color: 'var(--text-primary)' }}>Flexible Scheduling</h3>
                                </div>
                                <p style={{ color: 'var(--text-secondary)', lineHeight: 'var(--leading-relaxed)', fontSize: 'var(--text-sm)', marginBottom: 16 }}>
                                    All program schedules are flexible and situational. We update them based on school calendars, coach availability, and athlete needs.
                                </p>
                                <div style={{ display: 'flex', alignItems: 'center', gap: 8, color: 'var(--accent-blue)', fontWeight: 500, fontSize: 'var(--text-sm)' }}>
                                    <Clock size={14} /> Mon–Fri 8AM–5PM, Sat 9AM–1PM
                                </div>
                            </GlassCard>
                        </ScrollReveal>
                        <ScrollReveal variant="slide-right">
                            <div style={{ padding: 36, borderRadius: 20, background: '#000', position: 'relative', overflow: 'hidden', height: '100%' }}>
                                <GradientOrb color="#0071e3" size={300} x="80%" y="30%" opacity={0.15} blur={80} animation="orb-drift" duration="14s" />
                                <div style={{ position: 'relative', zIndex: 2 }}>
                                    <div style={{ display: 'flex', alignItems: 'center', gap: 12, marginBottom: 20 }}>
                                        <Users size={22} color="#fff" />
                                        <h3 style={{ fontFamily: 'var(--font-display)', fontWeight: 700, fontSize: 'var(--text-lg)', color: '#fff' }}>Ready to Enroll?</h3>
                                    </div>
                                    <p style={{ color: 'rgba(255,255,255,0.55)', lineHeight: 'var(--leading-relaxed)', fontSize: 'var(--text-sm)', marginBottom: 24 }}>
                                        Visit our office to pick up a registration form and receive pricing information.
                                    </p>
                                    <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
                                        <Link href="/join"><motion.div whileHover={{ y: -1 }} className="btn btn-primary"><MapPin size={14} /> Enrollment Info</motion.div></Link>
                                        <Link href="/contact"><motion.div whileHover={{ y: -1 }} className="btn btn-ghost">Contact Us</motion.div></Link>
                                    </div>
                                </div>
                            </div>
                        </ScrollReveal>
                    </div>
                </div>
            </section>
        </>
    );
}
