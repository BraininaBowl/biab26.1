<template>
  <main>
    <section>
      <h2>Upload image</h2>
      <form @submit.prevent="handleSubmit">
        <FormInputComponent
          @change="(event) => (formData.file = event.target.files[0])"
          :formfieldData="{
            typeField: 'file',
            label: 'File',
            requiredField: true,
            id: 'fileSelect',
            placeholder: '',
            disabledField: formData.trashed,
            acceptField: 'image/*',
          }"
        />
        <FormInputComponent
          v-model="formData.name"
          :formfieldData="{
            typeField: 'text',
            label: 'Name',
            requiredField: false,
            id: 'nameInput',
            placeholder: '',
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
          v-model="formData.imagePixel"
          :formfieldData="{
            typeField: 'checkbox',
            label: 'Pixel-art  ',
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
          v-model="formData.imageId"
          :formfieldData="{
            typeField: 'hidden',
            label: 'Image ID',
            placeholder: '',
            requiredField: false,
            id: useId(),
          }"
        />
        <div class="button-row">
          <button type="submit" v-if="item.trashed !== true">Save item</button>
          <NuxtLink to="./">Back</NuxtLink>
        </div>
      </form>
    </section>
  </main>
</template>

<script setup>
definePageMeta({
  layout: "admin",
});

const props = defineProps({
  item: {
    type: Object,
    required: false,
  },
});
const item = props.item || {};
const { writeItem } = useItems();
const { postImage, status, postImageMetaData } = useImages();
const formData = ref({
  file: null,
  name: item.name ? item.name : "",
  imageURL: item.imageURL ? item.imageURL : null,
  imageFocus: item.imageFocus ? item.imageFocus : null,
  imagePixel: item.imagePixel ? item.imagePixel : null,
  imageAspectRatio: item.imageAspectRatio ? item.imageAspectRatio : null,
  imageId: item.imageId ? item.imageId : null,
});

const handleSubmit = function () {
  uploadFiles(formData.value.file);

  // upload image, then apply meta, then writeSubmit
};

const uploadFiles = async function (file) {
  const imageFormData = new FormData();
  imageFormData.set("files", file);
  await postImage(imageFormData)
    .then(() => {
      applyMeta();
    })
    .catch((error) => {
      addNotification("Error uploading image: " + error.message, "error");
    });
};

const applyMeta = function () {
  let continueSubmit = true;
  if (status.value.imageName) {
    if (!formData.value.name) {
      formData.value.name = status.value.imageName;
    }
    formData.value.imageURL = status.value.imageURL;
    var imageHolder = document.createElement("img");
    imageHolder.src = "`../images/${status.value.imageURL}`";
    imageHolder.onload = function () {
      imageHolder.style.visibility = "hidden";
      document.body.appendChild(imageHolder);
      formData.value.imageAspectRatio =
        imageHolder.naturalWidth / imageHolder.naturalHeight;
      document.body.removeChild(imageHolder);
      // formData.value.imageURL = encodeURI(formData.value.imageURL);
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
    console.log("formData.value", formData.value)
    postImageMetaData(formData.value)
  }
};


onMounted(() => {});
</script>

<style lang="css" scoped></style>
