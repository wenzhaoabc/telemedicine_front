<script>
import { RouterLink, RouterView } from 'vue-router'

// import { userInfo } from '@/stores/counter.js';
// const User = userInfo()

export default {
  data() {
    return {
      // avatar: User.photo
    }
  }
}
</script>

<template>
  <a-layout class="layout-main">
    <a-layout-header class="layout-header">
      <div class="quick-entry">
        <a-link src="#" style="color: black;">
          <icon-menu size="24px" />
        </a-link>

      </div>
      <!-- 分割线 -->
      <!-- <div>
        <a-divider direction="vertical" />
      </div> -->
      <div class="header-logo">
        <img src="/log.svg" alt="">
      </div>
      <div style="width:65% ;"></div>
      <div class="header-link">
        <a-link src="#" class="page-tag">Home</a-link>
        <a-link src="#" class="page-tag">Forum</a-link>
        <a-link src="#" class="page-tag">INquiry</a-link>
        <a-link src="#" class="page-tag">Doctor</a-link>
        <router-link :to="'/myInfo'">
          <a-avatar :style="{ backgroundColor: '#3370ff', marginRight: '60px' }">
            <IconUser />
          </a-avatar>
        </router-link>
      </div>
    </a-layout-header>
    <a-layout-content>
      <router-view></router-view>
    </a-layout-content>
  </a-layout>
</template>

<style scoped>
.layout-main {
  display: flex;
  height: 100vh;
}

.layout-header {
  height: 50px;
  display: flex;
  width: 100%;
  border-bottom: 1px solid var(--color-border);
}

.quick-entry {
  position: relative;
  display: flex;
  justify-content: center;
  align-items: center;
  width: 60px;
  padding: 0 10px;
  height: 100%;
}

.header-logo {
  display: flex;
  align-items: center;
  justify-content: center;
  width: 120px;
  height: 100%;
  box-sizing: border-box;
  text-decoration: none;
}

.header-logo img {
  height: 26px;
  width: 110px;
}

.header-link {
  display: flex;
  justify-content: space-around;
  align-items: center;
  text-align: center;
  position: relative;
}

.page-tag {
  margin-right: 40px;
  font-size: 18px !important;
  color: black !important;
}

.layout-body {
  width: 100%;
  /* background-image: url("../src/assets/20210629124327_48437.jpg"); */
  background-size: 100% 100%;
  height: 100%;
}
</style>
