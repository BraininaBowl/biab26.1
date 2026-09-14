<template>
	<div :class="`popup_container popup_container_${id}`">
		<div class="insert_popup_button popup_button">Insert image</div>
		<div class="popup_wrapper inactive">
			<div class="popup popup_image_selector">
				<div class="popup_close_button popup_button">X</div>
				<form @submit.prevent="selectImage">
					<FormImageSelectComponent
						v-model="imageFormData.image"
						:formfieldData="{
							disabledField: false,
						}"
					/>
					<button>Insert image</button>
				</form>
			</div>
		</div>
	</div>
</template>

<script setup>
const nuxtApp = useNuxtApp();
const id = useId();

async function selectImage() {
	await nuxtApp.callHook("app:image:selected", imageFormData.value);
}

const imageFormData = ref({
	image: null,
});

onMounted(() => {
	const insert_popup_button = document.querySelector(
		".popup_container_" + id + " .insert_popup_button",
	);
	const popup_close_button = document.querySelector(
		".popup_container_" + id + " .popup_close_button",
	);
	const popup_wrapper = document.querySelector(
		".popup_container_" + id + " .popup_wrapper",
	);

	insert_popup_button.addEventListener("click", () => {
		popup_wrapper.classList.toggle("inactive");
	});

	popup_close_button.addEventListener("click", () => {
		popup_wrapper.classList.add("inactive");
	});
});
</script>

<style lang="css" scoped>
.popup_button {
	cursor: pointer;
	color: var(--col-link);
}

.popup_button:hover {
	color: var(--col-link-hover);
	text-decoration: underline;
}

.popup_close_button {
	position: sticky;
	width: 2rem;
	height: 2rem;
	top: 0rem;
	left: calc(90vw - 3rem);
	border-radius: 50%;
	background-color: var(--col-fg);
	color: var(--col-bg);
	display: flex;
	justify-content: center;
	align-items: center;
}

.popup_wrapper {
	display: none;
	position: fixed;
	top: 0;
	left: 0;
	width: 100%;
	height: 100%;
	background-color: rgba(0, 0, 0, 0.5);
	z-index: 9999;
}

.popup {
	padding: var(--padding);
	background-color: var(--col-bg);
	max-width: 80vw;
	position: relative;
	max-height: 80vh;
	overflow-y: auto;
}

.popup_wrapper:not(.inactive) {
	display: flex;
	justify-content: center;
	align-items: center;
}
</style>
