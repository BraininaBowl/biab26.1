<template>
	<div class="overview">
		<section class="filters">
			I make:
			<NuxtLink
				v-for="type in types"
				:key="type"
				:to="`/${type}s`"
				class="filter_link"
			>
				{{ type }}s
			</NuxtLink>
			<span v-if="path !== '/'">|</span
			><NuxtLink v-if="path !== '/'" to="/" class="filter_link"
				>Show all</NuxtLink
			>
		</section>

		<h1 v-if="title" v-html="`${title}s`"></h1>
		<h1 v-else-if="tag" v-html="`${tag}`"></h1>

		<section class="card_container">
			<CardComponent v-for="item in items" :key="item.id" :item="item" />
		</section>
	</div>
</template>

<script setup>
const { items, fetchItems, types } = useItems();
const path = useRoute().path;
const props = defineProps({
	filters: {
		type: Object,
		required: false,
	},
});

const filters = props.filters || [];
const title = filters.find((filter) => filter.attribute === "type")?.values[0];
const tag = filters.find((filter) => filter.attribute === "tag")?.values[0];

fetchItems(filters, true).then(resizeItems);

function resizeItems() {
	if (document) {
		document.querySelectorAll(".card_wrapper").forEach((domItem, index) => {
			if (domItem) {
				let card = domItem.querySelector(".card");
				if (card) {
					domItem.style.gridRow = "auto / span " + (card.clientHeight + 32);
					setTimeout(() => {
						domItem.style.opacity = 1;
					}, 50 * index);
				}
			}
		});
	}
}

onMounted(() => {
	window.addEventListener("resize", resizeItems);
});
onUnmounted(() => {});
</script>

<style lang="css" scoped>
.overview {
	width: 100%;
	max-width: 1600px;
	margin: 0 auto;
	display: flex;
	flex-direction: column;
	gap: 2rem;
}

.card_container {
	display: grid;
	grid-auto-rows: 1px;
	grid-template-columns: repeat(auto-fit, minmax(320px, 1fr));
	gap: 0rem 1.5rem;
}

.card_wrapper {
	opacity: 0;
}
</style>
