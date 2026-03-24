'use client';
import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import Link from 'next/link';
import { ChevronDown, HelpCircle, ArrowRight, Zap, UserPlus, CreditCard, Shield, Calendar, Activity } from 'lucide-react';
import PageHero from '@/components/ui/PageHero';
import GlassCard from '@/components/ui/GlassCard';
import ScrollReveal from '@/components/ui/ScrollReveal';
import GradientOrb from '@/components/ui/GradientOrb';

const categories = [
    {
        label: 'General', icon: HelpCircle, color: '#0071e3', faqs: [
            { q: 'What is Sportech Sports Academy?', a: 'A comprehensive multi-sport training academy offering world-class coaching across 11 sports for athletes aged 4–21.' },
            { q: 'What sports do you offer?', a: 'Soccer, Netball, Volleyball, Swimming, Tennis, Table Tennis, Gymnastics, Futsal, Athletics, Basketball, Rugby Sevens, and Dancing.' },
            { q: 'Where is the academy located?', a: 'We are located in Kampala, Uganda. Visit our contact page for our exact address and directions.' },
        ]
    },
    {
        label: 'Enrollment', icon: UserPlus, color: '#bf5af2', faqs: [
            { q: 'How do I register?', a: 'Visit our office in person to fill out a registration form, choose your sport and program, and pay the applicable fees.' },
            { q: 'Can I try a sport before enrolling?', a: 'We offer trial sessions during open days. Check our events page or contact us for the next open day.' },
            { q: 'Is there a registration deadline?', a: 'Registration is ongoing throughout the year. Some programs (Holiday & Camps) have specific start dates.' },
        ]
    },
    {
        label: 'Fees & Payment', icon: CreditCard, color: '#30d158', faqs: [
            { q: 'How much does it cost?', a: 'Fees vary by sport, tier, and program type. Visit our office for current pricing or call us for details.' },
            { q: 'What payment methods are accepted?', a: 'We accept bank transfer, mobile money (MTN MoMo/Vodafone Cash), and cash at our office.' },
            { q: 'Are fees refundable?', a: 'Fees are generally non-refundable once the program starts. Contact us for our full refund policy.' },
        ]
    },
    {
        label: 'Programs', icon: Calendar, color: '#ff9f0a', faqs: [
            { q: 'What are the program types?', a: 'Weekend Programs, In School Programs, Holiday Programs, Training Camps, and Sports Trips.' },
            { q: 'What are the age tiers?', a: 'Tier 1 (Ages 4–9): Foundation & Fun. Tier 2 (Ages 10–15): Skill Development. Tier 3 (Ages 16–21): Elite Performance.' },
            { q: 'Can my child do multiple sports?', a: 'Yes! Athletes can participate in multiple sports. Each sport is enrolled separately.' },
        ]
    },
    {
        label: 'Safety', icon: Shield, color: '#ff375f', faqs: [
            { q: 'Is medical clearance required?', a: 'Medical clearance may be required for certain contact sports (Rugby, Swimming) and for Tier 3 athletes.' },
            { q: 'Do you have first aid on-site?', a: 'Yes, trained first-aid personnel are present during all sessions. We maintain comprehensive safety protocols.' },
            { q: 'Are parents allowed to watch?', a: 'Yes! Tier 1 includes parent viewing sessions. All parents are welcome to attend events and competitions.' },
        ]
    },
];

