<template>
  <div id="app" class="has-topber has-aside">
    <Header></Header>
    <div class="aside-wrap">
      <Aside></Aside>
    </div>
    <div class="main-wrap">
      <router-view/>
    </div>
  </div>
</template>
<script>
  import Header from "@/components/header.vue";
  import Aside from "@/components/Aside.vue";
export default {
  name: 'App',
  components: {
    Header,
    Aside
  }
}
</script>
<style lang="scss">
html,body{
  margin: 0px;
  padding: 0px;
}
.has-topber{
  padding-top:80px;
  .aside-wrap{
    top:80px;
  }
  .header{
    top:0px;
  }
}
.has-aside{
  padding-left: 200px;

}

.aside-wrap{
  position: fixed;
  left:0px;
  bottom: 0px;
  border-right: 1px solid #e2e2e2;
  width:200px;
  margin-right:20px;
  background:#f0f0f0;
  overflow:auto;
}
.main-wrap{
  margin: 0px 50px;
}


#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
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
</style>
