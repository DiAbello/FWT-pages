<template>
  <div class="wrapper" :data-theme="name">
      <HeaderItem/>
      <FiltersComponent/>
      <GalleryList/>
      <PaginationItem/>
  </div>
</template>

<script setup lang="ts">
import HeaderItem from './components/HeaderItem.vue'
import themeProvider from "@/helpers/setThemeSettings";
import GalleryList from "@/components/GalleryList/GalleryList.vue";
import FiltersComponent from "@/components/Filters/FiltersComponent.vue";
import PaginationItem from "@/components/Pagination/PaginationItem.vue";

const { name } = themeProvider();
</script>

<style scoped lang="scss">

.wrapper {
  transition: all 0.4s;
  min-height: 100vh;
  color: var(--primary-text);
  background-color: var(--primary-background);
}
</style>