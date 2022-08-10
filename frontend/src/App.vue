<template>
   <router-view></router-view>
</template>

<script setup>
</script>

<style lang="scss">
  //@import '@/assets/scss/global.scss';
  html, body {
    /*font-family: Avenir, Helvetica, Arial, sans-serif;*/
    /*-webkit-font-smoothing: antialiased;*/
    /*-moz-osx-font-smoothing: grayscale;*/
    //text-rendering: optimizeLegibility;
    //font-family: Montserrat !important;
    font-family: "OpenSans" !important;
    font-size: 14px !important;
    /*text-align: center;*/
    /*color: #2c3e50;*/
    /*margin-top: 60px;*/
    margin: 0;
  }

  .p-component {
    border-radius: 6px !important;
  }

  body {
    height: 100vh;
  }
</style>