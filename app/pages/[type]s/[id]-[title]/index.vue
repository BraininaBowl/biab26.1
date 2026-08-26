<template>
	<main class="item" v-for="item in items">
		<div
			v-if="item.imageURL"
			:alt="item.title"
			:class="`page-image ${item.imagePixel ? 'pixel' : ''}`"
			:style="`aspect-ratio: ${item.imageAspectRatio ? item.imageAspectRatio : 'auto'}; background-image: url('${item.imageURL}'); background-position: ${item.imageFocus ? item.imageFocus : 'center'};`"
		></div>
		<div v-else class="divider"></div>
		<article class="content">
			<header>
				<h1 v-if="item.title" v-html="item.title"></h1>
			</header>
			<section class="links">
				<NuxtLink
					v-if="item.type"
					:to="`/${item.type}s`"
					class="type-link clear"
					v-html="item.type"
				></NuxtLink>
				<NuxtLink
					v-if="item.tag && item.tag.length > 0"
					v-for="tag in item.tag"
					:key="tag"
					:to="`/tag/${tag}`"
					class="tag-link clear"
					v-html="tag"
				></NuxtLink>
			</section>
			<section
				v-if="item.description"
				class="description"
				v-html="item.description"
			></section>
			<section>
				<NuxtLink
					:to="item.linkURL"
					v-html="item.linkTitle"
					class="button"
				></NuxtLink>
			</section>
		</article>
	</main>
</template>

<script setup>
const route = useRoute();
const itemId = route.params.id;
const { items, fetchItems } = useItems();
fetchItems([
	{ attribute: "id", values: itemId },
	{ attribute: "trashed", values: [false, undefined] },
]);

onMounted(() => {});
</script>
<style lang="css" scoped>
.page-image {
	width: 100%;
	height: auto;
	max-height: calc(100vh - (var(--padding) + 8ch));
	background-size: cover;
	background-repeat: no-repeat;
}

H1:before {
	content: " ";
	display: inline-block;
	border-bottom: 0.9rem solid var(--col-fg);
	border-right: 0.9rem solid var(--col-fg);
	height: 1rem;
	width: 1rem;
	border-radius: 0.125rem;
	margin-right: 1rem;
	transform: translateY(-0.25rem) rotate(-45deg);
}

article.content {
	width: 100%;
	max-width: 1024px;
	margin: 0 auto;
	padding: var(--padding);
	display: flex;
	flex-direction: column;
	gap: 2rem;
}

article.content section {
	margin: 0 3rem;
	width: calc(100% - 6rem);
}

article.content section.description {
	display: flex;
	flex-direction: column;
	gap: 0.5rem;
}

article.content section.links {
	display: flex;
	flex-direction: row;
	gap: 0.75rem;
}

article.content section.links a {
	padding: 0.25rem 0.75rem;
	border-radius: 2rem;
	color: var(--col-bg);
	background-color: var(--col-border);
	text-decoration: none;
	font-size: 0.9rem;
	font-weight: 400;
	transition: all 0.2s ease-in-out;
}

article.content section.links a.type-link {
	background-color: var(--col-fg);
}

article.content section.links a:hover {
	background-color: var(--col-link);
	color: var(--col-bg-light);
}
</style>
