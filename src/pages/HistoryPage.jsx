import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { mockReport } from '../data/mockReport';

export default function HistoryPage() {
  const history = mockReport.history;

  return (
    <div className="min-h-screen bg-gradient-to-br from-yuebai to-yuebai-dark">
      {/* Header */}
      <header className="bg-xuanqing py-6 px-6">
        <div className="max-w-3xl mx-auto flex items-center justify-between">
          <Link to="/" className="inline-flex items-center gap-2 text-chijin/60 hover:text-chijin transition-colors">
            <span>←</span>
            <span className="font-serif text-sm">返回首页</span>
          </Link>
          <h1 className="font-serif text-lg text-yuebai">个人中心</h1>
        </div>
      </header>

      <div className="max-w-3xl mx-auto px-6 py-10">
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}>
          <div className="flex items-center gap-3 mb-8">
            <span className="text-3xl">📋</span>
            <div>
              <h2 className="font-serif text-2xl text-xuanqing">历史测算记录</h2>
              <p className="text-mohui/50 text-sm">共 {history.length} 条记录</p>
            </div>
          </div>

          <div className="space-y-4">
            {history.map((item, i) => (
              <motion.div
                key={item.id}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: i * 0.1 }}
                whileHover={{ x: 4 }}
                className="glass rounded-xl p-6 border border-chijian/10 cursor-pointer group hover:border-chijin/30 transition-all"
              >
                <Link to="/report" className="flex items-center justify-between">
                  <div className="flex items-center gap-4">
                    <div className="w-12 h-12 rounded-full bg-xuanqing flex items-center justify-center">
                      <span className="text-chijin font-serif">{item.name[0]}</span>
                    </div>
                    <div>
                      <p className="font-serif text-lg text-xuanqing group-hover:text-chijin transition-colors">{item.name}</p>
                      <p className="text-mohui/50 text-sm">{item.date}</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-4">
                    <span className="text-xs px-3 py-1 bg-chijin/10 text-chijin rounded-full">{item.status}</span>
                    <span className="text-mohui/30 group-hover:text-chijin transition-colors">→</span>
                  </div>
                </Link>
              </motion.div>
            ))}
          </div>

          {history.length === 0 && (
            <div className="text-center py-20">
              <p className="text-6xl mb-4">📭</p>
              <p className="text-mohui/50 font-serif">暂无测算记录</p>
              <Link to="/input" className="inline-block mt-6 px-8 py-3 bg-xuanqing text-chijin font-serif rounded-lg hover:bg-chijin hover:text-xuanqing transition-all">
                开始第一次测算
              </Link>
            </div>
          )}
        </motion.div>
      </div>
    </div>
  );
}
