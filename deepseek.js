/**
 * 封装DeepSeek API调用
 * 简单理解：这个文件就像是一个专门负责和DeepSeek对话的秘书
 */
const API_KEY = 'your-api-key-here';

/**
 * 获取AI回复
 * @param {string} message 用户发送的消息
 * @returns {Promise<string>} AI回复内容
 */
export async function getAIResponse(message) {
  try {
    const response = await fetch('https://api.deepseek.com/v1/chat/completions', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${API_KEY}`
      },
      body: JSON.stringify({
        model: 'deepseek-r1',
        messages: [{ role: 'user', content: message }],
        temperature: 0.7
      })
    });
    
    const data = await response.json();
    return data.choices[0].message.content;
  } catch (error) {
    console.error('调用DeepSeek API出错:', error);
    return '抱歉，AI暂时无法响应，请稍后再试';
  }
}