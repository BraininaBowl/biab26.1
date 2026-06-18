<template>
  <article :id="`card_${item.id}`" class="card_wrapper">
    <NuxtLink :to="`${item.type}`" class="tag" v-if="item.type">{{
      item.type
    }}</NuxtLink>
    <div
      class="card"
      :style="{
        backgroundColor: item.color ? item.color : 'var(--col-bg-light)',
      }"
    >
      <img
        v-if="item.imageURL"
        :src="`${decodeURI(item.imageURL)}`"
        :alt="item.title"
        :class="`card-image ${item.imagePixel ? 'pixel' : ''}`"
        :style="`aspect-ratio: ${item.imageAspectRatio ? item.imageAspectRatio : 'auto'}`"
      />
      <div class="card-content">
        <p v-if="item.trashed">[Trashed]</p>
        <h3>
          {{ item.title }}
        </h3>
        <div v-if="item.snippet" v-html="item.snippet"></div>
        <NuxtLink
          :to="`${item.id}-${returnUri(item.title)}`"
          :title="item.description"
          >Go to item
        </NuxtLink>
      </div>
    </div>
  </article>
</template>

<script setup>
defineProps({
  item: {
    type: Object,
    required: true,
  },
});
</script>

<style lang="css" scoped>
article {
  display: flex;
  flex-direction: column;
  gap: 0.25rem;
  justify-content: stretch;
  align-items: flex-start;
}

.card_wrapper {
  transition: opacity 500ms ease-out;
}

.tag {
  background-color: var(--col-fg);
  color: var(--col-bg);
  font-size: 0.8rem;
  font-weight: 400;
  padding: 0.25rem 0.5rem;
  border-radius: 0.25rem;
  text-decoration: none;
}

.card {
  display: flex;
  flex-direction: column;
  /* border: 0.1rem solid var(--col-border); */
  box-shadow:
    0 0 0.125rem var(--col-border),
    0 0.125rem 0.25rem rgba(from var(--col-border) r g b / 0.25);
  border-radius: 0.25rem;
  width: 100%;
  height: auto;
  max-width: 400px;
  background-color: var(--col-bg-light);
  align-items: flex-start;
}

.card-content {
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
  padding: 1rem;
  width: 100%;
  height: 100%;
  align-items: flex-start;
}

.card-image {
  width: 100%;
  height: auto;
  border-radius: 0.25rem 0.25rem 0 0;
}
</style>
