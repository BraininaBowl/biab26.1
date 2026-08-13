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
            :class="`visual_slice visual_slice_${index}`"
            :style="{
              backgroundImage: `url('${item.imageURL}')`,
              backgroundPosition: `calc(${index - 1} * (100% / 6)) center`,
              transform: `
              translateX(${300 - (4 - index) * 100}px)
            translateZ(${Math.cos(((-21 + (index - 1) * 7) * Math.PI) / 180) * 30 - 50}px)
            rotateY(${-21 + (index - 1) * 7}deg)
            `,
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
const { fetchItems, items } = useItems();

await fetchItems([
  { attribute: "featured", values: [true] },
  { attribute: "trashed", values: [false, undefined] },
]);
const featuredItems = items;

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
  display: flex;
  justify-content: center;
  align-items: center;
  width: 100%;
  height: 100%;
  overflow: hidden;
  position: relative;
  perspective: 500px;
  perspective-origin: center;
  transform-style: preserve-3d;
  mix-blend-mode: lighten;
}

header.extended .visual_item {
  display: flex;
  justify-content: center;
  align-items: center;
  width: 100%;
  height: 100%;
  position: relative;
  transform: translateZ(-80vw);
}

header.extended .visual_slice {
  display: block;
  width: calc((100% / 7) + 0.5px);
  height: 100%;
  overflow: hidden;
  background-size: 700% 100%;
  background-repeat: no-repeat;
  backface-visibility: hidden;
  transform-origin: center; 
  border: 2px solid #ffffff;
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
</style>
