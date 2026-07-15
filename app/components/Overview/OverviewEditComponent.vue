<template>
  <div class="loader" v-if="itemStatus == null">Loading...</div>
  <div class="overview" v-else>
    <section class="list">
      <CardEditComponent v-for="item in items" :key="item.id" :item="item" />
    </section>
  </div>
</template>

<script setup>
const { items,  fetchItems, itemStatus } = useItems();

onMounted(async () => {
  fetchItems();
});
onUnmounted(() => {});
</script>

<style lang="css" scoped>
.list {
  display: flex;
  flex-direction: column;
  width: 100%;
}</style>
