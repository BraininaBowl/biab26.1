export default defineEventHandler(async (event) => {
  const storage = useStorage("itemDataStore");
  const id = getRouterParam(event, "id");
  const content = await storage.getItem("imageMetaData.json");
  content.array.forEach((item) => {
    if (item.id == id) {
      return {
        status: "succes",
        data: item,
      };
    }
  });
});
