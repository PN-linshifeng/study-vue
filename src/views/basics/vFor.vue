<template>
  <div v-highlight>
    <div class="margin-block">
      <h2 id="v-for">v-for</h2>
      <p>v-for基于一个数组或者对象渲染一个列表</p>
      <p>数组渲染：v-for="(item,index) in items"，item是元素，index是下标，可以使用of代替in。</p>
      <ul>
        <li v-for="(item,index) in flower" :key="index">{{item}}</li>
      </ul>
      <p>对象渲染：v-for="(vluse,key) in objs"，value是键值，key是键名。</p>
      <ul>
        <li v-for="(value,key) in tree" :key="key">{{attr[key]}}：{{value}}</li>
      </ul>
    </div>
    <div class="margin-block">
      <pre class="js" name="code" type="html">
        // 数组渲染：
        {{arrString}}

        // 对象渲染
        {{key}}
      </pre>
      <pre class="js" name="code" type="js">
         data: function() {
          return {
            flower: ["玫瑰花", "月季", "兰花", "菊花"],
            tree: {
              name: "椰子",
              age: "166年",
              add: "海南"
            },
            attr: {
              name: "树名",
              age: "年龄",
              add: "产地"
            }
          };
        }
      </pre>
    </div>
    <div class="margin-bb">
      <h2>数组和对象更新注意</h2>
    </div>
  </div>
</template>
<script>
export default {
  data: function() {
    return {
      arrString:
        '<li v-for="(item,index) in flower" :key="index">{{item}}</li>',
      key:
        '<li v-for="(value,key) in tree" :key="key">{{attr[key]}}：{{value}}</li>',
      flower: ["玫瑰花", "月季", "兰花", "菊花"],
      tree: {
        name: "椰子",
        age: "166年",
        add: "海南"
      },
      attr: {
        name: "树名",
        age: "年龄",
        add: "产地"
      }
    };
  }
};
</script>