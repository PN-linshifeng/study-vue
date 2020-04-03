<template>
  <div v-highlight>
    <div class="margin-block">
      <h1>Vue 实例</h1>
      <p>
        通过Vue函数创建一个vue实例。查看更多
        <router-link to="/api/instance">Vue实例API</router-link>
      </p>
      <pre class="js" name="code">
        var vm=new Vue({
          //选项
        })				
			</pre>
    </div>
    <div class="margin-block">
      <h2>实例生命周期</h2>
      <p>每个 Vue 例在被创建时都要经过一系列的初始化过程——例如，需要设置数据监听、编译模板、将实例挂载到 DOM 并在数据变化时更新 DOM 等。同时在这个过程中也会运行一些叫做生命周期钩子的函数，这给了用户在不同阶段添加自己的代码的机会。</p>
      <p>beforeCleate：发生在实例初始化事件和生命周期之后，发生在初始化数据和数据监测之前。（this.data:undefined，this.$el:undefined）</p>
      <p>create：发生在初始化数据和数据监测之后，发生在模板编译之前，模板编译优先级（1：实例的render方法，2：实例的template属性作为模板编译成render函数，3：外部HTML作为模板编译）。（this.data:[object Object]，this.$el:undefined）</p>
      <p>beforeMount：在模板编译之后调用，发生在创建实例$el和挂载之前。</p>
      <p>mounted：创建实例$el和挂载之后调用。</p>
      <p>beforeUpdata：实例data发生变化后调用，发生在编译成虚拟DOM和重新渲染DOM之前。</p>
      <p>updataed：实例data发生变化并且重新渲染DOM之后调用。</p>
      <p>beforeDestroy：实例销毁之前调用</p>
      <p>destroyed：实例销毁后调用。调用后，Vue 实例指示的所有东西都会解绑定，所有的事件监听器会被移除，所有的子实例也会被销毁。</p>
    </div>
    <div class="margin-block">
      <h2>实例生命周期图：</h2>
      <p>
        <img src="@/assets/images/lifecycle.png" alt width="600" />
      </p>
    </div>
  </div>
</template>
// <script>
// import layoutBase from '@/layout/base';

// export default {
//   components: { layoutBase },
// };
//
</script>