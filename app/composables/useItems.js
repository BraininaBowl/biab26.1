export const useItems = () => {
	const { fetchImage } = useImages();
	const items = useState("items", () => []);
	const tags = useState("tags", () => []);
	const types = useState("types", () => []);
	const itemStatus = useState("itemStatus", () => null);

	function filterItems(fetchedItems, filters) {
		filters.forEach((filterItem) => {
			fetchedItems = fetchedItems.filter((el) => {
				const filterVals = filterItem.values;
				const itemAttr = el[filterItem.attribute];

				const isFilterArray = Array.isArray(filterVals);
				const isAttrArray = Array.isArray(itemAttr);

				if (isFilterArray && filterVals.includes("any")) {
					return (
						itemAttr == "" ||
						itemAttr == null ||
						itemAttr == undefined ||
						itemAttr == false
					);
				} else if (isFilterArray && isAttrArray) {
					return itemAttr.some((val) =>
						filterVals.some((fVal) => String(fVal) === String(val)),
					);
				} else if (isFilterArray) {
					return filterVals.some((fVal) => String(fVal) === String(itemAttr));
				} else if (isAttrArray) {
					return itemAttr.some((val) => String(val) === String(filterVals));
				} else {
					return String(filterVals) === String(itemAttr);
				}
			});
		});
		return fetchedItems;
	}

	async function parseItem(item, parse) {
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
				item.description = await toHtml(item.description, fetchImage);
			}
			if (item.snippet) {
				item.description = await toHtml(item.description, fetchImage);
			}
		}

		if (item.parent) {
			const parentItems = await fetchStatelessItems(
				[{ attribute: "id", values: [item.parent] }],
				false,
			);
			if (parentItems && parentItems.length > 0) {
				item.parentTitle = parentItems[0].title;
				item.parentType = parentItems[0].type;
				item.parentDate = parentItems[0].date;
			}
		}
		return item;
	}

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

			fetchedItems = filterItems(fetchedItems, filters);

			const resolvedItems = await Promise.all(
				fetchedItems.map(async (item) => {
					return await parseItem(item, parse);
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

	async function fetchRandomFeaturedItem() {
		const featuredItems = await fetchStatelessItems(
			[
				{ attribute: "featured", values: [true] },
				{ attribute: "trashed", values: [false, undefined] },
			],
			false,
		);
		const randomItemIndex = Math.floor(Math.random() * featuredItems.length);
		return featuredItems[randomItemIndex];
	}

	async function fetchStatelessItems(filters = [], parse = true) {
		try {
			const response = await $fetch(`/api/items/all`);
			let fetchedItems = response.data.items;
			fetchedItems = filterItems(fetchedItems, filters);
			const resolvedItems = await Promise.all(
				fetchedItems.map(async (item) => {
					return await parseItem(item, parse);
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
		fetchRandomFeaturedItem,
		writeItem,
		items,
		tags,
		types,
		itemStatus,
	};
};
