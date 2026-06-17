<template>
  <main>
    <article class="item" v-for="item in items">
      <header>
        <h1 v-if="item.title" v-html="item.title"></h1>
      </header>
      <div class="details">
        <section v-if="item.description">
          <p class="area" v-html="item.description"></p>
        </section>
      </div>
    </article>
  </main>
</template>

<script setup>
const route = useRoute();
const itemId = route.params.id;
const { items, fetchItems } = useItems();
fetchItems([
  { attribute: "id", values: itemId },
  { attribute: "trashed", values: [false, undefined] },
]);

onMounted(() => {});
</script>
<style lang="css" scoped></style>
