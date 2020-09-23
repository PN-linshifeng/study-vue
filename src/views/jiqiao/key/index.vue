<template>
  <div>
    <div>
      <input type="text" v-model="value" />
      <button @click="add">添加</button>
      <button @click="random">变换</button>
    </div>
    <p v-for="k of arr">
      <input type="checkbox" />
      {{k}}
    </p>--------
    <p v-for="k of arr" :key="k">
      <input type="checkbox" />
      {{k}}
    </p>
  </div>
</template>
<script>
export default {
  data() {
    return {
      arr: ['a', 'b', 'c'],
      value: '',
    };
  },
  methods: {
    add() {
      this.arr.unshift(this.value);
    },
    random() {
      this.arr = this.arr.sort(() => Math.random() > 0.5);
    },
  },
};
</script>