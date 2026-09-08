<template>
	<div class="childItemContainer">
		<NuxtLink v-for="childItem in childItems" :v-html="`${childItem.type}: ${childItem.title}`"></NuxtLink>

	</div>
</template>

<script setup>
const props = defineProps({
	childItems: {
		type: Object,
		required: true,
	},
});

const childItems = props.childItems || [];
</script>

<style type="css" scoped></style>
