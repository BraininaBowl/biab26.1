<template>
	<article :id="`card_${item.id}`" class="card_wrapper">
		<div class="card_label">{{ item.type }}</div>
		<NuxtLink
			:to="`/${item.type}s/${item.id}-${returnUri(item.title)}`"
			:title="item.title"
			v-if="item.imageURL"
			:class="`card card_image clear ${item.imagePixel ? 'pixel' : ''}`"
			:style="`aspect-ratio: ${item.imageAspectRatio ? item.imageAspectRatio : 'auto'};`"
		>
			<div
				class="card_image_inner"
				:style="`background-image: url(${item.imageURL});`"
			></div>
		</NuxtLink>
		<NuxtLink
			:to="`/${item.type}s/${item.id}-${returnUri(item.title)}`"
			:title="item.title"
			class="card card_content clear"
			:style="{
				backgroundColor: item.color ? item.color : 'var(--col-bg-light)',
			}"
			v-else
		>
			<h3>
				{{ item.title }}
			</h3>
			<div v-if="item.snippet" v-html="item.snippet"></div>
		</NuxtLink>
	</article>
</template>

<script setup>
defineProps({
	item: {
		type: Object,
		required: true,
	},
});
</script>

<style lang="css" scoped>
.card_wrapper {
	display: flex;
	position: relative;
	flex-direction: column;
	gap: 0.5rem;
	justify-content: stretch;
	align-items: flex-start;
	transition:
		opacity 500ms ease-out,
		transform 125ms ease-out;
}

.card {
	border-radius: 0;
	display: flex;
	flex-direction: column;
	width: 100%;
	background-color: var(--col-bg-light);
	align-items: flex-start;
	position: relative;
	border: 0.075rem solid var(--col-border);
	transition:
		box-shadow 125ms ease-out,
		transform 125ms ease-out,
		border-radius 125ms ease-out;
}

.card_content {
	gap: 0.5rem;
	padding: 1.25rem 1rem 1rem;
}

.card_image {
	background-color: var(--col-fg);
}

.card_image_inner {
	background-size: 100% auto;
	background-position: center;
	mix-blend-mode: lighten;
	display: flex;
	flex-direction: column;
	width: 100%;
	height: 100%;
	background-color: var(--col-bg-light);
	align-items: flex-start;
	position: relative;
}

.card_label {
	font-family: "AlanSans", sans-serif;
	font-weight: 700;
	margin: 0 auto -1.25rem;
	padding: 0.25rem 0.5rem;
	background-color: var(--col-bg-light);
	color: var(--col-fg);
	border: 0.075rem solid var(--col-border);
	font-size: 0.75rem;
	text-transform: uppercase;
	letter-spacing: 0.05rem;
	border-radius: 0.25rem;
	z-index: 1;
	transition: transform 125ms ease-out;
}

.card_wrapper:hover .card,
.card_wrapper:hover .card_label {
	transform: translateY(-0.5rem);
}

.card_wrapper:hover .card {
	box-shadow: var(--hover-shadow);
	border-radius: 0.75rem;
}
</style>
