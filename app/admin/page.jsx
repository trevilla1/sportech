'use client';
import { motion } from 'framer-motion';
import Link from 'next/link';
import { Calendar, Users, User, HelpCircle, Newspaper, TrendingUp, ArrowRight, Plus, Star, Activity } from 'lucide-react';
import eventsData from '@/data/events.json';
import staffData from '@/data/staff.json';
import playersData from '@/data/players.json';
import newsData from '@/data/news.json';
import faqData from '@/data/faq.json';

const fadeUp = {
    hidden: { opacity: 0, y: 20 },
    visible: (i = 0) => ({ opacity: 1, y: 0, transition: { delay: i * 0.08, duration: 0.4, ease: 'easeOut' } }),
};

const statCards = [
    { label: 'Total Events', value: eventsData.length, icon: Calendar, color: '#0057FF', href: '/admin/events', sub: `${eventsData.filter(e => e.status === 'upcoming').length} upcoming` },
    { label: 'Staff Members', value: staffData.length, icon: Users, color: '#0077FF', href: '/admin/staff', sub: 'All active' },
    { label: 'Total Players', value: playersData.length, icon: User, color: '#0090FF', href: '/admin/players', sub: 'Across all sports' },
    { label: 'News Articles', value: newsData.length, icon: Newspaper, color: '#00AAFF', href: '/admin/news', sub: `${newsData.filter(n => n.featured).length} featured` },
    { label: 'FAQ Entries', value: faqData.length, icon: HelpCircle, color: '#00C6FF', href: '/admin/faq', sub: `${faqData.filter(f => f.popular).length} popular` },
    { label: 'Sports Offered', value: 11, icon: Activity, color: '#0057FF', href: '/sports', sub: '+ Future sports' },
];

const quickActions = [
    { label: 'Add Event', href: '/admin/events', icon: Calendar, color: '#0057FF' },
    { label: 'Add Staff', href: '/admin/staff', icon: Users, color: '#0077FF' },
    { label: 'Add Player', href: '/admin/players', icon: User, color: '#0090FF' },
    { label: 'Write News', href: '/admin/news', icon: Newspaper, color: '#00AAFF' },
    { label: 'Add FAQ', href: '/admin/faq', icon: HelpCircle, color: '#00C6FF' },
];

