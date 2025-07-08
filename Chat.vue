<template>
  <div class="chat-container">
    <!-- 未开始聊天状态 -->
    <div v-if="state === 'idle'" class="idle-state">
      <h2>欢迎使用AI聊天</h2>
      <button @click="startNewChat">开始新对话</button>
      <div class="history-list" v-if="history.length > 0">
        <h3>历史对话</h3>
        <div 
          v-for="(item, index) in history" 
          :key="index"
          @click="loadHistory(item)"
        >
          {{ item.title }}
        </div>
      </div>
    </div>

    <!-- 聊天中状态 -->
    <div v-else-if="state === 'chatting'" class="chatting-state">
      <div class="message-area">
        <div 
          v-for="(msg, index) in currentChat.messages" 
          :key="index"
          :class="['message', msg.role]"
        >
          {{ msg.content }}
        </div>
      </div>
      <div class="input-area">
        <input v-model="inputMessage" />
        <button @click="sendMessage">发送</button>
      </div>
    </div>

    <!-- 查看历史记录状态 -->
    <div v-else class="history-state">
      <button @click="backToChat">返回</button>
      <div class="message-area">
        <div 
          v-for="(msg, index) in viewingHistory.messages" 
          :key="index"
          :class="['message', msg.role]"
        >
          {{ msg.content }}
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue';
import { useChatStore } from '@/stores/chat';

// 定义三种状态：idle(未聊天)、chatting(聊天中)、viewing(查看历史)
const state = ref('idle');
const inputMessage = ref('');
const chatStore = useChatStore();

// 模拟历史数据
const history = ref([
  { id: 1, title: '如何学习Vue3', messages: [] },
  { id: 2, title: 'DeepSeek API使用问题', messages: [] }
]);

// 当前聊天内容
const currentChat = ref({
  id: null,
  title: '',
  messages: []
});

// 查看的历史记录
const viewingHistory = ref(null);

// 开始新聊天
const startNewChat = () => {
  state.value = 'chatting';
  currentChat.value = {
    id: Date.now(),
    title: '新对话',
    messages: []
  };
};

// 发送消息
const sendMessage = async () => {
  if (!inputMessage.value.trim()) return;
  
  // 添加用户消息
  currentChat.value.messages.push({
    role: 'user',
    content: inputMessage.value
  });
  
  // 调用DeepSeek API获取回复
  const reply = await chatStore.getAIResponse(inputMessage.value);
  
  // 添加AI回复
  currentChat.value.messages.push({
    role: 'assistant',
    content: reply
  });
  
  inputMessage.value = '';
};

// 加载历史记录
const loadHistory = (item) => {
  state.value = 'viewing';
  viewingHistory.value = item;
};

// 返回聊天
const backToChat = () => {
  state.value = 'idle';
  viewingHistory.value = null;
};
</script>

<style scoped>
/* 这里添加样式 */
.chat-container {
  max-width: 800px;
  margin: 0 auto;
  padding: 20px;
}
.message-area {
  height: 500px;
  overflow-y: auto;
  border: 1px solid #eee;
  padding: 10px;
}
.message {
  margin: 10px 0;
  padding: 8px 12px;
  border-radius: 8px;
}
.message.user {
  background: #e3f2fd;
  margin-left: 20%;
}
.message.assistant {
  background: #f5f5f5;
  margin-right: 20%;
}
.input-area {
  display: flex;
  margin-top: 10px;
}
.input-area input {
  flex: 1;
  padding: 8px;
}
</style>