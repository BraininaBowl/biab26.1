<template>
  <header :class="headerStyle">
    <a class="clear" href="/">
      <h4>
        <span class="segment">Brain</span><span class="segment">in a</span
        ><span class="segment">Bowl</span>
      </h4>
    </a>
    <div class="visual_container"></div>
  </header>
</template>

<script setup>
let headerStyle;
let route = useRoute();

if (route.path === "/") {
  headerStyle = "extended";
} else {
  headerStyle = "compact";
}
</script>

<style lang="css" scoped>
header {
  background-color: var(--col-bg);
  color: var(--col-fg);
  text-align: left;
}
header h4 {
  font-weight: 900;
  transition: all 0.2s ease-out;
}
header.extended {
  width: 100%;
  height: 100%;
  max-height: 100vh;
  display: flex;
  flex-direction: row;
  justify-content: stretch;
  align-items: stretch;
}
header.extended h4 {
  display: flex;
  flex-direction: column;
  justify-content: flex-end;
  align-items: flex-start;
  padding: var(--padding);
  font-size: min(20vh, 10vw);
  line-height: 0.9;
}
header.extended .visual_container {
  display: block;
  width: 100%;
  margin: var(--padding);
  background-color: var(--col-fg);
  max-height: calc(100vh - (var(--padding) * 2));
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
header.compact h4 {
  display: flex;
  flex-direction: row;
  justify-content: flex-start;
  align-items: center;
  padding: var(--padding);
  font-size: 2rem;
  gap: 0;
  line-height: 0.9;
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
