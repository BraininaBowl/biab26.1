<template>
  <article :id="`card_${item.id}`" class="card_wrapper">
    <NuxtLink
      :to="`${item.id}-${returnUri(item.title)}`"
      :title="item.title"
      v-if="item.imageURL"
      :class="`card card_image clear ${item.imagePixel ? 'pixel' : ''}`"
      :style="`aspect-ratio: ${item.imageAspectRatio ? item.imageAspectRatio : 'auto'}; background-image: url(${item.imageURL});`"
    >
      <div class="card_hover">
        <NuxtLink
          :to="`${item.type}`"
          class=""
          v-if="item.type"
          v-html="item.type + 's'"
        ></NuxtLink>
        \
        <NuxtLink
          :to="`${item.id}-${returnUri(item.title)}`"
          class=""
          v-if="item.type"
          v-html="item.title"
        ></NuxtLink>
      </div>
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
      <div class="card_hover">
        <NuxtLink
          :to="`${item.type}`"
          class=""
          v-if="item.type"
          v-html="item.type + 's'"
        ></NuxtLink>
        \
        <NuxtLink
          :to="`${item.id}-${returnUri(item.title)}`"
          class=""
          v-if="item.type"
          v-html="item.title"
        ></NuxtLink>
      </div>
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
  box-shadow:
    0 0 0 0 rgba(from var(--col-bg-light) r g b / 1),
    0 0 0 0.0775rem rgba(from var(--col-border) r g b / 0.5);
  transition: box-shadow 125ms ease-out;
  border-radius: 0.25rem;
  width: 100%;
  background-color: var(--col-bg);
  align-items: flex-start;
  position: relative;
}

.card:hover {
  box-shadow:
    0 0 0 0.25rem rgba(from var(--col-bg-light) r g b / 1),
    0 0 0.125rem 0.25rem rgba(from var(--col-border) r g b / 1),
    0 0.125rem 0.25rem 0.25rem rgba(from var(--col-border) r g b / 0.5);
}

.card_content {
  gap: 0.5rem;
  padding: 1rem 1rem 2rem;
}

.card_hover {
  position: absolute;
  bottom: -1px;
  display: flex;
  flex-direction: row;
  gap: 0.5rem;
  padding: 0.65rem 1rem 0.5rem;
  width: 100%;
  align-items: flex-start;
  background-color: var(--col-bg-light);
  opacity: 0;
  transition:
    opacity 50ms 200ms ease-out,
    transform 250ms ease-out;
  left: 0;
  transform: scaleY(0%);
  transform-origin: bottom;
  box-shadow:
    0 -0.25rem 0.25rem -0.25rem rgba(from var(--col-fg) r g b / 0.25),
    0 -0.75rem 0.5rem -0.5rem rgba(from var(--col-fg) r g b / 0.0625);
}

.card:hover .card_hover {
  opacity: 1;
  transform: scaleY(100%);
  transition:
    opacity 50ms ease-out,
    transform 250ms ease-out;
}

.card_hover,
.card_hover a {
  font-size: 0.9rem;
  line-height: 1;
  margin: 0;
}

.card_image {
  background-size: 100% auto;
  background-position: center;
  transition: background-size 250ms ease-out;
}
.card_image:hover {
  background-size: 105%;
}
</style>
