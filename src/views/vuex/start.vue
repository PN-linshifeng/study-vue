<template>
  <div v-highlight>
    <div class="margin-block">
      <h1>state</h1>
      <div>
        <p>
          导入vuex模块，调用Vue.use(Vuex)，创建实例store new Vuex.Store({state:{},mutations:{},actions:{},getter:{},module:{}})，<br />最后把实例store挂载跟组件上{store:store}，自组件访问store使用this.$store开头。<br />
          调用this.$store的函数必须是普通函数，箭头函数this为undefined。
        </p>
        <p>
          state：状态，组件读取状态的最简单的方法就是computed计算属性返回某个状态（computed:{count: function(){return this.$store.count}}），也可以使用mapState
          <br />
          mutations：{edit:function}： 修改状态，this.$store.commit('edit')
        </p>
      </div>
      <blockquote>
        <p>{{count}}，相加{{add}}</p>
        <p>
          <button type="button" @click="increment">自加一</button>&nbsp;
          <button type="button" @click="less">自减一</button>
        </p>
      </blockquote>
      <pre class="html" name="code" type="component">
        &lt;p&gt;{count}&lt;/p&gt;
        &lt;p&gt;
          &lt;button type=&quot;button&quot; @click=&quot;increment&quot;&gt;自加一&lt;/button&gt;&amp;nbsp;
          &lt;button type=&quot;button&quot; @click=&quot;less&quot;&gt;自减一&lt;/button&gt;
        &lt;/p&gt;
        

        &lt;script&gt;
        import { mapState } from &#x27;vuex&#x27;;

        export default {
          data:function(){
            return {defaultCount:100}
          },
          /** 第一种调用store */
          // computed: {
          //   count() {
          //     return this.$store.state.count;
          //   },
          // },

          /** 第二种调用store mapState({})*/
          computed: mapState({
            // 获取函数获取store更简洁，普通也可以
            count: state => state.count,

            // 设置计算属性computed count 的别名
            countAlias: 'count',

            // 内部有this 使用普通函数
            add(state){
              return this.defaultCount+state.count
            }
          }),

          /** 第三种调用store mapState([]) */
          // computed:mapState(['count']),

          methods: {
            increment: function() {
              this.$store.commit('increment');
            },
            less: function() {
              this.$store.commit('less');
            }
          }
        };

        &lt;/script&gt;

      </pre>
      <pre class="js" name="code" type="js">
        // 创建实例 store
        new Vuex.Store({
          state: {
            count: 0
          },
          mutations: {
            increment: function(state) {
              state.count++;
            },
            less: state => {
              state.count--;
            }
          },
          actions: {}
        });
      </pre>
    </div>
    <div class="margin-bloc">
      <h3>mapState 辅助computed获取store状态</h3>
      <p>
        mapState({})或者mapState([]) 两种调用方式
        
      </p>
      <p>
        对象模式：直接用箭头函数返回状态(state)=>state.count，如果函数内部使用了this，那就用普通函数。
      </p>
      <p>
        数组模式：mapState(['count']),count直接从store解构。
      </p>
    </div>
  </div>
</template>
<script>
import { mapState } from 'vuex';

export default {
  data:function(){
    return {defaultCount:100}
  },
  /** 第一种调用store */
  // computed: {
  //   count() {
  //     return this.$store.state.count;
  //   },
  // },

  /** 第二种调用store mapState({})*/
  computed: mapState({
    // 获取函数获取store更简洁，普通也可以
    count: state => state.count,

    // 设置计算属性computed count 的别名
    countAlias: 'count',

    // 内部有this 使用普通函数
    add(state){
      return this.defaultCount+state.count
    }
  }),

  /** 第三种调用store mapState([]) */
  // computed:mapState(['count']),

  methods: {
    increment: function() {
      this.$store.commit('increment');
    },
    less: function() {
      this.$store.commit('less');
    },
  },
};
</script>