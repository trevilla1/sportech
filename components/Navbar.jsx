'use client';
import { useState, useEffect, useRef } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { motion, AnimatePresence, useScroll, useTransform } from 'framer-motion';
import { useTheme } from './ThemeProvider';
import { Sun, Moon, Menu, X, ChevronDown } from 'lucide-react';

const navLinks = [
  { label: 'Sports', href: '/sports' },
  { label: 'Programs', href: '/programs' },
  { label: 'Events', href: '/events' },
  {
    label: 'Academy',
    children: [
      { label: 'About Us', href: '/about', desc: 'Our story & values' },
      { label: 'Our Staff', href: '/staff', desc: 'Meet the coaches' },
      { label: 'Our Players', href: '/players', desc: 'Athlete profiles' },
      { label: 'News', href: '/news', desc: 'Latest updates' },
    ],
  },
  { label: 'FAQ', href: '/faq' },
  { label: 'Contact', href: '/contact' },
];

function ThemeToggle({ toggle, isDark, color }) {
  return (
    <button
      onClick={toggle}
      aria-label="Toggle theme"
      style={{
        width: 44, height: 24, borderRadius: 12,
        background: isDark ? 'rgba(255,255,255,0.1)' : 'rgba(0,0,0,0.08)',
        border: `1px solid ${isDark ? 'rgba(255,255,255,0.15)' : 'rgba(0,0,0,0.12)'}`,
        position: 'relative', cursor: 'pointer',
        transition: 'background 0.2s, border-color 0.2s',
        padding: 0, display: 'flex', alignItems: 'center',
      }}
    >
      <motion.div
        animate={{ x: isDark ? 22 : 2 }}
        transition={{ type: 'spring', damping: 15, stiffness: 200 }}
        style={{
          width: 20, height: 20, borderRadius: '50%',
          background: isDark ? '#1c1c1e' : '#ffffff',
          boxShadow: '0 1px 3px rgba(0,0,0,0.2)',
          display: 'flex', alignItems: 'center', justifyContent: 'center',
        }}
      >
        <motion.div
          key={isDark ? 'moon' : 'sun'}
          initial={{ rotate: -90, opacity: 0, scale: 0.5 }}
          animate={{ rotate: 0, opacity: 1, scale: 1 }}
          transition={{ duration: 0.25 }}
        >
          {isDark ? <Moon size={11} color="#f5f5f7" /> : <Sun size={11} color="#ff9f0a" />}
        </motion.div>
      </motion.div>
    </button>
  );
}

