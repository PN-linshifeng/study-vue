<template>
  <div>
    {{title}}
    <button v-on:click="handleAdd">你点击了{{count}}次</button>
    <div v-html="content"></div>
    <h2>在组件上使用 v-model</h2>
    <input type="text" v-bind:value="names" v-on:input="$emit('onName', $event.target.value)" />
    {{names}}
    <p>他说：{{say}}</p>
  </div>
</template>
<script>
export default {
  props: ['title', 'content', 'onLog', 'names', 'say'],
  data: function() {
    return {
      count: 0,
    };
  },
  methods: {
    handleAdd: function() {
      this.say = '双向绑定';
      this.count++;
      this.$emit('onLog', this.count);
    },
  },
};
</script>