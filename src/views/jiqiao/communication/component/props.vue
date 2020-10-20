<template>
  <div>
    <h1>{{ h }}props 传参数</h1>
    <p>父组件通过属性传给子组件</p>
    <child attrA="参数A" :attrB="[123, 543]" class="demo" />
    <pre class="js" name="code" type="view" v-highlight v-pre>
      // 父组件
       &lt;child attrA=&quot;参数A&quot; :attrB=&quot;[123,543]&quot; class=&quot;demo&quot; /&gt;

      const child = {
        name: 'child',
        // props: ['attrA', 'attrB'], // 普通方式
        props: {
          // 校验方式
          attrA: { required: true, type: String, default: 'a' },
          attrB: { required: false, type: [String, Array], default: 'a' }
        },
        template: `
           &lt;div&gt;{{ attrA }},{{ attrB }}&lt;/div&gt;
        `
      };
      export default {
        data() {
          return { dd: 12 };
        },
        components: { child }
      };
    </pre>
  </div>
</template>
<script>
const child = {
  name: 'child',
  // props: ['attrA', 'attrB'], // 普通方式
  props: {
    // 校验方式
    attrA: { required: true, type: String, default: 'a' },
    attrB: { required: false, type: [String, Array], default: 'a' },
  },
  template: `
    <div>{{attrA}},{{attrB}}</div>
  `,
};
export default {
  data() {
    return { dd: 12 };
  },
  props: { h: String },
  components: { child },
};
</script>