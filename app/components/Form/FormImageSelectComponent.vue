<template>
  <p v-html="formfieldData.label"></p>
  <div class="formImagesContainer">
  <div class="formfield checkbox imageRadio">
    <input
      type="radio"
      :id="`${formfieldData.id}-${index}`"
      :value="false"
      v-model="model"
      :disabled="formfieldData.disabledField"
      :autocomplete="formfieldData.autocomplete"
      :name="`${formfieldData.id}`"
    />
    <label :for="`${formfieldData.id}-${index}`" class="formImagePreview">None</label>
  </div>
  <div
    class="formfield checkbox imageRadio"
    v-for="(image, index) in images"
    :key="index"
  >
    <input
      type="radio"
      :id="`${formfieldData.id}-${index}`"
      :value="image"
      v-model="model"
      :disabled="formfieldData.disabledField"
      :autocomplete="formfieldData.autocomplete"
      :name="`${formfieldData.id}`"
    />
    <label
      :for="`${formfieldData.id}-${index}`"
      :style="{ backgroundImage: `url('/images/${image}')` }"
      class="formImagePreview"
    ></label>
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
const { fetchImages, images } = useImages();
await fetchImages();
console.log("images", images);
</script>

<style lang="css" scoped>
.formImagesContainer{
  display: flex;
  flex-wrap: wrap;
  gap: 0.5rem;
  margin-top: 0.5rem;
}
.formImagePreview {
  width: auto;
  height: 180px;
  display: block;
  object-fit: cover;
}

.imageRadio input[type="radio"] {
  display: none;
} 

.formImagePreview {
  display: flex;
  justify-content: center;
  align-items: center;
  border: 4px solid var(--col-bg-light);
  border-radius: 0.5rem;
  transition: border-color 0.15s ease;
  background-color: var(--col-area-bg);
  cursor: pointer;
  width: 180px;
  height: 180px;
  background-size: cover;
  background-position: center;
}

.imageRadio input[type="radio"]:checked + label {
  border: 4px solid var(--col-highlight); 
} 
</style>
