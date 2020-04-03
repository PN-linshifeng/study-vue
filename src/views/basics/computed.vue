<template>
  <div v-highlight>
    <div class="black-margin">
      <h1>计算属性和监听器</h1>
    </div>
    <div class="black-margin">
      <h2>计算属性 computed</h2>
      <p>主要用于属性变化时重新求值。只有依赖的属性修改时才能重新计算，方法也能达到同样的效果，但是计算属性会缓存，方法每次渲染都会执行。</p>
      <p>
        正常文本：
        <input type="text" v-model="text" />
      </p>
      <p>倒序文本：{{reverseText}}</p>
      <pre class="js" name="code" type="view">
          new Vue({
            data: function() {
              return {
                text: "123456789"
              };
            },
            computed: {
              reverseText: function() { // 计算属性，当依赖text属性变化时，自动执行
                return this.text
                  .split("")
                  .reverse()
                  .join("");
              }
            }
          })
        
      </pre>
    </div>
    <div class="black-margin">
      <h2>监听属性 watch</h2>
      <p>主要作用在数据变化时执行异步操作或者开销比较大的操作。</p>
      <p>
        搜索：
        <input type="text" v-model="seach" />
      </p>
      <p>结果：{{searchAnser}}</p>
    </div>
  </div>
</template>
<script>
import _ from 'lodash';

export default {
  data() {
    return {
      text: '123456789',
      /** 搜索关键字 */
      seach: '',
      /** 搜索结果 */
      searchAnser: '',
    };
  },
  methods: {
    search() {
      this.searchAnser = '正在搜索中....';
      setTimeout(() => {
        this.searchAnser = `lalalalalala${this.seach}`;
      }, 1000);
    },
  },
  computed: {
    reverseText() {
      return this.text
        .split('')
        .reverse()
        .join('');
    },
  },
  created() {
    this.onSearch = _.debounce(this.search, 500);
  },
  watch: {
    seach() {
      this.onSearch();
    },
  },
};
</script>
