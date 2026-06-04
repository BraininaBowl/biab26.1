export default defineEventHandler(async (event) => {
    const storage = useStorage("itemStore");
    const id = getRouterParam(event, "id");
    const item = await storage.getItem(id + ".json");
    return {
      status: "succes",
      data: { item },
    };
  });