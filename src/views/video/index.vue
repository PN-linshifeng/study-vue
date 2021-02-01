<template>
  <div>
    <p>请录制验证视频以确认当前开户申请是由您本人操作</p>
    <div class="video-box">
      <div>
        <video id="video" ref="video" autoplay playsinline></video>
      </div>

      <el-button type="primary" @click="headleOpenVideo">本人自愿开户，录制验证视频</el-button>
    </div>
  </div>
</template>
<script>
import { RecordRTCPromisesHandler } from 'recordrtc';

export default {
  created() {},
  methods: {
    // 录制视频
    async headleOpenVideo() {
      const video = this.$refs.video;
      video.src = video.srcObject = null;
      try {
        const camera = await navigator.mediaDevices.getUserMedia({
          audio: true,
          video: { width: 300, height: 300, facingMode: 'user' },
        });
        video.muted = true;
        video.volume = 0;
        video.srcObject = camera;
        video.removeAttribute('controls');
        let recorder = new RecordRTCPromisesHandler(camera, {
          type: 'video',
          checkForInactiveTracks: true,
        });

        recorder.startRecording();
        const sleep = (m) => new Promise((r) => setTimeout(r, m));
        await sleep(3000);
        await recorder.stopRecording();
        let blob = await recorder.getBlob();
        video.src = video.srcObject = null;
        video.muted = false;
        video.controls = 'controls';
        video.src = URL.createObjectURL(blob);

        recorder.destroy();
        recorder = null;
        var fileObject = new File([blob], 'video', {
          type: 'video/webm',
        });
        this.uploadVideo(fileObject);
      } catch (e) {
        console.error(e);
      }

      // .then(async (camera) => {

      // })
      // .catch(function (error) {
      //   alert(error);
      //   console.error(error);
      // });
    },
    // 上传视频
    uploadVideo(file) {
      const formData = new FormData();
      formData.append('file', file);
      alert('上传成功');
    },
  },
};
</script>
<style lang="scss">
.video-box {
  text-align: center;
  #video {
    // transform: rotateY(180deg);
    width: 300px;
    height: 300px;
    border: 1px solid #cccccc;
  }
}
</style>