// ✅ 반드시 Node.js 환경에서 실행하도록 강제
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
      model: "gpt-5",
      messages: [
        {
          role: "user",
          content: `다음 내용으로 JSON 구조를 생성해줘: ${text}`,
        },
      ],
    });

    res.status(200).json({ result: completion.choices[0].message.content });

  } catch (error) {
    console.error("SERVER ERROR:", error);
    res.status(500).json({ error: "Server error", details: error.message });
  }
}
