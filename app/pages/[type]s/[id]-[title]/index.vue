<template>
	<main class="item" v-for="item in items">
		<article class="content">
			<section v-if="item.imageURL"
				class="image"
				:style="`aspect-ratio: ${item.imageAspectRatio ? item.imageAspectRatio * 1.25 : 'auto'};`"
			>
				<div
					class="visual_wrapper monitor"
					:key="item.id"
					:style="`--background-image: url('${item.imageURL}')`"
				>
					<div class="visual_item">
						<div
							v-for="index in 9"
							:class="`visual_slice visual_slice_monitor visual_slice_${index}`"
							:style="{
								transform: `translateY(-10%) rotateY(${-27 + (index - 1) * 7}deg) translateZ(92.4vmin)`,
							}"
						></div>
						<div
							v-for="index in 7"
							:class="`visual_slice visual_slice_main visual_slice_${index} crt  ${item.imagePixel ? 'pixel' : ''}`"
							:style="{
								backgroundPosition: `calc(${index - 1} * (100% / 6)) center`,
								transform: `rotateY(${-21 + (index - 1) * 7}deg) translateZ(92.5vmin)`,
							}"
						></div>
					</div>
					<div class="footer_bot"></div>
				</div>
			</section>
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
			<section v-if="item.linkURL">
				<NuxtLink
					:to="item.linkURL"
					v-html="item.linkTitle ? item.linkTitle : item.linkURL"
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
/* .page-image {
	width: 100%;
	height: auto;
	max-height: calc(100vh - (var(--padding) + 8ch));
	background-size: cover;
	background-repeat: no-repeat;
} */

