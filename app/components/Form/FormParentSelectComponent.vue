<template>
  <div class="formSection">
    <p v-html="formfieldData.label"></p>
    <div class="formTagsContainer" v-if="items.length > 0">
      <div class="formfield checkbox" v-for="(item, index) in items">
        <input
          type="checkbox"
          :id="`${formfieldData.id}-${index}`"
          :value="item.id"
          v-model="model"
          :disabled="formfieldData.disabledField"
          :autocomplete="formfieldData.autocomplete"
          :name="`${formfieldData.id}`"
        />
        <label :for="`${formfieldData.id}-${index}`" :v-html="item.title"></label>
      </div>
    </div>
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
const { fetchItems, items } = useItems();
await fetchItems([{ attribute: "trashed", values: [false, undefined] }], false);
</script>

<style lang="css" scoped></style>
