<template>
  <div class="page_options" v-if="item.id !== unset">
    <div class="submenu left">
      <a @click="restoreItem()" v-if="item.trashed">Restore item</a>
      <a @click="trashItem()" v-else>Trash item</a>
    </div>
    <NavigationOptionsRightComponent />
  </div>

  <form @submit.prevent="handleSubmit">
    <FormInputComponent
      v-model="formData.title"
      :formfieldData="{
        typeField: 'text',
        label: 'Title',
        placeholder: formTitlePlaceholder,
        requiredField: true,
        id: useId(),
        disabledField: formData.trashed,
      }"
    />
    <FormTextareaComponent
      v-model="formData.description"
      :formfieldData="{
        label: 'Description',
        placeholder: formDescriptionPlaceholder,
        requiredField: false,
        id: useId(),
        disabledField: formData.trashed,
      }"
    />
    <FormInputComponent
      v-model="formData.id"
      :formfieldData="{
        typeField: 'hidden',
        label: 'id',
        placeholder: '',
        requiredField: true,
        id: useId(),
      }"
    />
    <FormInputComponent
      v-model="formData.added"
      :formfieldData="{
        typeField: 'hidden',
        label: 'added',
        placeholder: '',
        requiredField: true,
        id: useId(),
      }"
    />
    <FormInputComponent
      v-model="formData.edited"
      :formfieldData="{
        typeField: 'hidden',
        label: 'edited',
        placeholder: '',
        requiredField: true,
        id: useId(),
      }"
    />

    <div class="button-row">
      <button type="submit" v-if="item.trashed !== true">Save item</button>
      <NuxtLink to="./" v-if="item.trashed !== true">Back</NuxtLink>
    </div>
  </form>
</template>

<script setup>
const props = defineProps({
  item: {
    type: Object,
    required: false,
  },
});
const item = props.item || {};

const { writeItem } = useItems();

const handleSubmit = function () {
  const status = writeItem(formData.value);
  status.catch((error) => {
    addNotification("Error saving item, please try again later.", "error");
  });
  status.finally(() => {
    addNotification("Item saved successfully.", "success");
  });
};

const trashItem = async function () {
  item.trashed = true;
  formData.value.trashed = true;
  const status = writeItem(formData.value);
  status.catch((error) => {
    addNotification("Error trashing item, please try again later.", "error");
  });
  status.finally(() => {
    addNotification("Item trashed successfully.", "success");
  });
  await refreshNuxtData();
};

const restoreItem = async function () {
  item.trashed = false;
  formData.value.trashed = false;
  const status = writeItem(formData.value);
  status.catch((error) => {
    addNotification("Error restoring item, please try again later.", "error");
  });
  status.finally(() => {
    addNotification("Item restored successfully.", "success");
  });
  await refreshNuxtData();
};

const formData = ref({
  id: item.id ? item.id : null,
  added: item.added ? item.added : new Date(),
  edited: new Date(),
  title: item.title ? item.title : "",
  description: item.description ? item.description : "",
  trashed: item.trashed,
});

onMounted(() => {});
</script>

<style lang="css" scoped></style>
