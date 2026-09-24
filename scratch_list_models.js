const { GoogleGenerativeAI } = require('@google/generative-ai');
require('dotenv').config();

async function run() {
  const genAI = new GoogleGenerativeAI(process.env.VITE_GEMINI_API_KEY);
  
  try {
    // There isn't a direct listModels in the JS SDK usually, but let's try fetch
    const response = await fetch(`https://generativelanguage.googleapis.com/v1beta/models?key=${process.env.VITE_GEMINI_API_KEY}`);
    const data = await response.json();
    console.log(data.models.map(m => m.name).join('\n'));
  } catch(e) {
    console.error(e);
  }
}
run();
