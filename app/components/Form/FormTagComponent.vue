<template>
  <div :class="`formfield ${formfieldData.typeField}`"  v-for="(itemDataType, index) in itemDataTypes" :key="itemDataType">
    <label :for="`${formfieldData.id}-${index}`"
      >{{ ItemDataType }}</label
    >
    <input
      type="checkbox"
      :id="`${formfieldData.id}-${index}`"
      :placeholder="formfieldData.placeholder"
      v-model="model"
      required="false"
      :disabled="formfieldData.disabledField"
      :autocomplete="formfieldData.autocomplete"
    />
  </div>
</template>

<script setup>
const model = defineModel();
defineProps({
  formfieldData: {
    type: Object,
    required: true,
  },
});

const { fetchItemData, itemTypes } = useItemData();
const itemDataTypes = fetchItemData(formfieldData.itemDataType);
</script>

<style lang="css" scoped></style>
