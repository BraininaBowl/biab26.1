<template>
  <div class="overview">
    <section class="card_container">
      <CardComponent
        v-for="item in items"
        :key="item.id"
        :item="item"
      />
    </section>
  </div>
</template>

<script setup>
const { item, items, fetchItem, fetchActiveItems, status } = useItems();

onMounted(async () => {
    fetchActiveItems();
});
onUnmounted(() => {});
</script>

<style lang="css" scoped>
.card_container {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(240px, 1fr));
  gap: 1.5rem 2rem;
}
</style>
