<template>
  <NuxtLink
    :to="`${item.id}-${returnUri(item.title)}`"
    class="card"
    :title="item.description"
  >
    <h2>
      {{ item.title }}
    </h2>
    <p v-if="item.description">{{ item.description }}</p>
  </NuxtLink>
</template>

<script setup>
defineProps({
  item: {
    type: Object,
    required: true,
  },
});
</script>

<style lang="css" scoped></style>
