const OpenAI = require("openai");
const dotenv = require("dotenv");
dotenv.config();
const client = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

async function askAI() {
  const response = await client.responses.create({
    model: "gpt-4.1-mini",
    input: `Explain JWT authentication in 5 bullet points for a Node.js backend developer
        
        Return ONLY valid JSON.

            {
            "summary":"",
            "advantages":[],
            "disadvantages":[]
            }
        `,
  });

  console.log(response.output_text);
}

askAI();
