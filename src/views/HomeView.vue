<script setup>
import { RouterLink, RouterView } from 'vue-router'
</script>

<template>
  <router-link class="topage" to="/forum">
    论坛
  </router-link>
  <router-link class="topage" to="/inquiry">
    诊疗
  </router-link>
  <router-link class="topage" to="/tinymce">
    富文本
  </router-link>
</template>


<style scoped>
.topage {
  text-decoration: none;
  color: #333;
  font-family: sans-serif;
  font-size: 18px;
}
</style>
