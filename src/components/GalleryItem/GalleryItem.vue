<template>
  <div class="gallery__item item" :data-theme="name">
    <div class="item__image">
      <img :src="baseUrl + painting.imageUrl" alt="">
    </div>
      <div class="item__content content">
        <div class="d-flex">
          <div class="main-content">
            <div class="content__body">
              <div class="default__name default">
                {{painting.name}}
              </div>
              <div class="default__created accent default">
                {{painting.created}}
              </div>
            </div>
            <div class="onHover">
              <div class="onHover__author">
                {{painting.author}}
              </div>
              <div class="onHover__location accent">
                {{painting.location}}
              </div>
            </div>
          </div>
          <div class="item__arrow">
            <img src="@/assets/icons/arrow_icon.svg" alt="">
          </div>
        </div>
      </div>
  </div>
</template>

<script setup lang="ts">
import type { Painting } from "@/types/Painting";
import type { PropType } from "vue";
import themeProvider from "@/helpers/setThemeSettings";

const props = defineProps({
  painting: {
    type: Object as PropType<Painting>,
    required: true
  }
})
const baseUrl = 'https://test-front.framework.team';
const { name } = themeProvider();
</script>

<style scoped lang="scss">
.d-flex {
  display: flex;
  align-items: center;
}

.item__arrow {
  @media (max-width: 768px) {
    flex: 0 1 20%;
    background-color: var(--accentText);
    display: flex;
    justify-content: center;
    align-items: center;
    min-height: 14.5vh;
  }
  @media (max-width: 425px) {
    min-height: 10vh;
  }
  display: none;
}
//================================================================================
.default {
  transition: all 0.4s;
}
.onHover {
  transition: all 0.4s;
  position: absolute;
  width: fit-content;
  height: fit-content;
  top: 0;
  left: 0;
  transform: translateX(-300px) translateY(18px);
  display: flex;
  flex-direction: column;
  gap: 8px;
  &__author {
    font-size: 16px;
    font-family: 'Cormorant SC', serif;
    font-weight: 500;
    line-height: 19.38px;
  }
  &__location {
    font-weight: 700;
    font-size: 12px;
    line-height: 14.52px;
  }
}
//====================================================================================
.gallery__item {
  cursor: pointer;
  transition: all .2s linear;
  flex: 0 1 calc(33% - 18px);
  min-height: 260px;
  position: relative;
  @media (max-width: 1024px) {
    flex: 0 1 calc(50% - 18px);
    min-height: 220px;
  }
  @media (max-width: 767px) {
    flex: 0 1 100%;
    min-height: 185px;
  }
  &:hover {
    .default {
      transform: translateY(100px);
    }
    .onHover {
      transform: translateX(20px) translateY(18px);
    }
  }
  .item {
    &__image {
      position: relative;
      padding-bottom: 70%;
      img {
        transition: all 0.3s ease;
        position: absolute;
        width: 100%;
        height: 100%;
        top: 0;
        left: 0;
        object-fit: cover;
        &:hover {

        }
      }
    }
    &__content {
      position: absolute;
      bottom: 0;
      left: 0;
      background-color: var(--primary-background);
    }
  }
  .content {
    overflow: hidden;
    &__body {
      margin: 20px 0 20px 0;
      width: 280px;
      padding-left: 20px;
      position: relative;
      display: flex;
      flex-direction: column;
      gap: 8px;
      @media (max-width: 767px) {
        gap: 4px;
      }
      @media (max-width: 425px) {
        margin: 8px 0 8px 0;
        padding-left: 12px;
        max-width: 236px;
      }
      &:before{
        position: absolute;
        margin-right: 20px;
        top: 0;
        left: 0;
        content: '';
        height: 100%;
        width: 2px;
        background-color: var(--accentText);
        @media (max-width: 1024px) {
          display: none;
        }
      }
    }
    .accent {
      color: var(--accentText);
    }
    .default {
      display: flex;
      flex-direction: column;
      gap: 8px;
      &__name {
        font-size: 16px;
        font-family: 'Cormorant SC', serif;
        font-weight: 500;
        line-height: 19.38px;
      }
      &__created {
        font-weight: 700;
        font-size: 12px;
        line-height: 14.52px;
      }
    }
  }
}
</style>