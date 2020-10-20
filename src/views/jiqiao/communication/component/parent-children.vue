<template>
  <div>
    <h1>{{ h }}$parent和$children 根据组件链查找</h1>
    <h3>$parent</h3>
    <p>孙组件要给爷爷传递数据，孙组件通过$parent.$emit()找到爷爷自身事件。</p>
    <zi class="demo" @change="change" :value="value" />
    <zi class="demo" @change="change" :value="value" />
    <p>多层次深度可以使用$parent.$parent....链式使用，可以使用vue.prototype封装。</p>
    <h3>$children</h3>
    <p>$children.$emit派发事件，$children是个数组，封装使用回调函数方式。</p>
    <div class="demo">
      <input v-model="value" /><button @click="$children[0].$emit('change', value)">修改孙组件</button>
    </div>
  </div>
</template>
<script>
import Vue from 'vue';

Vue.prototype.$dispatch = function (eventName, data) {
  let parent = this.$parent;
  while (parent) {
    parent.$emit(eventName, data);
    parent = parent.$parent;
  }
};
const sun = {
  name: 'sun',
  data() {
    return {
      value: '',
    };
  },
  template: `<span>孙组件：<input v-model="value" @change="(e)=>{this.$dispatch('change', e.target.value)}">{{value}}</span>`,
  methods: {
    change(val) {
      this.value = 'val';
    },
  },
};
const zi = {
  name: 'zi',
  props: { value: String },
  template: `<div>子组件：{{value}}， <sun /></div>`,
  components: { sun },
};
export default {
  data() {
    return {
      value: '99',
    };
  },
  props: { h: String },
  components: { zi },
  methods: {
    change(value) {
      this.value = value;
      console.log(this.$children);
    },
  },
};
</script>