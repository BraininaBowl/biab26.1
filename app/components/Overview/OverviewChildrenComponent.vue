<template>
	<div class="childItemContainer">
		<h2>Related:</h2>
		<div class="childItem" v-for="childItem in childItems" :key="childItem.id">
			<NuxtLink
				v-html="`${childItem.type}: ${childItem.title}`"
				:to="`/${childItem.type}s/${childItem.id}-${childItem.title}`"
			></NuxtLink>
			<span
				class="date"
				v-html="new Date(childItem.date).toLocaleDateString()"
			></span>
		</div>
	</div>
</template>

<script setup>
const props = defineProps({
	childItems: {
		type: Object,
		required: true,
	},
});

const childItems = props.childItems;
</script>

<style type="css" scoped>
.childItemContainer {
	display: flex;
	flex-direction: column;
	gap: 0.5rem;
}

.childItemContainer h2 {
	font-size: 1.5rem;
	margin: 0;
}

.childItem {
	display: flex;
	justify-content: space-between;
	align-items: center;
	border-bottom: 1px dashed var(--col-fg);
	padding: 0.5rem 0;
}

.childItem:first-of-type {
	border-top: 1px dashed var(--col-fg);
}

.childItem .date {
	font-weight: 100;
	font-style: italic;
	font-size: 0.8rem;
}
</style>
