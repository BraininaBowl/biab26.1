<template>
  <div class="formSection">
    <form @submit.prevent="handleSubmit">
      <FormInputComponent
        v-model="formData.value"
        :formfieldData="{
          typeField: 'text',
          label: 'New ' + tagLabel,
          requiredField: true,
          id: id,
          placeholder: '',
        }"
      />
      <div class="button-row">
        <button type="submit" v-html="'Add ' + tagType"></button>
      </div>
    </form>
  </div>
</template>

<script setup>
const id = useId();
const { writeItemData, itemTypes } = useItemData();
const props = defineProps({
  tagData: {
    type: Object,
    required: false,
  },
});

const tagType = props.tagData.tagType || "";
const tagLabel = props.tagData.tagLabel || tagType;

function handleSubmit() {
  const status = writeItemData(tagType, formData.value);
  status.catch((error) => {
    addNotification("Error saving item, please try again later.", "error");
  });
  status.finally(() => {
    addNotification("Item saved successfully.", "success");
  });
}

const formData = ref({});

onMounted(() => {});
</script>

<style lang="css" scoped></style>
