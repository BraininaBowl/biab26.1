<template>
  <div id="notifications" role="alert"></div>
  <main>
    <h2 v-if="itemId">Edit Item</h2>
    <h2 v-else>Add Item</h2>
    <FormItemComponent :item="item" />
  </main>
</template>

<script setup>
const route = useRoute();
const itemId = route.params.id;
console.log("itemId:", itemId);
const { fetchItem, writeItem } = useItems();
if (itemId) {
  let item = await fetchItem(itemId);
  console.log("Fetched item:", item);
}


onMounted(() => {});
</script>

<style lang="css" scoped>
main {
  padding: var(--padding);
  flex-grow: 100;
}

</style>
