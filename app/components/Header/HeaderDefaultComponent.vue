<template>
	<header :class="headerStyle">
		<NuxtLink class="clear" href="/">
			<h4>
				<span class="segment">Brain&nbsp;</span> <span class="segment">in&nbsp;a&nbsp;</span>
				<span class="segment">Bowl</span>
			</h4>
		</NuxtLink>
		<div class="visual_container">
			<div
				:class="`visual_wrapper`"
				v-for="item in featuredItems"
				:key="item.id"
				:style="`--background-image: url('${item.imageURL}')`"
			>
				<div class="visual_item">
					<div
						v-for="index in 7"
						:class="`visual_slice visual_slice_bottom visual_slice_${index}`"
						:style="{
							backgroundPosition: `calc(${index - 1} * (100% / 6)) center`,
							transform: `scaleY(-1) translateY(-100%) rotateY(${-21 + (index - 1) * 7}deg) translateZ(calc(92.5vw))`,
						}"
					></div>
					<div
						v-for="index in 7"
						:class="`visual_slice visual_slice_top visual_slice_${index}`"
						:style="{
							backgroundPosition: `calc(${index - 1} * (100% / 6)) center`,
							transform: `scaleY(-1) translateY(100%) rotateY(${-21 + (index - 1) * 7}deg) translateZ(calc(92.5vw))`,
						}"
					></div>
					<div
						v-for="index in 7"
						:class="`visual_slice visual_slice_main visual_slice_${index} crt  ${item.imagePixel ? 'pixel' : ''}`"
						:style="{
							backgroundPosition: `calc(${index - 1} * (100% / 6)) center`,
							transform: `rotateY(${-21 + (index - 1) * 7}deg) translateZ(92.5vw)`,
						}"
					></div>
				</div>
			</div>
		</div>
	</header>
</template>

<script setup>
const headerStyle = useState("headerStyle");
const { currentRoute } = useRouter();
const { fetchStatelessItems } = useItems();

const featuredItems = await fetchStatelessItems(
	[{ attribute: "featured", values: [true] }],
	false,
);

watch(
	currentRoute,
	() => {
		if (currentRoute.value.path === "/") {
			headerStyle.value = "extended";
		} else {
			headerStyle.value = "compact";
		}
	},
	{ deep: true, immediate: true },
);

onMounted(() => {});
</script>

<style lang="css" scoped>
header {
	color: var(--col-fg);
	text-align: left;
	position: relative;
	background-color: var(--col-fg);
	margin-bottom: var(--padding);
}
header,
header * {
	transition: all 0.2s ease-out;
}

header h4 {
	font-weight: 900;
	padding: var(--padding);
	color: var(--col-bg);
}

header.extended {
	width: 100%;
	height: 100%;
	max-height: 100vh;
	display: flex;
	flex-direction: row;
	justify-content: stretch;
	align-items: stretch;
	transform-origin: center;
}

header.extended,
header.extended * {
	transition: all 0.25s ease-out;
}

header.extended h4 {
	display: flex;
	flex-direction: column;
	justify-content: flex-end;
	align-items: flex-start;
	font-size: min(20vh, 10vw);
	line-height: 0.8;
	height: auto;
}
header.extended .visual_container {
	display: block;
	width: 100%;
	max-height: 100vh;
	border-radius: 0.25rem;
}

header.extended .visual_wrapper {
	display: block;
	width: 100%;
	height: 100%;
	overflow: hidden;
	position: relative;
	perspective: 2000px;
	perspective-origin: center;
	transform-style: preserve-3d;
	mix-blend-mode: lighten;
	opacity: 0.8;
}

header.extended .visual_wrapper * {
	transform-style: preserve-3d;
}

header.extended .visual_item {
	display: block;
	width: 100%;
	height: 100%;
	position: relative;
	transform: scale(0.8) rotateY(-0.1deg) translateZ(-98vw)
		translateX(calc(50% - (80vw / 14)));
}

header.extended .visual_slice {
	display: block;
	width: calc((80vw / 7) + 0.5px);
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

header.extended .visual_slice_1 {
	box-shadow:
		inset 0px 25px 15px -20px rgba(0, 0, 0, 1),
		inset 0px -25px 15px -20px rgba(0, 0, 0, 1),
		inset 25px 0px 15px -20px rgba(0, 0, 0, 1);
}

header.extended .visual_slice_7 {
	box-shadow:
		inset 0px 25px 15px -20px rgba(0, 0, 0, 1),
		inset 0px -25px 15px -20px rgba(0, 0, 0, 1),
		inset -25px 0px 15px -20px rgba(0, 0, 0, 1);
}

header.extended .visual_slice.visual_slice_bottom,
header.extended .visual_slice.visual_slice_top {
	opacity: 0.2;
}

header.extended .visual_slice_top {
	background-image:
		linear-gradient(
			0deg,
			rgba(0, 0, 0, 1) 0%,
			rgba(0, 0, 0, 1) 86%,
			rgba(0, 0, 0, 0) 100%
		),
		var(--background-image);
}
header.extended .visual_slice_bottom {
	background-image:
		linear-gradient(
			180deg,
			rgba(0, 0, 0, 1) 0%,
			rgba(0, 0, 0, 1) 86%,
			rgba(0, 0, 0, 0) 100%
		),
		var(--background-image);
}

header.compact {
	width: 100%;
	height: 8ch;
	display: flex;
	flex-direction: row;
	justify-content: stretch;
	align-items: center;
	margin: 0;
	background-color: unset;
}

header.compact,
header.compact * {
	transition: all 0.5s ease-out;
}

header.compact h4 {
	display: flex;
	flex-direction: row;
	justify-content: flex-start;
	align-items: center;
	font-size: 2rem;
	gap: 0;
	line-height: 0.9;
	margin: 0;
	color: var(--col-fg);
}
header.compact h4 .segment {
	display: flex;
	align-items: row;
}
/* header.compact h4 .segment::after {
	content: "\00a0";
	display: block;
} */
header.compact .visual_container {
	/* display: none; */
	width: 0;
	margin: 0;
	background-color: var(--col-fg);
	opacity: 0;
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
	content: " ";
	display: block;
	position: absolute;
	top: 0;
	left: 0;
	bottom: 0;
	right: 0;
	background:
		linear-gradient(rgba(18, 16, 16, 0) 50%, rgba(0, 0, 0, 0.25) 50%),
		linear-gradient(
			90deg,
			rgba(255, 0, 0, 0.06),
			rgba(0, 255, 0, 0.02),
			rgba(0, 0, 255, 0.06)
		);
	z-index: 2;
	background-size:
		100% 2px,
		3px 100%;
	pointer-events: none;
}
</style>
