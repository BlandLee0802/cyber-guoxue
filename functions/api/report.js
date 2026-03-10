export async function onRequestPost(context) {
  const { request } = context;

  if (request.method === 'OPTIONS') {
    return new Response(null, {
      headers: {
        'Access-Control-Allow-Origin': '*',
        'Access-Control-Allow-Methods': 'POST, OPTIONS',
        'Access-Control-Allow-Headers': 'Content-Type',
      },
    });
  }

  try {
    const input = await request.json();
    const API_KEY = 'sk-7f2e19c97d2844e59db4f63cd6ce3b84';

    const userPrompt = `???????????????:

??:${input.name}
??:${input.gender}
????(??):${input.birthDate}
????:${input.birthTime}
???:${input.birthProvince}${input.birthCity}

?????JSON????????????,??????:
- userInfo: ?????????????????????????????????
- baziChart: ????(pillars?title/stem/branch/stemGod/branchGod, hiddenStems, nayin, starFate, shenSha, kongWang)
- daYun: ??????????8???(periods??,???ageRange/startAge/pillar/detail)
- mingJuSummary: tenGodAnalysis/personality/talent(??200???)
- fortune: wealth(trend/cooperation/risk) + career(plan/keyPeriod/warning)
- relation: love(trend/trueLove/badLove) + health(warning/riskPeriod/focus)
- luckTips: 6???????,???icon/title/desc

?????????,?????JSON??markdown??????`;

    const dsRes = await fetch('https://api.deepseek.com/chat/completions', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${API_KEY}`,
      },
      body: JSON.stringify({
        model: 'deepseek-chat',
        messages: [
          { role: 'system', content: '?????????????????????JSON?????????' },
          { role: 'user', content: userPrompt },
        ],
        response_format: { type: 'json_object' },
        temperature: 0.7,
        max_tokens: 4096,
      }),
    });

    if (!dsRes.ok) {
      const errText = await dsRes.text();
      console.error('DeepSeek error:', dsRes.status, errText);
      return new Response(JSON.stringify({ error: 'AI service error: ' + dsRes.status }), {
        status: 502,
        headers: { 'Content-Type': 'application/json', 'Access-Control-Allow-Origin': '*' },
      });
    }

    const data = await dsRes.json();
    let content = data.choices[0].message.content.replace(/```json\n?/g, '').replace(/```\n?/g, '').trim();
    const report = JSON.parse(content);

    return new Response(JSON.stringify(report), {
      status: 200,
      headers: { 'Content-Type': 'application/json', 'Access-Control-Allow-Origin': '*' },
    });
  } catch (err) {
    console.error('API error:', err);
    return new Response(JSON.stringify({ error: err.message }), {
      status: 500,
      headers: { 'Content-Type': 'application/json', 'Access-Control-Allow-Origin': '*' },
    });
  }
}
