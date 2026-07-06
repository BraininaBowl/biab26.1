<template>
  <div class="formSection">
    <form @submit.prevent="handleSubmit">
      <FormInputComponent
        v-model="formData.value"
        :formfieldData="{
          typeField: 'text',
          label: 'New ' + tagType,
          requiredField: true,
          id: useId(),
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
const { writeItemData, itemTypes } = useItemData();
const props = defineProps({
  tagType: {
    type: String,
    required: false,
  },
});

const tagType = props.tagType || "";

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
