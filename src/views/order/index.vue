<template>
  <div>
    <el-table :data="dataList.data" v-loading="dataListLoading" stripe>
      <el-table-column type="expand" style="background:#ccc" row-style="background:#f5f5f5">
        <template slot-scope="scope">
          <el-table :data="scope.row.order" size="mini">
            <el-table-column prop="image" label="图片" width="100">
              <template slot-scope="scope">
                <router-link :to="scope.row.url">
                  <img :src="scope.row.image" :alt="scope.row.title" />
                </router-link>
              </template>
            </el-table-column>
            <el-table-column prop="title" label="产品" width="300" />
            <el-table-column prop="return" label="退货" width="100" align="center">
              <template slot-scope="scope">
                <el-tag v-if="scope.row.return" type="danger">已退货</el-tag>
              </template>
            </el-table-column>
            <el-table-column prop="amount" label="数量" width="80" align="center" />
            <el-table-column prop="prise" label="价格" width="80" />
            <el-table-column label="总价" :formatter="total" width="80" class-name="all-total" />
            <el-table-column prop="remacks" label="备注" />
          </el-table>
        </template>
      </el-table-column>
      <el-table-column prop="id" label="订单号" />
      <el-table-column prop="buyer" label="买家" />
      <el-table-column prop="seller" label="卖家" />
      <el-table-column prop="logistics" label="物流">
        <template slot-scope="scope">
          <el-popover placement="top" trigger="click">
            <div>
              <p>收件人：{{scope.row.logistics.name}}，{{scope.row.logistics.tel}}</p>
              <ul v-if="scope.row.logistics.state">
                <li v-for="(item,index) of scope.row.logistics.data" :key="item+index">-{{item}}</li>
              </ul>
              <div v-else>物流没有动态</div>
            </div>
            <el-tag
              :type="scope.row.logistics.state?'success':'info'"
              slot="reference"
            >{{scope.row.logistics.state?scope.row.logistics.number:'未发货'}}</el-tag>
            <!-- <el-tag type="info" v-else>未发货</el-tag> -->
          </el-popover>
        </template>
      </el-table-column>
      <el-table-column prop="total" label="总价" :formatter="priseTotal" class-name="all-total" />
      <el-table-column label="操作" width="260">
        <template slot-scope="scope">
          <el-button size="small">
            <router-link :to="'/order/'+scope.row.id">订单详情</router-link>
          </el-button>
          <el-button type="warning" size="small" @click="handleReturnOrder(scope.row)">退货</el-button>
          <el-button
            size="small"
            type="danger"
            v-if="!scope.row.logistics.state"
            @click="handleDialogLogistics(scope.row)"
          >发货</el-button>
        </template>
      </el-table-column>
    </el-table>
    <el-pagination
      layout="prev,pager,next"
      background
      style="padding:24px 0"
      :total="dataList.total"
      :current-page="dataList.current"
      @current-change="currentChange"
    ></el-pagination>
    <el-dialog :visible="logisticsVisible" title="订单号" width="450px">
      <el-form
        ref="logistics"
        :model="logistics"
        :rules="logisticsRules"
        v-on:submit.native.prevent="submitLogistics"
      >
        <el-form-item prop="number" style="margin:0">
          <el-input v-model="logistics.number" size="small" />
        </el-form-item>
      </el-form>
      <span slot="footer" class="dialog-footer">
        <el-button @click="submitLogistics" :loading="logisticsLoading">提交</el-button>
      </span>
    </el-dialog>
    <el-retrun :visible="returnDialogVisible" :order="returnOrder" v-on:close="closeReturnOrder" />
  </div>
</template>
<script>
import { mapState } from 'vuex';
import returnForm from './returnForm';

export default {
  data() {
    return {
      a: [],
      logisticsVisible: false,
      logistics: {
        number: '',
        id: null,
      },
      logisticsRules: {
        number: [
          { required: true, message: '请输入单号', trigger: 'blur' },
          { min: 8, max: 12, message: '长度在 8 到 12 个字符', trigger: 'change' },
        ],
      },
      returnDialogVisible: false,
      returnOrder: {},
      returnOrderID: null,
    };
  },
  components: { elRetrun: returnForm },
  created() {
    this.queryList();
  },
  computed: {
    ...mapState({
      dataList: state => state.order.dataList,
      dataListLoading: state => state.order.dataListLoading,
      logisticsLoading: state => state.order.logisticsLoading,
    }),
  },
  methods: {
    queryList(params) {
      this.$store.dispatch('order/queryList', { params });
    },
    total(row) {
      return (row.amount * row.prise).toFixed(2);
    },
    priseTotal(row) {
      const { order } = row;
      const total = order.reduce((a, b) => a + b.prise * b.amount, 0);
      return total.toFixed(2);
    },
    handleDialogLogistics({ id }) {
      this.logisticsVisible = !this.logisticsVisible;
      this.logistics = {
        number: '',
        id,
      };
    },
    submitLogistics() {
      this.$refs.logistics.validate(vali => {
        if (vali) {
          this.$store.dispatch('order/logistics', {
            data: { ...this.logistics },
            callback: () => {
              this.logisticsVisible = false;
            },
          });
        }
      });
    },
    currentChange(page) {
      this.$store.dispatch('order/queryList', { params: { page } });
    },
    handleReturnOrder(row) {
      this.returnOrder = row;
      this.returnDialogVisible = true;
    },
    closeReturnOrder() {
      this.returnDialogVisible = false;
    },
    formattreReturn(row) {
      return row.return ? '已退' : '';
    },
  },
};
</script>
<style lang="scss">
.el-table__row.expanded {
  td {
    border: none;
  }
}
.all-total {
  font-weight: bold;
  color: #ff0000;
}
</style>