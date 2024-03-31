<template>
  <div class="filters">
    <div class="container">
      <div class="filters__body">
        <MyInput
            v-model="paintingTitle"
        />
        <MySort/>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import MyInput from "@/components/UI/Input/MyInput.vue";
import MySort from "@/components/UI/Sort/MySort.vue";
import { useStore } from "@/stores/store";
import { ref, watch } from "vue";

const store = useStore();
const paintingTitle = ref('');

watch(paintingTitle, () => {
  store.searchQuery = paintingTitle.value as unknown as string;
})

</script>

<style scoped lang="scss">
.filters {
  padding: 44px 0 0 0;
  &__body {
    display: flex;
    align-items: center;
    justify-content: flex-end;
    gap: 20px;
    @media (max-width: 320px) {
      justify-content: space-between;
    }
  }
}
</style>