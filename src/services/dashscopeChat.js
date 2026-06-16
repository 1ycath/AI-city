import { CHAT_MODEL } from '../constants/chatPrompt';

function extractContent(data) {
  const message = data.choices?.[0]?.message;
  if (!message) return null;

  const text = message.content?.trim();
  if (text) return text;

  // 部分 Qwen3 系列模型可能将正文放在 reasoning_content
  const reasoning = message.reasoning_content?.trim();
  if (reasoning) return reasoning;

  return null;
}

export async function sendChatCompletion(messages) {
  const response = await fetch('/api/chat', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({
      model: CHAT_MODEL,
      messages,
      enable_thinking: false,
    }),
  });

  if (!response.ok) {
    let detail = `HTTP ${response.status}`;
    try {
      const errBody = await response.json();
      detail = errBody.error?.message ?? errBody.message ?? detail;
    } catch {
      // ignore parse error
    }
    throw new Error(detail);
  }

  const data = await response.json();
  const content = extractContent(data);

  if (!content) {
    throw new Error('模型未返回有效内容');
  }

  return content;
}
