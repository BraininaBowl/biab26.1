<template>
	<div class="formSection">
		<label :for="`${formfieldData.id}`">Parent</label><br />

		<select
			name="parent"
			:id="`${formfieldData.id}`"
			v-model="model"
			:disabled="formfieldData.disabledField"
			:autocomplete="formfieldData.autocomplete"
		>
			<option :value="false">None</option>
			<option
				v-for="item in items"
				:value="item.id"
				v-html="`${item.id} - ${item.title} (${item.type})`"
			></option>
		</select>
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
const { fetchItems, items } = useItems();
await fetchItems([{ attribute: "trashed", values: [false, undefined] }], false);
</script>

<style lang="css" scoped></style>
