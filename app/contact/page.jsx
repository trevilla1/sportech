'use client';
import { motion } from 'framer-motion';
import { MapPin, Phone, Mail, Clock, Send, MessageCircle } from 'lucide-react';
import PageHero from '@/components/ui/PageHero';
import GlassCard from '@/components/ui/GlassCard';
import ScrollReveal, { ScrollRevealItem } from '@/components/ui/ScrollReveal';
import GradientOrb from '@/components/ui/GradientOrb';
import { FacebookIcon, TwitterIcon, InstagramIcon, YoutubeIcon } from '@/components/SocialIcons';

const contactInfo = [
    { icon: MapPin, label: 'Address', value: 'Kampala, Uganda', detail: 'Visit our office during working hours', color: '#0071e3' },
    { icon: Phone, label: 'Phone', value: '+256 700 000 000', detail: 'Mon–Fri 8AM–5PM, Sat 9AM–1PM', color: '#30d158' },
    { icon: Mail, label: 'Email', value: 'info@sportech.ug', detail: 'We respond within 24 hours', color: '#bf5af2' },
    { icon: Clock, label: 'Office Hours', value: 'Mon–Fri: 8AM–5PM', detail: 'Saturday: 9AM–1PM | Sunday: Closed', color: '#ff9f0a' },
];

