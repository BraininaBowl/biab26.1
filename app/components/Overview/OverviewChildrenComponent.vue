<template></template>

<script setup>
const { fetchStatelessItems } = useItems();
const props = defineProps({
	id: {
		type: string,
		required: true,
	},
});

const id = props.id || [];
const filters = [
	{ attribute: "trashed", values: [false, undefined] },
	{ attribute: "hidden", values: [false, undefined] },
	{ attribute: "parent", values: [id] },
];
const childItems = await fetchStatelessItems(filters);
console.log("childItems", childItems)
</script>

<style type="css" scoped></style>
