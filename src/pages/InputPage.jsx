import { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { motion } from 'framer-motion';

export default function InputPage() {
  const navigate = useNavigate();
  const [form, setForm] = useState({ name: '', gender: '男', birthProvince: '', birthCity: '', birthDate: '', birthTime: '' });
  const [errors, setErrors] = useState({});

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm({ ...form, [name]: value });
    if (errors[name]) setErrors({ ...errors, [name]: '' });
  };

  const validate = () => {
    const e = {};
    if (!form.name.trim()) e.name = '请输入姓名';
    if (!form.birthProvince.trim()) e.birthProvince = '请输入省份';
    if (!form.birthCity.trim()) e.birthCity = '请输入城市';
    if (!form.birthDate) e.birthDate = '请选择生日';
    if (!form.birthTime) e.birthTime = '请选择时间';
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
      {/* Header */}
      <header className="py-6 px-6">
        <div className="section-container flex items-center justify-between">
          <Link to="/" className="text-ink-light hover:text-ink text-sm transition-colors heading-md">
            ← 返回
          </Link>
          <span className="text-ink-muted text-xs tracking-[0.3em] heading-md">赛博国学</span>
        </div>
      </header>

      {/* Content */}
      <div className="max-w-lg mx-auto px-6 pb-32 pt-8">
        <motion.div initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, ease: [0.25, 0.46, 0.45, 0.94] }}>
          {/* Title */}
          <div className="text-center mb-12">
            <div className="inline-flex items-center gap-3 mb-6">
              <div className="w-8 h-px bg-gold-soft" />
              <span className="text-xs tracking-[0.4em] text-ink-light heading-md">第一步</span>
              <div className="w-8 h-px bg-gold-soft" />
            </div>
            <h1 className="heading-xl text-4xl text-ink mb-3">输入您的信息</h1>
            <p className="text-ink-light text-sm">请准确填写以下信息，以获得更精准的命理分析</p>
          </div>

          {/* Form */}
          <form onSubmit={handleSubmit} className="space-y-8">
            {/* Name */}
            <div>
              <label className="text-xs tracking-[0.2em] text-ink-light heading-md uppercase mb-2 block">姓名</label>
              <input type="text" name="name" value={form.name} onChange={handleChange} placeholder="请输入姓名"
                className="input-field" />
              {errors.name && <p className="text-red-400 text-xs mt-2">{errors.name}</p>}
            </div>

            {/* Gender */}
            <div>
              <label className="text-xs tracking-[0.2em] text-ink-light heading-md uppercase mb-3 block">性别</label>
              <div className="flex gap-4">
                {['男', '女'].map((g) => (
                  <button key={g} type="button" onClick={() => setForm({ ...form, gender: g })}
                    className={`flex-1 py-3 rounded-xl text-center heading-md text-base transition-all duration-300 border
                      ${form.gender === g
                        ? 'border-gold bg-gold-glow text-gold'
                        : 'border-divider bg-transparent text-ink-light hover:border-ink-muted'}`}>
                    {g}
                  </button>
                ))}
              </div>
            </div>

            {/* Birth Place */}
            <div className="grid grid-cols-2 gap-6">
              <div>
                <label className="text-xs tracking-[0.2em] text-ink-light heading-md uppercase mb-2 block">出生省份</label>
                <input type="text" name="birthProvince" value={form.birthProvince} onChange={handleChange} placeholder="如：广东省"
                  className="input-field" />
                {errors.birthProvince && <p className="text-red-400 text-xs mt-2">{errors.birthProvince}</p>}
              </div>
              <div>
                <label className="text-xs tracking-[0.2em] text-ink-light heading-md uppercase mb-2 block">出生城市</label>
                <input type="text" name="birthCity" value={form.birthCity} onChange={handleChange} placeholder="如：深圳市"
                  className="input-field" />
                {errors.birthCity && <p className="text-red-400 text-xs mt-2">{errors.birthCity}</p>}
              </div>
            </div>

            {/* Birth Date & Time */}
            <div className="grid grid-cols-2 gap-6">
              <div>
                <label className="text-xs tracking-[0.2em] text-ink-light heading-md uppercase mb-2 block">公历生日</label>
                <input type="date" name="birthDate" value={form.birthDate} onChange={handleChange}
                  className="input-field text-sm" />
                {errors.birthDate && <p className="text-red-400 text-xs mt-2">{errors.birthDate}</p>}
              </div>
              <div>
                <label className="text-xs tracking-[0.2em] text-ink-light heading-md uppercase mb-2 block">出生时间</label>
                <input type="time" name="birthTime" value={form.birthTime} onChange={handleChange}
                  className="input-field text-sm" />
                {errors.birthTime && <p className="text-red-400 text-xs mt-2">{errors.birthTime}</p>}
              </div>
            </div>

            <p className="text-ink-muted text-xs">精确的出生时间有助于更准确的真太阳时计算</p>

            {/* Submit */}
            <div className="pt-4">
              <motion.button type="submit" className="btn-primary w-full text-base"
                whileHover={{ scale: 1.01 }} whileTap={{ scale: 0.99 }}>
                提交信息，开始测算
              </motion.button>
            </div>
          </form>
        </motion.div>
      </div>
    </div>
  );
}
