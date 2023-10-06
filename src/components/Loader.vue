<template>
  <div class="loader__wrapper">
    <loading
      class="message__loader"
      :active="loaderSettings.active"
      :is-full-page="loaderSettings.isFullPage"
      :loader="loaderSettings.loader"
      :color="loaderSettings.color"
      :background-color="loaderSettings.backgroundColor"
      :height="loaderSettings.height"
      :width="loaderSettings.width"
    />
  </div>
</template>

<script setup>
import { ref } from "vue";
import Loading from "vue-loading-overlay";
import "vue-loading-overlay/dist/css/index.css";

const loaderSettings = ref({
  active: true,
  isFullPage: false,
  loader: "dots",
  width: 28,
  height: 28,
  color: " var(--white)",
  backgroundColor: "inherit",
});
</script>

<style scoped>
.loader__wrapper {
  position: relative;
  width: 48px;
  height: 30px;
  padding: 18x;
}
.message__loader {
  background-color: inherit;
  width: 100%;
}
</style>
