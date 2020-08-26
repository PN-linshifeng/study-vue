<template>
  <div>
    <el-form
      ref="searchForm"
      :model="searchForm"
      :rules="searchFormRules"
      :inline="true"
      v-on:submit.native.prevent="handleSubmit"
    >
      <el-form-item prop="id">
        <el-input v-model="searchForm.id" placeholder="订单号" size="small" />
      </el-form-item>
      <el-form-item>
        <el-input v-model="searchForm.logisticsId" placeholder="运单号" size="small" />
      </el-form-item>
      <el-form-item>
        <el-button native-type="submit" size="small" type="primary">查找</el-button>
      </el-form-item>
    </el-form>
  </div>
</template>
<script>
export default {
  data() {
    return {
      searchForm: {
        id: '',
        logisticsId: '',
      },
      searchFormRules: {
        id: [{ required: true, message: 'id不能为空', trigger: 'change' }],
      },
    };
  },
  methods: {
    handleSubmit() {
      this.$refs.searchForm.validate(vali => {
        if (vali) {
          this.$emit('search', this.searchForm);
        }
      });
    },
  },
};
</script>