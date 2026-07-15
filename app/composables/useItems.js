export const useItems = () => {
  const { fetchImage } = useImages();
  const items = useState("items", () => []);
  const item = useState("item", () => null);
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
      filters.forEach((filterItem) => {
        if (typeof filterItem.values == "object") {
          fetchedItems = fetchedItems.filter((el) =>
            filterItem.values.includes(el[filterItem.attribute]),
          );
        } else {
          fetchedItems = fetchedItems.filter(
            (el) => filterItem.values == el[filterItem.attribute],
          );
        }
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

      resolvedItems.sort((a, b) => new Date(a.date) - new Date(b.date));
      types.value = Array.from(typesContainer);
      tags.value = Array.from(tagsContainer);
      items.value = resolvedItems;
      itemStatus.value = response.status;
    } catch (error) {
      items.value = [];
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
    writeItem,
    items,
    item,
    tags,
    types,
    itemStatus,
  };
};
