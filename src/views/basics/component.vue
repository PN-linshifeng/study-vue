<template>
  <div v-highlight>
    <div class="margin-block">
      <h2 id="#基本组件">基本组件</h2>
      <p>基本组件和new vue组件接收相同的选项，如data、methods、computed、watch、等生命周期，但是没有el挂载。组件可以复用，相互不影响</p>
      <p>组件父子通过props属性，传参是通过属性，props是接收参数。【v-属性名】绑定数据。子触发父的事件，父传事件【v-on:事件="事件"】，子组件通过this.$emit(事件名，参数)</p>
      <p>遍历基本组件复用，触发父事件：</p>
      <componentButton
        v-for="(item,index) in shili"
        :key="index"
        v-bind:title="`遍历${item.id}`"
        v-bind:content="item.content"
        v-bind:names="namea"
        :say.sync="say"
        v-on:onName="onName"
        v-on:onLog="onLog"
      ></componentButton>
      <input type="text" v-model="say" />
    </div>
  </div>
</template>
<script>
import componentButton from './component-button';

// const at = { template: '<span>ssss</span>' };
export default {
  data: function() {
    return {
      namea: 'S',
      say: '',
      shili: [{ id: 1, title: '按钮1', content: '<span>html内容</span>' }],
    };
  },
  components: { componentButton },
  methods: {
    onLog: function(count) {
      console.log(count);
    },
    onName: function(namea) {
      this.namea = namea;
      console.log(this.namea);
    },
  },
};
</script>