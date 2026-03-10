import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';

const steps = [
  { icon: '??', title: '????', desc: '??????' },
  { icon: '??', title: '????', desc: '???????' },
  { icon: '??', title: '????', desc: '??????' },
  { icon: '?', title: 'AI ??', desc: 'DeepSeek ????' },
];

export default function ProcessingPage() {
  const navigate = useNavigate();
  const [step, setStep] = useState(0);
  const [error, setError] = useState(null);

  useEffect(() => {
    let cancelled = false;
    async function fetchReport() {
      try {
        const input = JSON.parse(sessionStorage.getItem('guoxue_input'));
        if (!input) { navigate('/input'); return; }

        const isLocal = window.location.hostname === 'localhost' || window.location.hostname === '127.0.0.1';
        const apiBase = isLocal ? 'http://127.0.0.1:9999' : window.location.origin;
        const apiPath = isLocal ? '/api/report' : '/api/report';

        const timers = [];
        timers.push(setTimeout(() => { if (!cancelled) setStep(1); }, 800));
        timers.push(setTimeout(() => { if (!cancelled) setStep(2); }, 2500));
        timers.push(setTimeout(() => { if (!cancelled) setStep(3); }, 4500));

        const res = await fetch(`${apiBase}/api/report`, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(input),
        });
        if (!res.ok) {
          const errData = await res.json().catch(() => ({}));
          throw new Error(errData.error || `API Error: ${res.status}`);
        }
        const report = await res.json();
        if (cancelled) return;
        sessionStorage.setItem('guoxue_report', JSON.stringify(report));
        setStep(4);
        setTimeout(() => { if (!cancelled) navigate('/report'); }, 600);
      } catch (err) {
        if (cancelled) return;
        setError(err.message);
      }
    }
    fetchReport();
    return () => { cancelled = true; };
  }, [navigate]);

  if (error) {
    return (
      <div className="min-h-screen bg-bg flex items-center justify-center px-6">
        <div className="text-center max-w-md">
          <p className="text-6xl mb-8">??</p>
          <h2 className="text-ink mb-4" style={{ fontFamily: 'var(--font-display)', fontSize: '1.75rem', fontWeight: 600 }}>??????</h2>
          <p className="text-ink-light text-base mb-10 leading-relaxed">{error}</p>
          <div className="flex gap-4 justify-center">
            <button onClick={() => window.location.reload()} className="btn-primary text-sm">??</button>
            <button onClick={() => navigate('/input')} className="btn-outline text-sm">????</button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-ink flex items-center justify-center relative overflow-hidden">
      <div className="absolute inset-0 opacity-[0.02]" style={{
        backgroundImage: 'radial-gradient(circle at 1px 1px, #C9A96E 1px, transparent 0)',
        backgroundSize: '32px 32px',
      }} />
      <motion.div className="absolute w-[450px] h-[450px] rounded-full border border-white/[0.03]"
        animate={{ rotate: 360 }} transition={{ duration: 25, repeat: Infinity, ease: 'linear' }} />
      <motion.div className="absolute w-[300px] h-[300px] rounded-full border border-white/[0.05]"
        animate={{ rotate: -360 }} transition={{ duration: 18, repeat: Infinity, ease: 'linear' }} />

      <div className="relative z-10 text-center px-6 max-w-sm w-full">
        <motion.div className="text-7xl mb-12"
          animate={{ rotate: 360 }} transition={{ duration: 10, repeat: Infinity, ease: 'linear' }}>?</motion.div>

        <h2 className="text-white mb-2" style={{ fontFamily: 'var(--font-display)', fontSize: '1.5rem', fontWeight: 600, letterSpacing: '0.08em' }}>AI ?????</h2>
        <p className="text-white/35 text-sm mb-14">???,??????...</p>

        <div className="space-y-3 text-left">
          {steps.map((s, i) => {
            const done = i < step;
            const active = i === step;
            return (
              <motion.div key={i} initial={{ opacity: 0.15, x: -8 }}
                animate={{ opacity: active || done ? 1 : 0.15, x: 0 }} transition={{ duration: 0.5 }}
                className={`flex items-center gap-5 px-6 py-4 rounded-2xl transition-all duration-500
                  ${active ? 'bg-white/[0.05] border border-gold-soft/20' : 'border border-transparent'}`}>
                <span className="text-xl w-8 text-center">{done ? '?' : s.icon}</span>
                <div className="flex-1">
                  <p className={`text-sm ${active ? 'text-gold-soft' : done ? 'text-white/50' : 'text-white/20'}`}
                    style={{ fontFamily: 'var(--font-display)', fontWeight: 500 }}>{s.title}</p>
                  <p className={`text-xs mt-0.5 ${active ? 'text-white/40' : 'text-white/12'}`}>{s.desc}</p>
                </div>
                {active && <motion.div className="w-2 h-2 rounded-full bg-gold-soft"
                  animate={{ scale: [1, 1.4, 1], opacity: [0.4, 1, 0.4] }} transition={{ duration: 1.2, repeat: Infinity }} />}
              </motion.div>
            );
          })}
        </div>

        {step === 4 && (
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="mt-10">
            <p className="text-gold-soft text-sm" style={{ fontFamily: 'var(--font-display)' }}>????,??????...</p>
          </motion.div>
        )}
      </div>
    </div>
  );
}
