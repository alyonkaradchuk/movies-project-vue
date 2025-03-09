<template>
  <footer class="footer">
    <div class="footer-content">
      <p>
        &copy; {{ currentYear }} | All rights reserved | Developed with
        <img src="/src/images/Red-Classic-Love-Heart-clip-art-material-decoration_189516_wh1200.png" alt="Logo" class="footer-logo" />
      </p>
    </div>
  </footer>
</template>

<script>
import { ref } from 'vue'

export default {
  name: 'AppFooter',
  setup() {
    const currentYear = ref(new Date().getFullYear())
    return {
      currentYear,
    }
  },
}
</script>

<style scoped>
.footer {
  background-color: #f7f7f7;
  color: #545454;
  text-align: center;
  padding: 20px 0;
  width: 100%;
  position: relative;
  margin-top: auto;
}

.footer-content {
  max-width: 1200px;
  margin: 0 auto;
}

.footer-content p {
  margin: 0;
  display: flex;
  align-items: center;
  justify-content: center;
}

.footer-logo {
  width: 20px;
  height: auto;
  margin-left: 5px;
}
</style>
