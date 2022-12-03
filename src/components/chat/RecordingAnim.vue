<template>
  <div class="mation">
    <div class="ap">
      <div class="box">
        <div></div>
        <div></div>
        <div></div>
        <div></div>
        <div></div>
        <div></div>
        <div></div>
        <div></div>
      </div>
    </div>
    <div class="ap aps">
      <div class="box">
        <div></div>
        <div></div>
        <div></div>
        <div></div>
        <div></div>
        <div></div>
        <div></div>
        <div></div>
      </div>
    </div>
  </div>
</template>
<script>
export default {
}
</script>
<style>
.ap {
  position: relative;
  height: 50px;
  width: 30px;
  margin: 0 auto;
}
.aps {
  transform-origin: center center;
  transform: rotate(180deg);
}
.box div {
  display: inline-block;
  position: absolute;
  bottom: 0;
  width: 10px;
  height: 30px;
  /* 动画颜色 */
  background-color: rgb(78, 176, 255);
  transform-origin: bottom;
  border-radius: 5px 5px 0 0;
}
.aps .box div {
  background-color: rgb(0, 141, 255);
  bottom: 2px;
}
.box div:nth-child(1) {
  left: -60px;
  animation: musicWave 0.5s infinite linear both alternate;
}
.box div:nth-child(2) {
  left: -40px;
  animation: musicWave 0.8s infinite linear both alternate;
}
.box div:nth-child(3) {
  left: -20px;
  animation: musicWave 0.6s infinite linear both alternate;
}
.box div:nth-child(4) {
  left: 0px;
  animation: musicWave 0.7s infinite linear both alternate;
}
.box div:nth-child(5) {
  left: 20px;
  animation: musicWave 0.7s infinite linear both alternate;
}
.box div:nth-child(6) {
  left: 40px;
  animation: musicWave 0.6s infinite linear both alternate;
}
.box div:nth-child(7) {
  left: 60px;
  animation: musicWave 0.8s infinite linear both alternate;
}
.box div:nth-child(8) {
  left: 80px;
  animation: musicWave 0.5s infinite linear both alternate;
}
@keyframes musicWave {
  0% {
    height: 8px;
  }
  100% {
    height: 30px;
  }
}
</style>
  
