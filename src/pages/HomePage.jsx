import { Link } from 'react-router-dom';
import { motion, useScroll, useTransform, useRef } from 'react';

function Fade({ children, delay = 0, className = '' }) {
  return (
    <motion.div initial={{ opacity: 0, y: 40 }} whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-60px' }}
      transition={{ duration: 0.7, delay, ease: [0.22, 0.61, 0.36, 1] }} className={className}>
      {children}
    </motion.div>
  );
}

function SectionLabel({ num, title, subtitle }) {
  return (
    <Fade>
      <div className="text-center mb-16 md:mb-20">
        <span className="text-gold text-xs tracking-[0.5em]" style={{ fontFamily: 'var(--font-display)' }}>{num}</span>
        <h2 className="mt-3 text-ink" style={{ fontFamily: 'var(--font-display)', fontSize: 'clamp(1.75rem, 4vw, 2.75rem)', fontWeight: 600, letterSpacing: '0.04em' }}>{title}</h2>
        {subtitle && <p className="text-ink-light mt-3 text-sm md:text-base">{subtitle}</p>}
        <div className="w-12 h-px bg-gold-soft mx-auto mt-6" />
      </div>
    </Fade>
  );
}

export default function HomePage() {
  const heroRef = useRef(null);
  const { scrollYProgress } = useScroll({ target: heroRef, offset: ['start start', 'end start'] });
  const heroOpacity = useTransform(scrollYProgress, [0, 0.6], [1, 0]);

  return (
    <div>
      {/* ===== HERO ===== */}
      <section ref={heroRef} className="relative min-h-screen flex items-center justify-center overflow-hidden">
        <motion.div style={{ opacity: heroOpacity }} className="absolute inset-0">
          <div className="absolute inset-0" style={{ background: 'linear-gradient(175deg, #FAFAF8 0%, #F0EDE6 50%, #E8E2D8 100%)' }} />
          <div className="absolute inset-0 opacity-[0.025]" style={{
            backgroundImage: 'linear-gradient(var(--color-gold) 1px, transparent 1px), linear-gradient(90deg, var(--color-gold) 1px, transparent 1px)',
            backgroundSize: '100px 100px',
          }} />
          <motion.div className="absolute top-[12%] left-[8%] select-none" style={{ fontFamily: 'var(--font-display)', fontSize: 'clamp(4rem, 10vw, 8rem)', color: 'rgba(184,134,11,0.04)' }}
            animate={{ y: [-8, 8, -8] }} transition={{ duration: 8, repeat: Infinity }}>易</motion.div>
          <motion.div className="absolute top-[22%] right-[12%] select-none" style={{ fontFamily: 'var(--font-display)', fontSize: 'clamp(3rem, 8vw, 6rem)', color: 'rgba(184,134,11,0.03)' }}
            animate={{ y: [8, -8, 8] }} transition={{ duration: 7, repeat: Infinity }}>道</motion.div>
          <motion.div className="absolute bottom-[25%] left-[15%] select-none" style={{ fontFamily: 'var(--font-display)', fontSize: 'clamp(5rem, 12vw, 9rem)', color: 'rgba(184,134,11,0.03)' }}
            animate={{ y: [-5, 12, -5] }} transition={{ duration: 9, repeat: Infinity }}>卦</motion.div>
        </motion.div>

        <motion.div style={{ opacity: heroOpacity }} className="relative z-10 text-center px-6 w-full max-w-4xl mx-auto">
          <motion.div initial={{ opacity: 0, y: 50 }} animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1.2, ease: [0.22, 0.61, 0.36, 1] }}>
            <div className="inline-flex items-center gap-4 mb-12">
              <div className="w-10 h-px bg-gold-soft" />
              <span className="text-ink-light tracking-[0.4em] text-xs md:text-sm" style={{ fontFamily: 'var(--font-display)' }}>
                AI 赋能 · 国学智慧
              </span>
              <div className="w-10 h-px bg-gold-soft" />
            </div>

            <h1 className="text-ink" style={{
              fontFamily: 'var(--font-display)', fontWeight: 700,
              fontSize: 'clamp(3rem, 9vw, 7rem)', letterSpacing: '0.1em', lineHeight: 1.15,
            }}>
              时代更迭
            </h1>

            <div className="flex items-center justify-center gap-8 my-5">
              <div className="w-20 h-px bg-gradient-to-r from-transparent to-gold-soft" />
              <span className="text-gold" style={{ fontFamily: 'var(--font-display)', fontSize: 'clamp(1.2rem, 3vw, 2rem)' }}>·</span>
              <div className="w-20 h-px bg-gradient-to-l from-transparent to-gold-soft" />
            </div>

            <h2 className="text-gold mb-14" style={{
              fontFamily: 'var(--font-display)', fontWeight: 700,
              fontSize: 'clamp(2.5rem, 7.5vw, 6rem)', letterSpacing: '0.1em', lineHeight: 1.15,
            }}>
              赛博国学
            </h2>

            <p className="text-ink-light text-lg md:text-xl mb-3 max-w-xl mx-auto leading-relaxed">
              融合千年国学智慧与现代 AI 技术
            </p>
            <p className="text-ink-muted text-base mb-16">
              开启专属于你的智慧人生指引
            </p>

            <Link to="/input">
              <motion.button className="btn-primary"
                whileHover={{ scale: 1.04 }} whileTap={{ scale: 0.97 }}>
                开始测算
              </motion.button>
            </Link>
          </motion.div>
        </motion.div>

        <motion.div className="absolute bottom-12 left-1/2 -translate-x-1/2"
          animate={{ y: [0, 8, 0], opacity: [0.2, 0.6, 0.2] }} transition={{ duration: 2.5, repeat: Infinity }}>
          <svg width="18" height="28" viewBox="0 0 18 28" fill="none" className="text-ink-muted">
            <rect x="1" y="1" width="16" height="26" rx="8" stroke="currentColor" strokeWidth="1.5" />
            <motion.circle cx="9" cy="9" r="1.5" fill="currentColor" animate={{ y: [0, 8, 0] }} transition={{ duration: 1.5, repeat: Infinity }} />
          </svg>
        </motion.div>
      </section>

      {/* ===== VISION ===== */}
      <section className="py-28 md:py-36 px-6">
        <div className="container">
          <SectionLabel num="壹" title="何为赛博国学" />
          <div className="grid md:grid-cols-2 gap-6 md:gap-8 max-w-5xl mx-auto">
            {[
              { title: '赛博', sub: 'CYBER · 未来', icon: (
                <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="#C9A96E" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M12 2L2 7l10 5 10-5-10-5zM2 17l10 5 10-5M2 12l10 5 10-5" />
                </svg>
              ), desc: '代表数字、科技与未来，是对传统文化的解构与重塑。我们用现代 AI 技术重新诠释古老的东方智慧，让复杂的命理推演变得精准、高效、触手可及。' },
              { title: '国学', sub: 'ROOT · 根源', icon: (
                <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="#C9A96E" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
                  <circle cx="12" cy="12" r="10" /><path d="M12 6v6l4 2" />
                </svg>
              ), desc: '代表文化、智慧与根源，是民族精神的传承与积淀。千年易学、八字命理在数字时代焕发新生，为现代人提供更便捷、更科学的个性化人生指引。' },
            ].map((item, i) => (
              <Fade key={i} delay={i * 0.12}>
                <div className="card-gold h-full">
                  <div className="flex items-center gap-5 mb-8">
                    <div className="w-14 h-14 rounded-2xl bg-ink flex items-center justify-center flex-shrink-0">
                      {item.icon}
                    </div>
                    <div>
                      <h3 className="text-ink" style={{ fontFamily: 'var(--font-display)', fontSize: 'clamp(1.3rem, 2.5vw, 1.8rem)', fontWeight: 600, letterSpacing: '0.05em' }}>{item.title}</h3>
                      <p className="text-gold text-xs tracking-[0.3em] mt-0.5">{item.sub}</p>
                    </div>
                  </div>
                  <p className="text-ink-light leading-relaxed" style={{ fontSize: 'clamp(0.9rem, 1.5vw, 1.05rem)' }}>{item.desc}</p>
                </div>
              </Fade>
            ))}
          </div>

          <Fade delay={0.25}>
            <p className="text-center text-ink-secondary text-lg md:text-xl leading-relaxed mt-16 max-w-2xl mx-auto" style={{ fontFamily: 'var(--font-display)', fontWeight: 500 }}>
              "让古老的国学智慧在数字时代焕发新生，为现代人提供更便捷、更科学的人生指引。"
            </p>
          </Fade>
        </div>
      </section>

      {/* ===== FEATURES ===== */}
      <section className="py-28 md:py-36 px-6 bg-bg-warm">
        <div className="container">
          <SectionLabel num="贰" title="核心功能" />
          <div className="grid md:grid-cols-3 gap-6 max-w-5xl mx-auto">
            {[
              { step: '01', title: '输入信息', desc: '填写姓名、出生地、公历生日与时间，系统自动采集数据。', icon: 'M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z' },
              { step: '02', title: 'AI 智能推演', desc: 'DeepSeek 大模型自动完成农历转换、真太阳时计算、八字排盘与深度分析。', icon: 'M13 10V3L4 14h7v7l9-11h-7z' },
              { step: '03', title: '获取报告', desc: '生成详尽的命理分析报告，涵盖财运、事业、感情、健康等七大维度。', icon: 'M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z' },
            ].map((item, i) => (
              <Fade key={i} delay={i * 0.12}>
                <div className="card h-full">
                  <div className="flex items-center justify-between mb-8">
                    <span className="text-gold" style={{ fontFamily: 'var(--font-display)', fontSize: 'clamp(2rem, 4vw, 3rem)', fontWeight: 700, opacity: 0.2 }}>{item.step}</span>
                    <div className="w-11 h-11 rounded-full bg-bg-warm flex items-center justify-center">
                      <svg className="w-5 h-5 text-gold" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
                        <path d={item.icon} />
                      </svg>
                    </div>
                  </div>
                  <h3 className="text-ink mb-3" style={{ fontFamily: 'var(--font-display)', fontSize: 'clamp(1.1rem, 2vw, 1.4rem)', fontWeight: 600 }}>{item.title}</h3>
                  <p className="text-ink-light leading-relaxed text-sm md:text-base">{item.desc}</p>
                </div>
              </Fade>
            ))}
          </div>
        </div>
      </section>

      {/* ===== DESIGN ===== */}
      <section className="py-28 md:py-36 px-6">
        <div className="container">
          <SectionLabel num="叁" title="设计美学" subtitle="新中式 · 科技感 · 简洁高端" />

          <Fade delay={0.1}>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-6 max-w-4xl mx-auto mb-16">
              {[
                { name: '月白', color: '#FAFAF8' },
                { name: '玄墨', color: '#1A1A1A' },
                { name: '墨灰', color: '#888888' },
                { name: '赤金', color: '#B8860B' },
              ].map((c) => (
                <motion.div key={c.name} whileHover={{ y: -4 }} className="rounded-2xl overflow-hidden border border-divider shadow-sm">
                  <div className="h-24 md:h-32" style={{ background: c.color }} />
                  <div className="p-4 text-center bg-bg-card">
                    <p className="text-ink" style={{ fontFamily: 'var(--font-display)', fontWeight: 500 }}>{c.name}</p>
                    <p className="text-ink-muted text-xs mt-1">{c.color}</p>
                  </div>
                </motion.div>
              ))}
            </div>
          </Fade>

          <div className="grid md:grid-cols-2 gap-6 max-w-4xl mx-auto">
            <Fade delay={0.15}>
              <div className="card">
                <p className="text-gold text-xs tracking-[0.3em] mb-3" style={{ fontFamily: 'var(--font-display)' }}>标题字体</p>
                <h3 className="text-ink mb-2" style={{ fontFamily: 'var(--font-display)', fontSize: '1.5rem', fontWeight: 600 }}>思源宋体</h3>
                <p className="text-ink-muted text-sm mb-5">典雅庄重，传承中式韵味</p>
                <p className="text-ink-secondary" style={{ fontFamily: 'var(--font-display)', fontSize: '1.2rem', fontWeight: 400 }}>天地玄黄，宇宙洪荒</p>
              </div>
            </Fade>
            <Fade delay={0.25}>
              <div className="card">
                <p className="text-gold text-xs tracking-[0.3em] mb-3" style={{ fontFamily: 'var(--font-display)' }}>正文字体</p>
                <h3 className="text-ink mb-2" style={{ fontSize: '1.5rem', fontWeight: 600 }}>思源黑体</h3>
                <p className="text-ink-muted text-sm mb-5">清晰现代，确保阅读体验</p>
                <p className="text-ink-secondary text-lg">日月盈昃，辰宿列张</p>
              </div>
            </Fade>
          </div>
        </div>
      </section>

      {/* ===== CTA ===== */}
      <section className="py-28 md:py-36 px-6 bg-ink text-white relative overflow-hidden">
        <div className="absolute inset-0 opacity-[0.015]" style={{
          backgroundImage: 'radial-gradient(circle at 2px 2px, #C9A96E 1px, transparent 0)',
          backgroundSize: '40px 40px',
        }} />
        <Fade>
          <div className="container text-center relative z-10">
            <h2 className="mb-6" style={{ fontFamily: 'var(--font-display)', fontWeight: 700, fontSize: 'clamp(1.75rem, 4vw, 3rem)', letterSpacing: '0.08em', color: '#C9A96E' }}>
              开启智慧人生
            </h2>
            <p className="text-white/40 text-lg mb-14 max-w-lg mx-auto leading-relaxed">传承千年智慧，AI 为你指引方向</p>
            <Link to="/input">
              <motion.button className="btn-primary" style={{ background: 'transparent', border: '1.5px solid #C9A96E', color: '#C9A96E' }}
                whileHover={{ scale: 1.04, background: '#C9A96E', color: '#1A1A1A' }} whileTap={{ scale: 0.97 }}>
                立即体验
              </motion.button>
            </Link>
          </div>
        </Fade>
      </section>

      {/* ===== FOOTER ===== */}
      <footer className="py-10 px-6 border-t border-divider">
        <div className="container flex flex-col md:flex-row items-center justify-between gap-4">
          <p className="text-ink-muted text-sm" style={{ fontFamily: 'var(--font-display)', letterSpacing: '0.1em' }}>赛博国学</p>
          <div className="flex items-center gap-6">
            <Link to="/history" className="text-ink-light hover:text-gold text-sm transition-colors">历史记录</Link>
            <span className="text-ink-muted text-xs">© 2026</span>
          </div>
        </div>
      </footer>
    </div>
  );
}
