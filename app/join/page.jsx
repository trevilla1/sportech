'use client';
import { useState } from 'react';
import { motion } from 'framer-motion';
import Link from 'next/link';
import { CheckCircle, Smartphone, Building2, MapPin, Phone, Clock, AlertCircle, ChevronDown, Zap, Star, Shield, ArrowRight, User, FileText, CreditCard } from 'lucide-react';
import PageHero from '@/components/ui/PageHero';
import GlassCard from '@/components/ui/GlassCard';
import ScrollReveal, { ScrollRevealItem } from '@/components/ui/ScrollReveal';
import GradientOrb from '@/components/ui/GradientOrb';

const tiers = [
    { tier: 'Tier 1', ages: '4–9', color: '#0071e3', icon: Star, title: 'Young Champions', program: 'Foundation & Fun Program', fee: 'Visit Office', features: ['Fun-first coaching approach', 'Basic motor skills development', 'All 11 sports access', 'Safety-first environment', 'Parent viewing sessions'] },
    { tier: 'Tier 2', ages: '10–15', color: '#bf5af2', icon: Zap, title: 'Rising Stars', program: 'Skill Development Program', fee: 'Visit Office', features: ['Sport specialization available', 'Technical skills training', 'Team and individual sports', 'Competition preparation', 'Strength & conditioning'], popular: true },
    { tier: 'Tier 3', ages: '16–21', color: '#5ac8fa', icon: Shield, title: 'Elite Athletes', program: 'Elite Performance Program', fee: 'Visit Office', features: ['Advanced performance coaching', 'Sports psychology sessions', 'Video analysis & feedback', 'Competition circuit access', 'Fitness & nutrition support'] },
];

const steps = [
    { step: '01', icon: MapPin, title: 'Visit Our Office', desc: 'Come to our physical office during working hours to begin the enrollment process.' },
    { step: '02', icon: FileText, title: 'Fill Registration Form', desc: 'Pick up a registration form and fill in athlete details, sport choice, and preferred program.' },
    { step: '03', icon: CreditCard, title: 'Pay Registration Fee', desc: 'Pay the applicable registration and program fees at the time of enrollment.' },
    { step: '04', icon: Zap, title: 'Start Training', desc: 'Receive your schedule and start attending sessions with your coach.' },
];

const payments = [
    { icon: Building2, method: 'Bank Transfer', desc: 'Direct to our bank account' },
    { icon: Smartphone, method: 'Mobile Money', desc: 'MTN MoMo / Vodafone Cash' },
    { icon: CreditCard, method: 'Cash Payment', desc: 'Pay at our office' },
];

