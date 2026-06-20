<template>
  <form @submit.prevent="submitFile">
    <FormInputComponent
      v-model="form.image"
      :formfieldData="{
        typeField: 'file',
        label: 'Image',
        requiredField: false,
        id: useId(),
        placeholder: '',
        disabledField: false,
      }"
    />
    <div class="button-row">
      <button type="submit" >Upload image</button>
    </div>
  </form>
</template>

<script setup>
const { uploadImage } = useImages();

const form = new Object();

function submitFile() {
  const status = uploadImage(form);
  status.catch((error) => {
    addNotification("Error uploading image, please try again later.", "error");
  });
  status.finally(() => {
    addNotification("Image uploaded successfully.", "success");
  });
}

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
