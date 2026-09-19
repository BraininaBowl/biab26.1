<template>
	<main>
		<OverviewComponent :filters="filters" />
	</main>
</template>

<script setup>
const route = useRoute();
// const type = route.params.type;
// let title = type + "s";

const filters = [
	// { attribute: "trashed", values: [false, undefined] },
	// { attribute: "hidden", values: [false, undefined] },
	{ attribute: "type", values: route.params.type },
	// { attribute: "parent", values: "any" },
];
</script>

<style lang="css" scoped></style>
