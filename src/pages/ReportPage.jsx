import { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { mockReport } from '../data/mockReport';

const tabs = [
  { key: 'overview', label: '缘主信息', icon: '👤' },
  { key: 'bazi', label: '八字排盘', icon: '☯️' },
  { key: 'dayun', label: '大运流年', icon: '📅' },
  { key: 'summary', label: '命局总论', icon: '📋' },
  { key: 'fortune', label: '财运事业', icon: '💰' },
  { key: 'love', label: '感情健康', icon: '💕' },
  { key: 'tips', label: '转运技巧', icon: '🔮' },
];

export default function ReportPage() {
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState('overview');
  const [report, setReport] = useState(null);

  useEffect(() => {
    const saved = sessionStorage.getItem('guoxue_report');
    if (saved) {
      try { setReport(JSON.parse(saved)); } catch(e) {}
    }
    if (!saved) setReport(mockReport);
  }, []);

  if (!report) return (
    <div className="min-h-screen bg-bg flex items-center justify-center">
      <p className="text-ink-muted">加载中...</p>
    </div>
  );

  const u = report.userInfo;
  const b = report.baziChart;

  return (
    <div className="min-h-screen bg-bg pb-32">
      {/* Header */}
      <header className="bg-bg-card/80 backdrop-blur-xl sticky top-0 z-50 border-b border-divider no-print">
        <div className="section-container flex items-center justify-between h-16">
          <Link to="/" className="text-ink-light hover:text-ink text-sm transition-colors heading-md">← 首页</Link>
          <span className="text-ink-muted text-xs tracking-[0.3em] heading-md hidden md:block">命理分析报告</span>
          <div className="flex items-center gap-4">
            <Link to="/history" className="text-ink-light hover:text-gold text-sm transition-colors heading-md">历史</Link>
            <button onClick={() => window.print()}
              className="px-4 py-1.5 rounded-full border border-ink/10 text-ink-light text-xs hover:border-gold hover:text-gold transition-all heading-md">
              下载 PDF
            </button>
          </div>
        </div>
      </header>

      {/* Report Hero */}
      <div className="py-16 px-6 text-center bg-gradient-to-b from-bg-warm to-bg">
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}>
          <div className="gold-line w-16 mx-auto mb-6" />
          <h1 className="heading-xl text-3xl md:text-4xl text-ink mb-2">命理分析报告</h1>
          <p className="text-ink-light text-sm">{u.name} · {u.birthDate} · {u.zodiac}</p>
        </motion.div>
      </div>

      {/* Tab Bar */}
      <div className="sticky top-16 z-40 bg-bg/90 backdrop-blur-xl border-b border-divider no-print">
        <div className="section-container py-3">
          <div className="tab-bar">
            {tabs.map((t) => (
              <button key={t.key} onClick={() => setActiveTab(t.key)}
                className={`tab-item ${activeTab === t.key ? 'active' : ''}`}>
                {t.label}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Content */}
      <div className="section-container mt-10">
        {activeTab === 'overview' && (
          <FadeIn>
            <SectionHead num="壹" title="缘主信息" />
            <div className="grid md:grid-cols-2 gap-6">
              <div className="card-gold">
                <h3 className="heading-md text-gold text-sm tracking-[0.2em] mb-5">基本信息</h3>
                <div className="space-y-4">
                  <Row label="姓名" value={u.name} />
                  <Row label="性别" value={u.gender} />
                  <Row label="年龄" value={`${u.age} 岁`} />
                  <Row label="生肖" value={u.zodiac} />
                  <Row label="星座" value={u.constellation} />
                </div>
              </div>
              <div className="card-gold">
                <h3 className="heading-md text-gold text-sm tracking-[0.2em] mb-5">时空坐标</h3>
                <div className="space-y-4">
                  <Row label="公历" value={u.birthDate} />
                  <Row label="农历" value={u.lunarDate} />
                  <Row label="真太阳时" value={u.trueSolarTime} />
                  <Row label="出生地" value={u.birthPlace} />
                </div>
              </div>
            </div>
          </FadeIn>
        )}

        {activeTab === 'bazi' && (
          <FadeIn>
            <SectionHead num="贰" title="八字排盘" />
            <div className="card-gold mb-6">
              <h3 className="heading-md text-gold text-sm tracking-[0.2em] mb-8 text-center">四柱命盘</h3>
              <div className="grid grid-cols-4 gap-4">
                {b.pillars.map((p, i) => (
                  <motion.div key={i} initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: i * 0.1 }} className="bazi-pillar">
                    <p className="text-xs text-ink-muted mb-3 heading-md">{p.title}</p>
                    <div className="stem-box">{p.stem}</div>
                    <div className="branch-box">{p.branch}</div>
                    <p className="text-[0.65rem] text-ink-muted mt-2">{p.stemGod}</p>
                    <p className="text-[0.65rem] text-ink-muted">{p.branchGod}</p>
                  </motion.div>
                ))}
              </div>
            </div>

            {/* Detail table */}
            <div className="card overflow-x-auto">
              <table className="w-full text-sm min-w-[600px]">
                <thead>
                  <tr className="border-b border-divider">
                    <th className="text-left py-3 px-4 text-ink-muted font-normal text-xs heading-md">项目</th>
                    {b.pillars.map((p) => <th key={p.title} className="text-center py-3 px-2 heading-md text-xs">{p.title}</th>)}
                  </tr>
                </thead>
                <tbody>
                  <tr className="border-b border-divider/50">
                    <td className="py-3 px-4 text-ink-muted text-xs">藏干</td>
                    {b.hiddenStems.map((hs, i) => (
                      <td key={i} className="py-3 px-2 text-center text-xs">
                        {hs.stems.map((s, j) => <div key={j} className="py-0.5 text-ink-light">{s}</div>)}
                      </td>
                    ))}
                  </tr>
                  <tr className="border-b border-divider/50">
                    <td className="py-3 px-4 text-ink-muted text-xs">纳音</td>
                    {b.nayin.map((n, i) => <td key={i} className="py-3 px-2 text-center text-gold heading-md text-xs">{n}</td>)}
                  </tr>
                  <tr className="border-b border-divider/50">
                    <td className="py-3 px-4 text-ink-muted text-xs">星运</td>
                    {b.starFate.map((s, i) => <td key={i} className="py-3 px-2 text-center heading-md text-xs">{s}</td>)}
                  </tr>
                  <tr className="border-b border-divider/50">
                    <td className="py-3 px-4 text-ink-muted text-xs">神煞</td>
                    {b.shenSha.map((s, i) => <td key={i} className="py-3 px-2 text-center text-xs text-gold">{s}</td>)}
                  </tr>
                  <tr>
                    <td className="py-3 px-4 text-ink-muted text-xs">空亡</td>
                    <td colSpan={4} className="py-3 px-2 text-center text-xs text-red-400 heading-md">{b.kongWang.desc}</td>
                  </tr>
                </tbody>
              </table>
            </div>
          </FadeIn>
        )}

        {activeTab === 'dayun' && (
          <FadeIn>
            <SectionHead num="叁" title="大运流年" sub={report.daYun.startRule} />
            <div className="card-gold">
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                {report.daYun.periods.map((p, i) => {
                  const isCurrent = p.startAge <= report.daYun.currentAge && p.startAge + 10 > report.daYun.currentAge;
                  return (
                    <motion.div key={i} initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }}
                      transition={{ delay: i * 0.06 }}
                      className={`p-5 rounded-2xl border transition-all
                        ${isCurrent ? 'border-gold bg-gold-glow' : 'border-divider hover:border-gold-border'}`}>
                      {isCurrent && <span className="text-[0.65rem] text-gold bg-gold-glow px-2 py-0.5 rounded-full">当前大运</span>}
                      <p className="text-ink-muted text-xs mt-2">{p.ageRange}</p>
                      <p className="heading-xl text-2xl text-ink my-2">{p.pillar}</p>
                      <p className="text-ink-light text-xs leading-relaxed">{p.detail}</p>
                    </motion.div>
                  );
                })}
              </div>
            </div>
          </FadeIn>
        )}

        {activeTab === 'summary' && (
          <FadeIn>
            <SectionHead num="肆" title="命局总论" />
            <div className="space-y-5">
              {[
                { icon: '☯️', title: '十神配置综合分析', text: report.mingJuSummary.tenGodAnalysis },
                { icon: '🎭', title: '核心性格特质', text: report.mingJuSummary.personality },
                { icon: '⭐', title: '天赋潜能与格局', text: report.mingJuSummary.talent },
              ].map((item, i) => (
                <motion.div key={i} initial={{ opacity: 0, y: 15 }} animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: i * 0.1 }} className="card-gold">
                  <div className="flex items-center gap-3 mb-4">
                    <span className="text-xl">{item.icon}</span>
                    <h3 className="heading-md text-lg text-ink">{item.title}</h3>
                  </div>
                  <p className="text-ink-light text-sm leading-[1.8]">{item.text}</p>
                </motion.div>
              ))}
            </div>
          </FadeIn>
        )}

        {activeTab === 'fortune' && (
          <FadeIn>
            <SectionHead num="伍" title="财运 & 事业" />
            <div className="grid md:grid-cols-2 gap-6">
              <FortuneCard title="💰 财运分析" items={[
                { label: '财富走势', value: report.fortune.wealth.trend },
                { label: '合作建议', value: report.fortune.wealth.cooperation },
                { label: '风险规避', value: report.fortune.wealth.risk },
              ]} />
              <FortuneCard title="📈 事业前程" items={[
                { label: '事业规划', value: report.fortune.career.plan },
                { label: '关键时期', value: report.fortune.career.keyPeriod },
                { label: '注意事项', value: report.fortune.career.warning },
              ]} />
            </div>
          </FadeIn>
        )}

        {activeTab === 'love' && (
          <FadeIn>
            <SectionHead num="陆" title="感情 & 健康" />
            <div className="grid md:grid-cols-2 gap-6">
              <FortuneCard title="💕 感情运势" items={[
                { label: '桃花运走势', value: report.relation.love.trend },
                { label: '正缘提示', value: report.relation.love.trueLove },
                { label: '烂桃花规避', value: report.relation.love.badLove },
              ]} />
              <FortuneCard title="🏥 健康预警" items={[
                { label: '健康提示', value: report.relation.health.warning },
                { label: '风险时段', value: report.relation.health.riskPeriod },
                { label: '重点关注', value: report.relation.health.focus },
              ]} />
            </div>
          </FadeIn>
        )}

        {activeTab === 'tips' && (
          <FadeIn>
            <SectionHead num="柒" title="转运技巧" />
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-5">
              {report.luckTips.map((tip, i) => (
                <motion.div key={i} initial={{ opacity: 0, y: 15 }} animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: i * 0.08 }} whileHover={{ y: -3 }} className="card-gold">
                  <span className="text-3xl">{tip.icon}</span>
                  <h4 className="heading-md text-base text-ink mt-4 mb-2">{tip.title}</h4>
                  <p className="text-ink-light text-sm leading-relaxed">{tip.desc}</p>
                </motion.div>
              ))}
            </div>
          </FadeIn>
        )}
      </div>
    </div>
  );
}

