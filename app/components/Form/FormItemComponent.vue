<template>
  <div class="page_options" v-if="item.id !== unset">
    <div class="submenu left">
      <a @click="restoreItem()" v-if="item.trashed">Restore item</a>
      <a @click="trashItem()" v-else>Trash item</a>
    </div>
  </div>

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
    <FormInputComponent
      v-model="formData.imagePixel"
      :formfieldData="{
        typeField: 'checkbox',
        label: 'Pixel-art  ',
        requiredField: true,
        id: useId(),
        placeholder: '',
        disabledField: formData.trashed,
      }"
    />
    <FormInputComponent
      v-model="formData.image"
      :formfieldData="{
        typeField: 'file',
        label: 'Image',
        requiredField: false,
        id: useId(),
        placeholder: '',
        disabledField: formData.trashed,
      }"
    />
    <FormInputComponent
      v-model="formData.imageFocus"
      :formfieldData="{
        typeField: 'text',
        label: 'Image focus',
        requiredField: false,
        id: useId(),
        placeholder: 'center',
        disabledField: formData.trashed,
      }"
    />

    <FormInputComponent
      v-model="formData.imageURL"
      :formfieldData="{
        typeField: 'hidden',
        label: 'Image URL',
        requiredField: false,
        id: useId(),
        placeholder: '',
        disabledField: formData.trashed,
      }"
    />
    <FormInputComponent
      v-model="formData.imageAspectRatio"
      :formfieldData="{
        typeField: 'hidden',
        label: 'Image Aspect Ratio',
        placeholder: '',
        requiredField: false,
        id: useId(),
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
  if (formData.value.imageURL) {
    var imageHolder = document.createElement("img");
    imageHolder.src = formData.value.image;
    imageHolder.onload = function () {
      imageHolder.style.visibility = "hidden";
      document.body.appendChild(imageHolder);
      formData.value.imageAspectRatio =
        imageHolder.naturalWidth / imageHolder.naturalHeight;
      document.body.removeChild(imageHolder);
      formData.value.imageURL = encodeURI(formData.value.imageURL)
      writeSubmit();
    };
    imageHolder.onerror = function () {
      addNotification(
        "Error loading image, please check the URL and try again.",
        "error",
      );
    };
  } else {
    formData.value.imageAspectRatio = null;
    writeSubmit();
  }
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
  date: item.date ? item.date : new Date(),
  title: item.title ? item.title : "",
  description: item.description ? item.description : "",
  snippet: item.snippet ? item.snippet : "",
  trashed: item.trashed,
  image: item.image ? item.image : null,
  imageURL: item.imageURL ? item.imageURL : null,
  imagePixel: item.imagePixel ? item.imagePixel : null,
  imageAspectRatio: item.imageAspectRatio ? item.imageAspectRatio : null,
  type: item.type ? item.type : "",
  color: item.color ? item.color : "#fffdec",
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
