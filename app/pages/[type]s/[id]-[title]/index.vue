<template>
	<main class="item" v-for="item in items">
		<article class="content">
			<section
				v-if="item.imageURL && item.pageType === 'pc'"
				class="image monitor"
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
								transform: `translateY(-10%) rotateY(${-27 + (index - 1) * 7}deg) translateZ(92.4rem)`,
							}"
						></div>
						<div
							v-for="index in 7"
							:class="`visual_slice visual_slice_main visual_slice_${index} crt  ${item.imagePixel ? 'pixel' : ''}`"
							:style="{
								backgroundPosition: `calc(${index - 1} * (100% / 6)) center`,
								transform: `rotateY(${-21 + (index - 1) * 7}deg) translateZ(92.5rem)`,
							}"
						></div>
					</div>
					<div class="footer_bot"></div>
				</div>
			</section>
			<section
				v-else-if="item.imageURL && item.pageType === 'playdate'"
				class="image playdate"
			>
				<div
					class="visual_wrapper playdate"
					:key="item.id"
					:style="`--background-image: url('${item.imageURL}')`"
				>
					<div class="playdate_body">
						<div class="playdate_front">
							<div class="playdate_screen"></div>
							<div class="playdate_screw"></div>
							<div class="playdate_screw"></div>
							<div class="playdate_screw"></div>
							<div class="playdate_grill"></div>
							<div class="playdate_button_a"></div>
							<div class="playdate_button_b"></div>
							<div class="playdate_button_menu"></div>
						</div>
					</div>
				</div>
			</section>

			<section class="divider compact"></section>
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
H1::before {
	content: " ";
	display: inline-block;
	border-bottom: 0.9rem solid var(--col-fg);
	border-right: 0.9rem solid var(--col-fg);
	height: 1rem;
	width: 1rem;
	border-radius: 0.125rem;
	margin-right: 1rem;
	margin-left: -3rem;
	transform: translateY(-0.25rem) rotate(-45deg);
}

H1 {
	padding-left: 3rem;
}

.playdate .playdate_front {
	border-radius: 6px;
	background-color: #fabd2f;
	width: 460px;
	height: 460px;
	box-shadow: 10px 0 0 0 #d79921;
}

.playdate .playdate_screen {
	width: 400px;
	height: 240px;
	background-color: var(--col-fg);
	background-image: var(--background-image);
	background-position: center;
	background-repeat: no-repeat;
	position: relative;
	border: 10px solid var(--col-fg);
}

.playdate .playdate_screen::before {
	content: "";
	width:100%;
	height: 100%;
	position: absolute;
	left: 0;
	top: 0;
	z-index: 1;
	background-color: var(--col-fg);
	mix-blend-mode: lighten;
}

.playdate .playdate_screen::after {
	content: "";
	width:100%;
	height: 100%;
	position: absolute;
	left: 0;
	top: 0;
	z-index: 2;
	background-color: var(--col-bg);
	mix-blend-mode: darken;
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
	z-index: 1;
}

article.content section.image.monitor {
	transform: scale(0.3);
	margin: -15% auto -20%;
	height: 50rem;
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
	color: var(--col-fg);
	background-color: var(--col-bg);
	border: 1px solid var(--col-fg);
	text-decoration: none;
	font-size: 0.9rem;
	font-weight: 400;
	transition: all 0.25s ease-in-out;
}

article.content section.links a.type-link {
	color: var(--col-bg);
	background-color: var(--col-fg);
}

article.content section.links a:hover {
	background-color: var(--col-link);
	color: var(--col-bg-light);
	border: 1px solid var(--col-link);
}

.monitor .footer_bot {
	width: 50rem;
	height: 24rem;
	position: absolute;
	left: 50%;
	top: 0;
	border-radius: 5rem;
	transform: rotateY(-10.1deg) translateX(-70%) translateY(53rem)
		translateZ(-20rem) rotateX(-90deg);
	background: linear-gradient(-20deg, #bdae93 20%, #d5c4a1 150%);
	box-shadow:
		0 -3rem 0 0 #d5c4a1,
		0 4rem 32rem 0 rgba(0, 0, 0, 0.75),
		0 8rem 6rem 16rem var(--col-bg-light);
}

.visual_wrapper {
	display: block;
	width: 100%;
	height: 100%;
	position: relative;
	perspective-origin: 50% 40%;
	transform-style: preserve-3d;
}

.visual_wrapper.monitor {
	perspective: 2000px;
}

.visual_wrapper * {
	transform-style: preserve-3d;
}

.monitor .visual_item {
	display: block;
	width: 100%;
	height: 100%;
	position: relative;
	transform: rotateY(-10.1deg) translateZ(-98rem)
		translateX(calc(30% - (80rem / 14)));
}

.monitor .visual_slice {
	display: block;
	width: calc((80rem / 7) + 0.5px);
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
		inset 0px 25px 15px -20px rgba(0, 0, 0, 0.5),
		inset 0px -25px 15px -20px rgba(0, 0, 0, 0.5);
}

.monitor .visual_slice {
	box-shadow:
		inset 0px 25px 15px -20px rgba(0, 0, 0, 0.5),
		inset 0px -25px 15px -20px rgba(0, 0, 0, 0.5);
}
.monitor .visual_slice_1 {
	box-shadow:
		inset 0px 25px 15px -20px rgba(0, 0, 0, 0.5),
		inset 0px -25px 15px -20px rgba(0, 0, 0, 0.5),
		-2rem 0 0 0 #a89984;
}
.monitor .visual_slice_7 {
	box-shadow:
		inset 0px 25px 15px -20px rgba(0, 0, 0, 0.5),
		inset 0px -25px 15px -20px rgba(0, 0, 0, 0.5),
		2rem 0 0 0 #ebdbb2;
}

.monitor .visual_slice_monitor {
	background: linear-gradient(180deg, #ebdbb2 0%, #d5c4a1 100%);
	box-shadow: unset;
	height: 130%;
}

.monitor .visual_slice_monitor.visual_slice_8::after {
	content: "";
	width: 5rem;
	height: 5rem;
	border-radius: 50%;
	background: radial-gradient(circle, #ebdbb2 20%, #d5c4a1 50%, #bdae93 70%);
	position: absolute;
	bottom: 2rem;
	right: 0;
}

.monitor .visual_slice_monitor.visual_slice_9::after {
	content: "";
	width: 2rem;
	height: 1rem;
	background: radial-gradient(circle, #f9f5d7 10%, #ebdbb2 30%, #bdae93 70%);
	position: absolute;
	bottom: 3.75rem;
	left: 1rem;
}

.monitor .visual_slice_monitor.visual_slice_1 {
	border-radius: 3rem 0 0 3rem;
}

.monitor .visual_slice_monitor.visual_slice_9 {
	border-radius: 0 3rem 3rem 0;
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
