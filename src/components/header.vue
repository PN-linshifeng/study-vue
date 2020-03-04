<template>
  <div class="header">
    <div class="wave">
      <span></span>
      <span></span>
      <span></span>
      <span></span>
    </div>
    <div class="logo">
      <img src="../assets/logo.png" />
    </div>
    <div class="right">
      <ul>
        <li>
          <router-link to="/router">路由</router-link>
        </li>
      </ul>
    </div>
  </div>
</template>

<style lang="scss">
.header {
  position: fixed;
  width: 100%;
  left: 0px;
  top: 0px;
  z-index: 2;
  height: 80px;
  line-height: 80px;
  background: #f9f9f9;
  border-bottom: 1px solid #e2e2e2;
  box-sizing: border-box;

  .wave {
    display: none;
    position: absolute;
    top: 0;
    right: 0;
    left: -100px;
    bottom: 0;
    overflow: hidden;
    padding-top: 40px;
    z-index: -1;
    // left:0%;
    span {
      position: relative;
      width: 25%;
      display: block;
      float: left;
      padding-top: 50%;
      &:before {
        position: absolute;
        top: 0px;
        left: 0;
        width: 100%;
        padding-top: 100%;
        content: "";
        background: #76daff;
        border-radius: 42%;
        animation: rotate2 7s linear infinite;
        opacity: 0.8;
      }
      &:after {
        position: absolute;
        top: 0px;
        left: 55%;
        width: 100%;
        padding-top: 100%;
        content: "";
        background: #76daff;
        border-radius: 42%;
        animation: rotate2 7s linear infinite;
        z-index: 2;
      }
      &:nth-child(2):before,
      &:nth-child(2):after {
        animation: rotate2 8s linear infinite;
      }
      &:nth-child(3):before,
      &:nth-child(3):after {
        animation: rotate2 9s linear infinite;
      }
      &:nth-child(4):before,
      &:nth-child(4):after {
        animation: rotate2 7s linear infinite;
      }
      @keyframes rotate2 {
        0% {
          transform: rotate(0);
        }
        100% {
          transform: rotate(360deg);
        }
      }
    }
  }
  .logo {
    position: relative;
    width: 200px;
    height: 100%;
    text-align: center;
    float: left;
    img {
      position: absolute;
      margin: auto;
      top: 0px;
      left: 0px;
      bottom: 0px;
      right: 0px;
      max-width: 60px;
    }
  }
  .right {
    overflow: hidden;
    text-align: right;
    padding-right: 20px;
    ul {
      li {
        list-style-type: none;
      }
    }
  }
}
</style>