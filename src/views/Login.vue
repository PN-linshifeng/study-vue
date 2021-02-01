<template>
  <div class="fixed">
    <div class="bg"></div>
    <div class="main">
      <h1>登录</h1>
      <el-form
        ref="form"
        :model="form"
        status-icon
        :rules="rules"
        v-on:submit.native.prevent="submit"
      >
        <el-form-item prop="userName">
          <el-input v-model="form.userName" placeholder="请输入内容" @blur="handleBlur"></el-input>
        </el-form-item>
        <el-form-item prop="password">
          <el-input show-password v-model="form.password" placeholder="请输入内容"></el-input>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" native-type="submit" :loading="isLoading">提交</el-button>
        </el-form-item>
      </el-form>
    </div>
  </div>
</template>
<script>
export default {
  name: 'Login',
  data() {
    var checkAge = (rule, value, callback) => {
      if (!value) {
        return callback(new Error('年龄不能为空'));
      }
      setTimeout(() => {
        if (!Number.isInteger(value)) {
          callback(new Error('请输入数字值'));
        } else {
          if (value < 18) {
            callback(new Error('必须年满18岁'));
          } else {
            callback();
          }
        }
      }, 1000);
    };
    return {
      error: false,
      massage: 'xxxx',
      form: { userName: '', password: '' },
      rules: {
        // userName: [{ trigger: 'blur', validator: checkAge }],
        password: [{ required: true, message: '请输入密码', trigger: 'blur' }],
      },
    };
  },
  computed: {
    isLoading() {
      return this.$store.state.login.loginLoading;
    },
  },
  methods: {
    handleBlur() {},
    submit() {
      this.$refs.form.validate((valid) => {
        // this.$store.dispatch('todo/done');
        if (valid) {
          this.$store.dispatch('login/login', {
            data: this.form,
            callback: (resp) => {
              if (resp) {
                const { redirect } = this.$route.query;
                this.$message({ message: '登录成功', type: 'success' });
                this.$router.push(redirect || '/');
              }
            },
          });
        }
        return false;
      });
    },
  },
};
</script>

<style lang="scss">
.fixed {
  position: fixed;
  top: 0;
  right: 0;
  bottom: 0;
  left: 0;
  text-align: center;

  &:before {
    display: inline-block;
    height: 100%;
    vertical-align: middle;
    content: '';
  }
  .bg {
    position: absolute;
    z-index: -1;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background: url(../assets/images/login-bg.jpg) center center;
    filter: blur(57px);
    &::after {
      position: absolute;
      z-index: -1;
      top: 0;
      left: 0;
      width: 100%;
      height: 100%;
      background: rgba(255, 255, 255, 0.5);
      content: '';
    }
  }

  .main {
    position: relative;
    top: 0;
    width: 500px;
    border: 1px solid #e2e2e2;

    border-radius: 5px;
    margin-bottom: 24px;
    padding: 20px 40px;
    text-align: left;
    background: rgba(255, 255, 255, 0.5);
    display: inline-block;
    vertical-align: middle;
    h1 {
      margin: 0 0 20px 0;
      text-align: center;
    }
  }
}
</style>