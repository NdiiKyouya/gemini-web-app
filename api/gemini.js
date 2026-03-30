// api/gemini.js
export default async function handler(req, res) {
    const { prompt } = JSON.parse(req.body);
    const API_KEY = process.env.GEMINI_API_KEY; // Aman, tidak terlihat oleh publik
    const URL = `https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash:generateContent?key=${API_KEY}`;

    const response = await fetch(URL, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
            contents: [{ parts: [{ text: prompt }] }]
        })
    });

    const data = await response.json();
    const resultText = data.candidates[0].content.parts[0].text;

    res.status(200).json({ text: resultText });
}
