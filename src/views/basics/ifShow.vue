<template>
  <div v-highlight>
    <div class="margin-block">
      <h2>
        <span name="if" id="if">#</span>
        v-if
      </h2>
      <p>v-if条件渲染，真值渲染模块，假值不渲染（审查元素看不到源码），也可以渲染template模块,v-if v-else-if v-else 可以组合使用，必须连续跟在元素后面。v-if会复用模块的元素，如果模块的元素是独立的可以用key属性,如input给key属性。</p>
      <div>
        <p>
          <button type="botton" v-on:click="handleSwich">{{!vip?"vip登记":"普通登记"}}</button>
          <br />名称有key属性，不会复用，电话没有可以属性，可以复用。
        </p>
        <p>
          <template v-if="vip">
            vip登记：
            <input type="text" placeholder="请输入vip名称" key="vip" />
            <br />电话：
            <input type="text" placeholder="电话" />
          </template>
          <template v-else>
            普通登记：
            <input type="text" placeholder="请输入游客名称" />
            <br />电话：
            <input type="text" placeholder="电话" />
          </template>
        </p>
      </div>
    </div>
    <div class="margin-block">
      <pre class="html" name="code" type="html">
        &lt;p&gt;
          &lt;button type=&quot;botton&quot; v-on:click=&quot;handleSwich&quot;&gt;{{!vip?&quot;vip登记&quot;:&quot;普通登记&quot;}}&lt;/button&gt;
          &lt;br /&gt;名称有key属性，不会复用，电话没有可以属性，可以复用。
        &lt;/p&gt;
        &lt;p&gt;
          &lt;template v-if=&quot;vip&quot;&gt;
            vip登记：
            &lt;input type=&quot;text&quot; placeholder=&quot;请输入vip名称&quot; key=&quot;vip&quot; /&gt;
            &lt;br /&gt;电话：
            &lt;input type=&quot;text&quot; placeholder=&quot;电话&quot; /&gt;
          &lt;/template&gt;
          &lt;template v-else&gt;
            普通登记：
            &lt;input type=&quot;text&quot; placeholder=&quot;请输入游客名称&quot; /&gt;
            &lt;br /&gt;电话：
            &lt;input type=&quot;text&quot; placeholder=&quot;电话&quot; /&gt;
          &lt;/template&gt;
        &lt;/p&gt;
      </pre>
      <pre class="js" name="code" type="js">
        {
          data: function() {
            return {
              vip: true
            };
          },
          methods: {
            handleSwich: function() {
              this.vip = !this.vip;
            }
          }
        }
      </pre>
    </div>
    <div class="margin-block">
      <h2>
        <span name="show" id="show">#</span>
        v-show
      </h2>
      <p>v-show控制元素隐藏/显示渲染，控制元素css hidden</p>
    </div>
    <div class="margin-block">
      <h2>
        <span name="if-show" id="if-show">#</span>
        v-show 和 v-if 比较
      </h2>
      <p>
        v-show 是简单控制元素css hidden，不能用在template；v-if 控制元素条件渲染。
        <br />v-show 在初始化开销更高，v-if 切换开销更高。
      </p>
    </div>
  </div>
</template>
<script>
export default {
  data() {
    return {
      vip: true
    };
  },
  methods: {
    handleSwich() {
      this.vip = !this.vip;
    }
  }
};
</script>  