<template>
  <div class="aside">
    <ul>
      <li
        v-for="k in nav"
        :key="k.path"
        :class="{open:isOpen(k.path)}"
        v-on:click="hanldSwith($event,k.path)"
      >
        <router-link :to="k.path">{{k.name}}</router-link>
        <ul v-if="k.children&&k.children.length" :class="{open:isOpen(k.path)}">
          <template v-for="kk in k.children">
            <li
              v-if="!kk.hidden"
              :key="kk.path"
              :class="{open:isOpen(kk.path)}"
              v-on:click="hanldSwith($event,kk.path)"
            >
              <router-link :to="kk.path">{{kk.name}}</router-link>
              <ul v-if="kk.children&&kk.children.length" :class="{open:isOpen(kk.path)}">
                <li v-for="kkk in kk.children" :key="kkk.path">
                  <router-link :to="kkk.path" @click.native.stop>{{kkk.name}}</router-link>
                </li>
              </ul>
            </li>
          </template>
        </ul>
      </li>
    </ul>
  </div>
</template>	
<script>
import User from "@/router/user";
import basics from "@/router/basics";
import order from "@/router/order";
import jiqiao from "@/router/jiqiao";

const routers = [
  {
    path: "/router-match",
    name: "路由",
    children: [
      {
        path: "/router-match",
        name: "动态路由匹配",
      },
      {
        path: "/router-nested",
        name: "嵌套路由",
      },
      {
        path: "/router-nav",
        name: "编程式的导航",
      },
      {
        path: "/router-name",
        name: "命名路由",
      },
      {
        path: "/router-view",
        name: "命名视图",
      },
      {
        path: "/router-redirect",
        name: "重定向和别名",
      },
      {
        path: "/router-props",
        name: "路由组件传参",
      },
      {
        path: "/router-history",
        name: "HTML5 History 模式",
      },
      {
        path: "/router-guards",
        name: "导航守卫",
      },
      {
        path: "/router-met",
        name: "路由元信息",
      },
      {
        path: "/router-transition",
        name: "过渡动态",
      },
      {
        path: "/router-lazy",
        name: "路由懒加载",
      },
    ],
  },
];

export const route = [...order, ...User, ...basics, ...routers, ...jiqiao];

// const user = [
//   {
//     path: '/user',
//     name: '用户管理',
//   },
// ];
/** 展开的父项
 *  arr<array> 树形结构数组
 *  id<string> 打开的链接
 * return obj<{indexs:被展开的下标，keys：被展开的链接，done：是否有被展开}>
 */
// eslint-disable-next-line no-unused-vars
function navSign(arr, id) {
  const resp = {
    indexs: [],
    keys: [],
    done: false,
  };
  if (!Array.isArray(arr)) return arr;
  for (let i = 0; i < arr.length; i += 1) {
    resp.indexs = [i];
    resp.keys = [arr[i].path];
    const { path } = arr[i];
    if (path === id) {
      resp.done = true;
    }
    if (arr[i].children && path !== id) {
      const next = navSign(arr[i].children, id);
      resp.indexs.push(next.indexs[0]);
      resp.keys.push(next.keys[0]);
      resp.done = next.done;
    }
    if (resp.done) {
      break;
    }
  }
  return resp;
}
/** 给树型标记展开状态
 * arr<array> 树形数组
 * return arr 被标记过的数组
 */
function treeSign(arr, sign) {
  const newsArr = [...arr];
  let isOpen = false;
  for (let i = 0; i < newsArr.length; i += 1) {
    const b = sign.indexOf(newsArr[i].path);
    if (b >= 0) {
      newsArr[i].isOpen = true;
      isOpen = true;
      break;
    }
    if (Array.isArray(newsArr[i].children) && newsArr[i].children.length > 0) {
      const item = treeSign(newsArr[i].children, sign);
      if (item.isOpen === true) {
        newsArr[i].isOpen = true;
        isOpen = true;
        break;
      }
    }
  }
  return { newsArr, isOpen };
}

export default {
  data() {
    return {
      a: 1,
      keys: [],
      nav: [...route],
    };
  },
  methods: {
    /** 判断当前循环的路径是否符合打开条件 */
    isOpen(path) {
      const s = this.keys.find((k) => path === k);
      return s;
    },
    /** 找到展开的项 */
    signKeys() {
      const { path } = this.$route;
      this.nav = JSON.parse(JSON.stringify(treeSign(this.nav, path))).newsArr;
      const sign = navSign(this.nav, path);
      if (sign.done) {
        this.keys = sign.keys;
      }
    },
    hanldSwith(event, path) {
      event.preventDefault();
      event.stopPropagation();
      const i = this.keys.indexOf(path);
      if (i >= 0) {
        // this.keys = this.keys.filter(k => k !== path);
        this.keys.splice(i);
      } else {
        this.keys.push(path);
      }
    },
  },
  created() {
    this.signKeys();
  },
  watch: {
    $route() {
      // this.signKeys();
    },
  },
  mounted() {},
};
</script>
<style lang="scss">
.aside {
  > ul {
    padding: 0px;

    line-height: 40px;
    font-size: 16px;
    ul {
      display: none;
      overflow: hidden;
      animation: close 0.5s linear;
    }
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
      padding-left: 8px;
      &.open {
        display: block;
        animation: open 0.5s linear;
      }
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
@keyframes close {
  0% {
    max-height: 500px;
  }
  100% {
    max-height: 0px;
  }
}
</style>