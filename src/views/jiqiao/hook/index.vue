<template>
  <div>
    <p>在注册定时器的地方，用$once('hook:beforeDestroy')监听生命钩子来销毁定时器</p>
    <el-form ref="form" data="form" inline @submit.native.prevent="submit">
      <el-form-item prop="val">
        <el-input v-model="form.val" />
      </el-form-item>
      <el-form-item>
        <el-button native-type="submit" :loading="loading" :disabled="disabled">{{buttonText}}</el-button>
      </el-form-item>
    </el-form>
  </div>
</template>
<script>
export default {
  data: function () {
    return {
      form: {
        val: '',
      },
      buttonText: '发送验证码',
      time: 10,
      loading: false,
      disabled: false,
    };
  },
  // 组件被挂载后
  mounted() {
    // 注册定时器
    this.timer = setInterval(() => {}, 1000);
  },
  // 组件被卸载之前
  beforeDestroy() {
    // 清理定时器
    clearInterval(this.timer);
  },
  methods: {
    submit() {
      this.loading = true;
      const resp = new Promise((resolve) => {
        setTimeout(() => {
          resolve();
        }, 2000);
      });

      resp.then(() => {
        this.loading = false;
        this.disabled = true;
        this.buttonText = this.time + '秒后重发发送';
        // 注册定时器
        const timer = setInterval(() => {
          this.time = this.time - 1;
          if (this.time < 0) {
            clearInterval(this.timer);
            this.disabled = false;
            this.buttonText = '发送验证码';
            this.time = 10;
            return;
          }
          this.buttonText = this.time + '秒后重发发送';
        }, 1000);
        // 销毁定时器，利用$once(hook:生命钩子函数)监听生命钩子 。
        this.$once('hook:beforeDestroy', () => {
          clearInterval(timer);
        });
      });
    },
  },
};
</script>