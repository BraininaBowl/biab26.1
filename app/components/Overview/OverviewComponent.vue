<template>
  <div class="loader" v-if="status == null">Loading...</div>
  <div class="overview" v-else>
  <!-- <div class="overview"> -->
    <section class="card_container">
      <CardComponent v-for="item in items" :key="item.id" :item="item" />
    </section>
  </div>
</template>

<script setup>

const { item, items, fetchItem, fetchItems, status } = useItems();
fetchItems([{attribute: "trashed", values: [false, undefined]},]);

function resizeItems() {
  for (const item of items.value) {
    const domItem = document.getElementById(`card_${item.id}`);
    if (domItem) {
      let height = domItem.querySelector(".card").clientHeight + 64;
      domItem.style.gridRow = "auto / span " + height;
      domItem.style.opacity = 1;
    }
  }
}

onMounted(() => {
  window.addEventListener("resize", resizeItems());
  setTimeout(resizeItems(), 1);
});
onUnmounted(() => {});
</script>

<style lang="css" scoped>
.card_container {
  display: grid;
  grid-auto-rows: 1px;
  grid-template-columns: repeat(auto-fit, minmax(240px, 1fr));
  gap: 0rem 2rem;
}

.card_wrapper {
  opacity: 0;
}
</style>
