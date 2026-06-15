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
const { items, fetchItems, status } = useItems();

fetchItems([{ attribute: "trashed", values: [false, undefined] }]).then(
  resizeItems,
);

function resizeItems() {
  document.querySelectorAll(".card_wrapper").forEach((domItem, index) => {
    if (domItem) {
      let card = domItem.querySelector(".card");
      if (card) {
        domItem.style.gridRow = "auto / span " + (card.clientHeight + 64);
        setTimeout(()=>{domItem.style.opacity = 1;}, 50*index)
        
      }
    }
  });
}

onMounted(() => {
  window.addEventListener("resize", resizeItems);
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
