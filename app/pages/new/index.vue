<template>
  <div id="notifications" role="alert"></div>
  <main>
    <section>
      <h2 v-if="itemId">Edit Item</h2>
      <h2 v-else>Add Item</h2>
      <FormItemComponent :item="item" />
    </section>
    <section>
      <h2>Upload image</h2>
      <FormImageComponent />
    </section>
  </main>
</template>

<script setup>
const route = useRoute();
const itemId = route.params.id;
const { item, fetchItem, writeItem } = useItems();
if (itemId) {
  item = await fetchItem(itemId);
}

onMounted(() => {});
</script>

<style lang="css" scoped></style>
