export const useItems = () => {
  const data = useState("data", () => []);
  const status = useState("status", () => null);

  async function fetchItemData(type) {
    let response = [];
    try {
      response = await $fetch(`/api/itemData/${type}`);
    } catch (error) {
      data.value = [];
    } finally {
      response.data.items.sort((a, b) => a - b);
      data.value = response.data.items;
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
