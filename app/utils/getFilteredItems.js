export default function (fetchedItems, filters) {
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
