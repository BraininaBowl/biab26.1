<template>
    <main>
        <p>This is the home page.</p>
        <OverviewComponent />
    </main>
</template>

<script setup>
import OverviewComponent from '~/components/Overview/OverviewComponent.vue';



</script>

<style lang="css" scoped>
    main {
        padding: var(--padding);
        flex-grow: 100;
    }
</style>