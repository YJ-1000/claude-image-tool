import OpenAI from "openai";

export const config = {
  runtime: "edge", // Vercel Edge Function
};

export default async function handler(req) {
  if (req.method !== "POST") {
    return new Response(JSON.stringify({ error: "Only POST allowed" }), {
      status: 405,
    });
  }

  try {
    const client = new OpenAI({
      apiKey: process.env.OPENAI_API_KEY,
    });

    const { text } = await req.json();

    const completion = await client.chat.completions.create({
      model: "gpt-5",
      messages: [
        {
          role: "user",
          content: `다음 내용을 기반으로 JSON 구조를 생성해줘: ${text}`,
        },
      ],
    });

    return new Response(
      JSON.stringify({ result: completion.choices[0].message.content }),
      { status: 200 }
    );
  } catch (error) {
    console.error("[SERVER ERROR]", error);
    return new Response(JSON.stringify({ error: error.message }), {
      status: 500,
    });
  }
}
