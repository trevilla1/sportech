'use client';
import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import initialFaqs from '@/data/faq.json';
import { Plus, Edit, Trash2, X, Save } from 'lucide-react';
const blank = { question: '', answer: '', category: 'Registration & Enrollment', popular: false, views: 0 };
const cats = ['Registration & Enrollment', 'Programs & Training', 'Payment & Fees', 'Sports & Activities', 'Age Categories & Requirements', 'Facilities & Equipment', 'Coaches & Staff', 'Policies & Rules', 'Safety & Health'];
export default function AdminFAQ() {
    const [faqs, setFaqs] = useState(initialFaqs);
    const [modal, setModal] = useState(null);
    const [form, setForm] = useState(blank);
    const [editId, setEditId] = useState(null);
    const openAdd = () => { setForm(blank); setEditId(null); setModal('form'); };
    const openEdit = (f) => { setForm({ ...f }); setEditId(f.id); setModal('form'); };
    const handleDelete = (id) => setFaqs(faqs.filter(f => f.id !== id));
    const handleSave = () => { if (editId) setFaqs(faqs.map(f => f.id === editId ? { ...form, id: editId } : f)); else setFaqs([...faqs, { ...form, id: String(Date.now()) }]); setModal(null); };
    return (
        <>
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 28 }}>
                <div><h2 style={{ fontFamily: 'Poppins', fontWeight: 800, fontSize: '1.3rem' }}>FAQ Management</h2><p style={{ color: 'var(--text-muted)', fontSize: '0.85rem', marginTop: 4 }}>{faqs.length} questions</p></div>
                <button className="btn btn-primary" onClick={openAdd}><Plus size={16} /> Add FAQ</button>
            </div>
            <div style={{ background: 'white', borderRadius: 'var(--radius-lg)', border: '1px solid var(--border-light)', overflow: 'hidden' }}>
                <div className="table-wrapper">
                    <table>
                        <thead><tr><th>Question</th><th>Category</th><th>Views</th><th>Popular</th><th>Actions</th></tr></thead>
                        <tbody>
                            {faqs.map(f => (
                                <tr key={f.id}>
                                    <td style={{ fontWeight: 600, maxWidth: 300 }}>{f.question}</td>
                                    <td><span style={{ fontSize: '0.7rem', fontWeight: 700, padding: '2px 7px', borderRadius: 'var(--radius-full)', background: '#0057FF15', color: '#0057FF' }}>{f.category}</span></td>
                                    <td>{f.views}</td>
                                    <td>{f.popular ? <span style={{ color: '#F59E0B', fontWeight: 700 }}>⭐ Yes</span> : '—'}</td>
                                    <td><div style={{ display: 'flex', gap: 6 }}>
                                        <button onClick={() => openEdit(f)} style={{ padding: '6px', borderRadius: 8, background: 'var(--ice-blue)', border: 'none', cursor: 'pointer', color: 'var(--primary)' }}><Edit size={14} /></button>
                                        <button onClick={() => handleDelete(f.id)} style={{ padding: '6px', borderRadius: 8, background: '#FEE2E2', border: 'none', cursor: 'pointer', color: '#EF4444' }}><Trash2 size={14} /></button>
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
                        <motion.div className="modal" initial={{ scale: 0.85, opacity: 0 }} animate={{ scale: 1, opacity: 1 }} exit={{ scale: 0.85, opacity: 0 }} onClick={e => e.stopPropagation()} style={{ maxWidth: 600 }}>
                            <div className="modal-header"><h3 style={{ fontFamily: 'Poppins', fontWeight: 800 }}>{editId ? 'Edit FAQ' : 'Add FAQ'}</h3><button onClick={() => setModal(null)} style={{ background: 'var(--off-white)', border: 'none', borderRadius: '50%', width: 32, height: 32, display: 'flex', alignItems: 'center', justifyContent: 'center', cursor: 'pointer' }}><X size={16} /></button></div>
                            <div className="modal-body">
                                <div className="form-group"><label className="form-label">Question</label><input className="input" value={form.question} onChange={e => setForm({ ...form, question: e.target.value })} /></div>
                                <div className="form-group"><label className="form-label">Answer</label><textarea className="input" rows={4} value={form.answer} onChange={e => setForm({ ...form, answer: e.target.value })} /></div>
                                <div className="grid-2" style={{ gap: 16 }}>
                                    <div className="form-group" style={{ marginBottom: 0 }}><label className="form-label">Category</label><select className="input" value={form.category} onChange={e => setForm({ ...form, category: e.target.value })}>{cats.map(c => <option key={c}>{c}</option>)}</select></div>
                                    <div className="form-group" style={{ marginBottom: 0 }}><label className="form-label">Mark as Popular</label>
                                        <label style={{ display: 'flex', alignItems: 'center', gap: 8, marginTop: 10, cursor: 'pointer' }}>
                                            <input type="checkbox" checked={form.popular} onChange={e => setForm({ ...form, popular: e.target.checked })} style={{ width: 16, height: 16, accentColor: 'var(--primary)' }} />
                                            <span style={{ fontWeight: 600, fontSize: '0.875rem' }}>Popular question</span>
                                        </label>
                                    </div>
                                </div>
                            </div>
                            <div className="modal-footer"><button className="btn btn-primary" onClick={handleSave}><Save size={15} /> Save</button><button className="btn btn-secondary" onClick={() => setModal(null)}>Cancel</button></div>
                        </motion.div>
                    </motion.div>
                )}
            </AnimatePresence>
        </>
    );
}
