import { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { motion } from 'framer-motion';

export default function InputPage() {
  const navigate = useNavigate();
  const [form, setForm] = useState({ name: '', gender: '?', birthProvince: '', birthCity: '', birthDate: '', birthTime: '' });
  const [errors, setErrors] = useState({});

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm({ ...form, [name]: value });
    if (errors[name]) setErrors({ ...errors, [name]: '' });
  };

  const validate = () => {
    const e = {};
    if (!form.name.trim()) e.name = '?????';
    if (!form.birthProvince.trim()) e.birthProvince = '?????';
    if (!form.birthCity.trim()) e.birthCity = '?????';
    if (!form.birthDate) e.birthDate = '?????';
    if (!form.birthTime) e.birthTime = '?????';
    setErrors(e);
    return Object.keys(e).length === 0;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!validate()) return;
    sessionStorage.setItem('guoxue_input', JSON.stringify(form));
    navigate('/processing');
  };

  return (
    <div className="min-h-screen bg-bg">
      <header className="py-6 px-6">
        <div className="container flex items-center justify-between">
          <Link to="/" className="text-ink-light hover:text-ink text-sm transition-colors" style={{ fontFamily: 'var(--font-display)', letterSpacing: '0.05em' }}>? ??</Link>
          <span className="text-ink-muted text-xs tracking-[0.3em]" style={{ fontFamily: 'var(--font-display)' }}>????</span>
        </div>
      </header>

      <div className="max-w-xl mx-auto px-6 pb-32 pt-10 md:pt-16">
        <motion.div initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, ease: [0.22, 0.61, 0.36, 1] }}>
          <div className="text-center mb-14">
            <div className="inline-flex items-center gap-4 mb-6">
              <div className="w-10 h-px bg-gold-soft" />
              <span className="text-ink-light tracking-[0.4em] text-xs" style={{ fontFamily: 'var(--font-display)' }}>???</span>
              <div className="w-10 h-px bg-gold-soft" />
            </div>
            <h1 className="text-ink" style={{ fontFamily: 'var(--font-display)', fontWeight: 700, fontSize: 'clamp(1.75rem, 4vw, 2.5rem)', letterSpacing: '0.06em' }}>
              ??????
            </h1>
            <p className="text-ink-light text-base mt-3">?????????,???????????</p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-8">
            <div>
              <label className="text-xs tracking-[0.2em] text-ink-light block mb-2" style={{ fontFamily: 'var(--font-display)' }}>??</label>
              <input type="text" name="name" value={form.name} onChange={handleChange} placeholder="?????" className="input-field" />
              {errors.name && <p className="text-red-400 text-xs mt-2">{errors.name}</p>}
            </div>

            <div>
              <label className="text-xs tracking-[0.2em] text-ink-light block mb-3" style={{ fontFamily: 'var(--font-display)' }}>??</label>
              <div className="flex gap-4">
                {['?', '?'].map((g) => (
                  <button key={g} type="button" onClick={() => setForm({ ...form, gender: g })}
                    className={`flex-1 py-3.5 rounded-xl text-center transition-all duration-300 border text-base
                      ${form.gender === g
                        ? 'border-gold bg-gold-glow text-gold'
                        : 'border-divider bg-transparent text-ink-light hover:border-ink-muted'}`}
                    style={{ fontFamily: 'var(--font-display)', fontWeight: 500 }}>
                    {g}
                  </button>
                ))}
              </div>
            </div>

            <div className="grid grid-cols-2 gap-6">
              <div>
                <label className="text-xs tracking-[0.2em] text-ink-light block mb-2" style={{ fontFamily: 'var(--font-display)' }}>????</label>
                <input type="text" name="birthProvince" value={form.birthProvince} onChange={handleChange} placeholder="?:???" className="input-field" />
                {errors.birthProvince && <p className="text-red-400 text-xs mt-2">{errors.birthProvince}</p>}
              </div>
              <div>
                <label className="text-xs tracking-[0.2em] text-ink-light block mb-2" style={{ fontFamily: 'var(--font-display)' }}>????</label>
                <input type="text" name="birthCity" value={form.birthCity} onChange={handleChange} placeholder="?:???" className="input-field" />
                {errors.birthCity && <p className="text-red-400 text-xs mt-2">{errors.birthCity}</p>}
              </div>
            </div>

            <div className="grid grid-cols-2 gap-6">
              <div>
                <label className="text-xs tracking-[0.2em] text-ink-light block mb-2" style={{ fontFamily: 'var(--font-display)' }}>????</label>
                <input type="date" name="birthDate" value={form.birthDate} onChange={handleChange} className="input-field text-base" />
                {errors.birthDate && <p className="text-red-400 text-xs mt-2">{errors.birthDate}</p>}
              </div>
              <div>
                <label className="text-xs tracking-[0.2em] text-ink-light block mb-2" style={{ fontFamily: 'var(--font-display)' }}>????</label>
                <input type="time" name="birthTime" value={form.birthTime} onChange={handleChange} className="input-field text-base" />
                {errors.birthTime && <p className="text-red-400 text-xs mt-2">{errors.birthTime}</p>}
              </div>
            </div>

            <p className="text-ink-muted text-sm">????????????????????</p>

            <div className="pt-4">
              <motion.button type="submit" className="btn-primary w-full"
                whileHover={{ scale: 1.01 }} whileTap={{ scale: 0.99 }}>
                ????,????
              </motion.button>
            </div>
          </form>
        </motion.div>
      </div>
    </div>
  );
}
