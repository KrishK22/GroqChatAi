import dotenv from 'dotenv'
import Groq from 'groq-sdk';
dotenv.config()


const client = new Groq({
    apiKey: process.env['GROQ_API_KEY'], // This is the default and can be omitted
});




export async function Translation(text, lang) {
    const prompt = `Translate the following text to ${lang}: "${text}".
    Return ONLY a JSON object in this exact format:
    {
        "${lang}": "translated text here"
    }
    Do not include any additional text, explanations, or formatting.`;

    try {
        const chatCompletion = await client.chat.completions.create({
            messages: [{ role: 'user', content: prompt }],
            model: 'llama3-8b-8192',
        });

        const content = chatCompletion.choices[0].message.content;
        const parsed = JSON.parse(content);
        // console.log(typeof parsed, parsed)
        return parsed;
    } catch (error) {
        console.error("Translation error:", error);
        return { [lang]: text }; // Return original text if translation fails
    }
}