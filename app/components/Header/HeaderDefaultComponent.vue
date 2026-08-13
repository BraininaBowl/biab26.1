<template>
  <header :class="headerStyle">
    <NuxtLink class="clear" href="/">
      <h4>
        <span class="segment">Brain</span><span class="segment">in a</span
        ><span class="segment">Bowl</span>
      </h4>
    </NuxtLink>
    <div class="visual_container">
      <div
        :class="`visual_wrapper ${item.imagePixel ? 'pixel' : ''}`"
        v-for="item in featuredItems"
        :key="item.id"
      >
        <div class="visual_item">
          <div
            v-for="index in 7"
            :class="`visual_slice visual_slice_${index} crt`"
            :style="{
              backgroundImage: `url('${item.imageURL}')`,
              backgroundPosition: `calc(${index - 1} * (100% / 6)) center`,
              transform: `rotateY(${-21 + (index - 1) * 7}deg) translateZ(calc(91vw))`,
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
const { fetchFeaturedItems, featuredItems } = useItems();

await fetchFeaturedItems();

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
}
header,
header * {
  transition: all 0.2s ease-out;
}

header h4 {
  font-weight: 900;
  padding: var(--padding);
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
  margin: var(--padding);
  background-color: var(--col-fg);
  max-height: calc(100vh - (var(--padding) * 2));
  border-radius: 0.25rem;
}

header.extended .visual_wrapper {
  display: block;
  width: 100%;
  height: 100%;
  overflow: hidden;
  position: relative;
  perspective: 500px;
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
  transform: rotateY(-0.1deg) translateZ(-100vw) translateX(calc(50% - (80vw / 14)));
}

header.extended .visual_slice {
  display: block;
  width: calc((80vw / 7));
  height: 100%;
  overflow: hidden;
  background-size: 700% 100%;
  background-repeat: no-repeat;
  backface-visibility: hidden;
  transform-origin: center;
  position: absolute;
  left: 0;
  /* border: 2px solid #ffffff; */
  box-shadow: inset 0px 25px 20px -20px rgba(0,0,0,1), inset 0px -25px 20px -20px rgba(0,0,0,1), inset 0px 50px 60px -50px rgba(255,255,255,0.8);
}

header.extended .visual_slice_1 {
  border-radius: 2.5vw 0 0 2.5vw;
  box-shadow: inset 0px 25px 20px -20px rgba(0,0,0,1), inset 0px -25px 20px -20px rgba(0,0,0,1), inset 25px 0px 20px -20px rgba(0,0,0,1), inset 0px 50px 60px -50px rgba(255,255,255,0.8) ;
  filter: blur(1px);
}

header.extended .visual_slice_2 {
  filter: blur(0.6px);
}
header.extended .visual_slice_3 {
  filter: blur(0.3px);
}
header.extended .visual_slice_5 {
  filter: blur(0.3px);
}
header.extended .visual_slice_6 {
  filter: blur(0.3px);
}


header.extended .visual_slice_7 {
  border-radius: 0 2.5vw 2.5vw 0;
  box-shadow: inset 0px 25px 20px -20px rgba(0,0,0,1), inset 0px -25px 20px -20px rgba(0,0,0,1), inset -25px 0px 20px -20px rgba(0,0,0,1), inset 0px 50px 60px -50px rgba(255,255,255,0.8) ;
  filter: blur(1px);
}


header.compact {
  width: 100%;
  height: 8ch;
  display: flex;
  flex-direction: row;
  justify-content: stretch;
  align-items: center;
  margin: 0;
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
}
header.compact h4 .segment {
  display: flex;
  align-items: row;
}
header.compact h4 .segment::after {
  content: "\00a0";
  display: block;
}
header.compact .visual_container {
  display: none;
  width: 0;
  margin: 0;
  background-color: var(--col-fg);
}

/* Scanlines */

