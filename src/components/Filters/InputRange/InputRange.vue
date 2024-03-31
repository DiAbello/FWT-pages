<template>
  <div class="filter__item item" :data-theme="name">
    <div class="item__body">
      <div class="item__title">
        {{sortTitle}}
      </div>
      <div class="item__icon">
        <img :src="isDropdownActive ? FilterIconsLinks.darkMinus : FilterIconsLinks.darkPlus" alt="" class="iconColor" @click="isDropdownActive = !isDropdownActive">
      </div>
    </div>
    <div class="range" v-if="isDropdownActive">
      <input
          type="text"
          :class="{rangeInput: true, focused: isFocused}"
          @focus="isFocused = true"
          @blur="isFocused = false"
          placeholder="From"
          v-model="rangeFrom"
          @input="store.selectedOptions.years = range"
      >
      <img :src="name === names.dark ? FilterIconsLinks.darkMinus : FilterIconsLinks.whiteMinus" alt="">
      <input
          type="text"
          :class="{rangeInput: true, focused: isFocused}"
          @focus="isFocused = true"
          @blur="isFocused = false"
          placeholder="To"
          v-model="rangeTo"
          @input="store.selectedOptions.years = range"
      >
    </div>
  </div>
</template>

<script setup lang="ts">
import themeProvider from "@/helpers/setThemeSettings";
import {computed, ref} from "vue";
import { FilterIconsLinks } from "@/components/Filters/filter-icons-links";
import { useStore } from "@/stores/store";

const props = defineProps({
  sortTitle: {
    type: String,
    required: true
  },
})
const store = useStore()
const rangeFrom = ref<number>()
const rangeTo = ref<number>()

const range = computed(() => {
  return {
    from: Number(rangeFrom.value),
    to: Number(rangeTo.value)
  }
})

const { name, names } = themeProvider()
const isDropdownActive = ref(false)
const isFocused = ref(false)

</script>

<style scoped lang="scss">
.focused {
  border: 1px solid var(--inputBorderFocus) !important;
}
//===================================================================
.iconColor {
  color: var(--filterIcon)
}
.item {
  display: flex;
  flex-direction: column;
  gap: 24px;
  &__body {
    display: flex;
    align-items: center;
    justify-content: space-between;

  }
  &__title {
    text-transform: uppercase;
    font-family: 'Cormorant SC', serif;
    font-weight: 500;
    font-size: 16px;
    line-height: 19.38px;
  }
}
.range {
  display: flex;
  align-items: center;
  gap: 8px;
  .rangeInput {
    max-width: 66px;
    padding: 6px 16px;
    background-color: var(--inputBackdround);
    color: var(--primary-text);
    border: 1px solid var(--inputBorder);
    border-radius: 4px;
  }
}
</style>