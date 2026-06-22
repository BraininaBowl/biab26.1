<template>
    <main>
        <div class="divider"></div>
        <h1 v-if="title" v-html="title"></h1>
        <OverviewComponent :filters="filters"/>
    </main>
</template>

<script setup>
const route = useRoute();
const type = route.params.type;
let title = type + "s";

const filters = [{ attribute: "trashed", values: [false, undefined] },{ attribute: "type", values: [type] } ];
</script>

<style lang="css" scoped>

</style>