import dotenv from 'dotenv'
import Groq from 'groq-sdk';
dotenv.config()


const client = new Groq({
    apiKey: process.env['GROQ_API_KEY'], // This is the default and can be omitted
});


const text = "hello, dear i hope you are fine at that place , if not please connect me through mail waiting for your response  ";
const lang = "french";
const originalLangauage = "english"
let translatedText = '';

const prompt = `Translate the following ${originalLangauage} text to ${lang}. Return ONLY a JSON object like this: { "translated": "<translated_text>" }. No other explanation. Text: "${text}"`;

export async function Translation(lang, text) {
    const chatCompletion = await client.chat.completions.create({
        messages: [{ role: 'user', content: prompt }],
        model: 'llama3-8b-8192',
    });

    const content = chatCompletion.choices[0].message.content;

    try {
        const parsed = JSON.parse(content);
        // console.log(parsed);
        return parsed
    } catch (error) {
        console.error("❌ Failed to parse JSON:", error);
        console.log("Raw output:", content);
    }
}



