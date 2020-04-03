<template>
  <div class="home">Home</div>
</template>

<script>
// @ is an alias to /src

export default {
  name: 'home',
  components: {},
};
</script>
<style lang="scss">
.css {
  position: relative;
  width: 250px;
  height: 250px;
  overflow: hidden; //取消可以hidden 可以看到原理
  &:before {
    content: '';
    position: absolute;
    left: 50%;
    bottom: 10%;
    height: 200%;
    width: 200%;
    border-radius: 40%; //弧度越小波浪越大
    background-color: rgb(118, 218, 255);
    animation-name: rotate;
    animation-iteration-count: infinite;
    animation-timing-function: linear;
    animation-duration: 10s;
  }
  &:after {
    box-sizing: border-box;
    content: '';
    position: absolute;
    height: 100%;
    width: 100%;
    border: 3px solid #000;
  }
}

@keyframes rotate {
  0% {
    transform: translate(-50%, 0) rotateZ(0deg);
  }
  50% {
    transform: translate(-50%, -2%) rotateZ(180deg);
  }
  100% {
    transform: translate(-50%, 0%) rotateZ(360deg);
  }
}
</style>