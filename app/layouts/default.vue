<template>
  <div class="layout">
    <HeaderDefaultComponent :key="route.path" />
    <NuxtPage />
    <FooterDefaultComponent />
  </div>
</template>

<script setup>
let route = useRoute();
</script>

<style lang="css">
/* @import url('https://fonts.googleapis.com/css2?family=Alan+Sans:wght@300..900&display=swap'); */

:root {
  --col-bg: #f9f5d7;
  --col-bg-light: #fffdec;
  --col-fg: #282828;
  --col-border: #7c6f64;
  --col-area-bg: #ebdbb2;
  --col-link: #458588;
  --col-link-hover: #83a598;
  --col-highlight: #fe8019;

  --padding: 1.5rem;
}

html * {
  box-sizing: border-box;
}

body {
  margin: 0;
  padding: 0;
  font-family: "AlanSans", sans-serif;
  font-weight: 500;
  font-style: normal;
  font-size: 16px;
  background-color: var(--col-bg);
  color: var(--col-fg);
}

h1 {
  font-family: "AlanSans", sans-serif;
  font-weight: 800;
  font-style: normal;
  font-size: 4rem;
  line-height: 1;
}

h2 {
  font-family: "AlanSans", sans-serif;
  font-weight: 700;
  font-style: normal;
  font-size: 2.5rem;
  line-height: 1;
  margin: 0;
}

h3 {
  font-family: "AlanSans", sans-serif;
  font-weight: 700;
  font-style: normal;
  font-size: 1.5rem;
  line-height: 1;
  margin: 0;
}

p {
  font-family: "AlanSans", sans-serif;
  font-weight: 500;
  font-style: normal;
  font-size: 1rem;
  line-height: 1.5;
  margin: 0;
}

a:not(.tag) {
  color: var(--col-link);
  text-decoration: none;
  transition: color 0.25s ease-in-out;
  font-weight: 700;
  position: relative;
  display: inline-block;
}

a:not(.tag)::after,
a:not(.tag)::before {
  content: "";
  display: inline-block;
  position: absolute;
  left: 50%;
  width: 0;
  height: 2px;
  background-color: var(--col-link);
  transition: all 0.25s ease-in-out;
  opacity: 0;
}
a:not(.tag)::after {
  bottom: -0.125em;
}
a:not(.tag)::before {
  top: -0.125em;
}

a:not(.tag):hover::after,
a:not(.tag):hover::before {
  width: 100%;
  left: 0;
  opacity: 1;
}

.layout {
  display: flex;
  flex-direction: column;
  min-height: 100vh;
}

main {
  padding: var(--padding);
  flex-grow: 100;
}

/* Images */
.pixel {
  image-rendering: pixelated;
  image-rendering: -moz-crisp-edges;
  image-rendering: crisp-edges;
}

/* Notifications */
#notifications {
  position: fixed;
  top: 1rem;
  right: 1rem;
  left: 1rem;
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 0.5rem;
  z-index: 1000;
  pointer-events: none;
}

.notification {
  padding: 0.75rem 1.5rem;
  color: var(--col-fg);
  border-radius: 4px;
  border: 1px solid var(--col-border);
  background-color: var(--col-area-bg);
  transition: all 0.25s ease-in-out;
}

.notification.fade {
  opacity: 0;
  margin-top: -3rem;
}

.notification::before {
  content: "";
  display: inline-block;
  width: 0.75rem;
  height: 0.75rem;
  margin-right: 0.5rem;
  border-radius: 50%;
}

.notification.info::before {
  background-color: var(--col-info);
}
.notification.success::before {
  background-color: var(--col-link);
}
.notification.error::before {
  background-color: #991515;
}
</style>
