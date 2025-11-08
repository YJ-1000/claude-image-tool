// ✅ Vercel Edge Function이 아니라 Node.js 서버 함수로 강제 설정
export const config = {
  runtime: "nodejs",
};

import OpenAI from "openai";

export default async function handler(req, res) {
  if (req.method !== "POST") {
    return res.status(405).json({ error: "Only POST allowed" });
  }

  try {
    const client = new OpenAI({
      apiKey: process.env.OPENAI_API_KEY,
    });

    const { text } = req.body;

    const completion = await client.chat.completions.create({
      model: "gpt-4o-mini", // 또는 gpt-5 / gpt-4o
      messages: [
        {
          role: "user",
          content: `다음 내용을 JSON 구조로 만들어줘: ${text}`,
        },
      ],
    });

    return res.status(200).json({
      result: completion.choices[0].message.content,
    });

  } catch (err) {
    console.error("SERVER ERROR:", err);
    return res.status(500).json({ error: "Server error" });
  }
}

