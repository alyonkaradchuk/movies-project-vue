<template>
  <div id="app">
    <router-view></router-view>
  </div>
</template>

<script>
export default {
  name: 'App',
}
</script>

<style scoped>

.app {
  text-align: center;
  display: flex;
  flex-direction: column;
  min-height: 100vh;
}

</style>
