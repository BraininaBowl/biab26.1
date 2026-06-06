export const useItems = () => {
    const items = useState("items", () => []);
    const item = useState("item", () => null);
    const status = useState("status", () => null);
  
    async function fetchAllItems() {
        let response = [];
        try {
          response = await $fetch(`/api/items/all`);
        } catch (error) {
          items.value = [];
        } finally {
          response.data.items.sort((a, b) => new Date(a.date) - new Date(b.date));
          items.value = response.data.items;
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
      fetchItem,
      writeItem,
      items,
      item,
      status,
    };
  };