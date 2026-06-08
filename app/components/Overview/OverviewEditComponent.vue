<template>
  <div class="loader" v-if="status == null">Loading...</div>
  <div class="overview" v-else>
    <section class="card_container">
      <CardComponent v-for="item in items" :key="item.id" :item="item" />
    </section>
  </div>
</template>

<script setup>
const { item, items, fetchItem, fetchAllItems, status } = useItems();

onMounted(async () => {
  fetchAllItems();
  for (const item of items.value) {
    const domItem = document.getElementById(`card_${item.id}`);
    if (domItem) {
      domItem.style.opacity = 1;
    }
  }
});
onUnmounted(() => {});
</script>

<style lang="css" scoped></style>