export default function JoinPage() {
    const [openFaq, setOpenFaq] = useState(null);

    return (
        <>
            <PageHero label="Join the Academy" title="Begin Your" titleAccent="Journey" subtitle="Walk into our office, pick a sport, and become part of a community that builds champions." />

            {/* Pricing Tiers */}
            <section style={{ padding: '60px 0 100px', background: 'var(--bg-primary)' }}>
                <div className="container">
                    <ScrollReveal><div className="section-header"><span className="section-label">Choose Your Tier</span><h2 className="section-title">Programs & <span className="gradient-text">Pricing</span></h2></div></ScrollReveal>
                    <ScrollReveal variant="fade-up" staggerChildren={120}>
                        <div className="grid-3">
                            {tiers.map(({ tier, ages, color, icon: Icon, title, program, fee, features, popular }) => (
                                <ScrollRevealItem key={tier}>
                                    <div style={{ borderRadius: 20, overflow: 'hidden', background: 'var(--bg-card)', border: popular ? `2px solid ${color}` : '1px solid var(--border-subtle)', position: 'relative' }}>
                                        {popular && <div style={{ position: 'absolute', top: 14, right: 14, padding: '3px 12px', borderRadius: 'var(--radius-full)', background: color, color: '#fff', fontSize: 'var(--text-xs)', fontWeight: 700 }}>Popular</div>}
                                        <div style={{ padding: '28px 24px 20px', background: `linear-gradient(135deg, ${color}, ${color}cc)` }}>
                                            <div style={{ display: 'flex', alignItems: 'center', gap: 10, marginBottom: 8 }}>
                                                <Icon size={20} color="rgba(255,255,255,0.9)" />
                                                <span style={{ fontSize: 'var(--text-xs)', fontWeight: 700, color: 'rgba(255,255,255,0.6)', textTransform: 'uppercase', letterSpacing: '0.1em' }}>{tier}</span>
                                            </div>
                                            <h3 style={{ fontFamily: 'var(--font-display)', fontWeight: 700, fontSize: 'var(--text-2xl)', color: '#fff', marginBottom: 4 }}>Ages {ages}</h3>
                                            <div style={{ color: 'rgba(255,255,255,0.85)', fontWeight: 500, fontSize: 'var(--text-sm)' }}>{title}</div>
                                        </div>
                                        <div style={{ padding: '24px' }}>
                                            <div style={{ fontSize: 'var(--text-xs)', color: 'var(--text-tertiary)', marginBottom: 4 }}>{program}</div>
                                            <div style={{ fontFamily: 'var(--font-display)', fontWeight: 700, fontSize: 'var(--text-xl)', color, marginBottom: 20 }}>{fee}</div>
                                            <div style={{ display: 'flex', flexDirection: 'column', gap: 8, marginBottom: 20 }}>
                                                {features.map(f => (
                                                    <div key={f} style={{ display: 'flex', alignItems: 'center', gap: 8, fontSize: 'var(--text-sm)', color: 'var(--text-secondary)' }}>
                                                        <CheckCircle size={14} color={color} style={{ flexShrink: 0 }} /> {f}
                                                    </div>
                                                ))}
                                            </div>
                                            <Link href="/contact"><motion.div whileHover={{ y: -1 }} style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 8, padding: 12, borderRadius: 'var(--radius-full)', background: color, color: '#fff', fontWeight: 600, fontSize: 'var(--text-sm)', cursor: 'pointer' }}>
                                                Get Started <ArrowRight size={14} />
                                            </motion.div></Link>
                                        </div>
                                    </div>
                                </ScrollRevealItem>
                            ))}
                        </div>
                    </ScrollReveal>
                </div>
            </section>

            <div style={{ height: 80, background: 'linear-gradient(to bottom, var(--bg-primary), var(--bg-secondary))' }} />

            {/* Enrollment Steps */}
            <section style={{ padding: '80px 0', background: 'var(--bg-secondary)' }}>
                <div className="container">
                    <ScrollReveal><div className="section-header"><span className="section-label">How to Join</span><h2 className="section-title">Enrollment <span className="gradient-text">Process</span></h2></div></ScrollReveal>
                    <ScrollReveal variant="fade-up" staggerChildren={100}>
                        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: 20 }}>
                            {steps.map(({ step, icon: Icon, title, desc }) => (
                                <ScrollRevealItem key={step}>
                                    <GlassCard tilt={false} style={{ padding: 28, textAlign: 'center', height: '100%' }}>
                                        <div style={{ width: 36, height: 36, borderRadius: 10, background: 'var(--accent-blue)', display: 'flex', alignItems: 'center', justifyContent: 'center', margin: '0 auto 14px', color: '#fff', fontFamily: 'var(--font-display)', fontWeight: 700, fontSize: 'var(--text-sm)' }}>{step}</div>
                                        <div style={{ width: 48, height: 48, borderRadius: 14, background: 'rgba(0,113,227,0.08)', border: '1px solid rgba(0,113,227,0.15)', display: 'flex', alignItems: 'center', justifyContent: 'center', margin: '0 auto 14px' }}>
                                            <Icon size={22} color="var(--accent-blue)" />
                                        </div>
                                        <h4 style={{ fontWeight: 700, fontSize: 'var(--text-base)', color: 'var(--text-primary)', marginBottom: 8 }}>{title}</h4>
                                        <p style={{ fontSize: 'var(--text-sm)', color: 'var(--text-tertiary)', lineHeight: 'var(--leading-relaxed)' }}>{desc}</p>
                                    </GlassCard>
                                </ScrollRevealItem>
                            ))}
                        </div>
                    </ScrollReveal>
                </div>
            </section>

            <div style={{ height: 80, background: 'linear-gradient(to bottom, var(--bg-secondary), var(--bg-primary))' }} />

            {/* Payment Methods */}
            <section style={{ padding: '80px 0', background: 'var(--bg-primary)' }}>
                <div className="container">
                    <ScrollReveal><div className="section-header"><span className="section-label">Payments</span><h2 className="section-title">Payment <span className="gradient-text">Methods</span></h2></div></ScrollReveal>
                    <ScrollReveal variant="fade-up" staggerChildren={100}>
                        <div className="grid-3">
                            {payments.map(({ icon: Icon, method, desc }) => (
                                <ScrollRevealItem key={method}>
                                    <GlassCard tilt={false} style={{ padding: 28, textAlign: 'center' }}>
                                        <div style={{ width: 52, height: 52, borderRadius: 14, background: 'rgba(0,113,227,0.08)', border: '1px solid rgba(0,113,227,0.15)', display: 'flex', alignItems: 'center', justifyContent: 'center', margin: '0 auto 16px' }}>
                                            <Icon size={24} color="var(--accent-blue)" />
                                        </div>
                                        <h4 style={{ fontWeight: 700, fontSize: 'var(--text-base)', color: 'var(--text-primary)', marginBottom: 6 }}>{method}</h4>
                                        <p style={{ fontSize: 'var(--text-sm)', color: 'var(--text-tertiary)' }}>{desc}</p>
                                    </GlassCard>
                                </ScrollRevealItem>
                            ))}
                        </div>
                    </ScrollReveal>
                </div>
            </section>

            {/* Important Notes */}
            <section style={{ padding: '0 0 80px', background: 'var(--bg-primary)' }}>
                <div className="container">
                    <ScrollReveal>
                        <GlassCard tilt={false} style={{ padding: 32 }}>
                            <div style={{ display: 'flex', alignItems: 'center', gap: 10, marginBottom: 16 }}>
                                <AlertCircle size={18} color="var(--accent-blue)" />
                                <h4 style={{ fontWeight: 700, color: 'var(--text-primary)', fontSize: 'var(--text-base)' }}>Important Notes</h4>
                            </div>
                            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 10 }}>
                                {[
                                    'Registration is done in-person at our office only',
                                    'Medical clearance may be required for certain sports',
                                    'Parents/guardians must sign consent forms for minors',
                                    'Fees are non-refundable once the program starts',
                                    'Equipment requirements vary by sport — check the sports page',
                                    'Program schedules are communicated at enrollment',
                                ].map(note => (
                                    <div key={note} style={{ display: 'flex', alignItems: 'center', gap: 8, fontSize: 'var(--text-sm)', color: 'var(--text-secondary)' }}>
                                        <div style={{ width: 4, height: 4, borderRadius: '50%', background: 'var(--accent-blue)', flexShrink: 0 }} /> {note}
                                    </div>
                                ))}
                            </div>
                        </GlassCard>
                    </ScrollReveal>
                </div>
            </section>

            {/* CTA */}
            <section style={{ padding: '100px 0', position: 'relative', overflow: 'hidden', background: '#000' }}>
                <GradientOrb color="#0071e3" size={500} x="30%" y="50%" opacity={0.15} blur={100} animation="orb-drift" duration="16s" />
                <div className="container" style={{ textAlign: 'center', position: 'relative', zIndex: 2 }}>
                    <ScrollReveal variant="scale">
                        <h2 style={{ fontFamily: 'var(--font-display)', fontWeight: 700, fontSize: 'clamp(2rem, 4vw, var(--text-5xl))', color: '#f5f5f7', letterSpacing: '-0.04em', marginBottom: 16 }}>
                            Questions? Let&apos;s talk.
                        </h2>
                        <p style={{ color: 'rgba(255,255,255,0.5)', maxWidth: 440, margin: '0 auto 40px' }}>Our team is ready to help you choose the right program.</p>
                        <div style={{ display: 'flex', gap: 12, justifyContent: 'center' }}>
                            <Link href="/contact"><motion.div whileHover={{ y: -2 }} className="btn btn-primary btn-lg"><Phone size={14} /> Contact Us</motion.div></Link>
                            <Link href="/faq"><motion.div whileHover={{ y: -2 }} className="btn btn-ghost btn-lg">View FAQ</motion.div></Link>
                        </div>
                    </ScrollReveal>
                </div>
            </section>
        </>
    );
}
