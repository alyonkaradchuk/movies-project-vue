<template>
  <footer class="footer">
    <div class="footer-content">
      <p class="footer-content__text">
        &copy; {{ currentYear }} | {{ $t('allRightsReserved') }} | {{ $t('developedWith') }}
        <img
          src="/src/images/heart.png"
          alt="Logo"
          class="footer-logo"
        />
      </p>
    </div>
  </footer>
</template>

<script setup>
import { ref } from 'vue'

const currentYear = ref(new Date().getFullYear())
</script>

<style lang="scss" scoped>
.footer {
  background-color: #f7f7f7;
  color: #545454;
  text-align: center;
  padding: 20px 0;
  width: 100%;
  position: relative;
  margin-top: auto;

  .footer-content {
    max-width: 1200px;
    margin: 0 auto;

    .footer-content__text {
      margin: 0;
      display: flex;
      align-items: center;
      justify-content: center;

      .footer-logo {
        width: 20px;
        height: auto;
        margin-left: 5px;
      }
    }
  }
}
</style>
