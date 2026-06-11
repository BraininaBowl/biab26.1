<template>
  <article :id="`card_${item.id}`" class="card_wrapper">
    <p>{{ item.type }}</p>
      <p>{{item.id}}</p>
        <p v-if="item.trashed">[Trashed]</p>
        <p><b>
          {{ item.title }}</b>
        </p>
        <NuxtLink
          :to="`${item.id}-${returnUri(item.title)}`"
          :title="item.description"
          >edit
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
  flex-direction: row;
  gap: 2rem;
  justify-content: stretch;
  align-items: flex-start;
  margin: 2rem 0;
  border-bottom: 1px solid var(--col-fg);
}

</style>
