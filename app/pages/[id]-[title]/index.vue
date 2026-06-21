<template>
  <main>
    <article class="item" v-for="item in items">
      <div
        v-if="item.imageURL"
        :alt="item.title"
        :class="`page-image ${item.imagePixel ? 'pixel' : ''}`"
        :style="`aspect-ratio: ${item.imageAspectRatio ? item.imageAspectRatio : 'auto'}; background-image: url('${item.imageURL}'); background-position: ${item.imageFocus ? item.imageFocus : 'center'};`"
      ></div>
      <div v-else class="divider"></div>
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
  max-height: calc(100vh - (var(--padding) + 8ch));
  background-size: cover;
  background-repeat: no-repeat;
}

article.item {
  display: flex;
  flex-direction: column;
  gap: calc(var(--padding) * 2);
}

.divider {
  width: 100%;
  height: 1rem;
  background-image: linear-gradient(
    135deg,
        rgba(from var(--col-fg) r g b / 0) 0%,
        rgba(from var(--col-fg) r g b / 0) 33%,
        rgba(from var(--col-fg) r g b / 1) 33%,
        rgba(from var(--col-fg) r g b / 1) 66%,
        rgba(from var(--col-fg) r g b / 0) 66%,
        rgba(from var(--col-fg) r g b / 0) 100%
        );
  background-repeat: repeat;
  background-size: calc(var(--padding) * 1.5), var(--padding);
  background-position-x: calc(var(--padding) * -1);
}

H1:before {
  content: ' ';
  display: inline-block;
  border-bottom: 0.9rem solid var(--col-fg);
  border-right: 0.9rem solid var(--col-fg);
  height: 1rem;
  width: 1rem;
  border-radius: 0.125rem;
  margin-right: 1rem;
  transform: translateY(-0.125rem) rotate(-45deg);
}
</style>