H1::before {
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

article.content section.image {
	position: relative;
	width: 100%;
	margin: 0 auto -10%;
	z-index: 1;
	transform: scale(0.5);
}

article.content section.description {
	display: flex;
	flex-direction: column;
	gap: 0.75rem;
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

.monitor .footer_bot {
	width: 40%;
	height: 40%;
	position: absolute;
	left: 50%;
	top: 0;
	transform: translateX(-50%) translateY(260%) translateZ(-20vmin)
		rotateX(-90deg);
	background: linear-gradient(180deg, #bdae93 0%, #d5c4a1 100%);
	box-shadow:
		0 -3vmin 0 0 #d5c4a1,
		0 -8vmin 24vmin 0 rgba(0, 0, 0, 0.5),
		0 8vmin 6vmin 16vmin var(--col-bg-light);
}

.visual_wrapper {
	display: block;
	width: 100%;
	height: 100%;
	position: relative;
	perspective: 500px;
	perspective-origin: center;
	transform-style: preserve-3d;
}

.visual_wrapper.monitor {
	perspective: 1000px;
}

.visual_wrapper * {
	transform-style: preserve-3d;
}

.visual_item {
	display: block;
	width: 100%;
	height: 100%;
	position: relative;
	transform: rotateY(-0.1deg) translateZ(-98vmin)
		translateX(calc(50% - (80vmin / 14)));
}

.visual_slice {
	display: block;
	width: calc((80vmin / 7) + 0.5px);
	height: 100%;
	overflow: hidden;
	background-image: var(--background-image);
	background-size: 700% 100%;
	background-repeat: no-repeat;
	backface-visibility: hidden;
	transform-origin: center;
	position: absolute;
	left: 0;
	box-shadow:
		inset 0px 25px 15px -20px rgba(0, 0, 0, 1),
		inset 0px -25px 15px -20px rgba(0, 0, 0, 1);
}

.monitor .visual_slice {
	box-shadow:
		inset 0px 25px 15px -20px rgba(0, 0, 0, 1),
		inset 0px -25px 15px -20px rgba(0, 0, 0, 1);
}
.monitor .visual_slice_1 {
	box-shadow:
		inset 0px 25px 15px -20px rgba(0, 0, 0, 1),
		inset 0px -25px 15px -20px rgba(0, 0, 0, 1),
		-2vmin 0 0 0 #a89984;
}
.monitor .visual_slice_7 {
	box-shadow:
		inset 0px 25px 15px -20px rgba(0, 0, 0, 1),
		inset 0px -25px 15px -20px rgba(0, 0, 0, 1),
		2vmin 0 0 0 #ebdbb2;
}

.monitor .visual_slice_monitor {
	background: linear-gradient(180deg, #ebdbb2 0%, #d5c4a1 100%);
	box-shadow: unset;
	height: 130%;
}

.monitor .visual_slice_monitor.visual_slice_8::after {
	content: "";
	width: 5vmin;
	height: 5vmin;
	border-radius: 50%;
	background: radial-gradient(circle, #ebdbb2 20%, #d5c4a1 50%, #bdae93 70%);
	position: absolute;
	bottom: 2.25vmin;
	right: 0;
}

.monitor .visual_slice_monitor.visual_slice_9::after {
	content: "";
	width: 2vmin;
	height: 2vmin;
	background: radial-gradient(circle, #ffffff 10%, #f9f5d7 30%, #bdae93 70%);
	position: absolute;
	bottom: 3.5vmin;
	left: 1vmin;
}

.visual_slice.visual_slice_bottom,
.visual_slice.visual_slice_top {
	opacity: 0.2;
}

.visual_slice_top {
	background-image:
		linear-gradient(
			0deg,
			rgba(0, 0, 0, 1) 0%,
			rgba(0, 0, 0, 1) 86%,
			rgba(0, 0, 0, 0) 100%
		),
		var(--background-image);
}
.visual_slice_bottom {
	background-image:
		linear-gradient(
			180deg,
			rgba(0, 0, 0, 1) 0%,
			rgba(0, 0, 0, 1) 86%,
			rgba(0, 0, 0, 0) 100%
		),
		var(--background-image);
}

/* Scanlines */

@keyframes flicker {
	0% {
		opacity: 0.139305;
	}
	5% {
		opacity: 0.173845;
	}
	10% {
		opacity: 0.11802;
	}
	15% {
		opacity: 0.45313;
	}
	20% {
		opacity: 0.09064;
	}
	25% {
		opacity: 0.419455;
	}
	30% {
		opacity: 0.327915;
	}
	35% {
		opacity: 0.339035;
	}
	40% {
		opacity: 0.132795;
	}
	45% {
		opacity: 0.423465;
	}
	50% {
		opacity: 0.480095;
	}
	55% {
		opacity: 0.04297;
	}
	60% {
		opacity: 0.101565;
	}
	65% {
		opacity: 0.35994;
	}
	70% {
		opacity: 0.267275;
	}
	75% {
		opacity: 0.18644;
	}
	80% {
		opacity: 0.35714;
	}
	85% {
		opacity: 0.352095;
	}
	90% {
		opacity: 0.35015;
	}
	95% {
		opacity: 0.18054;
	}
	100% {
		opacity: 0.121935;
	}
}
.crt::after {
	content: " ";
	display: block;
	position: absolute;
	top: 0;
	left: 0;
	bottom: 0;
	right: 0;
	background: rgba(18, 16, 16, 0.1);
	opacity: 0;
	z-index: 2;
	pointer-events: none;
	animation: flicker 1s infinite;
}
.crt::before {
	opacity: 0.5;
	content: " ";
	display: block;
	position: absolute;
	top: 0;
	left: 0;
	bottom: 0;
	right: 0;
	background:
		linear-gradient(rgba(18, 16, 16, 0) 50%, rgba(0, 0, 0, 0.125) 50%),
		linear-gradient(
			90deg,
			rgba(255, 0, 0, 0.03),
			rgba(0, 255, 0, 0.01),
			rgba(0, 0, 255, 0.03)
		);
	z-index: 2;
	background-size:
		100% 1.5px,
		3px 100%;
	pointer-events: none;
}
</style>
