<template>
    <main>
        <OverviewComponent :filters="filters"/>
    </main>
</template>

<script setup>
const route = useRoute();
const tag = route.params.tag;
const filters = [{ attribute: "trashed", values: [false, undefined] },{ attribute: "hidden", values: [false, undefined] },{ attribute: "tag", values: [tag] } ];
console.log("filters", filters);
</script>

<style lang="css" scoped>

</style>