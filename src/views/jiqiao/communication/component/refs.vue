<template>
  <div>
    <h1>{{ h }} ref</h1>
    <p>refs获取组件实例数据和方法与真实的dom。</p>
    <div class="demo">
      <son ref="son" />
      <button @click="click">点击</button>
    </div>
  </div>
</template>
<script>
const son = {
  data() {
    return {
      value: '子组件的值',
    };
  },
  methods: {
    setValue() {
      this.value = '我调用的组件的方法';
    },
  },
  template: `<div>子组件：{{value}}</div>`,
};
export default {
  props: { h: String },
  components: { son },

  methods: {
    click() {
      this.$refs.son.setValue();
    },
  },
};
</script>