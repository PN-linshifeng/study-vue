<template>
  <div>
    <h1>{{ h }}provide inject 注入依赖</h1>
    <p v-pre>
      provide提供给后代组件数据和方法，相当大范围的prop；inject是接收指定的provide提供的数据和方法。provide：Object | ()
      => Object; inject：Array string | { [key: string]: string | Symbol | Object }
    </p>
    <p>
      提示：provide 和 inject 绑定并不是可响应的。这是刻意为之的。然而，如果你传入了一个可监听的对象，那么其对象的
      property 还是可响应的。
    </p>
    <div class="demo">
      <p>{{ value }}</p>
      <son />
    </div>
  </div>
</template>
<script>
const grandson = {
  name: 'grandson',
  inject: ['value', 'setValues'],
  template: `<div>孙组件：{{value}}，<button @click="setValues('孙组件')">设置值</button></div>`,
};
const son = {
  name: 'son',
  inject: ['value', 'setValues'],
  components: { grandson },
  template: `<div>子组件：{{value}}，<button @click="setValues('子组件')">设置值</button><grandson /></div>`,
};
export default {
  provide() {
    return { value: this.value, setValues: this.setValues };
  },
  props: { h: String },
  components: { son },
  data() {
    return {
      value: '998',
    };
  },
  methods: {
    setValues(val) {
      console.log(val);
      this.value = val;
    },
  },
};
</script>