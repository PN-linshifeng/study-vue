<template>
  <div v-highlight>
    <div class="margin-block">
      <h1>getter/mutation/action/module</h1>
      <p>Getter是计算属性，跟vue实例的computed一样，当依赖值发生变化，getter就重新计算</p>

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
console.log(process.env.VUE_APP_MOCK, process.env.NODE_ENV);
export default {
  data: function() {
    return {
      value: '',
      style: {
        padding: '0px 10px 0 0',
        float: 'left',
      },
    };
  },
  computed: {
    doneTodoList: function() {
      return this.$store.getters['todo/doneTodoList'];
    },
    ...mapState({
      tolist: state => state.todo.todoList,
      addLoading: state => state.todo.addLoading,
    }),
  },
  methods: {
    handleDone: function(e, index) {
      this.$store.dispatch('todo/done', { index });
    },
    submitTodo: function() {
      if (this.value.length === 0) return;
      this.$store.dispatch('todo/addTodo', {
        title: this.value,
        callback: function(response) {
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