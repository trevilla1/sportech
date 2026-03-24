'use client';
import { motion } from 'framer-motion';
import { Target, Heart, Users, Zap, Star, Globe, MapPin, Mail, Phone, User, Code, GraduationCap, ShoppingBag, Utensils, FlaskConical, Circle, Settings, Dumbbell, Handshake, PartyPopper, ArrowRight } from 'lucide-react';
import Link from 'next/link';
import PageHero from '@/components/ui/PageHero';
import GlassCard from '@/components/ui/GlassCard';
import ScrollReveal, { ScrollRevealItem } from '@/components/ui/ScrollReveal';
import GradientOrb from '@/components/ui/GradientOrb';
import ParticleField from '@/components/ui/ParticleField';

const leadership = [
    { name: 'Mr. [Founder Name]', role: 'Founder & CEO', bio: 'Visionary leader with a passion for sports education and youth development across Africa.', icon: User },
    { name: 'Ms. [Director Name]', role: 'Academy Director', bio: 'Experienced sports administrator dedicated to building world-class athletic programs.', icon: User },
    { name: 'Mr. [Manager Name]', role: 'Operations Manager', bio: 'Ensuring smooth day-to-day operations and the best experience for every athlete.', icon: User },
    { name: 'Ms. [Coach Lead]', role: 'Head of Coaching', bio: 'Overseeing coaching quality and curriculum development across all 11 sports.', icon: User },
];

const values = [
    { icon: Target, title: 'Excellence', desc: 'We pursue the highest standard in everything we do.', color: '#0071e3' },
    { icon: Heart, title: 'Passion', desc: 'Sport is our language. We live and breathe it daily.', color: '#ff375f' },
    { icon: Users, title: 'Community', desc: 'We build families, friendships, and futures.', color: '#30d158' },
    { icon: Zap, title: 'Innovation', desc: 'Modern coaching methods and continuous improvement.', color: '#bf5af2' },
    { icon: Star, title: 'Integrity', desc: 'Honest, transparent, and accountable in all we do.', color: '#ff9f0a' },
    { icon: Globe, title: 'Inclusivity', desc: 'Sport for every child — regardless of background.', color: '#5ac8fa' },
];

const services = [
    { name: 'Sportech Code Academy', icon: Code, color: '#0071e3' },
    { name: 'Sportech Coach Education', icon: GraduationCap, color: '#bf5af2' },
    { name: 'Sportech Athlete Shop', icon: ShoppingBag, color: '#ff375f' },
    { name: 'Sportech Foods', icon: Utensils, color: '#30d158' },
    { name: 'Sportech Research Center', icon: FlaskConical, color: '#5ac8fa' },
    { name: 'Sportech Football Club', icon: Circle, color: '#0071e3' },
    { name: 'Sportech Tech Services', icon: Settings, color: '#ff9f0a' },
    { name: 'Sportech Fitness Hub', icon: Dumbbell, color: '#ff375f' },
    { name: 'Sportech Athlete Education', icon: GraduationCap, color: '#bf5af2' },
    { name: 'Sportech Agency', icon: Handshake, color: '#5ac8fa' },
    { name: 'Sportech Fans Experience', icon: PartyPopper, color: '#30d158' },
];

const partners = ['Partner Company A', 'Partner Company B', 'Partner Company C', 'Partner Company D', 'Partner Company E', 'Partner Company F'];

