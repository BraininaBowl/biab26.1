export default defineEventHandler(async (event) => {
  const storage = useStorage("itemDataStore");
  const id = getRouterParam(event, "id");
  const content = await storage.getItem("imageMetaData.json");
  console.log("id", id)
  Object.entries(content).forEach((item) => {
    if (item.id === id) {
      console.log("Item match")
      return {
        status: "succes",
        data: item,
      };
    } else {
      console.log("No item match")

    }
  });
});