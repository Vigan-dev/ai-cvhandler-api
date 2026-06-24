export class AiService {
  async testOllama() {
    const response = await fetch('http://localhost:11434/api/generate', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        model: 'qwen2.5:3b',
        prompt: 'Say hello from Ollama',
        stream: false,
      }),
    });

    const data = await response.json();
    return data.response;
  }
}