@keyframes flicker {
  0% {
    opacity: 0.27861;
  }
  5% {
    opacity: 0.34769;
  }
  10% {
    opacity: 0.23604;
  }
  15% {
    opacity: 0.90626;
  }
  20% {
    opacity: 0.18128;
  }
  25% {
    opacity: 0.83891;
  }
  30% {
    opacity: 0.65583;
  }
  35% {
    opacity: 0.67807;
  }
  40% {
    opacity: 0.26559;
  }
  45% {
    opacity: 0.84693;
  }
  50% {
    opacity: 0.96019;
  }
  55% {
    opacity: 0.08594;
  }
  60% {
    opacity: 0.20313;
  }
  65% {
    opacity: 0.71988;
  }
  70% {
    opacity: 0.53455;
  }
  75% {
    opacity: 0.37288;
  }
  80% {
    opacity: 0.71428;
  }
  85% {
    opacity: 0.70419;
  }
  90% {
    opacity: 0.7003;
  }
  95% {
    opacity: 0.36108;
  }
  100% {
    opacity: 0.24387;
  }
}
@keyframes textShadow {
  0% {
    text-shadow:
      0.4389924193300864px 0 1px rgba(0, 30, 255, 0.5),
      -0.4389924193300864px 0 1px rgba(255, 0, 80, 0.3),
      0 0 3px;
  }
  5% {
    text-shadow:
      2.7928974010788217px 0 1px rgba(0, 30, 255, 0.5),
      -2.7928974010788217px 0 1px rgba(255, 0, 80, 0.3),
      0 0 3px;
  }
  10% {
    text-shadow:
      0.02956275843481219px 0 1px rgba(0, 30, 255, 0.5),
      -0.02956275843481219px 0 1px rgba(255, 0, 80, 0.3),
      0 0 3px;
  }
  15% {
    text-shadow:
      0.40218538552878136px 0 1px rgba(0, 30, 255, 0.5),
      -0.40218538552878136px 0 1px rgba(255, 0, 80, 0.3),
      0 0 3px;
  }
  20% {
    text-shadow:
      3.4794037899852017px 0 1px rgba(0, 30, 255, 0.5),
      -3.4794037899852017px 0 1px rgba(255, 0, 80, 0.3),
      0 0 3px;
  }
  25% {
    text-shadow:
      1.6125630401149584px 0 1px rgba(0, 30, 255, 0.5),
      -1.6125630401149584px 0 1px rgba(255, 0, 80, 0.3),
      0 0 3px;
  }
  30% {
    text-shadow:
      0.7015590085143956px 0 1px rgba(0, 30, 255, 0.5),
      -0.7015590085143956px 0 1px rgba(255, 0, 80, 0.3),
      0 0 3px;
  }
  35% {
    text-shadow:
      3.896914047650351px 0 1px rgba(0, 30, 255, 0.5),
      -3.896914047650351px 0 1px rgba(255, 0, 80, 0.3),
      0 0 3px;
  }
  40% {
    text-shadow:
      3.870905614848819px 0 1px rgba(0, 30, 255, 0.5),
      -3.870905614848819px 0 1px rgba(255, 0, 80, 0.3),
      0 0 3px;
  }
  45% {
    text-shadow:
      2.231056963361899px 0 1px rgba(0, 30, 255, 0.5),
      -2.231056963361899px 0 1px rgba(255, 0, 80, 0.3),
      0 0 3px;
  }
  50% {
    text-shadow:
      0.08084290417898504px 0 1px rgba(0, 30, 255, 0.5),
      -0.08084290417898504px 0 1px rgba(255, 0, 80, 0.3),
      0 0 3px;
  }
  55% {
    text-shadow:
      2.3758461067427543px 0 1px rgba(0, 30, 255, 0.5),
      -2.3758461067427543px 0 1px rgba(255, 0, 80, 0.3),
      0 0 3px;
  }
  60% {
    text-shadow:
      2.202193051050636px 0 1px rgba(0, 30, 255, 0.5),
      -2.202193051050636px 0 1px rgba(255, 0, 80, 0.3),
      0 0 3px;
  }
  65% {
    text-shadow:
      2.8638780614874975px 0 1px rgba(0, 30, 255, 0.5),
      -2.8638780614874975px 0 1px rgba(255, 0, 80, 0.3),
      0 0 3px;
  }
  70% {
    text-shadow:
      0.48874025155497314px 0 1px rgba(0, 30, 255, 0.5),
      -0.48874025155497314px 0 1px rgba(255, 0, 80, 0.3),
      0 0 3px;
  }
  75% {
    text-shadow:
      1.8948491305757957px 0 1px rgba(0, 30, 255, 0.5),
      -1.8948491305757957px 0 1px rgba(255, 0, 80, 0.3),
      0 0 3px;
  }
  80% {
    text-shadow:
      0.0833037308038857px 0 1px rgba(0, 30, 255, 0.5),
      -0.0833037308038857px 0 1px rgba(255, 0, 80, 0.3),
      0 0 3px;
  }
  85% {
    text-shadow:
      0.09769827255241735px 0 1px rgba(0, 30, 255, 0.5),
      -0.09769827255241735px 0 1px rgba(255, 0, 80, 0.3),
      0 0 3px;
  }
  90% {
    text-shadow:
      3.443339761481782px 0 1px rgba(0, 30, 255, 0.5),
      -3.443339761481782px 0 1px rgba(255, 0, 80, 0.3),
      0 0 3px;
  }
  95% {
    text-shadow:
      2.1841838852799786px 0 1px rgba(0, 30, 255, 0.5),
      -2.1841838852799786px 0 1px rgba(255, 0, 80, 0.3),
      0 0 3px;
  }
  100% {
    text-shadow:
      2.6208764473832513px 0 1px rgba(0, 30, 255, 0.5),
      -2.6208764473832513px 0 1px rgba(255, 0, 80, 0.3),
      0 0 3px;
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
.crt {
  animation: textShadow 1.6s infinite;
}
</style>
