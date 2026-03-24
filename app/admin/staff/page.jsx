'use client';
import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import initialStaff from '@/data/staff.json';
import { Plus, Edit, Trash2, X, Save } from 'lucide-react';
const blank = { name: '', role: '', sport: [], bio: '', qualifications: [], experience: '', email: '', phone: '' };

export default function AdminStaff() {
    const [staff, setStaff] = useState(initialStaff);
    const [modal, setModal] = useState(null);
    const [form, setForm] = useState(blank);
    const [editId, setEditId] = useState(null);
    const openAdd = () => { setForm(blank); setEditId(null); setModal('form'); };
    const openEdit = (s) => { setForm({ ...s }); setEditId(s.id); setModal('form'); };
    const handleDelete = (id) => setStaff(staff.filter(s => s.id !== id));
    const handleSave = () => {
        if (editId) setStaff(staff.map(s => s.id === editId ? { ...form, id: editId } : s));
        else setStaff([...staff, { ...form, id: String(Date.now()) }]);
        setModal(null);
    };
    return (
        <>
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 28 }}>
                <div>
                    <h2 style={{ fontFamily: 'Poppins', fontWeight: 800, fontSize: '1.3rem' }}>Staff Management</h2>
                    <p style={{ color: 'var(--text-muted)', fontSize: '0.85rem', marginTop: 4 }}>{staff.length} staff members</p>
                </div>
                <button className="btn btn-primary" onClick={openAdd}><Plus size={16} /> Add Staff</button>
            </div>
            <div style={{ background: 'white', borderRadius: 'var(--radius-lg)', border: '1px solid var(--border-light)', overflow: 'hidden' }}>
                <div className="table-wrapper">
                    <table>
                        <thead><tr><th>Name</th><th>Role</th><th>Sport(s)</th><th>Experience</th><th>Email</th><th>Actions</th></tr></thead>
                        <tbody>
                            {staff.map(s => (
                                <tr key={s.id}>
                                    <td style={{ fontWeight: 600 }}>{s.name}</td>
                                    <td><span style={{ fontSize: '0.75rem', fontWeight: 700, padding: '3px 8px', borderRadius: 'var(--radius-full)', background: '#0057FF15', color: '#0057FF' }}>{s.role}</span></td>
                                    <td>{s.sport.join(', ')}</td>
                                    <td>{s.experience}</td>
                                    <td style={{ fontSize: '0.8rem', color: 'var(--text-muted)' }}>{s.email}</td>
                                    <td><div style={{ display: 'flex', gap: 6 }}>
                                        <button onClick={() => openEdit(s)} style={{ padding: '6px', borderRadius: 8, background: 'var(--ice-blue)', border: 'none', cursor: 'pointer', color: 'var(--primary)' }}><Edit size={14} /></button>
                                        <button onClick={() => handleDelete(s.id)} style={{ padding: '6px', borderRadius: 8, background: '#FEE2E2', border: 'none', cursor: 'pointer', color: '#EF4444' }}><Trash2 size={14} /></button>
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
                        <motion.div className="modal" initial={{ scale: 0.85, opacity: 0 }} animate={{ scale: 1, opacity: 1 }} exit={{ scale: 0.85, opacity: 0 }} onClick={e => e.stopPropagation()}>
                            <div className="modal-header">
                                <h3 style={{ fontFamily: 'Poppins', fontWeight: 800 }}>{editId ? 'Edit Staff' : 'Add Staff'}</h3>
                                <button onClick={() => setModal(null)} style={{ background: 'var(--off-white)', border: 'none', borderRadius: '50%', width: 32, height: 32, display: 'flex', alignItems: 'center', justifyContent: 'center', cursor: 'pointer' }}><X size={16} /></button>
                            </div>
                            <div className="modal-body">
                                <div className="grid-2" style={{ gap: 16 }}>
                                    {[{ label: 'Full Name', key: 'name' }, { label: 'Role', key: 'role' }, { label: 'Experience', key: 'experience' }, { label: 'Email', key: 'email' }, { label: 'Phone', key: 'phone' }].map(({ label, key }) => (
                                        <div key={key} className="form-group" style={{ marginBottom: 0 }}>
                                            <label className="form-label">{label}</label>
                                            <input className="input" value={form[key] || ''} onChange={e => setForm({ ...form, [key]: e.target.value })} />
                                        </div>
                                    ))}
                                    <div className="form-group" style={{ gridColumn: 'span 2', marginBottom: 0 }}>
                                        <label className="form-label">Bio</label>
                                        <textarea className="input" rows={3} value={form.bio} onChange={e => setForm({ ...form, bio: e.target.value })} />
                                    </div>
                                </div>
                            </div>
                            <div className="modal-footer">
                                <button className="btn btn-primary" onClick={handleSave}><Save size={15} /> Save</button>
                                <button className="btn btn-secondary" onClick={() => setModal(null)}>Cancel</button>
                            </div>
                        </motion.div>
                    </motion.div>
                )}
            </AnimatePresence>
        </>
    );
}
