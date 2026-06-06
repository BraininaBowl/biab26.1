<template>
  <div class="loader" v-if="status == null">Loading...</div>
  <div class="overview" v-else>
    <section class="card_container">
      <CardComponent v-for="item in items" :key="item.id" :item="item" />
    </section>
  </div>
</template>

<script setup>
const { item, items, fetchItem, fetchActiveItems, status } = useItems();
fetchActiveItems();


onMounted(async () => {});
onUnmounted(() => {});
</script>

<style lang="css" scoped>
.card_container {
  display: grid;
  grid-auto-rows: 10px;
  grid-template-columns: repeat(auto-fit, minmax(240px, 1fr));
  gap: 1.5rem 2rem;
}
</style>
