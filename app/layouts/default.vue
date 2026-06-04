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

</style>