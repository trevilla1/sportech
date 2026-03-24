'use client';
import { useState } from 'react';
import { motion } from 'framer-motion';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { Trophy, LayoutDashboard, Calendar, Users, User, FileText, HelpCircle, Newspaper, LogOut, ChevronRight, TrendingUp, Plus } from 'lucide-react';

const menuItems = [
    { icon: LayoutDashboard, label: 'Dashboard', href: '/admin' },
    { icon: Calendar, label: 'Events', href: '/admin/events' },
    { icon: Users, label: 'Staff', href: '/admin/staff' },
    { icon: User, label: 'Players', href: '/admin/players' },
    { icon: Newspaper, label: 'News', href: '/admin/news' },
    { icon: HelpCircle, label: 'FAQs', href: '/admin/faq' },
];

function AdminSidebar({ pathname }) {
    return (
        <div className="admin-sidebar">
            {/* Logo */}
            <div style={{ padding: '0 20px 24px', borderBottom: '1px solid rgba(255,255,255,0.1)', textAlign: 'center' }}>
                <div style={{ width: 48, height: 48, borderRadius: 14, background: 'rgba(255,255,255,0.15)', display: 'flex', alignItems: 'center', justifyContent: 'center', margin: '0 auto 10px' }}>
                    <Trophy size={24} color="white" />
                </div>
                <div style={{ fontFamily: 'Poppins', fontWeight: 800, fontSize: '1rem', color: 'white' }}>SPORTECH</div>
                <div style={{ fontSize: '0.65rem', color: 'rgba(255,255,255,0.5)', letterSpacing: '0.08em' }}>ADMIN PANEL</div>
            </div>
            {/* Menu */}
            <nav style={{ padding: '16px 12px' }}>
                {menuItems.map(({ icon: Icon, label, href }) => {
                    const active = pathname === href;
                    return (
                        <Link key={href} href={href} style={{
                            display: 'flex', alignItems: 'center', gap: 10,
                            padding: '12px 14px', borderRadius: 'var(--radius-md)',
                            marginBottom: 4, color: active ? 'white' : 'rgba(255,255,255,0.65)',
                            background: active ? 'rgba(255,255,255,0.15)' : 'transparent',
                            fontWeight: 600, fontSize: '0.875rem', transition: 'all 0.2s',
                        }}
                            onMouseEnter={e => { if (!active) { e.currentTarget.style.background = 'rgba(255,255,255,0.1)'; e.currentTarget.style.color = 'white'; } }}
                            onMouseLeave={e => { if (!active) { e.currentTarget.style.background = 'transparent'; e.currentTarget.style.color = 'rgba(255,255,255,0.65)'; } }}
                        >
                            <Icon size={17} /> {label}
                            {active && <ChevronRight size={14} style={{ marginLeft: 'auto' }} />}
                        </Link>
                    );
                })}
            </nav>
            {/* Bottom */}
            <div style={{ padding: '12px', marginTop: 'auto', position: 'absolute', bottom: 0, left: 0, right: 0 }}>
                <Link href="/" style={{ display: 'flex', alignItems: 'center', gap: 10, padding: '12px 14px', color: 'rgba(255,255,255,0.5)', fontWeight: 600, fontSize: '0.875rem' }}>
                    <LogOut size={16} /> Back to Site
                </Link>
            </div>
        </div>
    );
}

export default function AdminLayout({ children }) {
    const pathname = usePathname();
    return (
        <div className="admin-layout" style={{ paddingTop: 0 }}>
            <AdminSidebar pathname={pathname} />
            <div className="admin-main">
                <div className="admin-topbar">
                    <div>
                        <h1 style={{ fontFamily: 'Poppins', fontWeight: 700, fontSize: '1.2rem', color: 'var(--text-primary)' }}>
                            {menuItems.find(m => m.href === pathname)?.label || 'Admin'}
                        </h1>
                    </div>
                    <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
                        <div style={{ width: 36, height: 36, borderRadius: '50%', background: 'var(--gradient-primary)', display: 'flex', alignItems: 'center', justifyContent: 'center', color: 'white', fontWeight: 700, fontSize: '0.9rem' }}>A</div>
                        <div>
                            <div style={{ fontWeight: 700, fontSize: '0.875rem' }}>Admin</div>
                            <div style={{ fontSize: '0.75rem', color: 'var(--text-muted)' }}>Sportech Academy</div>
                        </div>
                    </div>
                </div>
                <div className="admin-content">{children}</div>
            </div>
        </div>
    );
}
