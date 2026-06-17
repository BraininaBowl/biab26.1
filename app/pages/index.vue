<template>
    <main>
        <OverviewComponent :filters="filters"/>
    </main>
</template>

<script setup>
const filters = [{ attribute: "trashed", values: [false, undefined] }];
</script>

<style lang="css" scoped>

</style>