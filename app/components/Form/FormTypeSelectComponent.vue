<template>
  <p v-html="formfieldData.label"></p>
  <div
    class="formfield radio"
    v-for="(type, index) in types"
  >
    <input
      type="radio"
      :id="`${formfieldData.id}-${index}`"
      :value="type"
      v-model="model"
      :disabled="formfieldData.disabledField"
      :autocomplete="formfieldData.autocomplete"
      :name="`${formfieldData.id}`"
    />
    <label :for="`${formfieldData.id}-${index}`" v-html="type"></label>
  </div>
</template>

<script setup>
const model = defineModel();
const props = defineProps({
  formfieldData: {
    type: Object,
    required: true,
  },
});

const formfieldData = props.formfieldData || {};
const { fetchTypes, types } = useItemData();
await fetchTypes();
</script>

<style lang="css" scoped></style>
