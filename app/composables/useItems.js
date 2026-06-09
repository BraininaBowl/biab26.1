export const useItems = () => {
  const items = useState("items", () => []);
  const item = useState("item", () => null);
  const status = useState("status", () => null);

  async function fetchFilteredItems(filters) {
    let response = [];
    try {
      response = await $fetch(`/api/items/all`);
    } catch (error) {
      items.value = [];
    } finally {
      response.data.items.sort((a, b) => new Date(a.date) - new Date(b.date));
      filters.forEach((filter) => {
        response.data.items = response.data.items.filter((el) => (filter.attr == filter.value));
      });
      items.value = response.data.items;
      items.value.forEach((item) => {
        item.description = toHtml(item.description);
      });
      status.value = response.status;
    }
  }

  async function fetchAllItems() {
    let response = [];
    try {
      response = await $fetch(`/api/items/all`);
    } catch (error) {
      items.value = [];
    } finally {
      response.data.items.sort((a, b) => new Date(a.date) - new Date(b.date));
      items.value = response.data.items;
      items.value.forEach((item) => {
        item.description = toHtml(item.description);
      });
      status.value = response.status;
    }
  }

  async function fetchActiveItems() {
    let response = [];
    try {
      response = await $fetch(`/api/items/active`);
    } catch (error) {
      items.value = [];
    } finally {
      response.data.items.sort((a, b) => new Date(a.date) - new Date(b.date));
      items.value = response.data.items;
      items.value.forEach((item) => {
        item.description = toHtml(item.description);
      });
      status.value = response.status;
    }
  }

  async function fetchRawItem(id) {
    let response = [];
    try {
      response = await $fetch(`/api/items/${id}`);
    } catch (error) {
    } finally {
      item.value = response.data.item;
      status.value = response.status;
    }
  }

  async function fetchItem(id) {
    let response = [];
    try {
      response = await $fetch(`/api/items/${id}`);
    } catch (error) {
    } finally {
      item.value = response.data.item;
      item.value.description = toHtml(item.value.description);
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
    fetchAllItems,
    fetchActiveItems,
    fetchFilteredItems,
    fetchItem,
    fetchRawItem,
    writeItem,
    items,
    item,
    status,
  };
};
