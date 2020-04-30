<template>
  <div>
    <el-card v-loading="dataInfoLoading" style=" margin-bottom:24px">
      <div slot="header">订单信息</div>
      <el-row>
        <el-col :span="5">订单号：{{info.id}}</el-col>
        <el-col :span="5">总价：{{total.toFixed(2)}}</el-col>
        <el-col :span="5">下单时间：{{info.time}}</el-col>
        <el-col :span="5">卖家：{{info.seller}}</el-col>
        <el-col :span="4">买家：{{info.buyer}}</el-col>
      </el-row>
    </el-card>
    <el-card v-loading="dataInfoLoading" style=" margin-bottom:24px">
      <div slot="header">物流信息</div>
      <el-row>
        <el-col :span="5">收件人：{{info.logistics.name}}</el-col>
        <el-col :span="5">手机：{{info.logistics.tel}}</el-col>
        <el-col :span="5">
          状态：
          <el-tag v-if="info.logistics.state" type="succese">已发货</el-tag>
          <el-tag v-else type="danger">未发货</el-tag>
        </el-col>
        <template v-if="info.logistics.state">
          <el-col :span="5">
            单号：
            {{info.logistics.number}}
            <ul style="font-size:13px">
              <li v-for=" k of info.logistics.data" :key="k">{{k}}</li>
            </ul>
          </el-col>
        </template>
      </el-row>
    </el-card>
    <el-card v-loading="dataInfoLoading" style=" margin-bottom:24px">
      <div slot="header">购买产品</div>
      <el-table :data="info.order" size="mini">
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
        <el-table-column label="总价" :formatter="priseTotal" width="80" class-name="all-total" />
        <el-table-column prop="remacks" label="备注" />
      </el-table>
    </el-card>
  </div>
</template>
<script>
export default {
  data() {
    return {};
  },
  created() {
    // console.log(this.$route);
    this.getInfo();
  },
  methods: {
    getInfo() {
      const { id } = this.$route.params;
      this.$store.dispatch('order/getInfo', { params: { id } });
    },
    priseTotal(row) {
      return (row.amount * row.prise).toFixed(2);
    },
  },
  computed: {
    info() {
      return this.$store.state.order.dataInfo;
    },
    dataInfoLoading() {
      return this.$store.state.order.dataInfoLoading;
    },
    total() {
      return this.$store.state.order.dataInfo.order.reduce(function(a, b) {
        return a + b.prise * b.amount;
      }, 0);
    },
  },
};
</script>