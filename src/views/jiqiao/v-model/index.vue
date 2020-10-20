<template>
  <div>
    <h1>v-modal</h1>
    <p>v-modal是v-bing:value和v-on:input的结合语法糖。</p>
    <p>自定义组件option参数model:{value:"value",event:"input"}，默认使用value值和input事件</p>
    <p>text：使用model默认值；checkbox和radio：使用checked值和change事件；select：使用input值和change事件</p>
    <div>
      <input-text v-model="value" />
      {{ value }}
    </div>
    <p>
      单选
      <br />
      <checkbox v-model="danxuan" value="a"></checkbox>
      {{ danxuan }}
    </p>
    <p>
      单选s
      <br />
      <checkbox v-model="danxuan2" true-value="yes" false-value="no"></checkbox>
      {{ danxuan2 }}
    </p>
    <p>
      复选框
      <br />
      <checkbox v-model="checkbox" value="a"></checkbox>a
      <checkbox v-model="checkbox" value="b"></checkbox>
      b
      {{ checkbox }}
    </p>
    <p></p>
    <p>
      单选：
      <br />
      <radio v-model="radio" name="水果" value="苹果" />苹果
      <radio v-model="radio" name="水果" value="梨子" />
      梨子
      {{ radio }}
    </p>
    <p>
      <selectList v-model="select">
        <option value="a">a</option>
        <option value="b">b</option>
      </selectList>
      {{ select }}
    </p>
  </div>
</template>
<script>
import Vue from 'vue';

const inputText = {
  model: {
    prop: 'value',
    event: 'input',
  },
  props: {
    value: String,
  },
  template: `
    <input type="text" v-bind:value="value" v-on:input="$emit('input',$event.target.value)" />
  `,
};

const checkbox = {
  model: {
    prop: 'checked',
    event: 'change',
  },
  props: {
    checked: [Array, Boolean, String],
    value: String,
    trueValue: String,
    falseValue: String,
  },
  template: `
    <input type="checkbox" v-bind:value="value" v-on:change="change" />
  `,
  methods: {
    change(val) {
      if (Array.isArray(this.checked)) {
        let arr = [];
        arr = [...this.checked];
        if (val.target.checked) {
          arr.push(val.target.value);
        } else {
          arr = arr.filter((k) => k !== val.target.value);
        }
        this.$emit('change', arr);
      } else {
        let value = val.target.checked;
        if (this.trueValue && val.target.checked) {
          value = this.trueValue;
        }
        if (this.falseValue && !val.target.checked) {
          value = this.falseValue;
        }
        this.$emit('change', value);
      }
    },
  },
};
const radio = {
  model: {
    prop: 'checked',
    event: 'change',
  },
  props: {
    value: String,
    checked: String,
  },
  template: `
    <input type="radio" v-bind:value="value" v-on:change="$emit('change',$event.target.value)" ></input>
  `,
};
const selectList = {
  model: {
    event: 'change',
  },
  props: {
    value: String,
  },
  template: `
    <select v-bind:value="value" v-on:change="$emit('change',$event.target.value)"><slot /></select>
  `,
};
export default {
  data() {
    return {
      value: 'ww',
      checkbox: [],
      radio: '',
      select: 'a',
      danxuan: false,
      danxuan2: false,
    };
  },
  components: { inputText, checkbox, radio, selectList },
  methods: {
    change(val) {
      console.log(val);
    },
  },
};
</script>