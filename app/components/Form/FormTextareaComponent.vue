<template>
	<div :class="`formSection formSection_${id}`">
		<div class="formfield">
			<label class="hidden" :for="id" v-if="formfieldData.labelHidden === true"
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
			<p v-if="formfieldData.help" class="help-text">
				{{ formfieldData.help }}
			</p>
			<textarea
				rows="3"
				:id="id"
				:placeholder="formfieldData.placeholder"
				v-model="model"
				:required="formfieldData.requiredField"
				:disabled="formfieldData.disabledField"
			/>
			<PopupImageSelectorComponent v-if="formfieldData.imagePopup" />
		</div>
	</div>
</template>

<script setup>
const nuxtApp = useNuxtApp();
const id = useId();
const model = defineModel();
const props = defineProps({
	formfieldData: {
		type: Object,
		required: true,
	},
});

onMounted(() => {
	if (props.formfieldData.imagePopup) {
		const textarea = document.querySelector(".formSection_" + id + " textarea");

		nuxtApp.hook("app:image:selected", (selectedImage) => {
			console.log("Image selected:", selectedImage);
      const currentCursor = textarea.selectionStart;
			const currentContent = textarea.value;
			textarea.value =
				currentContent.slice(0, currentCursor) +
				" #img " +
				selectedImage.image +
				" " +
				currentContent.slice(currentCursor);
		});
	}
});
</script>

<style lang="css" scoped>
textarea {
	field-sizing: content;
	width: 100%;
}
</style>
