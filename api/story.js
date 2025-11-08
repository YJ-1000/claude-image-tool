import OpenAI from "openai";

export default async function handler(req, res) {
  if (req.method !== "POST") {
    return res.status(405).json({ error: "Method Not Allowed" });
  }

  try {
    const client = new OpenAI({
      apiKey: process.env.OPENAI_API_KEY,
    });

    const { original } = req.body;

    const completion = await client.chat.completions.create({
      model: "gpt-5", // ← 필요하면 model 변경
      messages: [
        { role: "system", content: "당신은 시니어 사연을 재창작하는 스토리 작가입니다." },
        { role: "user", content: `다음 내용을 기반으로 스토리를 재창작해 주세요:\n\n${original}` },
      ],
    });

    res.status(200).json({
      result: completion.choices[0].message.content,
    });
  } catch (error) {
    console.error("[API ERROR]", error);
    res.status(500).json({
      error: error.message || "서버 오류 발생",
    });
  }
}
