<template>
	<main>
		<OverviewComponent :filters="filters" />
	</main>
</template>

<script setup>
const filters = [
	{ attribute: "trashed", values: [false, undefined] },
	{ attribute: "hidden", values: [false, undefined] },
	// { attribute: "parent", values: "any" },
];
</script>

<style lang="css" scoped></style>
