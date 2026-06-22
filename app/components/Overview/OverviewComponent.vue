<template>
  <!-- <div class="loader" v-if="status == null">Loading...</div>
  <div class="overview" v-else> -->
  <div class="overview">
    <section class="card_container">
      <CardComponent v-for="item in items" :key="item.id" :item="item" />
    </section>
  </div>
</template>

<script setup>
const { items, fetchItems, status } = useItems();

const props = defineProps({
  filters: {
    type: Object,
    required: false,
  },
});

const filters = props.filters || [];

fetchItems(filters, true).then(resizeItems);

function resizeItems() {
  if (document) {
    document.querySelectorAll(".card_wrapper").forEach((domItem, index) => {
      if (domItem) {
        let card = domItem.querySelector(".card");
        if (card) {
          domItem.style.gridRow = "auto / span " + (card.clientHeight + 64);
          setTimeout(() => {
            domItem.style.opacity = 1;
          }, 50 * index);
        }
      }
    });
  }
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
  grid-template-columns: repeat(auto-fit, minmax(280px, 1fr));
  gap: 0rem 1.5rem;
  perspective: 500px;
  perspective-origin: center;
}

.card_wrapper {
  opacity: 0;
}
</style>
