export default defineEventHandler(async (event) => {
  const params = getQuery(event);
  const storage = useStorage("itemStore");
  const keys = await storage.keys();
  const promises = keys.map((key) => storage.getItem(key));
  const allItems = await Promise.all(promises);
  const items = allItems;

  // modify data
  const filters = JSON.parse(params.filters)
  console.log("filters", typeof(filters), filters)

        // response._data.data.items.sort((a, b) => new Date(a.date) - new Date(b.date));
      // filters.forEach((filterItem) => {
      //   response._data.data.items = response._data.data.items.filter((el) =>
      //     filterItem.values.includes(el[filterItem.attribute]),
      //   );
      // });

  return {
    status: "success",
    data: { items },
  };
});
