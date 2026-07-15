<template>
  <div class="page_options" v-if="item.id !== undefined">
    <div class="submenu left">
      <a @click="restoreItem()" v-if="item.trashed">Restore item</a>
      <a @click="trashItem()" v-else>Trash item</a>
    </div>
  </div>
  <FormTagAddComponent tagType="type" />
  <FormTagAddComponent tagType="tag" />
  <form @submit.prevent="handleSubmit">
    <FormTypeSelectComponent
      v-model="formData.type"
      :formfieldData="{
        label: 'Item type',
        id: useId(),
        disabledField: formData.trashed,
        itemDataType: 'type',
      }"
    />
    <FormInputComponent
      v-model="formData.title"
      :formfieldData="{
        typeField: 'text',
        label: 'Title',
        requiredField: true,
        id: useId(),
        placeholder: '',
        disabledField: formData.trashed,
      }"
    />
    <FormTagSelectComponent
      v-model="formData.tag"
      :formfieldData="{
        label: 'Item tags',
        id: useId(),
        disabledField: formData.trashed,
        itemDataType: 'tag',
      }"
    />
    <FormImageSelectComponent
      v-model="formData.imageId"
      :formfieldData="{
        label: 'Item image',
        id: useId(),
        disabledField: formData.trashed,
      }"
    />
    <FormTextareaComponent
      v-model="formData.snippet"
      :formfieldData="{
        label: 'Snippet',
        requiredField: false,
        id: useId(),
        placeholder: '',
        disabledField: formData.trashed,
      }"
    />
    <FormTextareaComponent
      v-model="formData.description"
      :formfieldData="{
        label: 'Description',
        requiredField: false,
        id: useId(),
        placeholder: '',
        disabledField: formData.trashed,
      }"
    />
    <FormInputComponent
      v-model="formData.linkTitle"
      :formfieldData="{
        typeField: 'text',
        label: 'Link Title',
        requiredField: false,
        id: useId(),
        placeholder: '',
        disabledField: formData.trashed,
      }"
    />
    <FormInputComponent
      v-model="formData.linkURL"
      :formfieldData="{
        typeField: 'text',
        label: 'Link URL',
        requiredField: false,
        id: useId(),
        placeholder: '',
        disabledField: formData.trashed,
      }"
    />
    <FormInputComponent
      v-model="formData.color"
      :formfieldData="{
        typeField: 'color',
        label: 'Color',
        requiredField: false,
        id: useId(),
        placeholder: '',
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
      v-model="formData.date"
      :formfieldData="{
        typeField: 'datetime-local',
        label: 'Date',
        placeholder: '',
        requiredField: true,
        id: useId(),
      }"
    />

    <div class="button-row">
      <button type="submit" v-if="item.trashed !== true">Save item</button>
      <NuxtLink to="./">Back</NuxtLink>
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

function writeSubmit() {
  const status = writeItem(formData.value);
  status.catch((error) => {
    addNotification("Error saving item, please try again later.", "error");
  });
  status.finally(() => {
    addNotification("Item saved successfully.", "success");
  });
}

const handleSubmit = function () {
  let continueSubmit = true;
  if (formData.value.imageURL) {
    var imageHolder = document.createElement("img");
    imageHolder.src = "`../${formData.value.image}`";
    imageHolder.onload = function () {
      imageHolder.style.visibility = "hidden";
      document.body.appendChild(imageHolder);
      formData.value.imageAspectRatio =
        imageHolder.naturalWidth / imageHolder.naturalHeight;
      document.body.removeChild(imageHolder);
    };
    imageHolder.onerror = function () {
      continueSubmit = false;
      addNotification(
        "Error loading image, please check the URL and try again.",
        "error",
      );
    };
  } else {
    formData.value.imageAspectRatio = null;
  }

  if (continueSubmit) {
    writeSubmit();
  }
};

const currentDate = function () {
  const date = new Date();
  let month = ("0" + (date.getMonth() + 1)).slice(-2);
  let day = ("0" + date.getDate()).slice(-2);
  let year = date.getFullYear();
  let hours = ("0" + date.getHours()).slice(-2);
  let minutes = ("0" + date.getMinutes()).slice(-2);
  return year + "-" + month + "-" + day + "T" + hours + ":" + minutes;
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
  date: item.date ? item.date : currentDate(),
  title: item.title ? item.title : "",
  description: item.description ? item.description : "",
  snippet: item.snippet ? item.snippet : "",
  trashed: item.trashed,
  imageId: item.imageId ? item.imageId : null,
  type: item.type ? item.type : "",
  tag: item.tag ? item.tag : [],
  color: item.color ? item.color : "#fffdec",
  linkTitle: item.linkTitle ? item.linkTitle : "",
  linkURL: item.linkURL ? item.linkURL : "",
});

onMounted(() => {});
</script>

<style lang="css" scoped></style>
