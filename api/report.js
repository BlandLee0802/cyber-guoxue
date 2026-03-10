export const config = { runtime: 'nodejs22.x' };

const SYSTEM_PROMPT = `你是一位精通周易命理、八字排盘、紫微斗数的中国传统国学大师。你需要根据用户提供的出生信息，进行完整的命理分析，并严格按照JSON格式返回结果。

你需要完成：
1. 将公历生日转换为农历，计算真太阳时
2. 进行八字排盘（年柱、月柱、日柱、时柱的干支）
3. 分析十神配置、藏干、纳音、星运、神煞
4. 排列大运（每十年一步）
5. 分析命局总论（十神、性格、天赋）
6. 分析财运与事业
7. 分析感情与健康
8. 给出转运技巧

严格返回以下JSON格式（不要包含markdown代码块标记）：
{
  "userInfo": {
    "name": "用户姓名",
    "gender": "性别",
    "age": 年龄数字,
    "zodiac": "生肖",
    "constellation": "星座",
    "birthDate": "公历日期字符串",
    "lunarDate": "农历日期字符串",
    "trueSolarTime": "真太阳时字符串",
    "birthPlace": "出生地"
  },
  "baziChart": {
    "pillars": [
      {"title": "年柱", "stem": "天干字", "branch": "地支字", "stemGod": "十神", "branchGod": "十神"},
      {"title": "月柱", "stem": "天干字", "branch": "地支字", "stemGod": "十神", "branchGod": "十神"},
      {"title": "日柱", "stem": "天干字", "branch": "地支字", "stemGod": "日主", "branchGod": "十神"},
      {"title": "时柱", "stem": "天干字", "branch": "地支字", "stemGod": "十神", "branchGod": "十神"}
    ],
    "hiddenStems": [
      {"branch": "地支", "stems": ["藏干1·十神", "藏干2·十神"]},
      {"branch": "地支", "stems": ["藏干1·十神"]},
      {"branch": "地支", "stems": ["藏干1·十神"]},
      {"branch": "地支", "stems": ["藏干1·十神", "藏干2·十神"]}
    ],
    "nayin": ["年柱纳音", "月柱纳音", "日柱纳音", "时柱纳音"],
    "starFate": ["年柱星运", "月柱星运", "日柱星运", "时柱星运"],
    "shenSha": ["年柱神煞", "月柱神煞", "日柱神煞", "时柱神煞"],
    "kongWang": {"desc": "空亡描述", "pillars": ["涉及的柱"]}
  },
  "daYun": {
    "startRule": "起运规则描述",
    "currentAge": 当前年龄数字,
    "periods": [
      {"ageRange": "年龄段", "startAge": 起始年龄数字, "pillar": "干支", "detail": "运势描述"},
      ...共8步大运
    ]
  },
  "mingJuSummary": {
    "tenGodAnalysis": "十神配置综合分析，200字以上",
    "personality": "核心性格特质分析，200字以上",
    "talent": "天赋潜能与人生格局，200字以上"
  },
  "fortune": {
    "wealth": {
      "trend": "十年财富走势分析",
      "cooperation": "合作属相建议",
      "risk": "风险规避事项"
    },
    "career": {
      "plan": "十年事业规划",
      "keyPeriod": "关键期提示",
      "warning": "注意事项"
    }
  },
  "relation": {
    "love": {
      "trend": "桃花运走势",
      "trueLove": "正缘提示",
      "badLove": "烂桃花规避"
    },
    "health": {
      "warning": "健康预警",
      "riskPeriod": "风险时段",
      "focus": "重点关注部位"
    }
  },
  "luckTips": [
    {"icon": "📿", "title": "佩戴饰品建议", "desc": "详细建议"},
    {"icon": "🔢", "title": "幸运数字", "desc": "详细说明"},
    {"icon": "🎨", "title": "幸运颜色", "desc": "详细说明"},
    {"icon": "🧭", "title": "休息方位", "desc": "详细建议"},
    {"icon": "🏠", "title": "卧室方位", "desc": "详细建议"},
    {"icon": "🐱", "title": "宠物选择", "desc": "详细建议"}
  ]
}`;

export default async function handler(req, res) {
  if (req.method === 'OPTIONS') {
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Methods', 'POST, OPTIONS');
    res.setHeader('Access-Control-Allow-Headers', 'Content-Type');
    return res.status(204).end();
  }
  if (req.method !== 'POST') return res.status(405).json({ error: 'Method not allowed' });

  try {
    const { name, gender, birthDate, birthTime, birthProvince, birthCity } = req.body;
    const birthPlace = `${birthProvince}${birthCity}`;

    const userPrompt = `请为以下用户进行完整的命理分析：

姓名：${name}
性别：${gender}
出生日期（公历）：${birthDate}
出生时间：${birthTime}
出生地：${birthPlace}

请严格按照要求的JSON格式返回完整的命理分析报告。分析要详尽、专业，每个字段都要认真填写。`;

    const apiKey = process.env.DEEPSEEK_API_KEY || 'sk7f2e19c97d2844e59db4f63cd6ce3b84';

    const response = await fetch('https://api.deepseek.com/chat/completions', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${apiKey}`,
      },
      body: JSON.stringify({
        model: 'deepseek-chat',
        messages: [
          { role: 'system', content: SYSTEM_PROMPT },
          { role: 'user', content: userPrompt },
        ],
        response_format: { type: 'json_object' },
        temperature: 0.7,
        max_tokens: 4096,
      }),
    });

    if (!response.ok) {
      const errText = await response.text();
      console.error('DeepSeek API error:', response.status, errText);
      return res.status(response.status).json({ error: 'AI service error', detail: errText });
    }

    const data = await response.json();
    let content = data.choices[0].message.content;

    // Strip markdown code block if present
    content = content.replace(/```json\n?/g, '').replace(/```\n?/g, '').trim();

    const report = JSON.parse(content);
    res.status(200).json(report);
  } catch (err) {
    console.error('Server error:', err);
    res.status(500).json({ error: err.message });
  }
}
