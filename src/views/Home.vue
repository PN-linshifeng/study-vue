<template>
  <div class="home">
    <div>home</div>
    <VueVideoTape
      :playerOptions="options"
      ref="videotape"
      @imageData="imageData"
      @videoData="videoData"
    ></VueVideoTape>
  </div>
</template>

<script>
// @ is an alias to /src
import VueVideoTape from 'vue-video-tape';

export default {
  name: 'home',
  data() {
    return {
      options: {
        width: 600,
        sources: [
          {
            src: 'http://.........',
          },
        ],
      },
    };
  },
  created() {
    this.start();
  },
  methods: {
    image() {
      //截图
      this.$refs.videotape.screenshot();
    },
    start() {
      //开始录制
      this.$refs.videotape.startCapture();
    },
    stop() {
      //结束录制
      this.$refs.videotape.stopCapture();
    },

    //截图成功回调事件
    imageData(base64) {},

    //录制成功回调事件
    videoData(url, file) {},
  },
  components: {
    VueVideoTape,
  },
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