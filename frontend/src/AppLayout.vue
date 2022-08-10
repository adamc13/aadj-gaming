<template>
  <div>
    <NavBar style="position: fixed; top: 0; width: 100%; background: white; z-index: 100"/>

    <div style="height: 100vh; padding-top: 75px;">
      <router-view/>
    </div>
  </div>
</template>

<script>
  import NavBar from './components/NavBar.vue';

  export default {
    name: 'AppLayout',

    components: { NavBar }
  }
</script>

<style lang="scss">
</style>