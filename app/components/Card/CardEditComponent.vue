<template>
  <article :id="`card_${item.id}`" class="card_wrapper">
    <div class="card">
      <p v-if="item.trashed" class="alert">
        <icon name="ic:baseline-delete" />
      </p>
      <p v-if="item.type">{{ item.type }}</p>
      <p v-if="item.image"><icon name="material-symbols:imagesmode" /></p>
      <p>
        <strong> {{ item.title }}</strong>
      </p>
      <div v-if="item.description" v-html="item.description" class="description"></div>
      <NuxtLink
        :to="`/admin/edit/${item.id}-${returnUri(item.title)}`"
        :title="item.description"
        >Edit
      </NuxtLink>
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
  flex-direction: row;
  border-bottom: 0.1rem solid var(--col-border);
  gap: 2rem;
  /* box-shadow: 0 0 0.25rem var(--col-border); */
  padding: 2rem 0; 
  /* border-radius: 0.25rem; */
  width: 100%;
  height: auto;
  align-items: flex-start;
}

.description {
  flex-grow: 99;
}
</style>
