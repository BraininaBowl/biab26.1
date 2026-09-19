<template class="PageOuter">
  <HeaderDefaultComponent :key="staticKey" class="HeaderComponent"/>
  <NuxtPage class="NuxtPage" />
  <FooterDefaultComponent class="FooterComponent" />
</template>

<script setup>
const staticKey = "static";
</script>

<style lang="css"></style>
