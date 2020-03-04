<template>
  <div id="app" class="has-topber has-aside">
    <Header></Header>
    <div class="aside-wrap">
      <Aside></Aside>
    </div>
    <div class="main-wrap">
      <transition :name="view">
        <router-view class="view-page"></router-view>
      </transition>
    </div>
  </div>
</template>
<script>
import Header from "@/components/header.vue";
import Aside from "@/components/Aside.vue";
export default {
  name: "App",
  components: {
    Header,
    Aside
  },
  data: function() {
    return {
      view: localStorage.getItem("routerTransiton")
    };
  },
  watch: {
    $route() {
      this.view = localStorage.getItem("routerTransiton");
    }
  }
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
