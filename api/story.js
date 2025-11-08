
import OpenAI from "openai";

export default async function handler(req, res) {
  try {
    const client = new OpenAI({
      apiKey: process.env.OPENAI_API_KEY,
    });

    const { original } = req.body;

    const response = await client.chat.completions.create({
      model: "gpt-4o-mini",
      messages: [
        {
          role: "system",
          content: "당신은 시니어 사연을 재창작하는 스토리 작가입니다.",
        },
        {
          role: "user",
          content: `다음 내용을 기반으로 새로운 시니어 사연 스토리를 만들어주세요:\n\n${original}`,
        },
      ],
    });

    const result = response.choices[0].message.content;
    res.status(200).json({ result });   // ✅ 프론트로 전달되는 key는 result
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "⚠️ 서버 오류 발생" });
  }
}
