<template>
	<div
		:class="`visual_wrapper ${item.monitor ? 'monitor' : ''}`"
		:key="item.id"
		:style="`--background-image: url('${item.imageURL}')`"
	>
		<div class="visual_item">
			<div
				v-if="item.glow"
				v-for="index in 7"
				:class="`visual_slice visual_slice_bottom visual_slice_${index}`"
				:style="{
					backgroundPosition: `calc(${index - 1} * (100% / 6)) center`,
					transform: `scaleY(-1) translateY(-100%) rotateY(${-21 + (index - 1) * 7}deg) translateZ(calc(92.5vw))`,
				}"
			></div>
			<div
				v-if="item.glow"
				v-for="index in 7"
				:class="`visual_slice visual_slice_top visual_slice_${index}`"
				:style="{
					backgroundPosition: `calc(${index - 1} * (100% / 6)) center`,
					transform: `scaleY(-1) translateY(100%) rotateY(${-21 + (index - 1) * 7}deg) translateZ(calc(92.5vw))`,
				}"
			></div>
			<div
				v-if="item.monitor"
				v-for="index in 9"
				:class="`visual_slice visual_slice_monitor visual_slice_${index}`"
				:style="{
					transform: `scaleY(1.2) translateY(0) rotateY(${-27 + (index - 1) * 7}deg) translateZ(calc(92.4vw))`,
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
	transform: rotateY(-0.1deg) translateZ(-98vw)
		translateX(calc(50% - (80vw / 14)));
}

.visual_slice {
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

.visual_slice_1 {
	box-shadow:
		inset 0px 25px 15px -20px rgba(0, 0, 0, 1),
		inset 0px -25px 15px -20px rgba(0, 0, 0, 1),
		inset 25px 0px 15px -20px rgba(0, 0, 0, 1);
}

.visual_slice_7 {
	box-shadow:
		inset 0px 25px 15px -20px rgba(0, 0, 0, 1),
		inset 0px -25px 15px -20px rgba(0, 0, 0, 1),
		inset -25px 0px 15px -20px rgba(0, 0, 0, 1);
}

.monitor .visual_slice {
	box-shadow:
		inset 0px 25px 15px -20px rgba(0, 0, 0, 0.5),
		inset 0 -25px 15px -20px #ebdbb2;
}
.monitor .visual_slice_1 {
	box-shadow:
		inset 0 25px 15px -20px rgba(0, 0, 0, 0.5),
		inset 0 -25px 15px -20px #ebdbb2,
		-2vw 0 0 0 #a89984;
}
.monitor .visual_slice_7 {
	box-shadow:
		inset 0 25px 15px -20px rgba(0, 0, 0, 0.5),
		inset 0 -25px 15px -20px #ebdbb2,
		2vw 0 0 0 #ebdbb2;
}

.monitor .visual_slice_monitor {
	background: linear-gradient(180deg, #ebdbb2 0%, #d5c4a1 100%);
	box-shadow: unset;
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
