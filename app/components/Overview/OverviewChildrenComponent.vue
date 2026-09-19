<template>
	<div class="childItemContainer" v-if="relatedItems && relatedItems.length">
		<h2>Related:</h2>
		<div
			class="childItem"
			v-for="relatedItem in relatedItems"
			:key="relatedItem.id"
		>
			<NuxtLink
				v-html="`${relatedItem.type}: ${relatedItem.title}`"
				:to="`/${relatedItem.type}s/${relatedItem.id}-${relatedItem.title}`"
			></NuxtLink>
			<span
				class="date"
				v-html="new Date(relatedItem.date).toLocaleDateString()"
			></span>
		</div>
	</div>
</template>

<script setup>
defineProps({
	relatedItems: {
		type: Array,
		required: true,
		default: () => [],
	},
});
</script>

<style scoped>
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
