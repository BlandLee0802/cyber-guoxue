const { createServer } = require('node:http');
const { readFile, stat } = require('node:fs/promises');
const { join, extname } = require('node:path');

const PORT = 9999;
const DIR = 'C:\\Users\\Bland\\.openclaw-autoclaw\\workspace\\cyber-guoxue\\dist';
const API_KEY = 'sk7f2e19c97d2844e59db4f63cd6ce3b84';

const MIME = {
  '.html': 'text/html; charset=utf-8',
  '.js': 'application/javascript; charset=utf-8',
  '.css': 'text/css; charset=utf-8',
  '.png': 'image/png',
  '.jpg': 'image/jpeg',
  '.svg': 'image/svg+xml',
};

const server = createServer(async (req, res) => {
  // CORS
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');
  if (req.method === 'OPTIONS') return res.writeHead(204).end();

  // API route
  if (req.method === 'POST' && req.url === '/api/report') {
    let body = '';
    req.on('data', c => body += c);
    req.on('end', async () => {
      try {
        const input = JSON.parse(body);
        const userPrompt = `请为以下用户进行完整的命理分析：

姓名：${input.name}
性别：${input.gender}
出生日期（公历）：${input.birthDate}
出生时间：${input.birthTime}
出生地：${input.birthProvince}${input.birthCity}

请严格按照JSON格式返回完整命理分析报告，包含以下字段：
- userInfo: 姓名、性别、年龄、生肖、星座、公历日期、农历日期、真太阳时、出生地
- baziChart: 四柱八字（pillars含title/stem/branch/stemGod/branchGod, hiddenStems, nayin, starFate, shenSha, kongWang）
- daYun: 起运规则、当前年龄、8步大运（periods数组，每步含ageRange/startAge/pillar/detail）
- mingJuSummary: tenGodAnalysis/personality/talent（每个200字以上）
- fortune: wealth(trend/cooperation/risk) + career(plan/keyPeriod/warning)
- relation: love(trend/trueLove/badLove) + health(warning/riskPeriod/focus)
- luckTips: 6条转运建议数组，每条含icon/title/desc

所有分析要详尽专业，严格返回纯JSON不要markdown代码块标记。`;

        const dsRes = await fetch('https://api.deepseek.com/chat/completions', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json', 'Authorization': 'Bearer ' + API_KEY },
          body: JSON.stringify({
            model: 'deepseek-chat',
            messages: [
              { role: 'system', content: '你是精通周易命理、八字排盘的国学大师。请用JSON格式返回分析结果。' },
              { role: 'user', content: userPrompt }
            ],
            response_format: { type: 'json_object' },
            temperature: 0.7,
            max_tokens: 4096,
          }),
        });

        if (!dsRes.ok) {
          const errText = await dsRes.text();
          console.error('DeepSeek error:', dsRes.status, errText);
          return res.writeHead(502).end(JSON.stringify({ error: 'AI service error: ' + dsRes.status }));
        }

        const data = await dsRes.json();
        let content = data.choices[0].message.content.replace(/```json\n?/g, '').replace(/```\n?/g, '').trim();
        const report = JSON.parse(content);
        res.writeHead(200, { 'Content-Type': 'application/json' });
        res.end(JSON.stringify(report));
      } catch (err) {
        console.error('API error:', err);
        res.writeHead(500).end(JSON.stringify({ error: err.message }));
      }
    });
    return;
  }

  // Static files
  let path = req.url === '/' ? '/index.html' : req.url.split('?')[0];
  path = decodeURIComponent(path);
  const filePath = join(DIR, path);

  try {
    const s = await stat(filePath);
    if (s.isFile()) {
      res.writeHead(200, { 'Content-Type': MIME[extname(filePath).toLowerCase()] || 'application/octet-stream' });
      res.end(await readFile(filePath));
      return;
    }
  } catch(e) {}

  try {
    res.writeHead(200, { 'Content-Type': 'text/html; charset=utf-8' });
    res.end(await readFile(join(DIR, 'index.html')));
  } catch(e) {
    res.writeHead(500).end('Error');
  }
});

server.listen(PORT, '0.0.0.0', () => {
  console.log('Server running at http://127.0.0.1:' + PORT);
  console.log('Network: http://192.168.0.114:' + PORT);
});
