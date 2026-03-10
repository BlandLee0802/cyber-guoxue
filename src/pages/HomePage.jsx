@import "tailwindcss";

/* ===== Design System ===== */
@theme {
  --color-bg: #FAFAF8;
  --color-bg-warm: #F5F4F0;
  --color-bg-card: #FFFFFF;
  --color-ink: #1A1A1A;
  --color-ink-secondary: #4A4A4A;
  --color-ink-light: #888888;
  --color-ink-muted: #BBBBBB;
  --color-gold: #B8860B;
  --color-gold-soft: #C9A96E;
  --color-gold-light: #E8D5A8;
  --color-gold-glow: rgba(184, 134, 11, 0.06);
  --color-gold-border: rgba(184, 134, 11, 0.12);
  --color-divider: rgba(0, 0, 0, 0.06);
  --color-divider-strong: rgba(0, 0, 0, 0.1);
  --font-display: 'Noto Serif SC', 'Songti SC', 'SimSun', Georgia, serif;
  --font-body: 'Noto Sans SC', 'PingFang SC', -apple-system, 'Segoe UI', sans-serif;
}

*, *::before, *::after { box-sizing: border-box; margin: 0; padding: 0; }
html { scroll-behavior: smooth; -webkit-font-smoothing: antialiased; }
body {
  font-family: var(--font-body);
  background: var(--color-bg);
  color: var(--color-ink);
  line-height: 1.7;
  font-size: 16px;
  overflow-x: hidden;
}

/* Desktop: bigger base font */
@media (min-width: 1024px) {
  body { font-size: 17px; }
}

/* ===== Scrollbar ===== */
::-webkit-scrollbar { width: 4px; }
::-webkit-scrollbar-track { background: transparent; }
::-webkit-scrollbar-thumb { background: var(--color-gold-light); border-radius: 10px; }

/* ===== Keyframes ===== */
@keyframes fadeUp { from { opacity: 0; transform: translateY(30px); } to { opacity: 1; transform: translateY(0); } }

/* ===== Container ===== */
.container {
  width: 100%;
  max-width: 1200px;
  margin: 0 auto;
  padding: 0 2rem;
}
@media (max-width: 640px) {
  .container { padding: 0 1.25rem; }
}

/* ===== Buttons ===== */
.btn-primary {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  padding: 1rem 3.5rem;
  background: var(--color-ink);
  color: #fff;
  border: none;
  border-radius: 100px;
  font-family: var(--font-display);
  font-size: 1rem;
  letter-spacing: 0.2em;
  cursor: pointer;
  transition: all 0.35s ease;
}
.btn-primary:hover {
  background: var(--color-gold);
  transform: translateY(-2px);
  box-shadow: 0 8px 30px rgba(184, 134, 11, 0.15);
}
.btn-outline {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  padding: 1rem 3.5rem;
  background: transparent;
  color: var(--color-ink);
  border: 1.5px solid var(--color-ink);
  border-radius: 100px;
  font-family: var(--font-display);
  font-size: 1rem;
  letter-spacing: 0.2em;
  cursor: pointer;
  transition: all 0.35s ease;
}
.btn-outline:hover {
  background: var(--color-ink);
  color: #fff;
}

/* ===== Card ===== */
.card {
  background: var(--color-bg-card);
  border: 1px solid var(--color-divider);
  border-radius: 24px;
  padding: 3rem;
  transition: all 0.35s ease;
}
@media (max-width: 768px) {
  .card { padding: 2rem; border-radius: 18px; }
}

.card-gold {
  background: var(--color-bg-card);
  border: 1px solid var(--color-gold-border);
  border-radius: 24px;
  padding: 3rem;
  position: relative;
  overflow: hidden;
}
.card-gold::before {
  content: '';
  position: absolute;
  top: 0; left: 0; right: 0;
  height: 2px;
  background: linear-gradient(90deg, transparent, var(--color-gold-soft), transparent);
}
@media (max-width: 768px) {
  .card-gold { padding: 2rem; border-radius: 18px; }
}

/* ===== Gold line ===== */
.gold-line {
  height: 1px;
  background: linear-gradient(90deg, transparent, var(--color-gold-soft), transparent);
}

/* ===== Input ===== */
.input-field {
  width: 100%;
  padding: 1.1rem 0;
  border: none;
  border-bottom: 1.5px solid var(--color-ink-muted);
  background: transparent;
  font-family: var(--font-body);
  font-size: 1.05rem;
  color: var(--color-ink);
  outline: none;
  transition: border-color 0.3s;
}
.input-field:focus { border-bottom-color: var(--color-gold); }
.input-field::placeholder { color: var(--color-ink-muted); }

/* ===== Tab bar ===== */
.tab-bar {
  display: flex;
  gap: 4px;
  padding: 4px;
  background: var(--color-bg-warm);
  border-radius: 14px;
  overflow-x: auto;
  -webkit-overflow-scrolling: touch;
}
.tab-item {
  flex-shrink: 0;
  padding: 0.7rem 1.5rem;
  border-radius: 10px;
  font-size: 0.9rem;
  font-family: var(--font-display);
  color: var(--color-ink-light);
  cursor: pointer;
  border: none;
  background: transparent;
  transition: all 0.25s;
  white-space: nowrap;
}
.tab-item:hover { color: var(--color-ink); background: rgba(255,255,255,0.5); }
.tab-item.active { color: #fff; background: var(--color-ink); }

/* ===== Bazi ===== */
.bazi-pillar { text-align: center; padding: 1.5rem; border-radius: 18px; background: var(--color-bg); border: 1px solid var(--color-divider); }
.bazi-pillar .stem-box { background: var(--color-ink); color: var(--color-gold-soft); border-radius: 14px; padding: 1.2rem 0.5rem; margin-bottom: 0.5rem; font-family: var(--font-display); font-size: 2rem; }
.bazi-pillar .branch-box { background: var(--color-bg-warm); border-radius: 14px; padding: 1.2rem 0.5rem; font-family: var(--font-display); font-size: 2rem; color: var(--color-ink); }
@media (min-width: 1280px) {
  .bazi-pillar .stem-box, .bazi-pillar .branch-box { font-size: 2.5rem; padding: 1.4rem 0.5rem; }
}

/* ===== Print ===== */
@media print { body { background: #fff; } .no-print { display: none !important; } }
