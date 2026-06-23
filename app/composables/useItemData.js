export const useItemData = () => {
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

  async function writeItemData(type, value) {
    const response = await $fetch("/api/itemData/write", {
      method: "POST",
      body: { type: type, value: value   },
    });
  }

  async function removeItemData(type, value) {
    const response = await $fetch("/api/itemData/remove", {
      method: "POST",
      body: { type: type, value: value   },
    });
  }

  return {
    fetchItemData,
    writeItemData,
    removeItemData,
    items,
    item,
    status,
  };
};
