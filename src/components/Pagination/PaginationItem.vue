<template>
  <div class="pagination" :data-theme="name">
    <div class="container">
      <div class="pagination__body body">
        <div class="body__container">
          <div class="body__arrow">
            <img
                src="@/assets/icons/arrow_left.svg"
                alt=""
                class="iconColor"
            >
          </div>
          <div class="body__pages pages">
            <div
                :class="{ pages__item: true, currentPage: store.page === pageNumber }"
                v-for="pageNumber in store.totalPages"
                :key="pageNumber"
                @click="changePage(pageNumber)"
            >
              {{ pageNumber }}
            </div>
          </div>
          <div class="body__arrow">
            <img
                src="@/assets/icons/arrow_right.svg"
                alt=""
                class="iconColor"
            >
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import themeProvider from "@/helpers/setThemeSettings";
import { useStore } from "@/stores/store";

const { name } = themeProvider();
const store = useStore();

function changePage(pageNumber: number) {
  store.page = pageNumber;
  store.setPaintings();
}
</script>

<style scoped lang="scss">
.iconColor {
  color: var(--filterIcon);
}
.pagination {
  padding: 20px 0;
  &__body {
    display: flex;
    align-items: center;
    justify-content: center;
  }
}
.body {
  &__container {
    display: flex;
    align-items: center;
    gap: 20px;
  }
  &__arrow {
    cursor: pointer;
    user-select: none;
  }
}
.currentPage {
  font-weight: 600 !important;
  background-color: var(--currentPageBackground);
}
.pages {
  display: flex;
  align-items: center;
  gap: 4px;
  &__item {
    font-size: 16px;
    font-weight: 300;
    cursor: pointer;
    padding: 1px 8px;
    line-height: 22.4px;
    border-radius: 4px;
  }
}
</style>