export default function FAQPage() {
    const [openItem, setOpenItem] = useState(null);
    const [activeCategory, setActiveCategory] = useState(0);

    const toggle = (key) => setOpenItem(openItem === key ? null : key);

    return (
        <>
            <PageHero label="Help Center" title="Frequently Asked" titleAccent="Questions" subtitle="Find answers to common questions about the academy, programs, and enrollment." />

            <section style={{ padding: '60px 0 100px', background: 'var(--bg-primary)' }}>
                <div className="container">
                    {/* Category pills */}
                    <ScrollReveal>
                        <div style={{ display: 'flex', gap: 8, flexWrap: 'wrap', justifyContent: 'center', marginBottom: 48 }}>
                            {categories.map(({ label, icon: Icon, color }, i) => (
                                <motion.button key={label} whileHover={{ y: -1 }} whileTap={{ scale: 0.97 }}
                                    onClick={() => setActiveCategory(i)}
                                    style={{
                                        display: 'flex', alignItems: 'center', gap: 8,
                                        padding: '8px 20px', borderRadius: 980,
                                        background: activeCategory === i ? color : 'var(--bg-card)',
                                        color: activeCategory === i ? '#fff' : 'var(--text-secondary)',
                                        border: `1px solid ${activeCategory === i ? color : 'var(--border-subtle)'}`,
                                        fontWeight: 500, fontSize: 'var(--text-sm)', cursor: 'pointer', transition: 'all 0.2s',
                                    }}>
                                    <Icon size={14} /> {label}
                                </motion.button>
                            ))}
                        </div>
                    </ScrollReveal>

                    {/* FAQ items */}
                    <div style={{ maxWidth: 700, margin: '0 auto' }}>
                        {categories[activeCategory].faqs.map(({ q, a }, i) => {
                            const key = `${activeCategory}-${i}`;
                            const isOpen = openItem === key;
                            return (
                                <motion.div key={key} initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: i * 0.06 }}
                                    style={{ borderBottom: '1px solid var(--border-subtle)' }}>
                                    <button onClick={() => toggle(key)}
                                        style={{ width: '100%', display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '20px 0', background: 'none', border: 'none', cursor: 'pointer', textAlign: 'left' }}>
                                        <span style={{ fontWeight: 600, fontSize: 'var(--text-base)', color: 'var(--text-primary)', paddingRight: 16 }}>{q}</span>
                                        <motion.div animate={{ rotate: isOpen ? 180 : 0 }} transition={{ duration: 0.2 }}>
                                            <ChevronDown size={16} color="var(--text-tertiary)" />
                                        </motion.div>
                                    </button>
                                    <AnimatePresence>
                                        {isOpen && (
                                            <motion.div initial={{ height: 0, opacity: 0 }} animate={{ height: 'auto', opacity: 1 }} exit={{ height: 0, opacity: 0 }}
                                                transition={{ duration: 0.25, ease: [0.16, 1, 0.3, 1] }} style={{ overflow: 'hidden' }}>
                                                <p style={{ color: 'var(--text-secondary)', fontSize: 'var(--text-sm)', lineHeight: 'var(--leading-relaxed)', paddingBottom: 20 }}>{a}</p>
                                            </motion.div>
                                        )}
                                    </AnimatePresence>
                                </motion.div>
                            );
                        })}
                    </div>
                </div>
            </section>

            {/* CTA */}
            <section style={{ padding: '100px 0', position: 'relative', overflow: 'hidden', background: '#000' }}>
                <GradientOrb color="#0071e3" size={400} x="30%" y="50%" opacity={0.15} blur={100} animation="orb-drift" duration="14s" />
                <div className="container" style={{ textAlign: 'center', position: 'relative', zIndex: 2 }}>
                    <ScrollReveal variant="scale">
                        <h2 style={{ fontFamily: 'var(--font-display)', fontWeight: 700, fontSize: 'clamp(2rem, 4vw, var(--text-4xl))', color: '#f5f5f7', letterSpacing: '-0.04em', marginBottom: 16 }}>Still have questions?</h2>
                        <p style={{ color: 'rgba(255,255,255,0.5)', maxWidth: 440, margin: '0 auto 40px' }}>Our team is ready to help.</p>
                        <div style={{ display: 'flex', gap: 12, justifyContent: 'center' }}>
                            <Link href="/contact"><motion.div whileHover={{ y: -2 }} className="btn btn-primary btn-lg">Contact Us <ArrowRight size={14} /></motion.div></Link>
                            <Link href="/join"><motion.div whileHover={{ y: -2 }} className="btn btn-ghost btn-lg"><Zap size={14} /> Join Academy</motion.div></Link>
                        </div>
                    </ScrollReveal>
                </div>
            </section>
        </>
    );
}
