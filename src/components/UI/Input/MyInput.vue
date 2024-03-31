<template>
  <div
      :class="{myInput: true, focused: isFocused}"
      :data-theme="name"
  >
    <img
        :src="name === names.dark ? EnumLinksInput.darkVariant : EnumLinksInput.whiteVariant"
        class="inputIcon"
    >
    <input
        type="text"
        :value="modelValue"
        class="input"
        @input="emits('update:modelValue', ($event.target as HTMLInputElement).value)"
        placeholder="Painting title"
        @focus="isFocused = true" @blur="isFocused = false"
        ref="input"
    >
    <img
        :src="name === names.dark ? EnumLinksInput.darkCloseVariant : EnumLinksInput.whiteCloseVariant"
        alt=""
        class="closeIcon"
        v-if="modelValue?.length > 0"
        @click="clearInput($refs.input as HTMLInputElement)"
    >
  </div>
</template>

<script setup lang="ts">
import themeProvider from "@/helpers/setThemeSettings";
import {EnumLinksInput} from "@/components/UI/Input/EnumLinksInput";
import {ref} from "vue";

const props = defineProps({
  modelValue: {
    type: String,
    required: true
  }
});
const {  name, names  } = themeProvider();
const isFocused = ref(false);

const emits = defineEmits([
  'update:modelValue'
])

function clearInput(input: HTMLInputElement) {
  const modInput = input;
  modInput.value = '';
  emits('update:modelValue', input.value);
}

</script>

<style scoped lang="scss">
.focused {
  border: 1px solid var(--inputBorderFocus) !important;
}

.myInput {
  user-select: none;
  display: flex;
  align-items: center;
  background-color: var(--inputBackdround);
  border: 1px solid var(--inputBorder);
  padding: 8px 0 8px 16px;
  width: 336px;
  border-radius: 4px;
  @media (max-width: 768px) {
    width: 296px;
  }
  @media (max-width: 320px) {
    width: 224px;
  }

  .input {
    flex: 0 1 90%;
    padding-left: 12px;
    background-color: var(--inputBackdround);
    color: var(--primary-text);
    @media (max-width: 320px) {
      max-width: 175px;
    }
  }

  .closeIcon {
    width: 12px;
    height: 12px;
    margin: 0 18px;
    cursor: pointer;
  }
}
</style>