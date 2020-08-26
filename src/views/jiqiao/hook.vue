<template>
  <div>
    <el-form ref="form" data="form" inline>
      <el-form-item prop="val">
        <el-input v-model="form.val" />
      </el-form-item>
      <el-form-item>
        <el-button @click="getCode">{{buttonText}}</el-button>
      </el-form-item>
    </el-form>
  </div>
</template>
<script>
export default {
  data: function () {
    return {
      buttonText: '发送验证码',
      form: {
        val: '',
      },
    };
  },
};
</script>