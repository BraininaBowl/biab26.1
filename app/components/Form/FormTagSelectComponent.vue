<template>
    <p v-html="formfieldData.label"></p>

<div
    :class="`formfield ${formfieldData.unique ? 'radio' : 'checkbox'}`"
    v-for="(itemDataType, index) in itemTypes"
    :key="itemTypes"
  >
    <input
    :type="`${formfieldData.unique ? 'radio' : 'checkbox'}`"
    :id="`${formfieldData.id}-${index}`"
    :placeholder="formfieldData.placeholder"
    :value="itemDataType"
    v-model="model"
    :required="formfieldData.requiredField"
    :disabled="formfieldData.disabledField"
    :autocomplete="formfieldData.autocomplete"
    :name="`${formfieldData.id}`"
  />
  <label :for="`${formfieldData.id}-${index}`" v-html="itemDataType"></label>
  </div>
</template>

<script setup>
const model = defineProps({
  formfieldData: {
    type: Object,
    required: false,
  },
});

const formfieldData = model.formfieldData || {};
const { fetchItemData, itemTypes } = useItemData();
fetchItemData(formfieldData.itemDataType);
</script>

<style lang="css" scoped></style>