export default function Navbar() {
  const { theme, toggle } = useTheme();
  const pathname = usePathname();
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [activeDropdown, setActiveDropdown] = useState(null);
  const dropdownRef = useRef(null);
  const isDark = theme === 'dark';

  // Scroll progress bar
  const { scrollYProgress } = useScroll();

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 60);
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  useEffect(() => { setMobileOpen(false); setActiveDropdown(null); }, [pathname]);

  useEffect(() => {
    const handler = (e) => {
      if (dropdownRef.current && !dropdownRef.current.contains(e.target)) {
        setActiveDropdown(null);
      }
    };
    document.addEventListener('mousedown', handler);
    return () => document.removeEventListener('mousedown', handler);
  }, []);

  const isActive = (href) => pathname === href;

  const isHeroPage = ['/', '/about', '/sports', '/programs', '/join', '/events', '/staff', '/players', '/faq', '/news', '/contact'].includes(pathname);
  const textColor = !scrolled && isHeroPage ? '#ffffff' : 'var(--text-primary)';
  const mutedColor = !scrolled && isHeroPage ? 'rgba(255,255,255,0.5)' : 'var(--text-tertiary)';

  return (
    <>
      {/* Scroll Progress Bar — rainbow */}
      <motion.div
        style={{
          position: 'fixed', top: 0, left: 0, right: 0,
          height: 2, zIndex: 1001,
          background: 'linear-gradient(90deg, #ff375f, #ff9f0a, #ffd60a, #30d158, #5ac8fa, #0071e3, #bf5af2)',
          scaleX: scrollYProgress,
          transformOrigin: 'left',
        }}
      />

      <nav
        ref={dropdownRef}
        style={{
          position: 'fixed',
          top: 2, left: 0, right: 0,
          zIndex: 999,
          height: 52,
          display: 'flex', alignItems: 'center',
          transition: 'all 400ms cubic-bezier(0.16, 1, 0.3, 1)',
          background: scrolled
            ? (isDark ? 'rgba(0,0,0,0.82)' : 'rgba(255,255,255,0.82)')
            : 'transparent',
          backdropFilter: scrolled ? 'blur(24px) saturate(180%)' : 'none',
          WebkitBackdropFilter: scrolled ? 'blur(24px) saturate(180%)' : 'none',
          borderBottom: scrolled
            ? `1px solid ${isDark ? 'rgba(255,255,255,0.06)' : 'rgba(0,0,0,0.06)'}`
            : '1px solid transparent',
          boxShadow: scrolled ? 'var(--shadow-sm)' : 'none',
        }}
      >
        <div className="container" style={{ display: 'flex', alignItems: 'center' }}>
          {/* Logo */}
          <Link href="/" style={{ display: 'flex', alignItems: 'center', gap: 8, flexShrink: 0 }}>
            <div style={{
              width: 28, height: 28, borderRadius: 7,
              background: 'linear-gradient(135deg, #0071e3, #5ac8fa)',
              display: 'flex', alignItems: 'center', justifyContent: 'center',
            }}>
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none">
                <path d="M12 2L4 7V17L12 22L20 17V7L12 2Z" stroke="white" strokeWidth="2.5" strokeLinejoin="round" fill="rgba(255,255,255,0.2)" />
              </svg>
            </div>
            <span style={{
              fontFamily: 'Poppins, sans-serif', fontWeight: 700,
              fontSize: 14, color: textColor, letterSpacing: '-0.02em',
              transition: 'color 0.3s',
            }}>Sportech</span>
          </Link>

          {/* Desktop Links (centered) */}
          <div className="desktop-nav" style={{
            display: 'flex', alignItems: 'center', gap: 0,
            marginLeft: 'auto', marginRight: 'auto',
          }}>
            {navLinks.map((link) =>
              link.children ? (
                <div key={link.label} style={{ position: 'relative' }}>
                  <button
                    onClick={() => setActiveDropdown(activeDropdown === link.label ? null : link.label)}
                    style={{
                      display: 'flex', alignItems: 'center', gap: 3,
                      padding: '6px 12px', borderRadius: 6,
                      background: 'none', border: 'none',
                      fontSize: 14, fontWeight: 400,
                      color: textColor, cursor: 'pointer',
                      opacity: 0.7, transition: 'opacity 0.15s',
                      letterSpacing: '-0.01em',
                    }}
                    onMouseEnter={e => e.currentTarget.style.opacity = '1'}
                    onMouseLeave={e => e.currentTarget.style.opacity = '0.7'}
                  >
                    {link.label}
                    <ChevronDown size={12} />
                  </button>

                  <AnimatePresence>
                    {activeDropdown === link.label && (
                      <motion.div
                        initial={{ opacity: 0, y: 8, scale: 0.96 }}
                        animate={{ opacity: 1, y: 0, scale: 1 }}
                        exit={{ opacity: 0, y: 8, scale: 0.96 }}
                        transition={{ duration: 0.18, ease: [0.16, 1, 0.3, 1] }}
                        style={{
                          position: 'absolute', top: '100%', left: '50%',
                          transform: 'translateX(-50%)',
                          marginTop: 8, width: 220,
                          background: isDark ? 'rgba(28,28,30,0.95)' : 'rgba(255,255,255,0.98)',
                          backdropFilter: 'blur(40px) saturate(200%)',
                          WebkitBackdropFilter: 'blur(40px) saturate(200%)',
                          border: `1px solid ${isDark ? 'rgba(255,255,255,0.08)' : 'rgba(0,0,0,0.06)'}`,
                          borderRadius: 14,
                          padding: 6,
                          boxShadow: isDark ? 'var(--shadow-xl)' : 'var(--shadow-lg)',
                        }}
                      >
                        {link.children.map(child => (
                          <Link key={child.href} href={child.href}
                            style={{
                              display: 'block', padding: '10px 12px', borderRadius: 8,
                              transition: 'background 0.12s',
                              background: isActive(child.href) ? 'rgba(0,113,227,0.1)' : 'transparent',
                            }}
                            onMouseEnter={e => { if (!isActive(child.href)) e.currentTarget.style.background = isDark ? 'rgba(255,255,255,0.05)' : 'rgba(0,0,0,0.03)'; }}
                            onMouseLeave={e => { if (!isActive(child.href)) e.currentTarget.style.background = 'transparent'; }}
                          >
                            <div style={{ fontSize: 14, fontWeight: 500, color: isActive(child.href) ? 'var(--accent-blue)' : 'var(--text-primary)' }}>
                              {child.label}
                            </div>
                            <div style={{ fontSize: 12, color: 'var(--text-tertiary)', marginTop: 1 }}>
                              {child.desc}
                            </div>
                          </Link>
                        ))}
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
              ) : (
                <Link key={link.href} href={link.href}
                  style={{
                    display: 'flex', flexDirection: 'column', alignItems: 'center',
                    padding: '6px 12px', borderRadius: 6,
                    fontSize: 14, fontWeight: 400,
                    color: isActive(link.href) ? 'var(--accent-blue)' : textColor,
                    opacity: isActive(link.href) ? 1 : 0.7,
                    transition: 'opacity 0.15s, color 0.15s',
                    letterSpacing: '-0.01em',
                    position: 'relative',
                  }}
                  onMouseEnter={e => e.currentTarget.style.opacity = '1'}
                  onMouseLeave={e => { if (!isActive(link.href)) e.currentTarget.style.opacity = '0.7'; }}
                >
                  {link.label}
                  {/* Active dot indicator */}
                  {isActive(link.href) && (
                    <motion.div
                      layoutId="nav-dot"
                      initial={{ scale: 0 }}
                      animate={{ scale: 1 }}
                      transition={{ type: 'spring', damping: 20, stiffness: 300 }}
                      style={{
                        width: 3, height: 3, borderRadius: '50%',
                        background: 'var(--accent-blue)',
                        position: 'absolute',
                        bottom: 0,
                      }}
                    />
                  )}
                </Link>
              )
            )}
          </div>

          {/* Right Controls */}
          <div style={{ display: 'flex', alignItems: 'center', gap: 12, flexShrink: 0 }}>
            <ThemeToggle toggle={toggle} isDark={isDark} color={textColor} />

            <Link href="/join">
              <motion.div
                whileHover={{ scale: 1.03, y: -1 }}
                whileTap={{ scale: 0.97 }}
                className="join-cta"
                style={{
                  padding: '7px 18px', borderRadius: 980,
                  background: 'var(--accent-blue)',
                  color: '#fff', fontWeight: 500,
                  fontSize: 14, cursor: 'pointer',
                  boxShadow: 'var(--shadow-glow-blue)',
                  letterSpacing: '-0.01em',
                }}
              >
                Join
              </motion.div>
            </Link>

            {/* Mobile hamburger — 2 lines */}
            <button
              onClick={() => setMobileOpen(!mobileOpen)}
              className="mobile-menu-btn"
              aria-label="Menu"
              style={{
                display: 'none',
                width: 36, height: 36, borderRadius: 8,
                alignItems: 'center', justifyContent: 'center',
                background: 'none', border: 'none',
                color: textColor, cursor: 'pointer',
              }}
            >
              {mobileOpen ? <X size={18} /> : <Menu size={18} />}
            </button>
          </div>
        </div>
      </nav>

      {/* Mobile Fullscreen Menu */}
      <AnimatePresence>
        {mobileOpen && (
          <motion.div
            initial={{ opacity: 0, y: '-100%' }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: '-100%' }}
            transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
            style={{
              position: 'fixed',
              inset: 0,
              top: 54,
              zIndex: 998,
              background: isDark ? 'rgba(0,0,0,0.95)' : 'rgba(255,255,255,0.98)',
              backdropFilter: 'blur(48px) saturate(200%)',
              WebkitBackdropFilter: 'blur(48px) saturate(200%)',
              padding: '32px 24px',
              display: 'flex', flexDirection: 'column', gap: 4,
              overflowY: 'auto',
            }}
          >
            {navLinks.map((link) =>
              link.children ? (
                <div key={link.label}>
                  <div style={{ fontSize: 12, fontWeight: 600, color: 'var(--text-tertiary)', textTransform: 'uppercase', letterSpacing: '0.08em', padding: '16px 0 8px' }}>
                    {link.label}
                  </div>
                  {link.children.map(child => (
                    <Link key={child.href} href={child.href}
                      style={{
                        display: 'block', padding: '14px 0',
                        fontSize: 32, fontWeight: 300,
                        color: isActive(child.href) ? 'var(--accent-blue)' : 'var(--text-primary)',
                        borderBottom: '1px solid var(--border-subtle)',
                        letterSpacing: '-0.02em',
                      }}
                    >
                      {child.label}
                    </Link>
                  ))}
                </div>
              ) : (
                <Link key={link.href} href={link.href}
                  style={{
                    display: 'block', padding: '14px 0',
                    fontSize: 36, fontWeight: 300,
                    color: isActive(link.href) ? 'var(--accent-blue)' : 'var(--text-primary)',
                    borderBottom: '1px solid var(--border-subtle)',
                    letterSpacing: '-0.02em',
                  }}
                >
                  {link.label}
                </Link>
              )
            )}
            <div style={{ marginTop: 'auto', paddingTop: 24, display: 'flex', alignItems: 'center', gap: 12 }}>
              <ThemeToggle toggle={toggle} isDark={isDark} />
              <span style={{ fontSize: 14, color: 'var(--text-tertiary)' }}>
                {isDark ? 'Dark' : 'Light'} Mode
              </span>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      <style>{`
                @media (max-width: 768px) {
                    .mobile-menu-btn { display: flex !important; }
                    .desktop-nav { display: none !important; }
                    .join-cta { display: none !important; }
                }
            `}</style>
    </>
  );
}
