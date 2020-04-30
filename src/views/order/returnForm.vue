<template>
  <el-dialog :visible="visible" title="退货" @close="$emit('close')">
    <el-table :data="order.order" @selection-change="handleSelectionChange">
      <el-table-column type="selection" width="55" :selectable="selectable"></el-table-column>
      <el-table-column prop="image" label="图片" width="100">
        <template slot-scope="scope">
          <router-link :to="scope.row.url">
            <img :src="scope.row.image" :alt="scope.row.title" />
          </router-link>
        </template>
      </el-table-column>
      <el-table-column prop="title" label="产品" width="300" />
      <el-table-column prop="amount" label="数量" width="80" />
      <el-table-column prop="prise" label="价格" width="80" />
      <el-table-column label="总价" :formatter="total" width="80" class-name="all-total" />
      <el-table-column prop="remacks" label="备注" />
    </el-table>
    <span slot="footer">
      <el-button
        @click="handleReturn"
        type="primary"
        :disabled="returnForm.length<=0?true:false"
        :loading="returnOrderLoading"
      >退货</el-button>
    </span>
  </el-dialog>
</template>
<script>
export default {
  props: {
    visible: { type: Boolean, required: true },
    order: Object,
  },
  data() {
    return {
      returnForm: [],
    };
  },
  computed: {
    returnOrderLoading() {
      return this.$store.state.order.returnOrderLoading;
    },
  },
  methods: {
    handleSelectionChange(row = []) {
      if (row) {
        const a = row.map(k => k.id);
        this.returnForm = a;
      }
    },
    total(row) {
      return (row.amount * row.prise).toFixed(2);
    },
    handleReturn() {
      this.$confirm('是否继续退货', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning',
      })
        .then(() => {
          this.$store.dispatch('order/returnOrder', {
            data: {
              id: this.order.id,
              order: this.returnForm,
            },
            callback: resp => {
              if (resp) {
                this.$message({ type: 'success', message: '退货成功' });
                this.$emit('close');
              } else {
                this.$message({ type: 'errer', message: resp.message || '退货失败' });
              }
            },
          });
        })
        .catch(() => {});
    },
    selectable(row) {
      return !row.return;
    },
  },
};
</script>