<template>
  <div class="home-container">
    <header>
      <h1>个人中心</h1>
      <div class="user-info">
        <span>{{ user.name }}</span>
        <img :src="user.avatar" alt="用户头像" />
      </div>
    </header>
    
    <nav>
      <router-link to="/chat">开始聊天</router-link>
      <router-link to="/profile">账号信息</router-link>
    </nav>
    
    <router-view></router-view>
  </div>
</template>

<script setup>
import { ref } from 'vue';

// 模拟用户数据
const user = ref({
  name: '测试用户',
  avatar: 'https://via.placeholder.com/50',
  email: 'test@example.com'
});
</script>

<style scoped>
.home-container {
  max-width: 1200px;
  margin: 0 auto;
}
header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 20px;
  border-bottom: 1px solid #eee;
}
.user-info {
  display: flex;
  align-items: center;
  gap: 10px;
}
.user-info img {
  width: 40px;
  height: 40px;
  border-radius: 50%;
}
nav {
  display: flex;
  gap: 20px;
  padding: 15px 20px;
  border-bottom: 1px solid #eee;
}
nav a {
  text-decoration: none;
  color: #333;
  padding: 5px 10px;
  border-radius: 4px;
}
nav a.router-link-active {
  background: #e3f2fd;
  color: #1976d2;
}
</style>