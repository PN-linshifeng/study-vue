<template>
  <div v-highlight>
    <div class="margin-block">
      <div></div>
      <h1>getter/mutation/action/module</h1>
      <p>Getter：是计算属性，跟vue实例的computed一样，当依赖值发生变化，getter就重新计算</p>
      <p>mutation：类似于redux的reducers的，修改store的状态state</p>
      <p>action：跟redux使用方法一样，用dispatch派发任务</p>
      <div>
        module：模块把分散子vuex挂载到根vuex。子vuex的state需要用模块名，getter、mutation、action直接挂载到根vuex，如果子vuex的命名空间namespaced为真，getter、mutation、action也用模块名访问，子模块含有子子模块可以继承。
        <pre name="code" class="js" type="js">
          // 跟store.js
          import A from 'a.js'

          new Vuex({
            state:{...},
            getters:{...},
            actions:{...},
            mutations:{....},
            modules:{
              a:A
            }
          })


          // a.js 子vuex
          export default{
            namespaced: true,

            state:{...},  // this.$store.a.state

            getters:{...}, // namespaced=true时：this.$store.a.getters，namespaced=false时：this.$store.getters

            // namespaced=true时：this.$store.a.dispatch('addData',payload)，namespaced=false时：this.$store.dispatch('addData',payload)。context是具有相同方法和属性store实例，{state，getters，rootState，rootGetters}
            actions:{addData:functin(context,payload){
              const {state,getters,rootState,rootGetters,commit,dispatch}=context;

              dispatch('someOtherAction') // -> 模块的'a/someOtherAction'
              dispatch('someOtherAction', null, { root: true }) // ->全局的 'someOtherAction'

              commit('someMutation') // -> 模块的'foo/someMutation'
              commit('someMutation', null, { root: true }) // ->全局的 'someMutation'
            }},
            mutations:{addData:function(state ,payload){}} // namespaced=true时：this.$store.a.conmit('xxx',payload)，namespaced=false时：this.$store.conmit('xxx',payload)。如果state是的对象，必须返回整个对象
          }


        </pre>
      </div>

      <blockquote>
        <p style="font-weight:700;font-size:1.2em">办事项</p>
        <form v-on:submit.prevent="submitTodo">
          <p>
            <input type="text" v-model.trim="value" />
            &nbsp;
            <button
              type="submit"
              v-bind:disabled="addLoading"
            >{{addLoading?'正在提交中':'添加办事项'}}</button>
          </p>
        </form>
        <ul class="todo-list">
          <li
            v-for="(k,index) in tolist"
            :key="index"
            style="overflow:hidden;list-style:none"
            v-bind:class="{done:k.done}"
          >
            <button
              type="button"
              @click="handleDone($event,index)"
            >{{k.loading?'正在提交':k.done?'已经完成':' 未 完 成 '}}</button>
            <span v-bind:style="style">【{{k.name}}】{{k.title}}</span>
          </li>
        </ul>
        <p style="font-weight:700;font-size:1.2em">已办事项</p>
        <ul class="todo-list">
          <li
            v-for="(k,index) in doneTodoList"
            :key="index+'done'"
            style="overflow:hidden;list-style:none"
            v-bind:class="{done:k.done}"
          >
            <span v-bind:style="style">【{{k.name}}】{{k.title}}</span>
          </li>
        </ul>
        <div></div>
      </blockquote>
    </div>
  </div>
</template>
<style lang="scss">
.todo-list {
  button {
    padding: 3px;
    width: 60px;
    border-radius: 3px;
    background: #f30;
    border: 0;
    color: #ffffff;
    cursor: pointer;
  }
  li {
    margin-bottom: 10px;
  }
  .done {
    color: #41b883;
    button {
      background: #41b883;
      color: #ffffff;
    }
  }
}
</style>
<script>
import { mapState } from 'vuex';
import './s';

export default {
  data() {
    return {
      value: '',
      style: {
        padding: '0px 10px 0 0',
        float: 'left',
      },
    };
  },
  computed: {
    doneTodoList() {
      return this.$store.getters['todo/doneTodoList'];
    },
    ...mapState({
      tolist: state => state.todo.todoList,
      addLoading: state => state.todo.addLoading,
    }),
  },
  methods: {
    handleDone(e, index) {
      this.$store.dispatch('todo/done', { index });
    },
    submitTodo() {
      if (this.value.length === 0) return;
      this.$store.dispatch('todo/addTodo', {
        title: this.value,
        callback(response) {
          console.log(response);
        },
      });
      this.value = '';
    },
  },
  mounted() {
    this.$store.dispatch('todo/query', { key: '999' });
  },
};
</script>
