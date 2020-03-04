<template>
  <div v-highlight>
    <div class="block-margin">
      <h1>class绑定</h1>
      <p>class绑定除了字符串以外，还可以有对象和数组</p>
    </div>
    <div class="block-margin">
      <div>
        <p
          class="default-class"
          v-bind:class="{active:active,'input-errer':error}"
        >绑定对象渲染：class="default-class active"</p>
        <p v-bind:class="objClass">绑定对象渲染：class="default-class active"</p>
        <p v-bind:class="[activeClass,errorClass]">绑定数组渲染：class="default-class active input-errer"</p>
      </div>

      <pre name="code" class="html" type="html">
        &lt;p class="default-class" v-bind:class=&quot;{active:active,&#x27;input-errer&#x27;:error}&quot;&gt;&lt;/p&gt;
        绑定对象渲染：class="default-class active"

        &lt;p class="default-class" v-bind:class=&quot;objClass&quot;&gt;&lt;/p&gt;
        绑定对象渲染：class="default-class active"

        &lt;p class="default-class" v-bind:class=&quot;[activeClass,errorClass]&quot;&gt;&lt;/p&gt;
        绑定数组渲染：class="default-class active input-errer"
      </pre>

      <pre class="js" name="code" type="js">
        data: function() {
          return {
            active: true,
            error: false,
            objClass: {
              active: true,
              error: false
            },
            activeClass: "active",
            errorClass: "input-errer"
          };
        }
      </pre>
    </div>
    <div class="margin-block">
      <h1>style内联样式绑定</h1>
      <p>可以使用对象或者数组绑定</p>
      <div>
        <div>
          <p v-bind:style="{fontSize:'18px',color:color}">对象绑定</p>
          <p v-bind:style="[styleArr]">数组绑定</p>
        </div>
      </div>
      <pre name="code" class="html" type="html">
          &lt;p v-bind:style=&quot;{fontSize:&#x27;18px&#x27;,color:color}&quot;&gt;对象绑定&lt;/p&gt;
          渲染成：style="font-size:18px;color:red"

          &lt;p v-bind:style=&quot;[styleArr]&quot;&gt;数组绑定&lt;/p&gt;
          渲染成：style="color:ffaa00"
      </pre>
      <pre name="code" class="js" type="js">
          data:function(){
            return{
              color: "red",
              styleArr: { color: "#ffaa00" }
            }
          }
      </pre>
    </div>
  </div>
</template>
<script>
export default {
  data: function() {
    return {
      // class 测试数据
      active: true,
      error: false,
      objClass: {
        active: true,
        error: false
      },
      activeClass: "active",
      errorClass: "input-errer",

      // style 测试数据
      color: "red",
      styleArr: { color: "#ffaa00" }
    };
  }
};
</script>