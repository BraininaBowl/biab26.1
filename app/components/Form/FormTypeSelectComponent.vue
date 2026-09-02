<template>
	<div class="formSection">
		<p v-html="formfieldData.label"></p>
		<div class="formTagsContainer" v-if="types.length > 0">
			<div class="formfield radio" v-for="(type, index) in global['types_' + id]">
				<input
					type="radio"
					:id="`${id}-${index}`"
					:value="id.type"
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
global['types_' + id] = await fetchTypes(formfieldData.itemDataType);

console.log(formfieldData.itemDataType, ":", global['types_' + id]);
</script>

<style lang="css" scoped></style>
