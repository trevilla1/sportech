'use client';
import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import initialEvents from '@/data/events.json';
import { Plus, Edit, Trash2, X, Save } from 'lucide-react';

const blank = { title: '', description: '', date: '', endDate: '', time: '', location: '', sport: '', category: 'Tournament', status: 'upcoming', capacity: 100, registered: 0, fee: '', ageGroups: ['10-15', '16-21'], registrationOpen: true };

export default function AdminEvents() {
    const [events, setEvents] = useState(initialEvents);
    const [modal, setModal] = useState(null);
    const [form, setForm] = useState(blank);
    const [editId, setEditId] = useState(null);

    const openAdd = () => { setForm(blank); setEditId(null); setModal('form'); };
    const openEdit = (ev) => { setForm({ ...ev }); setEditId(ev.id); setModal('form'); };
    const handleDelete = (id) => setEvents(events.filter(e => e.id !== id));
    const handleSave = () => {
        if (editId) setEvents(events.map(e => e.id === editId ? { ...form, id: editId } : e));
        else setEvents([...events, { ...form, id: String(Date.now()) }]);
        setModal(null);
    };

    return (
        <>
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 28 }}>
                <div>
                    <h2 style={{ fontFamily: 'Poppins', fontWeight: 800, fontSize: '1.3rem' }}>Events Management</h2>
                    <p style={{ color: 'var(--text-muted)', fontSize: '0.85rem', marginTop: 4 }}>{events.length} total events</p>
                </div>
                <button className="btn btn-primary" onClick={openAdd}>
                    <Plus size={16} /> Add Event
                </button>
            </div>

            <div style={{ background: 'white', borderRadius: 'var(--radius-lg)', border: '1px solid var(--border-light)', boxShadow: 'var(--shadow-sm)', overflow: 'hidden' }}>
                <div className="table-wrapper">
                    <table>
                        <thead><tr><th>Title</th><th>Date</th><th>Sport</th><th>Category</th><th>Capacity</th><th>Status</th><th>Actions</th></tr></thead>
                        <tbody>
                            {events.map(ev => (
                                <tr key={ev.id}>
                                    <td style={{ fontWeight: 600 }}>{ev.title}</td>
                                    <td style={{ whiteSpace: 'nowrap' }}>{ev.date}</td>
                                    <td>{ev.sport}</td>
                                    <td>{ev.category}</td>
                                    <td>{ev.registered}/{ev.capacity}</td>
                                    <td>
                                        <span style={{ fontSize: '0.75rem', fontWeight: 700, padding: '3px 8px', borderRadius: 'var(--radius-full)', background: ev.status === 'upcoming' ? '#0057FF15' : ev.status === 'past' ? '#6B7BA415' : '#10B98115', color: ev.status === 'upcoming' ? '#0057FF' : ev.status === 'past' ? '#6B7BA4' : '#10B981', textTransform: 'capitalize' }}>{ev.status}</span>
                                    </td>
                                    <td>
                                        <div style={{ display: 'flex', gap: 6 }}>
                                            <button onClick={() => openEdit(ev)} style={{ padding: '6px', borderRadius: 8, background: 'var(--ice-blue)', border: 'none', cursor: 'pointer', color: 'var(--primary)' }}><Edit size={14} /></button>
                                            <button onClick={() => handleDelete(ev.id)} style={{ padding: '6px', borderRadius: 8, background: '#FEE2E2', border: 'none', cursor: 'pointer', color: '#EF4444' }}><Trash2 size={14} /></button>
                                        </div>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </div>

            {/* Modal */}
            <AnimatePresence>
                {modal === 'form' && (
                    <motion.div className="modal-overlay" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} onClick={() => setModal(null)}>
                        <motion.div className="modal" initial={{ scale: 0.85, opacity: 0 }} animate={{ scale: 1, opacity: 1 }} exit={{ scale: 0.85, opacity: 0 }} onClick={e => e.stopPropagation()} style={{ maxWidth: 680 }}>
                            <div className="modal-header">
                                <h3 style={{ fontFamily: 'Poppins', fontWeight: 800 }}>{editId ? 'Edit Event' : 'Add New Event'}</h3>
                                <button onClick={() => setModal(null)} style={{ background: 'var(--off-white)', border: 'none', borderRadius: '50%', width: 32, height: 32, display: 'flex', alignItems: 'center', justifyContent: 'center', cursor: 'pointer' }}><X size={16} /></button>
                            </div>
                            <div className="modal-body">
                                <div className="grid-2" style={{ gap: 16 }}>
                                    {[
                                        { label: 'Event Title', key: 'title', type: 'text', full: true },
                                        { label: 'Start Date', key: 'date', type: 'date' },
                                        { label: 'End Date', key: 'endDate', type: 'date' },
                                        { label: 'Time', key: 'time', type: 'time' },
                                        { label: 'Location', key: 'location', type: 'text' },
                                        { label: 'Sport', key: 'sport', type: 'text' },
                                        { label: 'Entry Fee', key: 'fee', type: 'text' },
                                        { label: 'Capacity', key: 'capacity', type: 'number' },
                                    ].map(({ label, key, type, full }) => (
                                        <div key={key} className="form-group" style={{ gridColumn: full ? 'span 2' : 'span 1', marginBottom: 0 }}>
                                            <label className="form-label">{label}</label>
                                            <input className="input" type={type} value={form[key] || ''} onChange={e => setForm({ ...form, [key]: e.target.value })} />
                                        </div>
                                    ))}
                                    <div className="form-group" style={{ marginBottom: 0 }}>
                                        <label className="form-label">Category</label>
                                        <select className="input" value={form.category} onChange={e => setForm({ ...form, category: e.target.value })}>
                                            {['Tournament', 'Competition', 'Camp', 'Award Ceremony', 'Social Event', 'Fundraiser'].map(c => <option key={c}>{c}</option>)}
                                        </select>
                                    </div>
                                    <div className="form-group" style={{ marginBottom: 0 }}>
                                        <label className="form-label">Status</label>
                                        <select className="input" value={form.status} onChange={e => setForm({ ...form, status: e.target.value })}>
                                            {['upcoming', 'ongoing', 'past'].map(s => <option key={s}>{s}</option>)}
                                        </select>
                                    </div>
                                    <div className="form-group" style={{ gridColumn: 'span 2', marginBottom: 0 }}>
                                        <label className="form-label">Description</label>
                                        <textarea className="input" rows={3} value={form.description} onChange={e => setForm({ ...form, description: e.target.value })} />
                                    </div>
                                </div>
                            </div>
                            <div className="modal-footer">
                                <button className="btn btn-primary" onClick={handleSave}><Save size={15} /> Save Event</button>
                                <button className="btn btn-secondary" onClick={() => setModal(null)}>Cancel</button>
                            </div>
                        </motion.div>
                    </motion.div>
                )}
            </AnimatePresence>
        </>
    );
}
