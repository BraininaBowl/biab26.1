export const useItems = () => {
    const items = useState("items", () => []);
    const item = useState("item", () => null);
    const status = useState("status", () => null);
  
    async function fetchItems() {
        let response = [];
        try {
          response = await $fetch(`/api/items/all`);
        } catch (error) {
          items.value = [];
        } finally {
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
  
    return {
      fetchItems,
      fetchItem,
      status,
    };
  };