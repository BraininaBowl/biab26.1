<template>
	<div class="formSection">
		<label :for="`${id}`">Parent</label><br />

		<select
			name="parent"
			:id="`${id}`"
			v-model="model"
			:disabled="formfieldData.disabledField"
			:autocomplete="formfieldData.autocomplete"
		>
			<option :value="false">None</option>
			<option
				v-for="item in parentItems"
				:value="item.id"
				v-html="`${item.id} - ${item.title} (${item.type})`"
			></option>
		</select>
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
const { fetchStatelessItems } = useItems();
const parentItems = await fetchStatelessItems([{ attribute: "trashed", values: [false, undefined] }], false);
</script>

<style lang="css" scoped></style>
	