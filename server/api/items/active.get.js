export default defineEventHandler(async (event) => {
    const storage = useStorage("itemStore");
    const keys = await storage.keys();
    const promises = keys.map((key) => storage.getItem(key));
    const allItems = await Promise.all(promises);
    const items = allItems.filter((el) => !el.trashed);
    return {
      status: "success",
      data: { items },
    };
  });