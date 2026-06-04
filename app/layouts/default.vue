<template>
    <div class="layout">
    <HeaderDefaultComponent />
    <NuxtPage />
    <FooterDefaultComponent />
    </div>
</template>

<script setup>

</script>

<style lang="css">
/* @import url('https://fonts.googleapis.com/css2?family=Alan+Sans:wght@300..900&display=swap'); */

:root {
    --col-bg: #f9f5d7;
    --col-fg: #282828;
    --col-accent: #458588;
    --col-accent-hover: #83a598;
    --col-highlight: #fe8019;

    --padding: 1.5rem;
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
    font-size: 32px;
    line-height: 1;
}

h2 {
    font-family: "AlanSans", sans-serif;
    font-weight: 700;
    font-style: normal;
    font-size: 24px;
    line-height: 1;
}

p {
    font-family: "AlanSans", sans-serif;
    font-weight: 500;
    font-style: normal;
    font-size: 16px;
    line-height: 1.5;
}

.layout {
    display: flex;
    flex-direction: column;
    min-height: 100vh;
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
  color: var(--col-text);
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
  background-color: var(--col-accent);
}
.notification.error::before {
  background-color: #991515;
}


</style>