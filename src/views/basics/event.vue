<template>
  <div v-highlight>
    <div class="margin-block">
      <h2 id="event">事件绑定</h2>
      <p>绑定事件的函数this指向vue实例，不是事件元素</p>
      <p>
        <button type="button" v-on:click="num++" v-bind:style="style">自加1：{{num}}</button>
        <button type="button" v-on:click="setNum" v-bind:style="style">普通绑定</button>
        <button type="button" v-on:click="say('你们好')" v-bind:style="style">参数绑定</button>
        <button type="button" v-on:click="say('你们好',$event)" v-bind:style="style">参数和event参数</button>
      </p>
    </div>
    <div class="margin-block">
      <pre class="html" name="code" type="html">
        &lt;button type=&quot;button&quot; v-on:click=&quot;num++&quot; v-bind:style=&quot;style&quot;&gt;自加1：{{num}}&lt;/button&gt;
        &lt;button type=&quot;button&quot; v-on:click=&quot;setNum&quot; v-bind:style=&quot;style&quot;&gt;普通绑定&lt;/button&gt;
        &lt;button type=&quot;button&quot; v-on:click=&quot;say(&#x27;你们好&#x27;)&quot; v-bind:style=&quot;style&quot;&gt;参数绑定&lt;/button&gt;
        &lt;button type=&quot;button&quot; v-on:click=&quot;say(&#x27;你们好&#x27;,$event)&quot; v-bind:style=&quot;style&quot;&gt;参数和event参数&lt;/button&gt;
      </pre>
      <pre class="js" name="code" type="js">
        data: function() {
          return {
            num: 0,
            style: {
              margin: "10px"
            }
          };
        },
        methods: {
          setNum: function(event) {
            alert(this.num++);
            if (event) {
              alert(event.target.tagName);
            }
          },
          say(str, event) {
            alert(str);
            if (event) {
              alert(event.target.tagName);
            }
          }
        }
      </pre>
    </div>
    <div class="margin-block">
      <h2 id="修饰符">修饰符</h2>
      <p>VUE提供很多便利的修饰符</p>
      <pre class="html" name="code" type="html">
        &lt;!-- 阻止单击事件继续传播 --&gt;
        &lt;a v-on:click.stop=&quot;doThis&quot;&gt;&lt;/a&gt;

        &lt;!-- 提交事件不再重载页面 --&gt;
        &lt;form v-on:submit.prevent=&quot;onSubmit&quot;&gt;&lt;/form&gt;

        &lt;!-- 修饰符可以串联 --&gt;
        &lt;a v-on:click.stop.prevent=&quot;doThat&quot;&gt;&lt;/a&gt;

        &lt;!-- 只有修饰符 --&gt;
        &lt;form v-on:submit.prevent&gt;&lt;/form&gt;

        &lt;!-- 添加事件监听器时使用事件捕获模式 --&gt;
        &lt;!-- 即内部元素触发的事件先在此处理，然后才交由内部元素进行处理 --&gt;
        &lt;div v-on:click.capture=&quot;doThis&quot;&gt;...&lt;/div&gt;

        &lt;!-- 只当在 event.target 是当前元素自身时触发处理函数 --&gt;
        &lt;!-- 即事件不是从内部元素触发的，既是event普通事件绑定event.target==this --&gt;
        &lt;div v-on:click.self=&quot;doThat&quot;&gt;...&lt;/div&gt;

        &lt;!-- 点击事件将只会触发一次 --&gt;
        &lt;a v-on:click.once=&quot;doThis&quot;&gt;&lt;/a&gt;

        &lt;!-- 滚动事件的默认行为 (即滚动行为) 将会立即触发 --&gt;
        &lt;!-- 而不会等待 &#x60;onScroll&#x60; 完成  --&gt;
        &lt;!-- 这其中包含 &#x60;event.preventDefault()&#x60; 的情况 --&gt;
        &lt;div v-on:scroll.passive=&quot;onScroll&quot;&gt;...&lt;/div&gt;

      </pre>
      <p>这个 .passive 修饰符尤其能够提升移动端的性能。不要把 .passive 和 .prevent 一起使用，因为 .prevent 将会被忽略，同时浏览器可能会向你展示一个警告。请记住，.passive 会告诉浏览器你不想阻止事件的默认行为。</p>
    </div>

    <div class="margin-block">
      <h2 id="按键修饰符">按键修饰符</h2>
      <p>
        在监听键盘事件,.enter
        .tab
        .delete (捕获“删除”和“退格”键)
        .esc
        .space
        .up
        .down
        .left
        .right
      </p>

      <form v-on:submit.prevent="submit">
        搜索：
        <input
          type="text"
          v-on:keyup.enter="submit"
          ref="search"
          placeholder="输入关键字后按回车键搜索"
          style="width:250px"
        />
        {{search?'正在搜索中...':''}}
      </form>
    </div>
  </div>
</template>
<script>
export default {
  data: function() {
    return {
      num: 0,
      search: false,
      style: {
        margin: "10px"
      }
    };
  },
  methods: {
    setNum: function(event) {
      alert(this.num++);
      if (event) {
        alert(event.target.tagName);
      }
    },
    say(str, event) {
      alert(str);
      if (event) {
        alert(event.target.tagName);
      }
    },
    submit() {
      this.search = true;
      this.$refs["search"].blur();
    }
  }
};
</script>