export default function AboutPage() {
    return (
        <>
            <PageHero label="About Us" title="Our Story," titleAccent="Our Mission" subtitle="Building world-class athletes and developing champions through sport, discipline, and community." />

            {/* Story */}
            <section style={{ padding: '80px 0', background: 'var(--bg-primary)' }}>
                <div className="container">
                    <ScrollReveal>
                        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 64, alignItems: 'center' }}>
                            <div>
                                <span className="section-label">The Story</span>
                                <h2 style={{ fontFamily: 'var(--font-display)', fontWeight: 700, fontSize: 'var(--text-3xl)', letterSpacing: '-0.02em', marginTop: 12, marginBottom: 20, color: 'var(--text-primary)' }}>
                                    From Vision to <span className="gradient-text">Reality</span>
                                </h2>
                                <p style={{ color: 'var(--text-secondary)', lineHeight: 'var(--leading-relaxed)', marginBottom: 16 }}>
                                    Sportech Sports Academy was founded with a simple but powerful belief: every child deserves access to world-class sports training. What began as a small program has grown into a comprehensive academy offering 11 sports across 3 age tiers.
                                </p>
                                <p style={{ color: 'var(--text-secondary)', lineHeight: 'var(--leading-relaxed)' }}>
                                    Today, with over 500 active athletes and 15+ expert coaches, we continue to push the boundaries of what a sports academy can be — blending athletic excellence with character development.
                                </p>
                            </div>
                            <GlassCard tilt={false} style={{ padding: 0, overflow: 'hidden', background: 'linear-gradient(160deg, #0071e3, #5ac8fa)', border: 'none', position: 'relative' }}>
                                <ParticleField count={12} colors={['rgba(255,255,255,0.5)']} />
                                <div style={{ padding: 40, position: 'relative', zIndex: 1 }}>
                                    {[{ label: 'Athletes', val: '500+' }, { label: 'Sports', val: '11' }, { label: 'Coaches', val: '15+' }, { label: 'Programs', val: '5' }].map(({ label, val }) => (
                                        <div key={label} style={{ display: 'flex', justifyContent: 'space-between', padding: '16px 0', borderBottom: '1px solid rgba(255,255,255,0.12)' }}>
                                            <span style={{ color: 'rgba(255,255,255,0.7)', fontSize: 'var(--text-sm)' }}>{label}</span>
                                            <span style={{ color: '#fff', fontWeight: 700, fontFamily: 'var(--font-display)', fontSize: 'var(--text-xl)' }}>{val}</span>
                                        </div>
                                    ))}
                                </div>
                            </GlassCard>
                        </div>
                    </ScrollReveal>
                </div>
            </section>

            <div style={{ height: 80, background: 'linear-gradient(to bottom, var(--bg-primary), var(--bg-secondary))' }} />

            {/* Values */}
            <section style={{ padding: '80px 0', background: 'var(--bg-secondary)' }}>
                <div className="container">
                    <ScrollReveal>
                        <div className="section-header">
                            <span className="section-label">Our Values</span>
                            <h2 className="section-title">What We <span className="gradient-text">Stand For</span></h2>
                        </div>
                    </ScrollReveal>
                    <ScrollReveal variant="fade-up" staggerChildren={80}>
                        <div className="grid-3">
                            {values.map(({ icon: Icon, title, desc, color }) => (
                                <ScrollRevealItem key={title}>
                                    <GlassCard glow={color} style={{ padding: 28, height: '100%' }}>
                                        <div style={{ width: 48, height: 48, borderRadius: 12, background: `linear-gradient(135deg, ${color}18, ${color}08)`, border: `1px solid ${color}25`, display: 'flex', alignItems: 'center', justifyContent: 'center', marginBottom: 16 }}>
                                            <Icon size={22} color={color} />
                                        </div>
                                        <h3 style={{ fontWeight: 700, fontSize: 'var(--text-lg)', marginBottom: 8, color: 'var(--text-primary)' }}>{title}</h3>
                                        <p style={{ color: 'var(--text-secondary)', fontSize: 'var(--text-sm)', lineHeight: 'var(--leading-relaxed)' }}>{desc}</p>
                                    </GlassCard>
                                </ScrollRevealItem>
                            ))}
                        </div>
                    </ScrollReveal>
                </div>
            </section>

            <div style={{ height: 80, background: 'linear-gradient(to bottom, var(--bg-secondary), var(--bg-primary))' }} />

            {/* Leadership */}
            <section style={{ padding: '80px 0', background: 'var(--bg-primary)' }}>
                <div className="container">
                    <ScrollReveal>
                        <div className="section-header">
                            <span className="section-label">The Team</span>
                            <h2 className="section-title">Our <span className="gradient-text">Leadership</span></h2>
                        </div>
                    </ScrollReveal>
                    <ScrollReveal variant="fade-up" staggerChildren={100}>
                        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: 20 }}>
                            {leadership.map(({ name, role, bio }) => (
                                <ScrollRevealItem key={name}>
                                    <GlassCard tilt={false} style={{ padding: 28, textAlign: 'center' }}>
                                        <div style={{ width: 64, height: 64, borderRadius: '50%', background: 'var(--gradient-primary)', display: 'flex', alignItems: 'center', justifyContent: 'center', margin: '0 auto 16px', border: '2px solid var(--accent-blue)' }}>
                                            <User size={28} color="#fff" />
                                        </div>
                                        <h4 style={{ fontWeight: 700, fontSize: 'var(--text-base)', color: 'var(--text-primary)', marginBottom: 4 }}>{name}</h4>
                                        <div style={{ fontSize: 'var(--text-xs)', color: 'var(--accent-blue)', fontWeight: 600, marginBottom: 10 }}>{role}</div>
                                        <p style={{ fontSize: 'var(--text-sm)', color: 'var(--text-tertiary)', lineHeight: 'var(--leading-relaxed)' }}>{bio}</p>
                                    </GlassCard>
                                </ScrollRevealItem>
                            ))}
                        </div>
                    </ScrollReveal>
                </div>
            </section>

            <div style={{ height: 80, background: 'linear-gradient(to bottom, var(--bg-primary), var(--bg-secondary))' }} />

            {/* Sportech Services */}
            <section style={{ padding: '80px 0', background: 'var(--bg-secondary)' }}>
                <div className="container">
                    <ScrollReveal>
                        <div className="section-header">
                            <span className="section-label">Sportech Innovations</span>
                            <h2 className="section-title">12 Services, <span className="gradient-text">One Ecosystem</span></h2>
                            <p className="section-subtitle">The Sports Academy is just the beginning. Sportech Innovations spans 12 interconnected services.</p>
                        </div>
                    </ScrollReveal>
                    <ScrollReveal variant="fade-up" staggerChildren={50}>
                        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: 12 }}>
                            {services.map(({ name, icon: Icon, color }) => (
                                <ScrollRevealItem key={name}>
                                    <motion.div whileHover={{ y: -4, borderColor: `${color}40` }}
                                        style={{ padding: '24px 16px', textAlign: 'center', background: 'var(--bg-card)', border: '1px solid var(--border-subtle)', borderRadius: 16, transition: 'all 0.3s', display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 10 }}>
                                        <div style={{ width: 48, height: 48, borderRadius: 12, background: `linear-gradient(135deg, ${color}18, ${color}08)`, border: `1px solid ${color}25`, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                                            <Icon size={22} color={color} />
                                        </div>
                                        <div style={{ fontWeight: 500, fontSize: 'var(--text-sm)', color: 'var(--text-primary)' }}>{name}</div>
                                    </motion.div>
                                </ScrollRevealItem>
                            ))}
                        </div>
                    </ScrollReveal>
                </div>
            </section>

            <div style={{ height: 80, background: 'linear-gradient(to bottom, var(--bg-secondary), var(--bg-primary))' }} />

            {/* Partners */}
            <section style={{ padding: '80px 0', background: 'var(--bg-primary)' }}>
                <div className="container">
                    <ScrollReveal>
                        <div className="section-header">
                            <span className="section-label">Partnerships</span>
                            <h2 className="section-title">Our <span className="gradient-text">Partners</span></h2>
                        </div>
                    </ScrollReveal>
                    <ScrollReveal variant="fade-up">
                        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(6, 1fr)', gap: 16 }}>
                            {partners.map((p) => (
                                <div key={p} style={{ padding: 24, background: 'var(--bg-card)', border: '1px solid var(--border-subtle)', borderRadius: 14, textAlign: 'center', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                                    <span style={{ fontSize: 'var(--text-sm)', fontWeight: 500, color: 'var(--text-tertiary)' }}>{p}</span>
                                </div>
                            ))}
                        </div>
                    </ScrollReveal>
                </div>
            </section>

            {/* CTA */}
            <section style={{ padding: '100px 0', position: 'relative', overflow: 'hidden', background: '#000' }}>
                <GradientOrb color="#0071e3" size={500} x="30%" y="50%" opacity={0.15} blur={100} animation="orb-drift" duration="16s" />
                <GradientOrb color="#bf5af2" size={400} x="70%" y="40%" opacity={0.1} blur={100} animation="orb-drift-2" duration="20s" />
                <div className="container" style={{ textAlign: 'center', position: 'relative', zIndex: 2 }}>
                    <ScrollReveal variant="scale">
                        <h2 style={{ fontFamily: 'var(--font-display)', fontWeight: 700, fontSize: 'clamp(2rem, 4vw, var(--text-5xl))', color: '#f5f5f7', letterSpacing: '-0.04em', marginBottom: 16 }}>
                            Ready to join the academy?
                        </h2>
                        <p style={{ color: 'rgba(255,255,255,0.5)', maxWidth: 440, margin: '0 auto 40px', lineHeight: 'var(--leading-relaxed)' }}>
                            Be part of a community that develops champions in 11 sports.
                        </p>
                        <div style={{ display: 'flex', gap: 12, justifyContent: 'center' }}>
                            <Link href="/join"><motion.div whileHover={{ y: -2 }} className="btn btn-primary btn-lg"><Zap size={16} /> Join Academy</motion.div></Link>
                            <Link href="/contact"><motion.div whileHover={{ y: -2 }} className="btn btn-ghost btn-lg">Contact Us <ArrowRight size={14} /></motion.div></Link>
                        </div>
                    </ScrollReveal>
                </div>
            </section>
        </>
    );
}
