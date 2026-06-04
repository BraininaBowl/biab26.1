<template>
  <div class="loader" v-if="status == null">Loading...</div>
  <div class="overview" v-else>
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
const { item, items, fetchItem, fetchItems, status } = useItems();

onMounted(async () => {
    fetchItems();
});
onUnmounted(() => {});
</script>

<style lang="css" scoped></style>