export default function AdminDashboard() {
    return (
        <>
            {/* Welcome Banner */}
            <motion.div variants={fadeUp} initial="hidden" animate="visible"
                style={{ padding: '24px 32px', borderRadius: 'var(--radius-xl)', background: 'var(--gradient-hero)', color: 'white', marginBottom: 32, position: 'relative', overflow: 'hidden' }}>
                <div style={{ position: 'absolute', top: '-30%', right: '-5%', width: 200, height: 200, borderRadius: '50%', background: 'rgba(0,198,255,0.2)', pointerEvents: 'none' }} />
                <div style={{ position: 'relative', zIndex: 1 }}>
                    <div style={{ fontFamily: 'Poppins', fontWeight: 900, fontSize: '1.6rem', marginBottom: 6 }}>Welcome back, Admin 👋</div>
                    <p style={{ color: 'rgba(255,255,255,0.75)', fontSize: '0.9rem' }}>Manage all Sportech Sports Academy content from this dashboard.</p>
                </div>
            </motion.div>

            {/* Stat Cards */}
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 20, marginBottom: 40 }}>
                {statCards.map(({ label, value, icon: Icon, color, href, sub }, i) => (
                    <motion.div key={label} variants={fadeUp} initial="hidden" animate="visible" custom={i}>
                        <Link href={href} className="admin-stat-card" style={{ display: 'block', transition: 'all 0.25s' }}
                            onMouseEnter={e => { e.currentTarget.style.transform = 'translateY(-4px)'; e.currentTarget.style.boxShadow = 'var(--shadow-md)'; }}
                            onMouseLeave={e => { e.currentTarget.style.transform = 'translateY(0)'; e.currentTarget.style.boxShadow = 'none'; }}>
                            <div style={{ display: 'flex', alignItems: 'flex-start', justifyContent: 'space-between', marginBottom: 16 }}>
                                <div style={{ width: 48, height: 48, borderRadius: 14, background: `${color}15`, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                                    <Icon size={22} color={color} />
                                </div>
                                <ArrowRight size={16} color="var(--text-muted)" />
                            </div>
                            <div style={{ fontFamily: 'Poppins', fontWeight: 900, fontSize: '2rem', color, marginBottom: 4 }}>{value}</div>
                            <div style={{ fontWeight: 700, fontSize: '0.9rem', marginBottom: 2 }}>{label}</div>
                            <div style={{ fontSize: '0.75rem', color: 'var(--text-muted)' }}>{sub}</div>
                        </Link>
                    </motion.div>
                ))}
            </div>

            {/* Quick Actions + Recent Events */}
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 2fr', gap: 28 }}>
                {/* Quick Actions */}
                <motion.div variants={fadeUp} initial="hidden" animate="visible" custom={6}
                    style={{ background: 'white', borderRadius: 'var(--radius-lg)', padding: 24, border: '1px solid var(--border-light)', boxShadow: 'var(--shadow-sm)' }}>
                    <h3 style={{ fontFamily: 'Poppins', fontWeight: 800, fontSize: '1rem', marginBottom: 20, display: 'flex', alignItems: 'center', gap: 8 }}>
                        <Plus size={18} color="var(--primary)" /> Quick Actions
                    </h3>
                    <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
                        {quickActions.map(({ label, href, icon: Icon, color }) => (
                            <Link key={label} href={href}
                                style={{ display: 'flex', alignItems: 'center', gap: 12, padding: '12px 14px', borderRadius: 'var(--radius-md)', border: '1px solid var(--border-light)', fontWeight: 600, fontSize: '0.875rem', color: 'var(--text-secondary)', transition: 'all 0.2s' }}
                                onMouseEnter={e => { e.currentTarget.style.background = `${color}08`; e.currentTarget.style.borderColor = color; e.currentTarget.style.color = color; }}
                                onMouseLeave={e => { e.currentTarget.style.background = 'transparent'; e.currentTarget.style.borderColor = 'var(--border-light)'; e.currentTarget.style.color = 'var(--text-secondary)'; }}>
                                <Icon size={16} color={color} /> {label}
                            </Link>
                        ))}
                    </div>
                </motion.div>

                {/* Recent Events */}
                <motion.div variants={fadeUp} initial="hidden" animate="visible" custom={7}
                    style={{ background: 'white', borderRadius: 'var(--radius-lg)', padding: 24, border: '1px solid var(--border-light)', boxShadow: 'var(--shadow-sm)' }}>
                    <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 20 }}>
                        <h3 style={{ fontFamily: 'Poppins', fontWeight: 800, fontSize: '1rem', display: 'flex', alignItems: 'center', gap: 8 }}>
                            <TrendingUp size={18} color="var(--primary)" /> Upcoming Events
                        </h3>
                        <Link href="/admin/events" style={{ fontSize: '0.8rem', color: 'var(--primary)', fontWeight: 700 }}>View all →</Link>
                    </div>
                    <div className="table-wrapper">
                        <table>
                            <thead><tr><th>Event</th><th>Date</th><th>Sport</th><th>Capacity</th><th>Status</th></tr></thead>
                            <tbody>
                                {eventsData.slice(0, 5).map(event => (
                                    <tr key={event.id}>
                                        <td style={{ fontWeight: 600, maxWidth: 200 }}>{event.title}</td>
                                        <td style={{ whiteSpace: 'nowrap' }}>{event.date}</td>
                                        <td>{event.sport}</td>
                                        <td>{event.registered}/{event.capacity}</td>
                                        <td>
                                            <span style={{ fontSize: '0.75rem', fontWeight: 700, padding: '3px 8px', borderRadius: 'var(--radius-full)', background: event.status === 'upcoming' ? '#0057FF15' : event.status === 'past' ? '#6B7BA415' : '#10B98115', color: event.status === 'upcoming' ? '#0057FF' : event.status === 'past' ? '#6B7BA4' : '#10B981', textTransform: 'capitalize' }}>
                                                {event.status}
                                            </span>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                </motion.div>
            </div>
        </>
    );
}
