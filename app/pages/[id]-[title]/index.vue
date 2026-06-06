<template>
  <main>
    <article class="item" v-if="item">
      <header>
        <h1 v-if="item.title">{{ item.title }}</h1>
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
const { item, fetchItem } = useItems();
fetchItem(itemId);
onMounted(() => {});
</script>
<style lang="css" scoped>
</style>