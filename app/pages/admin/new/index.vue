<template>
  <div id="notifications" role="alert"></div>
  <main>
    <section>
      <h2>Add Item</h2>
      <FormItemComponent />
    </section>
  </main>
</template>

<script setup>
definePageMeta({
  layout: 'admin',
})

const { items, writeItem } = useItems();

onMounted(() => {});
</script>

<style lang="css" scoped></style>
