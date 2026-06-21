<template>
  <!-- <HeaderDefaultComponent :key="route.path" /> -->
  <HeaderDefaultComponent :key="staticKey"/>
  <NuxtPage />
  <FooterDefaultComponent />
</template>

<script setup>
const staticKey = "static";
</script>

<style lang="css"></style>
