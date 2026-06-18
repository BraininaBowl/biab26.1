<template>
  <main>
    <article class="item" v-for="item in items">
      <div
        v-if="item.imageURL"
        :alt="item.title"
        :class="`page-image ${item.imagePixel ? 'pixel' : ''}`"
        :style="`aspect-ratio: ${item.imageAspectRatio ? item.imageAspectRatio : 'auto'}; background-image: url('${decodeURI(item.imageURL)}'); background-position: ${item.imageFocus? item.imageFocus : 'center' };`"
      ></div>
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
<style lang="css" scoped>
.page-image {
  width: 100%;
  height: auto;
  max-height: calc(100vh - ((2 * var(--padding)) + 8ch));
  background-size: cover;
  background-repeat: no-repeat;
}
</style>
