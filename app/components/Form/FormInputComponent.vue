<template>
  <div class="formSection">
    <div :class="`formfield ${formfieldData.typeField}`">
      <label
        class="hidden"
        :for="id"
        v-if="formfieldData.labelHidden === true"
        >{{ formfieldData.label }}
        <span class="required" v-if="formfieldData.requiredField"
          >*</span
        ></label
      >
      <label :for="id" v-else
        >{{ formfieldData.label }}
        <span class="required" v-if="formfieldData.requiredField"
          >*</span
        ></label
      >
      <input
        :type="formfieldData.typeField"
        :id="id"
        :placeholder="formfieldData.placeholder"
        v-model="model"
        :required="formfieldData.requiredField"
        :disabled="formfieldData.disabledField"
        :autocomplete="formfieldData.autocomplete"
        :accept="formfieldData.acceptField?formfieldData.acceptField:''"
      />
    </div>
  </div>
</template>

<script setup>
const id = useId();
const model = defineModel();
defineProps({
  formfieldData: {
    type: Object,
    required: true,
  },
});
</script>

<style lang="css" scoped></style>
