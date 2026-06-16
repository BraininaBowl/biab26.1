<template>
    <main>
        <h2>{{ type }}</h2>
        <OverviewComponent :filters="filters"/>
    </main>
</template>

<script setup>
const route = useRoute();
const type = route.params.type;

const filters = [{ attribute: "trashed", values: [false, undefined] },{ attribute: "type", values: [type] } ];
</script>

<style lang="css" scoped>
    main {
        padding: var(--padding);
        flex-grow: 100;
    }
</style>