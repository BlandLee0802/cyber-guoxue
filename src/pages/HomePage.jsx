import { Link } from 'react-router-dom';
import { motion, useScroll, useTransform } from 'framer-motion';
import { useRef } from 'react';

function FadeIn({ children, delay = 0, className = '' }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 50 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-80px' }}
      transition={{ duration: 0.8, delay, ease: [0.25, 0.46, 0.45, 0.94] }}
      className={className}
    >
      {children}
    </motion.div>
  );
}

export default function HomePage() {
  const heroRef = useRef(null);
  const { scrollYProgress } = useScroll({ target: heroRef, offset: ['start start', 'end start'] });
  const heroOpacity = useTransform(scrollYProgress, [0, 0.5], [1, 0]);

  return (
    <div className="min-h-screen">
      {/* ===== HERO ===== */}
      <section ref={heroRef} className="relative min-h-screen flex items-center justify-center overflow-hidden">
        {/* Background */}
        <motion.div style={{ opacity: heroOpacity }} className="absolute inset-0">
          <div className="absolute inset-0" style={{
            background: 'linear-gradient(170deg, #FAF9F6 0%, #F0EDE6 40%, #E8E2D8 100%)'
          }} />
          {/* Subtle grid */}
          <div className="absolute inset-0 opacity-[0.03]" style={{
            backgroundImage: 'linear-gradient(#B8860B 1px, transparent 1px), linear-gradient(90deg, #B8860B 1px, transparent 1px)',
            backgroundSize: '80px 80px',
          }} />
          {/* Floating elements */}
          <motion.div className="absolute top-[15%] left-[10%] text-6xl text-gold/[0.06] heading-xl select-none"
            animate={{ y: [-8, 8, -8] }} transition={{ duration: 8, repeat: Infinity }}>易</motion.div>
          <motion.div className="absolute top-[25%] right-[15%] text-5xl text-gold/[0.05] heading-xl select-none"
            animate={{ y: [8, -8, 8] }} transition={{ duration: 7, repeat: Infinity }}>道</motion.div>
          <motion.div className="absolute bottom-[30%] left-[20%] text-7xl text-gold/[0.04] heading-xl select-none"
            animate={{ y: [-5, 12, -5] }} transition={{ duration: 9, repeat: Infinity }}>卦</motion.div>
          <motion.div className="absolute bottom-[20%] right-[10%] text-4xl text-gold/[0.06] heading-xl select-none"
            animate={{ y: [10, -5, 10] }} transition={{ duration: 6, repeat: Infinity }}>命</motion.div>
        </motion.div>

        {/* Content */}
        <motion.div style={{ opacity: heroOpacity }} className="relative z-10 text-center px-6 max-w-3xl">
          <motion.div initial={{ opacity: 0, y: 40 }} animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, ease: [0.25, 0.46, 0.45, 0.94] }}>
            {/* Label */}
            <div className="inline-flex items-center gap-3 mb-10">
              <div className="w-8 h-px bg-gold-soft" />
              <span className="text-xs tracking-[0.4em] text-ink-light" style={{ fontFamily: 'var(--font-display)' }}>
                AI 赋能 · 国学智慧
              </span>
              <div className="w-8 h-px bg-gold-soft" />
            </div>

            {/* Title */}
            <h1 className="heading-xl text-6xl md:text-8xl lg:text-9xl text-ink mb-4">时代更迭</h1>
            <div className="flex items-center justify-center gap-6 mb-4">
              <div className="w-16 h-px bg-gradient-to-r from-transparent to-gold-soft" />
              <span className="text-gold heading-xl text-2xl">·</span>
              <div className="w-16 h-px bg-gradient-to-l from-transparent to-gold-soft" />
            </div>
            <h2 className="heading-xl text-5xl md:text-7xl lg:text-8xl text-gold mb-12">赛博国学</h2>

            {/* Description */}
            <p className="text-ink-light text-lg md:text-xl leading-relaxed mb-4 max-w-xl mx-auto">
              融合千年国学智慧与现代 AI 技术
            </p>
            <p className="text-ink-muted text-base mb-16">
              开启专属于你的智慧人生指引
            </p>

            {/* CTA */}
            <Link to="/input">
              <motion.button className="btn-primary text-base"
                whileHover={{ scale: 1.04 }} whileTap={{ scale: 0.97 }}>
                开始测算
              </motion.button>
            </Link>
          </motion.div>
        </motion.div>

        {/* Scroll hint */}
        <motion.div className="absolute bottom-10 left-1/2 -translate-x-1/2"
          animate={{ y: [0, 8, 0], opacity: [0.3, 0.7, 0.3] }}
          transition={{ duration: 2, repeat: Infinity }}>
          <svg width="20" height="30" viewBox="0 0 20 30" fill="none" className="text-ink-muted">
            <rect x="1" y="1" width="18" height="28" rx="9" stroke="currentColor" strokeWidth="1.5" />
            <motion.circle cx="10" cy="10" r="2" fill="currentColor"
              animate={{ y: [0, 8, 0] }} transition={{ duration: 1.5, repeat: Infinity }} />
          </svg>
        </motion.div>
      </section>

      {/* ===== VISION ===== */}
      <section className="py-32 px-6">
        <div className="section-container">
          <FadeIn>
            <div className="text-center mb-20">
              <span className="text-gold text-xs tracking-[0.4em] heading-md">壹</span>
              <h2 className="heading-lg text-3xl md:text-4xl text-ink mt-3">何为赛博国学</h2>
              <div className="w-12 h-px bg-gold-soft mx-auto mt-6" />
            </div>
          </FadeIn>

          <div className="grid md:grid-cols-2 gap-8">
            <FadeIn delay={0.1}>
              <div className="card-gold h-full">
                <div className="flex items-center gap-4 mb-8">
                  <div className="w-14 h-14 rounded-2xl bg-ink flex items-center justify-center">
                    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#C9A96E" strokeWidth="1.5">
                      <path d="M12 2L2 7l10 5 10-5-10-5zM2 17l10 5 10-5M2 12l10 5 10-5" />
                    </svg>
                  </div>
                  <div>
                    <h3 className="heading-lg text-2xl text-ink">赛博</h3>
                    <p className="text-xs text-gold tracking-[0.3em] mt-0.5">CYBER · 未来</p>
                  </div>
                </div>
                <p className="text-ink-light leading-relaxed text-[0.95rem]">
                  代表数字、科技与未来，是对传统文化的解构与重塑。我们用现代 AI 技术重新诠释古老的东方智慧，
                  让复杂的命理推演变得精准、高效、触手可及。
                </p>
              </div>
            </FadeIn>

            <FadeIn delay={0.25}>
              <div className="card-gold h-full">
                <div className="flex items-center gap-4 mb-8">
                  <div className="w-14 h-14 rounded-2xl bg-ink flex items-center justify-center">
                    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#C9A96E" strokeWidth="1.5">
                      <circle cx="12" cy="12" r="10" />
                      <path d="M12 6v6l4 2" />
                    </svg>
                  </div>
                  <div>
                    <h3 className="heading-lg text-2xl text-ink">国学</h3>
                    <p className="text-xs text-gold tracking-[0.3em] mt-0.5">ROOT · 根源</p>
                  </div>
                </div>
                <p className="text-ink-light leading-relaxed text-[0.95rem]">
                  代表文化、智慧与根源，是民族精神的传承与积淀。千年易学、八字命理在数字时代焕发新生，
                  为现代人提供更便捷、更科学的个性化人生指引。
                </p>
              </div>
            </FadeIn>
          </div>

          <FadeIn delay={0.3}>
            <p className="text-center text-ink-light text-lg leading-relaxed mt-16 max-w-2xl mx-auto heading-md">
              "我们旨在通过 AI 技术，让古老的国学智慧在数字时代焕发新生，<br className="hidden md:block" />
              为现代人提供更便捷、更科学的人生指引。"
            </p>
          </FadeIn>
        </div>
      </section>

      {/* ===== FEATURES ===== */}
      <section className="py-32 px-6 bg-bg-warm">
        <div className="section-container">
          <FadeIn>
            <div className="text-center mb-20">
              <span className="text-gold text-xs tracking-[0.4em] heading-md">贰</span>
              <h2 className="heading-lg text-3xl md:text-4xl text-ink mt-3">核心功能</h2>
              <div className="w-12 h-px bg-gold-soft mx-auto mt-6" />
            </div>
          </FadeIn>

          <div className="grid md:grid-cols-3 gap-6">
            {[
              { step: '01', title: '输入信息', desc: '填写姓名、出生地、公历生日与时间，系统自动采集数据。', icon: 'M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z' },
              { step: '02', title: 'AI 智能推演', desc: 'DeepSeek 大模型自动完成农历转换、真太阳时计算、八字排盘与深度分析。', icon: 'M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z' },
              { step: '03', title: '获取报告', desc: '生成详尽的命理分析报告，支持在线查看与 PDF 下载保存。', icon: 'M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z' },
            ].map((item, i) => (
              <FadeIn key={i} delay={i * 0.15}>
                <div className="card group cursor-default">
                  <div className="flex items-center justify-between mb-6">
                    <span className="heading-xl text-4xl text-gold/[0.15] group-hover:text-gold/30 transition-colors">{item.step}</span>
                    <div className="w-11 h-11 rounded-full bg-bg-warm flex items-center justify-center">
                      <svg className="w-5 h-5 text-gold" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="1.5">
                        <path strokeLinecap="round" strokeLinejoin="round" d={item.icon} />
                      </svg>
                    </div>
                  </div>
                  <h3 className="heading-md text-xl text-ink mb-3">{item.title}</h3>
                  <p className="text-ink-light text-sm leading-relaxed">{item.desc}</p>
                </div>
              </FadeIn>
            ))}
          </div>
        </div>
      </section>

      {/* ===== DESIGN ===== */}
      <section className="py-32 px-6">
        <div className="section-container">
          <FadeIn>
            <div className="text-center mb-20">
              <span className="text-gold text-xs tracking-[0.4em] heading-md">叁</span>
              <h2 className="heading-lg text-3xl md:text-4xl text-ink mt-3">设计美学</h2>
              <p className="text-ink-muted text-sm mt-3">新中式 · 科技感 · 简洁高端</p>
              <div className="w-12 h-px bg-gold-soft mx-auto mt-6" />
            </div>
          </FadeIn>

          {/* Color palette */}
          <FadeIn delay={0.1}>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-5 mb-16">
              {[
                { name: '月白', color: '#FAF9F6', text: 'dark' },
                { name: '玄墨', color: '#1A1A1A', text: 'light' },
                { name: '墨灰', color: '#8A8A8A', text: 'light' },
                { name: '赤金', color: '#B8860B', text: 'light' },
              ].map((c) => (
                <motion.div key={c.name} whileHover={{ y: -4 }} className="rounded-2xl overflow-hidden shadow-sm">
                  <div className="h-28" style={{ background: c.color }} />
                  <div className="p-4 bg-bg-card text-center">
                    <p className={`heading-md text-base ${c.text === 'light' ? 'text-ink' : 'text-ink-light'}`}>{c.name}</p>
                    <p className={`text-xs mt-1 ${c.text === 'light' ? 'text-ink-muted' : 'text-ink-muted'}`}>{c.color}</p>
                  </div>
                </motion.div>
              ))}
            </div>
          </FadeIn>

          {/* Typography */}
          <div className="grid md:grid-cols-2 gap-5">
            <FadeIn delay={0.15}>
              <div className="card">
                <p className="text-xs text-gold tracking-[0.3em] mb-2">标题字体</p>
                <h3 className="heading-lg text-2xl text-ink mb-1">思源宋体 Noto Serif</h3>
                <p className="text-ink-muted text-sm mb-4">典雅庄重，传承中式韵味</p>
                <p className="heading-xl text-lg text-ink/80">天地玄黄，宇宙洪荒</p>
              </div>
            </FadeIn>
            <FadeIn delay={0.25}>
              <div className="card">
                <p className="text-xs text-gold tracking-[0.3em] mb-2">正文字体</p>
                <h3 className="text-2xl font-medium text-ink mb-1">思源黑体 Noto Sans</h3>
                <p className="text-ink-muted text-sm mb-4">清晰现代，确保阅读体验</p>
                <p className="text-lg text-ink/80">日月盈昃，辰宿列张</p>
              </div>
            </FadeIn>
          </div>
        </div>
      </section>

      {/* ===== CTA ===== */}
      <section className="py-32 px-6 bg-ink text-white relative overflow-hidden">
        <div className="absolute inset-0 opacity-[0.02]" style={{
          backgroundImage: 'radial-gradient(circle at 2px 2px, #C9A96E 1px, transparent 0)',
          backgroundSize: '40px 40px',
        }} />
        <FadeIn>
          <div className="section-container text-center relative z-10">
            <h2 className="heading-xl text-3xl md:text-5xl mb-6" style={{ color: '#C9A96E' }}>
              开启智慧人生
            </h2>
            <p className="text-white/50 text-lg mb-12 max-w-lg mx-auto leading-relaxed">
              传承千年智慧，AI 为你指引方向
            </p>
            <Link to="/input">
              <motion.button className="btn-primary"
                style={{ background: 'transparent', border: '1px solid #C9A96E', color: '#C9A96E' }}
                whileHover={{ scale: 1.04, background: '#C9A96E', color: '#1A1A1A' }}
                whileTap={{ scale: 0.97 }}>
                立即体验
              </motion.button>
            </Link>
          </div>
        </FadeIn>
      </section>

      {/* ===== FOOTER ===== */}
      <footer className="py-10 px-6 border-t border-divider">
        <div className="section-container flex flex-col md:flex-row items-center justify-between gap-4">
          <p className="text-ink-muted text-sm heading-md">赛博国学</p>
          <div className="flex items-center gap-6">
            <Link to="/history" className="text-ink-light hover:text-gold text-sm transition-colors">历史记录</Link>
            <span className="text-ink-muted text-xs">© 2026</span>
          </div>
        </div>
      </footer>
    </div>
  );
}
