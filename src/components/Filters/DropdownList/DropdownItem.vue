<template>
  <div class="filter__item item" :data-theme="name">
    <div class="item__body">
      <div class="item__title">
        {{sortTitle}}
      </div>
      <div class="item__icon">
        <img
            :src="isDropdownActive ? FilterIconsLinks.darkMinus : FilterIconsLinks.darkPlus"
            alt=""
            class="iconColor"
            @click="isDropdownActive = !isDropdownActive"
        >
      </div>
    </div>
    <MySelect
        :options="dropdownOptions"
        :class="{active: isDropdownActive}"
        :sort-title="sortTitle"
        v-model="selectedSort"
    />
  </div>
</template>

<script setup lang="ts">
import themeProvider from "@/helpers/setThemeSettings";
import {type PropType, ref, watch} from "vue";
import { FilterIconsLinks } from "@/components/Filters/filter-icons-links";
import MySelect from "@/components/UI/Select/MySelect.vue";
import type {Options} from "@/components/UI/Select/Options";
import {useStore} from "@/stores/store";

const props = defineProps({
  sortTitle: {
    type: String,
    required: true
  },
  dropdownOptions: {
    type: Array as PropType<Options[]>,
    required: true
  }
})
const store = useStore()
const { name } = themeProvider()
const isDropdownActive = ref(false)
const selectedSort = ref<string>('')

watch(selectedSort, () => {
  if(props.sortTitle?.toLowerCase() === 'artist') {
    store.selectedOptions.author = selectedSort as unknown as string
  } else {
    store.selectedOptions.location = selectedSort as unknown as string
  }
})

const emits = defineEmits([
  'update:modelValue'
])
</script>

<style scoped lang="scss">
.iconColor {
  color: var(--filterIcon)
}
.active {
  transform: scale(1);
  display: block !important;
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
</style>