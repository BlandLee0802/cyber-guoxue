import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { mockReport } from '../data/mockReport';

const tabs = [
  { key: 'overview', label: '缘主信息' },
  { key: 'bazi', label: '八字排盘' },
  { key: 'dayun', label: '大运流年' },
  { key: 'summary', label: '命局总论' },
  { key: 'fortune', label: '财运事业' },
  { key: 'love', label: '感情健康' },
  { key: 'tips', label: '转运技巧' },
];

export default function ReportPage() {
  const [activeTab, setActiveTab] = useState('overview');
  const [report, setReport] = useState(null);

  useEffect(() => {
    const saved = sessionStorage.getItem('guoxue_report');
    if (saved) { try { setReport(JSON.parse(saved)); } catch(e) {} }
    if (!saved) setReport(mockReport);
  }, []);

  if (!report) return <div className="min-h-screen bg-bg flex items-center justify-center"><p className="text-ink-muted">加载中...</p></div>;

  const u = report.userInfo;
  const b = report.baziChart;

  const labelCls = "text-xs tracking-[0.2em] text-ink-muted block mb-2";
  const headingCls = (size) => `text-ink ${size}`

  return (
    <div className="min-h-screen bg-bg pb-32">
      {/* Header */}
      <header className="bg-bg-card/80 backdrop-blur-xl sticky top-0 z-50 border-b border-divider no-print">
        <div className="container flex items-center justify-between" style={{ height: '4rem' }}>
          <Link to="/" className="text-ink-light hover:text-ink text-sm transition-colors" style={{ fontFamily: 'var(--font-display)', letterSpacing: '0.05em' }}>← 首页</Link>
          <span className="text-ink-muted text-xs tracking-[0.3em] hidden md:block" style={{ fontFamily: 'var(--font-display)' }}>命理分析报告</span>
          <div className="flex items-center gap-5">
            <Link to="/history" className="text-ink-light hover:text-gold text-sm transition-colors">历史</Link>
            <button onClick={() => window.print()}
              className="px-5 py-1.5 rounded-full border border-ink/10 text-ink-light text-xs hover:border-gold hover:text-gold transition-all">下载 PDF</button>
          </div>
        </div>
      </header>

      {/* Report Hero */}
      <div className="py-16 md:py-20 text-center bg-gradient-to-b from-bg-warm to-bg">
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6 }}>
          <div className="gold-line w-16 mx-auto mb-6" />
          <h1 className="text-ink" style={{ fontFamily: 'var(--font-display)', fontWeight: 700, fontSize: 'clamp(1.5rem, 3.5vw, 2.5rem)', letterSpacing: '0.06em' }}>命理分析报告</h1>
          <p className="text-ink-light mt-3 text-base">{u.name} · {u.birthDate} · {u.zodiac}</p>
        </motion.div>
      </div>

      {/* Tabs */}
      <div className="sticky top-16 z-40 bg-bg/90 backdrop-blur-xl border-b border-divider no-print">
        <div className="container py-3">
          <div className="tab-bar">
            {tabs.map((t) => (
              <button key={t.key} onClick={() => setActiveTab(t.key)}
                className={`tab-item ${activeTab === t.key ? 'active' : ''}`}>{t.label}</button>
            ))}
          </div>
        </div>
      </div>

      {/* Content */}
      <div className="container mt-10 md:mt-12 max-w-5xl mx-auto">
        {/* OVERVIEW */}
        {activeTab === 'overview' && (
          <Fade>
            <SectionHead num="壹" title="缘主信息" />
            <div className="grid md:grid-cols-2 gap-6">
              <div className="card-gold">
                <h3 className="text-gold text-sm tracking-[0.2em] mb-6" style={{ fontFamily: 'var(--font-display)' }}>基本信息</h3>
                <InfoRow label="姓名" value={u.name} />
                <InfoRow label="性别" value={u.gender} />
                <InfoRow label="年龄" value={`${u.age} 岁`} />
                <InfoRow label="生肖" value={u.zodiac} />
                <InfoRow label="星座" value={u.constellation} />
              </div>
              <div className="card-gold">
                <h3 className="text-gold text-sm tracking-[0.2em] mb-6" style={{ fontFamily: 'var(--font-display)' }}>时空坐标</h3>
                <InfoRow label="公历" value={u.birthDate} />
                <InfoRow label="农历" value={u.lunarDate} />
                <InfoRow label="真太阳时" value={u.trueSolarTime} />
                <InfoRow label="出生地" value={u.birthPlace} />
              </div>
            </div>
          </Fade>
        )}

        {/* BAZI */}
        {activeTab === 'bazi' && (
          <Fade>
            <SectionHead num="贰" title="八字排盘" />
            <div className="card-gold mb-6">
              <h3 className="text-gold text-sm tracking-[0.2em] mb-8 text-center" style={{ fontFamily: 'var(--font-display)' }}>四柱命盘</h3>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                {b.pillars.map((p, i) => (
                  <motion.div key={i} initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: i * 0.1 }} className="bazi-pillar">
                    <p className="text-ink-muted text-xs mb-3" style={{ fontFamily: 'var(--font-display)' }}>{p.title}</p>
                    <div className="stem-box">{p.stem}</div>
                    <div className="branch-box">{p.branch}</div>
                    <p className="text-ink-muted text-xs mt-2">{p.stemGod} / {p.branchGod}</p>
                  </motion.div>
                ))}
              </div>
            </div>
            <div className="card overflow-x-auto">
              <table className="w-full min-w-[600px]">
                <thead>
                  <tr className="border-b border-divider-strong">
                    <th className="text-left py-4 px-5 text-ink-light text-xs font-normal" style={{ fontFamily: 'var(--font-display)' }}>项目</th>
                    {b.pillars.map((p) => <th key={p.title} className="text-center py-4 px-3 text-xs" style={{ fontFamily: 'var(--font-display)' }}>{p.title}</th>)}
                  </tr>
                </thead>
                <tbody className="text-sm">
                  <tr className="border-b border-divider">
                    <td className="py-4 px-5 text-ink-light text-sm">藏干</td>
                    {b.hiddenStems.map((hs, i) => (
                      <td key={i} className="py-4 px-3 text-center text-xs text-ink-secondary">{hs.stems.map((s, j) => <div key={j} className="py-0.5">{s}</div>)}</td>
                    ))}
                  </tr>
                  <tr className="border-b border-divider">
                    <td className="py-4 px-5 text-ink-light text-sm">纳音</td>
                    {b.nayin.map((n, i) => <td key={i} className="py-4 px-3 text-center text-gold text-sm" style={{ fontFamily: 'var(--font-display)' }}>{n}</td>)}
                  </tr>
                  <tr className="border-b border-divider">
                    <td className="py-4 px-5 text-ink-light text-sm">星运</td>
                    {b.starFate.map((s, i) => <td key={i} className="py-4 px-3 text-center text-sm" style={{ fontFamily: 'var(--font-display)' }}>{s}</td>)}
                  </tr>
                  <tr className="border-b border-divider">
                    <td className="py-4 px-5 text-ink-light text-sm">神煞</td>
                    {b.shenSha.map((s, i) => <td key={i} className="py-4 px-3 text-center text-gold text-xs">{s}</td>)}
                  </tr>
                  <tr>
                    <td className="py-4 px-5 text-ink-light text-sm">空亡</td>
                    <td colSpan={4} className="py-4 px-3 text-center text-red-400 text-sm" style={{ fontFamily: 'var(--font-display)' }}>{b.kongWang.desc}</td>
                  </tr>
                </tbody>
              </table>
            </div>
          </Fade>
        )}

        {/* DAYUN */}
        {activeTab === 'dayun' && (
          <Fade>
            <SectionHead num="叁" title="大运流年" sub={report.daYun.startRule} />
            <div className="card-gold">
              <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
                {report.daYun.periods.map((p, i) => {
                  const isCurrent = p.startAge <= (report.daYun.currentAge || 30) && p.startAge + 10 > (report.daYun.currentAge || 30);
                  return (
                    <motion.div key={i} initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }} transition={{ delay: i * 0.06 }}
                      className={`p-5 md:p-6 rounded-2xl border transition-all ${isCurrent ? 'border-gold bg-gold-glow' : 'border-divider hover:border-gold-border'}`}>
                      {isCurrent && <span className="text-[0.65rem] text-gold bg-gold-glow px-2.5 py-0.5 rounded-full" style={{ fontFamily: 'var(--font-display)' }}>当前大运</span>}
                      <p className="text-ink-muted text-xs mt-2" style={{ fontFamily: 'var(--font-display)' }}>{p.ageRange}</p>
                      <p className="text-ink my-2" style={{ fontFamily: 'var(--font-display)', fontSize: 'clamp(1.5rem, 2.5vw, 2rem)', fontWeight: 700 }}>{p.pillar}</p>
                      <p className="text-ink-light text-sm leading-relaxed">{p.detail}</p>
                    </motion.div>
                  );
                })}
              </div>
            </div>
          </Fade>
        )}

        {/* SUMMARY */}
        {activeTab === 'summary' && (
          <Fade>
            <SectionHead num="肆" title="命局总论" />
            <div className="space-y-6">
              {[
                { icon: '☯️', title: '十神配置综合分析', text: report.mingJuSummary.tenGodAnalysis },
                { icon: '🎭', title: '核心性格特质', text: report.mingJuSummary.personality },
                { icon: '⭐', title: '天赋潜能与格局', text: report.mingJuSummary.talent },
              ].map((item, i) => (
                <motion.div key={i} initial={{ opacity: 0, y: 15 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: i * 0.1 }} className="card-gold">
                  <div className="flex items-center gap-3 mb-5">
                    <span className="text-2xl">{item.icon}</span>
                    <h3 className="text-ink" style={{ fontFamily: 'var(--font-display)', fontSize: 'clamp(1.1rem, 2vw, 1.4rem)', fontWeight: 600 }}>{item.title}</h3>
                  </div>
                  <p className="text-ink-secondary leading-[1.9] text-base">{item.text}</p>
                </motion.div>
              ))}
            </div>
          </Fade>
        )}

        {/* FORTUNE */}
        {activeTab === 'fortune' && (
          <Fade>
            <SectionHead num="伍" title="财运 & 事业" />
            <div className="grid md:grid-cols-2 gap-6">
              <DetailCard title="💰 财运分析" items={[
                { label: '财富走势', value: report.fortune.wealth.trend },
                { label: '合作建议', value: report.fortune.wealth.cooperation },
                { label: '风险规避', value: report.fortune.wealth.risk },
              ]} />
              <DetailCard title="📈 事业前程" items={[
                { label: '事业规划', value: report.fortune.career.plan },
                { label: '关键时期', value: report.fortune.career.keyPeriod },
                { label: '注意事项', value: report.fortune.career.warning },
              ]} />
            </div>
          </Fade>
        )}

        {/* LOVE & HEALTH */}
        {activeTab === 'love' && (
          <Fade>
            <SectionHead num="陆" title="感情 & 健康" />
            <div className="grid md:grid-cols-2 gap-6">
              <DetailCard title="💕 感情运势" items={[
                { label: '桃花运走势', value: report.relation.love.trend },
                { label: '正缘提示', value: report.relation.love.trueLove },
                { label: '烂桃花规避', value: report.relation.love.badLove },
              ]} />
              <DetailCard title="🏥 健康预警" items={[
                { label: '健康提示', value: report.relation.health.warning },
                { label: '风险时段', value: report.relation.health.riskPeriod },
                { label: '重点关注', value: report.relation.health.focus },
              ]} />
            </div>
          </Fade>
        )}

        {/* TIPS */}
        {activeTab === 'tips' && (
          <Fade>
            <SectionHead num="柒" title="转运技巧" />
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              {report.luckTips.map((tip, i) => (
                <motion.div key={i} initial={{ opacity: 0, y: 15 }} animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: i * 0.08 }} whileHover={{ y: -3 }} className="card-gold">
                  <span className="text-3xl">{tip.icon}</span>
                  <h4 className="text-ink mt-5 mb-3" style={{ fontFamily: 'var(--font-display)', fontSize: '1.1rem', fontWeight: 600 }}>{tip.title}</h4>
                  <p className="text-ink-secondary text-sm leading-relaxed">{tip.desc}</p>
                </motion.div>
              ))}
            </div>
          </Fade>
        )}
      </div>
    </div>
  );
}

