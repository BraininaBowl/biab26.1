export const useItems = () => {
  const items = useState("items", () => []);
  const item = useState("item", () => null);
  const status = useState("status", () => null);

  // async function fetchItems(filters = []) {
  //   let response = [];
  //   try {
  //     response = await $fetch(`/api/items/all`);
  //   } catch (error) {
  //     items.value = [];
  //   } finally {
  //     response.data.items.sort((a, b) => new Date(a.date) - new Date(b.date));
  //     filters.forEach((filterItem) => {
  //       response.data.items = response.data.items.filter((el) =>
  //         filterItem.values.includes(el[filterItem.attribute]),
  //       );
  //     });
  //     items.value = response.data.items;
  //     items.value.forEach((item) => {
  //       item.description = toHtml(item.description);
  //     });
  //     status.value = response.status;
  //   }
  // }

  // async function fetchItems(filters = [], raw = false) {
  //   const { data, status, error, refresh, clear } = await useFetch(
  //     "/api/items/all",
  //     {
  //       onRequestError({ request, options, error }) {
  //         // Handle the request errors
  //       },
  //       onResponse({ request, response, options }) {
  //         response._data.data.items.sort(
  //           (a, b) => new Date(a.date) - new Date(b.date),
  //         );
  //         filters.forEach((filterItem) => {
  //           response._data.data.items = response._data.data.items.filter((el) =>
  //             filterItem.values.includes(el[filterItem.attribute]),
  //           );
  //         });

  //         if (!raw) {
  //           response._data.data.items.forEach((item) => {
  //             item.description = toHtml(item.description);
  //           });
  //         }

  //         items.value = response._data.data.items;
  //       },
  //       onResponseError({ request, response, options }) {
  //         // Handle the response errors
  //       },
  //     },
  //   );
  // }

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
    fetchItems,
    fetchItem,
    fetchRawItem,
    writeItem,
    items,
    item,
    status,
  };
};
