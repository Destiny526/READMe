import { defineStore } from 'pinia';
import { getAIResponse } from '@/deepseek';

/**
 * 聊天状态管理
 * 简单理解：这个文件就像是项目的记忆中心，记录所有聊天状态
 */
export const useChatStore = defineStore('chat', {
  state: () => ({
    // 当前聊天ID
    currentChatId: null,
    // 所有聊天记录
    chats: {},
    // 历史对话列表
    history: []
  }),
  
  actions: {
    // 获取AI回复
    async getAIResponse(message) {
      // 这里可以添加消息到当前聊天
      this.addMessage('user', message);
      
      // 调用API获取回复
      const reply = await getAIResponse(message);
      
      // 添加AI回复
      this.addMessage('assistant', reply);
      
      return reply;
    },
    
    // 添加消息到当前聊天
    addMessage(role, content) {
      if (!this.chats[this.currentChatId]) {
        this.chats[this.currentChatId] = {
          id: this.currentChatId,
          title: content.slice(0, 20),
          messages: []
        };
      }
      
      this.chats[this.currentChatId].messages.push({
        role,
        content,
        timestamp: new Date().toISOString()
      });
    }
  }
});