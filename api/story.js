export default async function handler(req, res) {
  try {
    const { original } = req.body;

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
            content:
              "당신은 유튜브 시니어 사연 전문 스토리텔러입니다. 원본을 분석하여 새로운 스토리 플롯을 제공합니다.",
          },
          {
            role: "user",
            content: `다음 원본을 분석해서 새로운 시니어 스토리 플롯 5개를 만들어줘:\n\n${original}`,
          },
        ],
      }),
    });

    const data = await response.json();

    // ✅ 프론트(script.html)에서 읽는 key는 result
    res.status(200).json({
      result: data.choices[0].message.content,
    });
  } catch (error) {
    res.status(500).json({
      error: "⚠️ 서버 오류 발생",
    });
  }
}
