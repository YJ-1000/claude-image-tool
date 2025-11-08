// api/story.js (Vercel Serverless Function)

export default async function handler(req, res) {
  try {
    const { original } = req.body;

    // ⚠️ 중요한 부분: Vercel 환경변수(OpenAI_API_KEY) 사용
    const response = await fetch("https://api.openai.com/v1/chat/completions", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${process.env.OPENAI_API_KEY}`,
      },
      body: JSON.stringify({
        model: "gpt-5",
        messages: [
          {
            role: "system",
            content: "당신은 유튜브 시니어 사연 전문 스토리텔러입니다.",
          },
          {
            role: "user",
            content: `다음 내용을 분석해서 새로운 시니어 사연 플롯 5개를 생성해줘:\n\n${original}`,
          },
        ],
      }),
    });

    const data = await response.json();
    res.status(200).json({ result: data.choices[0].message.content });

  } catch (error) {
    res.status(500).json({ error: "⚠️ 서버에서 오류 발생" });
  }
}
