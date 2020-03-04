<template>
  <div class="aside">
    <ul>
      <li v-on:click="switchs" class="parent">
        <router-link to="/" exact>路由</router-link>
        <div class="child">
          <ul>
            <li>
              <router-link to="/router-match">动态路由匹配</router-link>
            </li>
            <li>
              <router-link to="/router-nested">嵌套路由</router-link>
            </li>
            <li>
              <router-link to="/router-nav">编程式的导航</router-link>
            </li>
            <li>
              <router-link to="/router-name">命名路由</router-link>
            </li>

            <li>
              <router-link to="/router-view">命名视图</router-link>
            </li>
            <li>
              <router-link to="/router-redirect">重定向和别名</router-link>
            </li>
            <li>
              <router-link to="/router-props">路由组件传参</router-link>
            </li>
            <li>
              <router-link to="/router-history">HTML5 History 模式</router-link>
            </li>
            <li>
              <router-link to="/router-guards">导航守卫</router-link>
            </li>
            <li>
              <router-link to="/router-meta">路由元信息</router-link>
            </li>
            <li>
              <router-link to="/router-transition">过渡动态</router-link>
            </li>
            <li>
              <router-link to="/router-lazy">路由懒加载</router-link>
            </li>
          </ul>
        </div>
      </li>
      <li v-on:click="switchs" class="parent">
        <router-link to="/basics/instance">基础</router-link>
        <ul class="child">
          <li>
            <router-link to="/basics/instance">Vue 实例</router-link>
          </li>
          <li class="parent">
            <router-link to="/basics/syntax">语法模板</router-link>
            <ul class="child">
              <li>
                <router-link to="/basics/syntax#插值">插值</router-link>
              </li>
              <li>
                <router-link to="/basics/syntax#原生HTML">原生HTML</router-link>
              </li>
            </ul>
          </li>
          <li class="parent">
            <router-link to="/basics/computed">计算属性</router-link>
          </li>
          <li class="parent">
            <router-link to="/basics/style">style-class</router-link>
          </li>
          <li class="parent">
            <router-link to="/basics/if-show">条件渲染</router-link>
            <ul class="child">
              <li>
                <a href="#if">v-if</a>
              </li>
              <li>
                <a href="#show">v-show</a>
              </li>
              <li>
                <a href="/basics/if-show#if-show">比较</a>
              </li>
            </ul>
          </li>
          <li class="parent">
            <router-link to="/basics/v-for">列表渲染</router-link>
            <ul class="child">
              <li>
                <a href="#v-for">v-for</a>
              </li>
              <li>
                <a href="#数组和对象更新注意">数组和对象更新注意</a>
              </li>
              <li>
                <a href="#v-for和v-if">v-for和v-if</a>
              </li>
            </ul>
          </li>
          <li class="parent">
            <router-link to="/basics/event">事件处理</router-link>
            <ul class="child">
              <li>
                <a href="#event">事件绑定或者监听</a>
              </li>
              <li>
                <a href="#修饰符">修饰符</a>
              </li>
              <li>
                <a href="#按键修饰符">按键修饰符</a>
              </li>
            </ul>
          </li>
          <li class="parent">
            <router-link to="/basics/form">表单</router-link>
            <ul class="child">
              <li>
                <a href="#event">form</a>
              </li>
              <li>
                <a href="#修饰符">修饰符</a>
              </li>
              <li>
                <a href="#按键修饰符">按键修饰符</a>
              </li>
            </ul>
          </li>
        </ul>
      </li>
    </ul>
  </div>
</template>	
<script>
export default {
  methods: {
    switchs: function() {
      // console.log(event.target)
    }
  },
  mounted: function() {
    let path = this.$route.path;
    let link = document.querySelector(".aside a[href$='" + path + "']");
    if (link) {
      while (link.tagName != "BODY") {
        link.classList.add("open");
        link = link.parentNode;
      }
    }
    var aside = document.querySelectorAll(".aside li");
    aside.forEach(function(item) {
      item.addEventListener(
        "click",
        function(event) {
          event.stopPropagation();
          aside.forEach(item => {
            item.classList.remove("open");
          });

          let than = this;
          while (than.tagName != "BODY") {
            than.classList.add("open");
            than = than.parentNode;
          }
        },
        false
      );
    });
  }
};
</script>
<style lang="scss">
.aside {
  > ul {
    padding: 0px;

    line-height: 40px;
    font-size: 16px;
    .child {
      display: none;
      margin-left: -10px;
      padding-left: 20px;
      background: #fff;
      overflow: hidden;
    }
    ul {
      font-size: 14px;
      line-height: 30px;
    }
    li {
      list-style: none;
      a {
        display: block;
        position: relative;
      }
      &.open {
        > .child {
          display: block;

          animation: open 0.5s linear;
        }
        > a:after {
          transform: rotate(135deg);
        }
      }
    }
    > li {
      border-bottom: 1px solid #e2e2e2;
      padding-left: 10px;
      > a:after {
        position: absolute;
        right: 0px;
        top: 0;
        bottom: 0px;
        margin: auto 0;
        content: "";
        display: block;
        width: 10px;
        height: 10px;
        border-top: 2px solid #ccc;
        border-right: 2px solid #ccc;
        transform: rotate(45deg);
        transition: all 0.2s linear;
        transform-origin: center center;
      }
    }
  }
}
@keyframes open {
  0% {
    max-height: 0px;
  }
  100% {
    max-height: 500px;
  }
}
</style>