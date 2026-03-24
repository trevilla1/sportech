'use client';
import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import initialNews from '@/data/news.json';
import { Plus, Edit, Trash2, X, Save, Star } from 'lucide-react';
const blank = { title: '', excerpt: '', content: '', category: 'Academy Announcements', featured: false, date: '', author: '', slug: '', tags: [], likes: 0, comments: [] };
const cats = ['Academy Announcements', 'Player Achievements & Highlights', 'Event Updates & Results', 'Program Updates', 'Staff News', 'Community News', 'Success Stories'];
export default function AdminNews() {
    const [articles, setArticles] = useState(initialNews);
    const [modal, setModal] = useState(null);
    const [form, setForm] = useState(blank);
    const [editId, setEditId] = useState(null);
    const openAdd = () => { setForm({ ...blank, date: new Date().toISOString().split('T')[0] }); setEditId(null); setModal('form'); };
    const openEdit = (a) => { setForm({ ...a }); setEditId(a.id); setModal('form'); };
    const handleDelete = (id) => setArticles(articles.filter(a => a.id !== id));
    const handleSave = () => { if (editId) setArticles(articles.map(a => a.id === editId ? { ...form, id: editId } : a)); else setArticles([...articles, { ...form, id: String(Date.now()), slug: form.title.toLowerCase().replace(/\s+/g, '-').replace(/[^a-z0-9-]/g, '') }]); setModal(null); };
    return (
        <>
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 28 }}>
                <div><h2 style={{ fontFamily: 'Poppins', fontWeight: 800, fontSize: '1.3rem' }}>News Management</h2><p style={{ color: 'var(--text-muted)', fontSize: '0.85rem', marginTop: 4 }}>{articles.length} articles</p></div>
                <button className="btn btn-primary" onClick={openAdd}><Plus size={16} /> Write Article</button>
            </div>
            <div style={{ background: 'white', borderRadius: 'var(--radius-lg)', border: '1px solid var(--border-light)', overflow: 'hidden' }}>
                <div className="table-wrapper">
                    <table>
                        <thead><tr><th>Title</th><th>Category</th><th>Date</th><th>Author</th><th>Likes</th><th>Featured</th><th>Actions</th></tr></thead>
                        <tbody>
                            {articles.map(a => (
                                <tr key={a.id}>
                                    <td style={{ fontWeight: 600, maxWidth: 260 }}>{a.title}</td>
                                    <td><span style={{ fontSize: '0.7rem', fontWeight: 700, padding: '2px 7px', borderRadius: 'var(--radius-full)', background: '#0057FF15', color: '#0057FF' }}>{a.category}</span></td>
                                    <td style={{ whiteSpace: 'nowrap' }}>{a.date}</td>
                                    <td>{a.author}</td>
                                    <td>❤️ {a.likes}</td>
                                    <td>{a.featured ? <span style={{ color: '#F59E0B', fontWeight: 700 }}>⭐ Yes</span> : '—'}</td>
                                    <td><div style={{ display: 'flex', gap: 6 }}>
                                        <button onClick={() => openEdit(a)} style={{ padding: '6px', borderRadius: 8, background: 'var(--ice-blue)', border: 'none', cursor: 'pointer', color: 'var(--primary)' }}><Edit size={14} /></button>
                                        <button onClick={() => handleDelete(a.id)} style={{ padding: '6px', borderRadius: 8, background: '#FEE2E2', border: 'none', cursor: 'pointer', color: '#EF4444' }}><Trash2 size={14} /></button>
                                    </div></td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </div>
            <AnimatePresence>
                {modal === 'form' && (
                    <motion.div className="modal-overlay" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} onClick={() => setModal(null)}>
                        <motion.div className="modal" initial={{ scale: 0.85, opacity: 0 }} animate={{ scale: 1, opacity: 1 }} exit={{ scale: 0.85, opacity: 0 }} onClick={e => e.stopPropagation()} style={{ maxWidth: 680 }}>
                            <div className="modal-header"><h3 style={{ fontFamily: 'Poppins', fontWeight: 800 }}>{editId ? 'Edit Article' : 'New Article'}</h3><button onClick={() => setModal(null)} style={{ background: 'var(--off-white)', border: 'none', borderRadius: '50%', width: 32, height: 32, display: 'flex', alignItems: 'center', justifyContent: 'center', cursor: 'pointer' }}><X size={16} /></button></div>
                            <div className="modal-body">
                                <div className="form-group"><label className="form-label">Title</label><input className="input" value={form.title} onChange={e => setForm({ ...form, title: e.target.value })} /></div>
                                <div className="grid-2" style={{ gap: 16 }}>
                                    <div className="form-group" style={{ marginBottom: 0 }}><label className="form-label">Category</label><select className="input" value={form.category} onChange={e => setForm({ ...form, category: e.target.value })}>{cats.map(c => <option key={c}>{c}</option>)}</select></div>
                                    <div className="form-group" style={{ marginBottom: 0 }}><label className="form-label">Date</label><input className="input" type="date" value={form.date} onChange={e => setForm({ ...form, date: e.target.value })} /></div>
                                    <div className="form-group" style={{ marginBottom: 0 }}><label className="form-label">Author</label><input className="input" value={form.author} onChange={e => setForm({ ...form, author: e.target.value })} /></div>
                                    <div className="form-group" style={{ marginBottom: 0 }}>
                                        <label className="form-label">Featured</label>
                                        <label style={{ display: 'flex', alignItems: 'center', gap: 8, marginTop: 10, cursor: 'pointer' }}>
                                            <input type="checkbox" checked={form.featured} onChange={e => setForm({ ...form, featured: e.target.checked })} style={{ width: 16, height: 16, accentColor: 'var(--primary)' }} />
                                            <span style={{ fontWeight: 600, fontSize: '0.875rem' }}>⭐ Feature this article</span>
                                        </label>
                                    </div>
                                </div>
                                <div className="form-group"><label className="form-label">Excerpt</label><textarea className="input" rows={2} value={form.excerpt} onChange={e => setForm({ ...form, excerpt: e.target.value })} /></div>
                                <div className="form-group" style={{ marginBottom: 0 }}><label className="form-label">Full Content</label><textarea className="input" rows={5} value={form.content} onChange={e => setForm({ ...form, content: e.target.value })} /></div>
                            </div>
                            <div className="modal-footer"><button className="btn btn-primary" onClick={handleSave}><Save size={15} /> Publish</button><button className="btn btn-secondary" onClick={() => setModal(null)}>Cancel</button></div>
                        </motion.div>
                    </motion.div>
                )}
            </AnimatePresence>
        </>
    );
}
