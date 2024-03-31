<template>
  <select
      class="select"
      v-model="modelValue"
      @change="emits('update:modelValue', ($event.target as HTMLSelectElement).value)"
      :data-theme="name"
  >
    <option disabled value="">
      Select the {{sortTitle}}
    </option>
    <option
      v-for="option in options"
      :key="option.value"
      :value="option.value"
      class="option"
    >
      {{option.name}}
    </option>
  </select>
</template>

<script setup lang="ts">
import { type PropType, ref } from "vue";
import type { Options } from "@/components/UI/Select/Options";
import themeProvider from "@/helpers/setThemeSettings";

const { name } = themeProvider()

const props = defineProps({
  modelValue: {
    type: String
  },
  options: {
    type: Array as PropType<Options[]>,
    default: () => []
  },
  sortTitle: {
    type: String,
    required: true
  }
})
const modelValue = ref(props?.modelValue)

const emits = defineEmits([
    'update:modelValue'
])
</script>

<style scoped lang="scss">
.select {
  display: none;
  transition: all 0.3s;
  background-color: var(--selectBack);
  border: 1px solid var(--selectBorder);
  color: var(--selectText);
  width: 100%;
  padding: 8px 0 8px 16px;
  border-radius: 4px;
  transform: scale(0);
}
.option {
  font-size: 14px;
  font-weight: 300;
  line-height: 19.6px;
  padding: 8px 0 8px 16px;
}
</style>