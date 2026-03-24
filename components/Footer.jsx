'use client';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { MapPin, Phone, Mail } from 'lucide-react';
import { FacebookIcon, TwitterIcon, InstagramIcon, YoutubeIcon } from './SocialIcons';
import { useTheme } from './ThemeProvider';
import ScrollReveal, { ScrollRevealItem } from './ui/ScrollReveal';

const footerLinks = {
    Academy: [
        { label: 'About Us', href: '/about' },
        { label: 'Our Staff', href: '/staff' },
        { label: 'Our Players', href: '/players' },
        { label: 'News', href: '/news' },
    ],
    Programs: [
        { label: 'Sports Activities', href: '/sports' },
        { label: 'Training Programs', href: '/programs' },
        { label: 'Events', href: '/events' },
        { label: 'Join Academy', href: '/join' },
    ],
    Support: [
        { label: 'FAQs', href: '/faq' },
        { label: 'Contact Us', href: '/contact' },
        { label: 'Admin Panel', href: '/admin' },
    ],
};

function ThemeToggleFooter() {
    const { theme, toggle } = useTheme();
    const isDark = theme === 'dark';
    return (
        <button onClick={toggle} aria-label="Toggle theme"
            style={{
                width: 44, height: 24, borderRadius: 12,
                background: isDark ? 'rgba(255,255,255,0.1)' : 'rgba(0,0,0,0.08)',
                border: `1px solid ${isDark ? 'rgba(255,255,255,0.15)' : 'rgba(0,0,0,0.12)'}`,
                position: 'relative', cursor: 'pointer', padding: 0,
                display: 'flex', alignItems: 'center',
            }}
        >
            <motion.div
                animate={{ x: isDark ? 22 : 2 }}
                transition={{ type: 'spring', damping: 15, stiffness: 200 }}
                style={{
                    width: 20, height: 20, borderRadius: '50%',
                    background: isDark ? '#1c1c1e' : '#ffffff',
                    boxShadow: '0 1px 3px rgba(0,0,0,0.2)',
                }}
            />
        </button>
    );
}

