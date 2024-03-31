<template>
  <div class="gallery" :data-theme="name">
    <div class="container">
      <div class="gallery__list" v-if="store.getSearchedAndFilteredPaintings.length > 0">
        <GalleryItem
            v-for="painting in store.getSearchedAndFilteredPaintings"
            :key="painting.id"
            :painting="painting"
        />
      </div>
      <div v-else class="emptyResponse">
        <div class="emptyResponse__title">
          No matches for <span>{{ store.searchQuery }}</span>
        </div>
        <div class="emptyResponse__text">
          Please try again with a different spelling or keywords.
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { useStore } from "@/stores/store";
import GalleryItem from "@/components/GalleryItem/GalleryItem.vue";
import themeProvider from "@/helpers/setThemeSettings";

const { name } = themeProvider();
const store = useStore();
store.setPaintings();

</script>

<style scoped lang="scss">
.emptyResponse {
  margin-top: 40px;
  &__title {
    font-size: 16px;
    font-weight: 500;
    line-height: 22.4px;
    color: var(--emptyResponseTitle);
    span {
      font-size: 18px;
      font-weight: 700;
    }
  }

  &__text {
    font-size: 14px;
    font-weight: 400;
    line-height: 19.6px;
    color: var(--secondary-gray);
  }
}

//===========================================================================
.gallery {
  padding: 20px 0;
  &__list {
    display: flex;
    flex-wrap: wrap;
    gap: 32px;
    @media (max-width: 768px) {
      gap: 24px;
    }
    @media (max-width: 320px) {
      gap: 20px;
    }
  }
}
</style>