<template>
  <div v-highlight>
    <div class="block-margin">
      <h1>语法模板</h1>
    </div>
    <div class="block-maring">
      <div class="times">
        <span class="top">0</span>
        <span class="bottom">0</span>
      </div>

      <h2>插值</h2>
      <a href="#插值"></a>
      <p>可以使用文本、原始HTML、表达式、特性</p>
      <p>
        <strong>文本</strong>
        ：使用{ { } }绑定对象属性的值，如果对象属性的值发现改变，模板上的插值也会相应改变。如果想插值只改变一次，使用v-once 指令。
      </p>
      <p>
        你的名字：{{name}}
        <button class="btn" v-on:click="rename">修改名字</button>
        <br />你是性别：
        <span v-once>{{sex}}</span>
        <button class="btn" v-on:click="resex">修改性别</button>
      </p>
      <pre class="js" name="code" type="view">
你的名字：{{html}}
&lt;span v-once&gt;{{sex}}&lt;/span&gt; 
			</pre>
      <p>
        <strong>HTML</strong>
        ：v-html。
      </p>
      <p v-html="htmlCode"></p>
      <pre class="js" name="code" type="view">
&lt;p v-html=&quot;htmlCode&quot;&gt;&lt;/p&gt;<p></p>
			</pre>
    </div>
    <div class="black-margin">
      <h2>指令</h2>
    </div>
    <div class="black-margin">
      <p>
        v-if，v-for，事件指令v-on:event(@event)，属性指令v-bind:attr(:attr)，动态参数指令v-on:[event]或者
        <span
          class="strong"
        >v-bind:[attr]</span>(如果参数有表达式有空格或者引号就警告，如果v-bind:[foot + 'cc']),
      </p>

      <div>
        <h4>v-if：控制显示和隐藏</h4>
        <button @click="swift">{{hidden?'隐藏':'显示'}}</button> &nbsp;
        <span v-if="hidden">控制显示隐藏</span>
      </div>
      <div>
        <h4>v-for：遍历</h4>
        <ul>
          <li v-for="item in list" :key="item">{{item}}</li>
        </ul>
      </div>
    </div>
  </div>
</template>
<script>
import $ from "jquery";
let name = ["插值", "小米", "大红", "白板", "大河"];
var sex = ["男", "女", "公", "母"];
const htmlCode = "<div style='color:#f30f30'>我的html</div>";
export default {
  data: function() {
    return {
      name: "插值",
      sex: "男",
      html: "{{name}}",
      htmlCode,
      hidden: true,
      list: name
    };
  },
  methods: {
    rename() {
      var index = Math.floor(Math.random() * (name.length - 1));
      this.name = name[index];
    },
    resex() {
      var index = Math.floor(Math.random() * (sex.length - 1));
      this.sex = sex[index];
      console.log(this.sex);
    },
    swift() {
      this.hidden = !this.hidden;
    }
  },
  mounted: function() {
    var number = 0;
    setTimeout(next, 1000);
    function next() {
      number = number + 1 > 9 ? 0 : number + 1;
      var html = `<span class="last top">${number}</span>
				<span class="last bottom">${number}</span>`;
      $(".times").append(html);
      $(".times span")
        .eq(0)
        .addClass("pve");
      $(".times span")
        .eq(1)
        .addClass("pve");
      $(".times").addClass("next");
      setTimeout(function() {
        $(".times .pve").remove();
        $(".times span").removeClass("last");
        $(".times").removeClass("next");
      }, 450);
      // setTimeout(next, 600);
    }
  }
};
</script>
<style lang="scss">
.times {
  display: inline-block;
  width: 60px;
  height: 100px;
  position: relative;
  font-size: 60px;
  line-height: 100px;
  text-align: center;
  background-color: #ccc;
  perspective: 200px;
  span {
    &.pve {
      z-index: 1;
    }
    &.top {
      position: absolute;
      top: 0;
      left: 0;
      width: 100%;
      height: 50%;
      display: inline-block;
      overflow: hidden;
      background: #f30;
    }
    &.bottom {
      position: absolute;
      left: 0;
      bottom: 0;
      height: 50%;
      width: 100%;
      display: inline-block;
      line-height: 0px;
      background: #f30;
      transition: all 0.3s linear;
      transform-origin: top center;
      overflow: hidden;
    }
    &.pve.bottom {
      transform-origin: top center;
    }
    &.last.top {
      transform-origin: bottom center;
      z-index: 9;
      display: none;
    }
    &.last.bottom {
      transform-origin: bottom center;
      display: none;
      // z-index:1
    }
  }
  &.next {
    .pve.bottom {
      animation: bottom 0.2s linear;
      animation-fill-mode: forwards;
    }
    .last.top {
      display: block;
      animation: top 0.2s linear;
    }
    .last.bottom {
      display: block;
      z-index: 2;
    }
  }
  @keyframes bottom {
    0% {
      transform: rotateX(0deg);
      z-index: 3;
    }
    100% {
      transform: rotateX(180deg);
      z-index: 3;
    }
  }
  @keyframes top {
    0% {
      transform: rotateX(-180deg);
      opacity: 0;
    }
    50% {
      transform: rotateX(-90deg);
      opacity: 0;
    }
    51% {
      transform: rotateX(-90deg);
      opacity: 1;
    }
    100% {
      transform: rotateX(0deg);
    }
  }
}
</style>