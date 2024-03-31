<template>
  <div class="sort" :data-theme="name">
    <img :src="name === names.dark ? EnumLinksSort.darkVariant : EnumLinksSort.whiteVariant" alt="" @click="isSortVisible = true">
    <div :class="{sortMenu: true, visible: isSortVisible}">
      <div class="sortMenu__body">
        <div class="sortMenu__close">
          <img
              :src="name === names.dark ? FilterIconsLinks.darkClose : FilterIconsLinks.whiteClose"
              alt=""
              @click="isSortVisible = false"
          >
        </div>
        <div class="sortMenu__filters filters">
          <div class="filters__body">
            <DropdownItem
              sort-title='Artist'
              :dropdown-options="store.sortArtists"
            />
            <DropdownItem
                sort-title='Location'
                :dropdown-options="store.sortLocations"
            />
            <InputRange
                sort-title="Years"
            />
          </div>
        </div>
        <div class="sortMenu__footer footer">
          <div class="footer__show">
            Show the results
          </div>
          <div class="footer__clear" @click="clearFilters">
            clear
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import themeProvider from "@/helpers/setThemeSettings";
import {EnumLinksSort} from "@/components/UI/Sort/EnumLinksSort";
import {FilterIconsLinks} from "@/components/Filters/filter-icons-links";
import {onMounted, ref} from "vue";
import DropdownItem from "@/components/Filters/DropdownList/DropdownItem.vue";
import { useStore} from "@/stores/store";
import InputRange from "@/components/Filters/InputRange/InputRange.vue";

const store = useStore();
const { name, names } = themeProvider();
const isSortVisible = ref<boolean>(false);

function clearFilters() {
  store.selectedOptions = {};
}

onMounted(() => {
  store.setArtists();
  store.setLocations();
})
</script>

<style scoped lang="scss">
.visible {
  display: block !important;
}
.sort {
  user-select: none;
  width: 36px;
  height: 36px;
  display: flex;
  align-items: center;
  justify-content: center;
  background-color: var(--sortBackground);
  border-radius: 4px;
  cursor: pointer;
  overflow: hidden;
  .sortMenu {
    display: none;
    transition: all 0.3s;
    position: fixed;
    z-index: 2;
    top: 0;
    right: 0;
    width: 492px;
    height: 100vh;
    background-color: var(--primary-background);
    @media (max-width: 768px) {
      width: 372px;
    }
    @media (max-width: 320px) {
      width: 280px;
    }
    &__body {
      margin: 0 40px 0 40px;
      display: flex;
      flex-direction: column;
      height: 100vh;
      @media (max-width: 768px) {
        margin: 0 24px 0 24px;
      }
      @media (max-width: 425px) {
        margin: 0 20px 0 20px;
      }
    }
    &__close {
      text-align: right;
      margin-top: 60px;
      @media (max-width: 768px) {
        margin-top: 24px;
      }
      @media (max-width: 425px) {
        margin-top: 20px;
      }
    }
    &__filters {
      max-width: 320px;
      margin-top: 100px;
      .filters {

        &__body {
          display: flex;
          flex-direction: column;
          gap: 32px;
          max-height: 100px;
          @media (max-width: 1024px) {
            max-height: 10px;
          }
        }
      }
    }
    &__footer {
      margin-top: 380px;
      max-width: 320px;
      display: flex;
      justify-content: space-between;
      align-items: center;
      .footer {

        &__show {
          text-transform: uppercase;
          text-decoration: underline;
          font-weight: 700;
          font-size: 12px;
          line-height: 14.52px;
          color: var(--filterIcon);
        }
        &__clear {
          text-transform: uppercase;
          text-decoration: underline;
          font-weight: 700;
          font-size: 12px;
          line-height: 14.52px;
          color: var(--clearBtn);
        }
      }
    }
  }
}
</style>