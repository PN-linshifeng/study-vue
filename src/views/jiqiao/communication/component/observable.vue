<template>
  <div>
    <h1>{{ h }}observable</h1>
    <p>
      vue.observable({Object});返回的对象可以直接用于渲染函数和计算属性内，并且会在发生变更时触发相应的更新。也可以作为最小化的跨组件状态存储器，
    </p>
    <div class="demo">
      <p>count:{{ count }},<button @click="setCount">加价</button></p>
      <son />
    </div>
  </div>
</template>
<script>
import Vue from 'vue';
const store = Vue.observable({ count: 0 });
const mutations = {
  setCount() {
    store.count += 1;
  },
};

const son = {
  name: 'son',
  template: `<p>子组件：count:{{ count }},<button @click="setCount">加价</button></p>`,
  methods: {
    setCount() {
      mutations.setCount();
    },
  },
  computed: {
    count() {
      return store.count;
    },
  },
};

export default {
  components: { son },
  props: { h: String },
  computed: {
    count() {
      return store.count;
    },
  },
  methods: {
    setCount() {
      mutations.setCount();
    },
  },
};
</script>