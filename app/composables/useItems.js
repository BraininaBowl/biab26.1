export const useItems = () => {
  const items = useState("items", () => []);
  const item = useState("item", () => null);
  const status = useState("status", () => null);

  async function fetchItems(filters = [], parse = true) {
    let response = [];
    try {
      response = await $fetch(`/api/items/all`);
    } catch (error) {
      items.value = [];
    } finally {
      items.value = response.data.items;
      response.data.items.sort((a, b) => new Date(a.date) - new Date(b.date));
      filters.forEach((filterItem) => {
        if (typeof(filterItem.values) == "object") {
          response.data.items = response.data.items.filter((el) =>
            filterItem.values.includes(el[filterItem.attribute]),
          );
        } else {
          response.data.items = response.data.items.filter((el) =>
            filterItem.values == (el[filterItem.attribute]),
          );

        }
      });
      items.value = response.data.items;
      if (parse) {
        items.value.forEach((item) => {
          item.description = toHtml(item.description);
        });
      }
      status.value = response.status;
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
    status,
  };
};