/* ===== Reusable Components ===== */

function SectionHead({ num, title, sub }) {
  return (
    <div className="mb-10">
      <span className="text-gold text-xs tracking-[0.4em] heading-md">{num}</span>
      <h2 className="heading-lg text-2xl md:text-3xl text-ink mt-2">{title}</h2>
      {sub && <p className="text-ink-muted text-sm mt-2">{sub}</p>}
      <div className="w-10 h-px bg-gold-soft mt-4" />
    </div>
  );
}

function Row({ label, value }) {
  return (
    <div className="flex items-center justify-between py-2 border-b border-divider/50 last:border-0">
      <span className="text-ink-muted text-sm">{label}</span>
      <span className="heading-md text-sm">{value}</span>
    </div>
  );
}

function FortuneCard({ title, items }) {
  return (
    <div className="card-gold">
      <h3 className="heading-md text-gold text-sm tracking-[0.15em] mb-6">{title}</h3>
      <div className="space-y-4">
        {items.map((item, i) => (
          <div key={i} className="bg-bg rounded-xl p-4">
            <p className="text-gold text-[0.65rem] tracking-[0.2em] heading-md mb-1.5">{item.label}</p>
            <p className="text-ink-light text-sm leading-relaxed">{item.value}</p>
          </div>
        ))}
      </div>
    </div>
  );
}

function FadeIn({ children }) {
  return (
    <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}>
      {children}
    </motion.div>
  );
}
