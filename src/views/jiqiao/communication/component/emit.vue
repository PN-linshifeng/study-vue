<template>
  <div>
    <h1>{{ h }}$emit 回调传参</h1>
    <p>
      回调属性方法$emit('属性方法',参数)；sync同步属性值$emit('update:属性名',参数)；v-model $emit('input/change',参数)
    </p>
    <h3>通过回调方法传参</h3>
    <div class="demo">
      父：{{ funValue }}。 子：
      <fun @submit="fun" />
    </div>
    <h3>sync同步属性传参</h3>
    <div class="demo">
      父：{{ syncValue }}。 子：
      <sync :val.sync="syncValue" />
    </div>
  </div>
</template>
<script>
const Fun = {
  name: 'fun',
  data() {
    return { value: '' };
  },
  template: '<span>值：<input v-model="value" /> <button @click="submit">提交</button></span>',
  methods: {
    submit() {
      this.$emit('submit', this.value);
    },
  },
};
const sync = {
  name: 'sync',
  data() {
    return { value: '' };
  },
  props: ['val'],
  template: '<span>值：<input v-model="value" /> 参数：{{val}}, <button @click="submit">提交</button></span>',
  methods: {
    submit() {
      this.$emit('update:val', this.value);
    },
  },
};
export default {
  props: { h: String },
  data() {
    return {
      funValue: 1,
      syncValue: 'sync',
    };
  },
  methods: {
    fun(val) {
      this.funValue = val;
    },
  },
  components: { Fun, sync },
};
</script>