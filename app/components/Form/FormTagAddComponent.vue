<template>

  <form @submit.prevent="handleSubmit">
    <FormInputComponent
      v-model="formData.type"
      :formfieldData="{
        typeField: 'text',
        label: 'Type',
        requiredField: true,
        id: useId(),
        placeholder: '',
        disabledField: formData.trashed,
      }"
    />
    <div class="button-row">
      <button type="submit" >Add tag</button>
      <NuxtLink to="./">Back</NuxtLink>
    </div>
  </form>
</template>

<script setup>
const { writeItemData, itemTypes } = useItemData();

function handleSubmit() {
  const status = writeItemData(formData.value);
  status.catch((error) => {
    addNotification("Error saving item, please try again later.", "error");
  });
  status.finally(() => {
    addNotification("Item saved successfully.", "success");
  });
}

const formData = ref({
});

onMounted(() => {});
</script>

<style lang="css" scoped>
.formfield.hidden {
  display: none;
}

.formfield {
  display: flex;
  flex-direction: column;
  margin-bottom: 1rem;
  max-width: 80ch;
}

textarea {
  min-height: 10ch;
  height: 100%;
}
</style>