export default function ContactPage() {
    return (
        <>
            <PageHero label="Get In Touch" title="Contact" titleAccent="Us" subtitle="Have questions? Reach out — we'd love to hear from you." />

            <section style={{ padding: '60px 0 100px', background: 'var(--bg-primary)' }}>
                <div className="container">
                    <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 40 }}>
                        {/* Contact Info Cards */}
                        <ScrollReveal variant="slide-left">
                            <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
                                {contactInfo.map(({ icon: Icon, label, value, detail, color }) => (
                                    <GlassCard key={label} tilt={false} style={{ padding: '20px 24px' }}>
                                        <div style={{ display: 'flex', alignItems: 'center', gap: 14 }}>
                                            <div style={{ width: 44, height: 44, borderRadius: 12, background: `linear-gradient(135deg, ${color}20, ${color}08)`, border: `1px solid ${color}30`, display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
                                                <Icon size={20} color={color} />
                                            </div>
                                            <div>
                                                <div style={{ fontSize: 'var(--text-xs)', color: 'var(--text-tertiary)', fontWeight: 600, textTransform: 'uppercase', letterSpacing: '0.06em' }}>{label}</div>
                                                <div style={{ fontWeight: 600, color: 'var(--text-primary)', fontSize: 'var(--text-base)' }}>{value}</div>
                                                <div style={{ fontSize: 'var(--text-xs)', color: 'var(--text-tertiary)', marginTop: 2 }}>{detail}</div>
                                            </div>
                                        </div>
                                    </GlassCard>
                                ))}

                                {/* Social */}
                                <div style={{ padding: '16px 0' }}>
                                    <div style={{ fontSize: 'var(--text-xs)', fontWeight: 600, color: 'var(--text-tertiary)', textTransform: 'uppercase', letterSpacing: '0.08em', marginBottom: 12 }}>Follow Us</div>
                                    <div style={{ display: 'flex', gap: 8 }}>
                                        {[{ Icon: FacebookIcon, label: 'Facebook' }, { Icon: TwitterIcon, label: 'Twitter' }, { Icon: InstagramIcon, label: 'Instagram' }, { Icon: YoutubeIcon, label: 'YouTube' }].map(({ Icon, label }) => (
                                            <motion.a key={label} href="#" aria-label={label} whileHover={{ y: -2 }}
                                                style={{ width: 40, height: 40, borderRadius: 10, background: 'var(--bg-card)', border: '1px solid var(--border-subtle)', display: 'flex', alignItems: 'center', justifyContent: 'center', color: 'var(--text-tertiary)', transition: 'all 0.15s' }}
                                                onMouseEnter={e => { e.currentTarget.style.borderColor = 'rgba(0,113,227,0.3)'; e.currentTarget.style.color = 'var(--accent-blue)'; }}
                                                onMouseLeave={e => { e.currentTarget.style.borderColor = 'var(--border-subtle)'; e.currentTarget.style.color = 'var(--text-tertiary)'; }}>
                                                <Icon size={16} />
                                            </motion.a>
                                        ))}
                                    </div>
                                </div>
                            </div>
                        </ScrollReveal>

                        {/* Contact Form */}
                        <ScrollReveal variant="slide-right">
                            <GlassCard tilt={false} style={{ padding: 32 }}>
                                <div style={{ display: 'flex', alignItems: 'center', gap: 10, marginBottom: 24 }}>
                                    <MessageCircle size={20} color="var(--accent-blue)" />
                                    <h3 style={{ fontFamily: 'var(--font-display)', fontWeight: 700, fontSize: 'var(--text-lg)', color: 'var(--text-primary)' }}>Send a Message</h3>
                                </div>
                                <form style={{ display: 'flex', flexDirection: 'column', gap: 16 }} onSubmit={e => e.preventDefault()}>
                                    <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 12 }}>
                                        <input placeholder="First Name" style={inputStyle} />
                                        <input placeholder="Last Name" style={inputStyle} />
                                    </div>
                                    <input type="email" placeholder="Email Address" style={inputStyle} />
                                    <input placeholder="Phone Number" style={inputStyle} />
                                    <select style={inputStyle} defaultValue="">
                                        <option value="" disabled>Select Subject</option>
                                        <option>Enrollment Inquiry</option>
                                        <option>Program Information</option>
                                        <option>Pricing & Fees</option>
                                        <option>Partnership</option>
                                        <option>Other</option>
                                    </select>
                                    <textarea placeholder="Your message..." rows={4} style={{ ...inputStyle, resize: 'vertical' }} />
                                    <motion.button type="submit" whileHover={{ y: -2, boxShadow: '0 0 40px rgba(0,113,227,0.4)' }} whileTap={{ scale: 0.97 }}
                                        style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 8, padding: '14px', borderRadius: 12, background: 'var(--accent-blue)', color: '#fff', fontWeight: 600, fontSize: 'var(--text-sm)', border: 'none', cursor: 'pointer', boxShadow: 'var(--shadow-glow-blue)' }}>
                                        <Send size={14} /> Send Message
                                    </motion.button>
                                </form>
                            </GlassCard>
                        </ScrollReveal>
                    </div>
                </div>
            </section>

            {/* Map placeholder */}
            <section style={{ padding: '0 0 80px', background: 'var(--bg-primary)' }}>
                <div className="container">
                    <ScrollReveal>
                        <GlassCard tilt={false} style={{ padding: 0, overflow: 'hidden', height: 300, display: 'flex', alignItems: 'center', justifyContent: 'center', position: 'relative' }}>
                            <GradientOrb color="#0071e3" size={300} x="50%" y="50%" opacity={0.08} blur={80} />
                            <div style={{ position: 'relative', zIndex: 1, textAlign: 'center' }}>
                                <MapPin size={32} color="var(--accent-blue)" style={{ marginBottom: 12 }} />
                                <h4 style={{ fontWeight: 700, color: 'var(--text-primary)', marginBottom: 4 }}>Kampala, Uganda</h4>
                                <p style={{ fontSize: 'var(--text-sm)', color: 'var(--text-tertiary)' }}>Map integration coming soon</p>
                            </div>
                        </GlassCard>
                    </ScrollReveal>
                </div>
            </section>
        </>
    );
}

const inputStyle = {
    padding: '12px 16px',
    borderRadius: 12,
    background: 'var(--bg-secondary)',
    border: '1px solid var(--border-subtle)',
    color: 'var(--text-primary)',
    fontSize: 'var(--text-sm)',
    fontFamily: 'inherit',
    outline: 'none',
    transition: 'border-color 0.2s',
    width: '100%',
};
