<template>
  <article :id="`card_${item.id}`">
    <div class="tag" v-if="item.type">{{ item.type }}</div>
    <div class="card">
      <img
        v-if="item.image"
        :src="item.image"
        :alt="item.title"
        class="card-image pixel"
      />
      <div class="card-content">
        <p v-if="item.trashed">[Trashed]</p>
        <h3>
          {{ item.title }}
        </h3>
        <p v-if="item.description">{{ item.description }}</p>
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

onMounted(() => {
    let domItem = document.querySelector(`card_${item.id}`);
    domItem.style.gridRow = "span " + domItem.offsetHeight;
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

.tag {
  background-color: var(--col-fg);
  color: var(--col-bg);
  font-size: 0.8rem;
  font-weight: 400;
  padding: 0.25rem 0.5rem;
  border-radius: 0.25rem;
}

.card {
  display: flex;
  flex-direction: column;
  border: 1px solid var(--col-border);
  /* border-radius: 0.5rem; */
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
  /* border-radius: 0.5rem; */
  width: 100%;
  height: 100%;
  align-items: flex-start;
}

.card-image {
  max-width: 100%;
  height: auto;
  /* border-radius: 0.25rem; */
}
</style>
