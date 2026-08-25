export const useItems = () => {
	const { fetchImage } = useImages();
	const items = useState("items", () => []);
	const tags = useState("tags", () => []);
	const types = useState("types", () => []);
	const itemStatus = useState("itemStatus", () => null);

	async function fetchItems(filters = [], parse = true) {
		let typesContainer = new Set();
		let tagsContainer = new Set();
		try {
			const response = await $fetch(`/api/items/all`);
			let fetchedItems = response.data.items;
			fetchedItems.forEach((item) => {
				if (item.type && item.trashed !== true) {
					typesContainer.add(item.type);
				}
				if (item.tag && item.trashed !== true) {
					item.tag.forEach((t) => tagsContainer.add(t));
				}
			});
			// filters.forEach((filterItem) => {
			//   if (typeof filterItem.values == "object") {
			//     fetchedItems = fetchedItems.filter((el) =>
			//       filterItem.values.includes(el[filterItem.attribute]),
			//     );

			//   } else {
			//     fetchedItems = fetchedItems.filter(
			//       (el) => filterItem.values == el[filterItem.attribute],
			//     );
			//   }
			// });

			filters.forEach((filterItem) => {
				fetchedItems = fetchedItems.filter((el) => {
					const filterVals = filterItem.values;
					const itemAttr = el[filterItem.attribute];

					const isFilterArray = Array.isArray(filterVals);
					const isAttrArray = Array.isArray(itemAttr);

					if (isFilterArray && isAttrArray) {
						// Both are arrays: Match if there is ANY overlap
						return itemAttr.some((val) => filterVals.includes(val));
					} else if (isFilterArray) {
						// Filter is array, attribute is string/number: Match if array contains attribute
						return filterVals.includes(itemAttr);
					} else if (isAttrArray) {
						// Filter is string/number, attribute is array: Match if attribute array contains filter
						return itemAttr.includes(filterVals);
					} else {
						// Neither are arrays: Exact match
						return filterVals == itemAttr;
					}
				});
			});

			const resolvedItems = await Promise.all(
				fetchedItems.map(async (item) => {
					if (item.imageId) {
						const imageData = await fetchImage(item.imageId);
						if (imageData) {
							item.imageURL = imageData.imageURL;
							item.imageAspectRatio = imageData.imageAspectRatio;
							item.imagePixel = imageData.imagePixel;
							item.imageFocus = imageData.imageFocus;
						}
					}
					if (parse) {
						if (item.description) {
							item.description = toHtml(item.description);
						}
						if (item.snippet) {
							item.snippet = toHtml(item.snippet);
						}
					}

					return item;
				}),
			);

			resolvedItems.sort((a, b) => new Date(b.date) - new Date(a.date));
			types.value = Array.from(typesContainer);
			tags.value = Array.from(tagsContainer);
			items.value = resolvedItems;
			itemStatus.value = response.status;
		} catch (error) {
			items.value = [];
		} finally {
		}
	}

	async function fetchStatelessItems(filters = [], parse = true) {
		try {
			const response = await $fetch(`/api/items/all`);
			let fetchedItems = response.data.items;
			// filters.forEach((filterItem) => {
			//   if (typeof filterItem.values == "object") {
			//     fetchedItems = fetchedItems.filter((el) =>
			//       filterItem.values.includes(el[filterItem.attribute]),
			//     );
			//   } else {
			//     fetchedItems = fetchedItems.filter(
			//       (el) => filterItem.values == el[filterItem.attribute],
			//     );
			//   }
			// });

			filters.forEach((filterItem) => {
				fetchedItems = fetchedItems.filter((el) => {
					const filterVals = filterItem.values;
					const itemAttr = el[filterItem.attribute];

					const isFilterArray = Array.isArray(filterVals);
					const isAttrArray = Array.isArray(itemAttr);

					if (isFilterArray && isAttrArray) {
						// Both are arrays: Match if there is ANY overlap
						return itemAttr.some((val) => filterVals.includes(val));
					} else if (isFilterArray) {
						// Filter is array, attribute is string/number: Match if array contains attribute
						return filterVals.includes(itemAttr);
					} else if (isAttrArray) {
						// Filter is string/number, attribute is array: Match if attribute array contains filter
						return itemAttr.includes(filterVals);
					} else {
						// Neither are arrays: match
						return filterVals == itemAttr;
					}
				});
			});

			const resolvedItems = await Promise.all(
				fetchedItems.map(async (item) => {
					if (item.imageId) {
						const imageData = await fetchImage(item.imageId);
						if (imageData) {
							item.imageURL = imageData.imageURL;
							item.imageAspectRatio = imageData.imageAspectRatio;
							item.imagePixel = imageData.imagePixel;
							item.imageFocus = imageData.imageFocus;
						}
					}
					if (parse) {
						if (item.description) {
							item.description = toHtml(item.description);
						}
						if (item.snippet) {
							item.snippet = toHtml(item.snippet);
						}
					}

					return item;
				}),
			);

			resolvedItems.sort((a, b) => new Date(b.date) - new Date(a.date));
			return resolvedItems;
		} catch (error) {
		} finally {
		}
	}

	async function writeItem(dataObject) {
		const response = await $fetch("/api/items/write", {
			method: "POST",
			body: dataObject,
		});
	}

	return {
		fetchItems,
		fetchStatelessItems,
		writeItem,
		items,
		tags,
		types,
		itemStatus,
	};
};
