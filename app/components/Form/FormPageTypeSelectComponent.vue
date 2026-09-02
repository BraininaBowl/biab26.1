<template>
	<div class="formSection">
		<p v-html="formfieldData.label"></p>
		<div class="formTagsContainer" v-if="pageTypes.length > 0">
			<div class="formfield radio" v-for="(type, index) in pageTypes">
				<input
					type="radio"
					:id="`${id}-${index}`"
					:value="type"
					v-model="model"
					:disabled="formfieldData.disabledField"
					:autocomplete="formfieldData.autocomplete"
					:name="`${id}`"
				/>
				<label :for="`${id}-${index}`" v-html="type"></label>
			</div>
		</div>
	</div>
</template>

<script setup>
const id = useId();
const model = defineModel();
const props = defineProps({
	formfieldData: {
		type: Object,
		required: true,
	},
});
const formfieldData = props.formfieldData || {};
const { fetchTypes } = useItemData();
const pageTypes = await fetchTypes("pageType");
</script>

<style lang="css" scoped></style>
