export default defineEventHandler(async (event) => {
  const storage = useStorage("itemDataStore");
  const id = getRouterParam(event, "id");
  const content = await storage.getItem("imageMetaData.json");
  Object.entries(content).forEach((item) => {
    if (toString(item[1].id) == toString(id)) {
      return {
        status: "succes",
        data: item[1],
      };
    }
  });
});
