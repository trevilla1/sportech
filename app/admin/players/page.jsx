'use client';
import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import initialPlayers from '@/data/players.json';
import { Plus, Edit, Trash2, X, Save } from 'lucide-react';
const blank = { name: '', sport: '', position: '', jerseyNumber: '', leg: 'Right', ageGroup: '10-15', photo: '' };
export default function AdminPlayers() {
    const [players, setPlayers] = useState(initialPlayers);
    const [modal, setModal] = useState(null);
    const [form, setForm] = useState(blank);
    const [editId, setEditId] = useState(null);
    const openAdd = () => { setForm(blank); setEditId(null); setModal('form'); };
    const openEdit = (p) => { setForm({ ...p }); setEditId(p.id); setModal('form'); };
    const handleDelete = (id) => setPlayers(players.filter(p => p.id !== id));
    const handleSave = () => { if (editId) setPlayers(players.map(p => p.id === editId ? { ...form, id: editId } : p)); else setPlayers([...players, { ...form, id: String(Date.now()) }]); setModal(null); };
    return (
        <>
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 28 }}>
                <div><h2 style={{ fontFamily: 'Poppins', fontWeight: 800, fontSize: '1.3rem' }}>Players Management</h2><p style={{ color: 'var(--text-muted)', fontSize: '0.85rem', marginTop: 4 }}>{players.length} players</p></div>
                <button className="btn btn-primary" onClick={openAdd}><Plus size={16} /> Add Player</button>
            </div>
            <div style={{ background: 'white', borderRadius: 'var(--radius-lg)', border: '1px solid var(--border-light)', overflow: 'hidden' }}>
                <div className="table-wrapper">
                    <table>
                        <thead><tr><th>#</th><th>Name</th><th>Sport</th><th>Position</th><th>Age Group</th><th>Leg</th><th>Actions</th></tr></thead>
                        <tbody>
                            {players.map(p => (
                                <tr key={p.id}>
                                    <td style={{ fontWeight: 800, color: 'var(--primary)' }}>{p.jerseyNumber}</td>
                                    <td style={{ fontWeight: 600 }}>{p.name}</td>
                                    <td><span style={{ fontSize: '0.75rem', fontWeight: 700, padding: '3px 8px', borderRadius: 'var(--radius-full)', background: '#0057FF15', color: '#0057FF' }}>{p.sport}</span></td>
                                    <td>{p.position}</td>
                                    <td>Ages {p.ageGroup}</td>
                                    <td>{p.leg}</td>
                                    <td><div style={{ display: 'flex', gap: 6 }}>
                                        <button onClick={() => openEdit(p)} style={{ padding: '6px', borderRadius: 8, background: 'var(--ice-blue)', border: 'none', cursor: 'pointer', color: 'var(--primary)' }}><Edit size={14} /></button>
                                        <button onClick={() => handleDelete(p.id)} style={{ padding: '6px', borderRadius: 8, background: '#FEE2E2', border: 'none', cursor: 'pointer', color: '#EF4444' }}><Trash2 size={14} /></button>
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
                        <motion.div className="modal" initial={{ scale: 0.85, opacity: 0 }} animate={{ scale: 1, opacity: 1 }} exit={{ scale: 0.85, opacity: 0 }} onClick={e => e.stopPropagation()} style={{ maxWidth: 520 }}>
                            <div className="modal-header"><h3 style={{ fontFamily: 'Poppins', fontWeight: 800 }}>{editId ? 'Edit Player' : 'Add Player'}</h3><button onClick={() => setModal(null)} style={{ background: 'var(--off-white)', border: 'none', borderRadius: '50%', width: 32, height: 32, display: 'flex', alignItems: 'center', justifyContent: 'center', cursor: 'pointer' }}><X size={16} /></button></div>
                            <div className="modal-body"><div className="grid-2" style={{ gap: 16 }}>
                                {[{ label: 'Full Name', key: 'name' }, { label: 'Sport', key: 'sport' }, { label: 'Position', key: 'position' }, { label: 'Jersey Number', key: 'jerseyNumber', type: 'number' }].map(({ label, key, type }) => (
                                    <div key={key} className="form-group" style={{ marginBottom: 0 }}><label className="form-label">{label}</label><input className="input" type={type || 'text'} value={form[key] || ''} onChange={e => setForm({ ...form, [key]: e.target.value })} /></div>
                                ))}
                                <div className="form-group" style={{ marginBottom: 0 }}><label className="form-label">Age Group</label><select className="input" value={form.ageGroup} onChange={e => setForm({ ...form, ageGroup: e.target.value })}>{['4-9', '10-15', '16-21'].map(a => <option key={a}>{a}</option>)}</select></div>
                                <div className="form-group" style={{ marginBottom: 0 }}><label className="form-label">Dominant Leg/Hand</label><select className="input" value={form.leg} onChange={e => setForm({ ...form, leg: e.target.value })}>{['Right', 'Left', 'Both', 'N/A'].map(l => <option key={l}>{l}</option>)}</select></div>
                            </div></div>
                            <div className="modal-footer"><button className="btn btn-primary" onClick={handleSave}><Save size={15} /> Save</button><button className="btn btn-secondary" onClick={() => setModal(null)}>Cancel</button></div>
                        </motion.div>
                    </motion.div>
                )}
            </AnimatePresence>
        </>
    );
}
