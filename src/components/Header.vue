<template>
  <header class="header">
    <div class="search-container">
      <input type="text" v-model="query" placeholder="Movie Search" @keyup.enter="onSearch" />
    </div>
    <nav class="nav">
      <ul>
        <li><a href="/home">Home</a></li>
        <li><a href="/my-library">My Library</a></li>
      </ul>
    </nav>
  </header>
</template>

<script>
export default {
  name: 'HeaderComponent',
  data() {
    return {
      query: '',
    }
  },
  methods: {
    onSearch() {
      this.$emit('search', this.query)
    },
  },
}
</script>

<style scoped>
.header {
  background-image: url('../images/theater-8921521_1920.jpg');
  background-size: cover;
  background-position: center;
  background-repeat: no-repeat;
  text-align: center;
  color: white;
  height: 160px;
  display: flex;
  align-items: center;
  justify-content: center;
}

.search-container {
  position: relative;
}

.nav ul {
  list-style-type: none;
  display: flex;
  gap: 30px;
  justify-content: flex-end;
  position: absolute;
  top: 30px;
  right: 30px;
  margin: 0;
  padding: 0;
}

.nav li {
  font-size: 18px;
}

.nav a {
  color: white;
  text-decoration: none;
  position: relative;
  text-transform: uppercase;
  transition: color 0.3s;
}

.nav a:hover {
  color: #ff6347;
}

.nav a::after {
  content: '';
  position: absolute;
  left: 0;
  bottom: -5px;
  width: 100%;
  height: 2px;
  background-color: #ff6347;
  opacity: 0;
  transition: opacity 0.3s;
}

.nav a:hover::after {
  opacity: 1;
}
</style>
