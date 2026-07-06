export default defineEventHandler(async (event) => {
  const storage = useStorage("imageStore");
  const keys = await storage.keys();
  //const items = await storage.getItems();
  // const promises = keys.map((key) => storage.getItem(key));
  // const allItems = await Promise.all(promises);
  // const items = allItems;

  return {
    status: "success",
    data: { keys },
  };
});
