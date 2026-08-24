<template>
  <div class="formSection">
    <p v-html="formfieldData.label"></p>
    <div class="formTagsContainer" v-if="tags.length > 0">
      <div class="formfield checkbox" v-for="(tag, index) in tags">
        <input
          type="checkbox"
          :id="`${id}-${index}`"
          :value="tag"
          v-model="model"
          :disabled="formfieldData.disabledField"
          :autocomplete="formfieldData.autocomplete"
          :name="`${id}`"
        />
        <label :for="`${id}-${index}`" v-html="tag"></label>
      </div>
    </div>
  </div>
</template>

<script setup>
const id = useId();
const model = defineModel();
const props = defineProps({
  formfieldData: {
    type: Object,
    required: true,
  },
});

const formfieldData = props.formfieldData || {};
const { fetchTags, tags } = useItemData();
await fetchTags();
</script>

<style lang="css" scoped></style>
