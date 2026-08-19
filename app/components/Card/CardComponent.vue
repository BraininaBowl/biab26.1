<template>
  <article :id="`card_${item.id}`" class="card_wrapper">
    <NuxtLink
      :to="`${item.id}-${returnUri(item.title)}`"
      :title="item.title"
      v-if="item.imageURL"
      :class="`card card_image clear ${item.imagePixel ? 'pixel' : ''}`"
      :style="`aspect-ratio: ${item.imageAspectRatio ? item.imageAspectRatio : 'auto'};`"
    >
      <div
        class="card_image_inner"
        :style="`background-image: url(${item.imageURL});`"
      ></div>
    </NuxtLink>
    <NuxtLink
      :to="`${item.id}-${returnUri(item.title)}`"
      :title="item.title"
      class="card card_content clear"
      :style="{
        backgroundColor: item.color ? item.color : 'var(--col-bg-light)',
      }"
      v-else
    >
      <h3>
        {{ item.title }}
      </h3>
      <div v-if="item.snippet" v-html="item.snippet"></div>
    </NuxtLink>
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
  gap: 0.5rem;
  justify-content: stretch;
  align-items: flex-start;
  transition:
    opacity 500ms ease-out,
    transform 125ms ease-out;
}

.card {
  display: flex;
  flex-direction: column;
  box-shadow:
    0 0 0 0 rgba(from var(--col-bg-light) r g b / 1),
    0 0 0 0.0775rem rgba(from var(--col-border) r g b / 0.5);
  transition: box-shadow 125ms ease-out;
  width: 100%;
  background-color: var(--col-bg-light);
  align-items: flex-start;
  position: relative;
}

.card_content {
  gap: 0.5rem;
  padding: 1rem 1rem;
}

.card_image {
  background-color: var(--col-fg);
}

.card_image_inner {
  background-size: 100% auto;
  background-position: center;
  mix-blend-mode: lighten;

    display: flex;
  flex-direction: column;
  width: 100%;
  height: 100%;
  background-color: var(--col-bg-light);
  align-items: flex-start;
  position: relative;
}
</style>
