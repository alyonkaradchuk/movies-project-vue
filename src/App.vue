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

.movie {
  margin: 1rem;
  display: flex;
  flex-direction: column;
  width: 300px;
  border: 1px solid #ccc;
  border-radius: 8px;
  overflow: hidden;
  box-shadow: 0 0 10px rgba(0, 0, 0, 0.2);
}

.movies-container {
  display: flex;
  flex-wrap: wrap;
  flex: 1;
  justify-content: center;
  gap: 20px;
}

.movie img {
  width: 100%;
  height: auto;
}
</style>