/* ===== Shared Components ===== */

function Fade({ children }) {
  return (
    <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }}>
      {children}
    </motion.div>
  );
}

function SectionHead({ num, title, sub }) {
  return (
    <div className="mb-10">
      <span className="text-gold text-xs tracking-[0.4em]" style={{ fontFamily: 'var(--font-display)' }}>{num}</span>
      <h2 className="text-ink mt-2" style={{ fontFamily: 'var(--font-display)', fontWeight: 600, fontSize: 'clamp(1.5rem, 3vw, 2.25rem)', letterSpacing: '0.04em' }}>{title}</h2>
      {sub && <p className="text-ink-muted text-sm mt-2">{sub}</p>}
      <div className="w-10 h-px bg-gold-soft mt-5" />
    </div>
  );
}

function InfoRow({ label, value }) {
  return (
    <div className="flex items-center justify-between py-3 border-b border-divider/60 last:border-0">
      <span className="text-ink-muted">{label}</span>
      <span style={{ fontFamily: 'var(--font-display)', fontWeight: 500 }}>{value}</span>
    </div>
  );
}

function DetailCard({ title, items }) {
  return (
    <div className="card-gold">
      <h3 className="text-gold text-sm tracking-[0.15em] mb-6" style={{ fontFamily: 'var(--font-display)' }}>{title}</h3>
      <div className="space-y-4">
        {items.map((item, i) => (
          <div key={i} className="bg-bg rounded-xl p-5">
            <p className="text-gold text-xs tracking-[0.2em] mb-2" style={{ fontFamily: 'var(--font-display)' }}>{item.label}</p>
            <p className="text-ink-secondary leading-[1.8] text-base">{item.value}</p>
          </div>
        ))}
      </div>
    </div>
  );
}
