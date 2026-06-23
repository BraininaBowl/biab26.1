export const useItemData = () => {
  const itemTypes = useState("data", () => []);
  const status = useState("status", () => null);

  async function fetchItemData(type) {
    let response = [];
    try {
      response = await $fetch(`/api/itemData/${type}`);
    } catch (error) {
      data.value = [];
    } finally {
      response.data.items.sort((a, b) => a - b);
      itemTypes.value = response.data.items;
      status.value = response.status;
    }
  }

  async function writeItemData(type, value) {
    const response = await $fetch("/api/itemData/write", {
      method: "POST",
      body: { type: type, value: value },
    });
  }

  async function removeItemData(type, value) {
    const response = await $fetch("/api/itemData/remove", {
      method: "POST",
      body: { type: type, value: value },
    });
  }

  return {
    fetchItemData,
    writeItemData,
    removeItemData,
    itemTypes, 
    status,
  };
};
