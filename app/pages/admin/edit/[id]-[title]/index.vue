<template>
  <main>
    <section>
      <h2 v-if="itemId">Edit Item</h2>
      <h2 v-else>Add Item</h2>
      <FormItemComponent :item="item" :key="item.id" v-for="item in items" />
    </section>
  </main>
</template>

<script setup>
definePageMeta({
  layout: "admin",
});

const route = useRoute();
const itemId = route.params.id;
const { items, fetchItems, writeItem } = useItems();
if (itemId) {
  await fetchItems([
  { attribute: "id", values: itemId },
]);
}

onMounted(() => {});
</script>

<style lang="css" scoped></style>
