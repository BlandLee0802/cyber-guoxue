import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';

const steps = [
  { icon: '📡', title: '接收信息', desc: '采集出生数据' },
  { icon: '📅', title: '历法换算', desc: '农历与真太阳时' },
  { icon: '☯️', title: '八字排盘', desc: '干支推演运算' },
  { icon: '✨', title: 'AI 分析', desc: 'DeepSeek 命理解析' },
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

        // Get API base URL
        const apiBase = window.location.hostname === 'localhost' || window.location.hostname === '127.0.0.1'
          ? 'http://127.0.0.1:9999'
          : window.location.origin;

        // Animate through steps 0-2 during API call
        const timers = [];
        timers.push(setTimeout(() => { if (!cancelled) setStep(1); }, 800));
        timers.push(setTimeout(() => { if (!cancelled) setStep(2); }, 2200));
        timers.push(setTimeout(() => { if (!cancelled) setStep(3); }, 4000));

        // Call API
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
        console.error('Report fetch error:', err);
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
          <p className="text-5xl mb-6">⚠️</p>
          <h2 className="heading-lg text-2xl text-ink mb-3">分析出现问题</h2>
          <p className="text-ink-light text-sm mb-8">{error}</p>
          <div className="flex gap-4 justify-center">
            <button onClick={() => window.location.reload()} className="btn-primary text-sm">重试</button>
            <button onClick={() => navigate('/input')} className="btn-outline text-sm">返回修改</button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-ink flex items-center justify-center relative overflow-hidden">
      {/* Background */}
      <div className="absolute inset-0 opacity-[0.03]" style={{
        backgroundImage: 'radial-gradient(circle at 1px 1px, #C9A96E 1px, transparent 0)',
        backgroundSize: '30px 30px',
      }} />

      {/* Rotating rings */}
      <motion.div className="absolute w-[500px] h-[500px] rounded-full border border-white/[0.04]"
        animate={{ rotate: 360 }} transition={{ duration: 25, repeat: Infinity, ease: 'linear' }} />
      <motion.div className="absolute w-[350px] h-[350px] rounded-full border border-white/[0.06]"
        animate={{ rotate: -360 }} transition={{ duration: 18, repeat: Infinity, ease: 'linear' }} />

      {/* Content */}
      <div className="relative z-10 text-center px-6 max-w-sm w-full">
        {/* Taiji */}
        <motion.div className="text-6xl mb-10"
          animate={{ rotate: 360 }} transition={{ duration: 10, repeat: Infinity, ease: 'linear' }}>
          ☯
        </motion.div>

        <h2 className="heading-xl text-2xl text-white mb-2">AI 命理分析中</h2>
        <p className="text-white/40 text-sm mb-12">请稍候，正在为您推演...</p>

        {/* Steps */}
        <div className="space-y-3 text-left">
          {steps.map((s, i) => {
            const done = i < step;
            const active = i === step;
            return (
              <motion.div key={i} initial={{ opacity: 0.2, x: -10 }}
                animate={{ opacity: active || done ? 1 : 0.2, x: 0 }}
                transition={{ duration: 0.5 }}
                className={`flex items-center gap-4 px-5 py-3.5 rounded-2xl transition-all duration-500
                  ${active ? 'bg-white/[0.06] border border-gold-soft/20' : 'border border-transparent'}`}>
                <span className="text-xl w-8 text-center">{done ? '✓' : s.icon}</span>
                <div className="flex-1">
                  <p className={`text-sm heading-md ${active ? 'text-gold-soft' : done ? 'text-white/60' : 'text-white/25'}`}>
                    {s.title}
                  </p>
                  <p className={`text-xs mt-0.5 ${active ? 'text-white/50' : 'text-white/15'}`}>{s.desc}</p>
                </div>
                {active && (
                  <motion.div className="w-2 h-2 rounded-full bg-gold-soft"
                    animate={{ scale: [1, 1.3, 1], opacity: [0.5, 1, 0.5] }}
                    transition={{ duration: 1.2, repeat: Infinity }} />
                )}
              </motion.div>
            );
          })}
        </div>

        {/* Step 4: Done */}
        {step === 4 && (
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="mt-8">
            <p className="text-gold-soft heading-md text-sm">分析完成，正在生成报告...</p>
          </motion.div>
        )}
      </div>
    </div>
  );
}
