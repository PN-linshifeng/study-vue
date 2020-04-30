<template>
  <div class="has-topber has-aside">
    <Header></Header>
    <div class="aside-wrap">
      <Aside keep></Aside>
    </div>
    <div class="main-wrap">
      <el-breadcrumb separator="/" style=" padding:24px 0">
        <el-breadcrumb-item to="/" exact>首页</el-breadcrumb-item>
        <el-breadcrumb-item :to="item.path" v-for="(item) of mianbao" :key="item.path">{{item.name}}</el-breadcrumb-item>
      </el-breadcrumb>

      <router-view class="view-page"></router-view>
    </div>
  </div>
</template>
<script>
import Header from '@/components/header';
import Aside, { route } from '@/components/Aside';

function getParent(data, id) {
  let arr = [];
  function aa(items, resp = []) {
    // eslint-disable-next-line no-restricted-syntax
    for (const item of items) {
      const pathArr = item.path.split('/');
      const idArr = id.split('/');
      pathArr.shift();
      idArr.shift();

      // if(pathArr.length===idArr.length){ }
      let pathOk = false;
      for (let i = 0; i < pathArr.length; i += 1) {
        if (idArr[i] && pathArr[i].indexOf(':') >= 0) {
          pathOk = true;
          break;
        }
      }

      if (item.path === id || pathOk) {
        resp.push({ name: item.name, path: item.path });
        arr = [...resp];

        return;
      }
      if (item.children) {
        aa(item.children, resp.concat({ name: item.name, path: item.path }));
      }
    }
  }
  aa(data);
  return arr;
}

export default {
  name: 'App',
  components: {
    Header,
    Aside,
  },
  data() {
    return {
      view: localStorage.getItem('routerTransiton'),
      mianbao: [],
    };
  },
  created() {
    this.setBreadcrumb();
  },
  methods: {
    setBreadcrumb() {
      const { path } = this.$route;
      this.mianbao = getParent(route, path);
    },
  },
  watch: {
    $route() {
      this.view = localStorage.getItem('routerTransiton');
      this.setBreadcrumb();
    },
  },
};
</script>
<style lang="scss">
html,
body {
  margin: 0px;
  padding: 0px;
  line-height: 1.4;
  // height: 100%;
}
.has-topber {
  padding-top: 80px;
  .aside-wrap {
    top: 80px;
  }
  .header {
    top: 0px;
  }
}
.has-aside {
  padding-left: 250px;
}

.aside-wrap {
  position: fixed;
  left: 0px;
  bottom: 0px;
  z-index: 9;
  border-right: 1px solid #e2e2e2;
  width: 250px;
  margin-right: 20px;
  background: #f0f0f0;
  overflow: auto;
}
.main-wrap {
  margin: 0px 50px;
  // height: 100%;
  position: relative;
}

#app {
  // height: 100%;
}
#nav {
  padding: 30px;
  a {
    font-weight: bold;
    color: #2c3e50;
    &.router-link-exact-active {
      color: #42b983;
    }
  }
}

.view-left-enter,
.view-right-leave-to {
  transform: translate(100%);
}
.view-left-leave-to,
.view-right-enter {
  transform: translate(-100%);
}
.view-left-enter-active,
.view-left-leave-active,
.view-right-enter-active,
.view-right-leave-active {
  transition: all 0.3s;
  position: absolute;
  width: 100%;
  top: 0;
}
</style>
