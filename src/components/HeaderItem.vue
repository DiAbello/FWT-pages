<template>
  <div class="header">
    <div class="container">
      <div class="header__body">
        <div class="header__logo cursor-pointer">
          <img :src="name === names.dark ? themeIconUrl.logoUrl + 'logo-white.svg' : themeIconUrl.logoUrl + 'logo-dark.svg'" alt="">
        </div>
        <div class="header__theme">
          <img :src="name === names.dark ? themeIconUrl.iconUrl + 'light_icon.svg' : themeIconUrl.iconUrl + 'dark_icon.svg'" alt="" :class="{background: name === names.dark, defaultPadding: true, 'cursor-pointer': true}" @click="toggle">
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import themeProvider from "@/helpers/setThemeSettings";

enum themeIconUrl {
  iconUrl = '/src/assets/icons/',
  logoUrl = '/src/assets/logo/'
}

const { toggle, name, names } = themeProvider();


</script>

<style scoped lang="scss">
.header {
  height: 80px;

  &__body {
    padding: 20px 0;
    display: flex;
    justify-content: space-between;
    align-items: center;
  }
}
.background {
    background-color: var(--secondary-black);
    padding: 10px;
    border-radius: 50%;
}
.defaultPadding {
  padding: 10px;
}
</style>
