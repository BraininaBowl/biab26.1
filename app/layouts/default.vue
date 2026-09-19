<template class="PageOuter">
	<HeaderDefaultComponent :key="staticKey" class="HeaderComponent" />
	<NuxtPage class="NuxtPage" />
	<FooterDefaultComponent class="FooterComponent" />
</template>

<script setup>
const { items, fetchItems, types } = useItems();

if (!items || !items.length || items.length == 0) {
	await fetchItems(
		[
			{ attribute: "trashed", values: [false, undefined] },
			{ attribute: "hidden", values: [false, undefined] },
		],
		true,
	);
}

const staticKey = "static";
</script>

<style lang="css"></style>