export default function Footer() {
    return (
        <footer style={{ background: 'var(--bg-secondary)', borderTop: '1px solid var(--border-subtle)' }}>
            <div className="container" style={{ padding: '80px 28px 32px' }}>
                <ScrollReveal variant="fade-up" staggerChildren={50}>
                    <div style={{ display: 'grid', gridTemplateColumns: '2fr 1fr 1fr 1fr', gap: 48, marginBottom: 64 }}>
                        {/* Brand Column */}
                        <ScrollRevealItem>
                            <Link href="/" style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 20 }}>
                                <div style={{
                                    width: 28, height: 28, borderRadius: 7,
                                    background: 'linear-gradient(135deg, #0071e3, #5ac8fa)',
                                    display: 'flex', alignItems: 'center', justifyContent: 'center',
                                }}>
                                    <svg width="14" height="14" viewBox="0 0 24 24" fill="none">
                                        <path d="M12 2L4 7V17L12 22L20 17V7L12 2Z" stroke="white" strokeWidth="2.5" strokeLinejoin="round" fill="rgba(255,255,255,0.2)" />
                                    </svg>
                                </div>
                                <span style={{ fontFamily: 'Poppins, sans-serif', fontWeight: 700, fontSize: 14, color: 'var(--text-primary)' }}>Sportech</span>
                            </Link>

                            <p style={{
                                color: 'var(--text-secondary)', fontSize: 'var(--text-sm)',
                                lineHeight: 'var(--leading-relaxed)', maxWidth: 280, marginBottom: 24,
                            }}>
                                Developing world-class athletes across 11 sports. Excellence, passion, and community.
                            </p>

                            <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
                                {[
                                    { icon: MapPin, text: 'Kampala, Uganda' },
                                    { icon: Phone, text: '+256 700 000 000' },
                                    { icon: Mail, text: 'info@sportech.ug' },
                                ].map(({ icon: Icon, text }) => (
                                    <div key={text} style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
                                        <div style={{
                                            width: 26, height: 26, borderRadius: 6,
                                            background: 'rgba(0,113,227,0.08)',
                                            border: '1px solid rgba(0,113,227,0.12)',
                                            display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0,
                                        }}>
                                            <Icon size={12} color="var(--accent-blue)" />
                                        </div>
                                        <span style={{ fontSize: 'var(--text-sm)', color: 'var(--text-secondary)' }}>{text}</span>
                                    </div>
                                ))}
                            </div>
                        </ScrollRevealItem>

                        {/* Link Columns */}
                        {Object.entries(footerLinks).map(([category, links]) => (
                            <ScrollRevealItem key={category}>
                                <h4 style={{
                                    fontSize: 'var(--text-xs)', fontWeight: 600, textTransform: 'uppercase',
                                    letterSpacing: '0.08em', color: 'var(--text-tertiary)', marginBottom: 20,
                                }}>{category}</h4>
                                <ul style={{ listStyle: 'none', display: 'flex', flexDirection: 'column', gap: 10 }}>
                                    {links.map(({ label, href }) => (
                                        <li key={href}>
                                            <Link href={href} style={{
                                                fontSize: 'var(--text-sm)', fontWeight: 400,
                                                color: 'var(--text-secondary)', transition: 'color 0.15s',
                                            }}
                                                onMouseEnter={e => e.currentTarget.style.color = 'var(--accent-blue)'}
                                                onMouseLeave={e => e.currentTarget.style.color = 'var(--text-secondary)'}
                                            >
                                                {label}
                                            </Link>
                                        </li>
                                    ))}
                                </ul>
                            </ScrollRevealItem>
                        ))}
                    </div>
                </ScrollReveal>

                {/* Bottom bar */}
                <div style={{
                    paddingTop: 20, borderTop: '1px solid var(--border-subtle)',
                    display: 'flex', justifyContent: 'space-between', alignItems: 'center',
                    flexWrap: 'wrap', gap: 16,
                }}>
                    <p style={{ fontSize: 'var(--text-xs)', color: 'var(--text-tertiary)' }}>
                        © {new Date().getFullYear()} Sportech Innovations. All rights reserved.
                    </p>
                    <div style={{ display: 'flex', alignItems: 'center', gap: 16 }}>
                        <Link href="#" style={{ fontSize: 'var(--text-xs)', color: 'var(--text-tertiary)', transition: 'color 0.15s' }}
                            onMouseEnter={e => e.currentTarget.style.color = 'var(--text-secondary)'}
                            onMouseLeave={e => e.currentTarget.style.color = 'var(--text-tertiary)'}
                        >Privacy Policy</Link>
                        <Link href="#" style={{ fontSize: 'var(--text-xs)', color: 'var(--text-tertiary)', transition: 'color 0.15s' }}
                            onMouseEnter={e => e.currentTarget.style.color = 'var(--text-secondary)'}
                            onMouseLeave={e => e.currentTarget.style.color = 'var(--text-tertiary)'}
                        >Terms</Link>
                        <ThemeToggleFooter />
                    </div>
                    <div style={{ display: 'flex', gap: 8 }}>
                        {[
                            { Icon: FacebookIcon, label: 'Facebook' },
                            { Icon: TwitterIcon, label: 'Twitter' },
                            { Icon: InstagramIcon, label: 'Instagram' },
                            { Icon: YoutubeIcon, label: 'YouTube' },
                        ].map(({ Icon, label }) => (
                            <motion.a key={label} href="#" aria-label={label}
                                whileHover={{ y: -2, scale: 1.05 }}
                                whileTap={{ scale: 0.95 }}
                                style={{
                                    width: 32, height: 32, borderRadius: 8,
                                    background: 'var(--bg-card)',
                                    border: '1px solid var(--border-subtle)',
                                    display: 'flex', alignItems: 'center', justifyContent: 'center',
                                    color: 'var(--text-tertiary)', cursor: 'pointer',
                                    transition: 'border-color 0.15s, color 0.15s',
                                }}
                                onMouseEnter={e => { e.currentTarget.style.borderColor = 'rgba(0,113,227,0.3)'; e.currentTarget.style.color = 'var(--accent-blue)'; }}
                                onMouseLeave={e => { e.currentTarget.style.borderColor = 'var(--border-subtle)'; e.currentTarget.style.color = 'var(--text-tertiary)'; }}
                            >
                                <Icon size={14} />
                            </motion.a>
                        ))}
                    </div>
                </div>
            </div>

            <style>{`
                @media (max-width: 900px) {
                    footer .container > div > div:first-child { grid-template-columns: 1fr 1fr !important; }
                }
                @media (max-width: 600px) {
                    footer .container > div > div:first-child { grid-template-columns: 1fr !important; }
                }
            `}</style>
        </footer>
    );
}
