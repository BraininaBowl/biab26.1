export const useItems = () => {
  const { fetchImage, image } = useImages();
  const items = useState("items", () => []);
  const item = useState("item", () => null);
  const tags = useState("tags", () => []);
  const types = useState("types", () => []);
  const itemStatus = useState("itemStatus", () => null);

  async function fetchItems(filters = [], parse = true) {
    let response = [];
    let typesContainer = new Set();
    let tagsContainer = new Set();
    try {
      response = await $fetch(`/api/items/all`);
    } catch (error) {
      items.value = [];
    } finally {
      response.data.items.forEach((item) => {
        if (item.type && item.trashed !== true) {
          typesContainer.add(item.type);
        }
        if (item.tag && item.trashed !== true) {
          item.tag.forEach((t) => tagsContainer.add(t));
        }
      });
      filters.forEach((filterItem) => {
        if (typeof filterItem.values == "object") {
          response.data.items = response.data.items.filter((el) =>
            filterItem.values.includes(el[filterItem.attribute]),
          );
        } else {
          response.data.items = response.data.items.filter(
            (el) => filterItem.values == el[filterItem.attribute],
          );
        }
      });
      response.data.items.forEach(async (item) => {
        if (item.imageId) {
          await fetchImage(item.imageId)
          if (image) {
            item.imageURL = image.imageURL
            item.imageAspectRatio = image.imageAspectRatio
            item.imagePixel = image.imagePixel
            item.imageFocus = image.imageFocus
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
      });
      response.data.items.sort((a, b) => new Date(a.date) - new Date(b.date));
      types.value = Array.from(typesContainer);
      tags.value = Array.from(tagsContainer);
      items.value = response.data.items;
      itemStatus.value = response.itemStatus;
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
