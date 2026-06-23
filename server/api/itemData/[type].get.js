export default defineEventHandler(async (event) => {
  const storage = useStorage("itemDataStore");
  const type = getRouterParam(event, "type");
  const typeContent = await storage.getItem(type + ".json");
  return {
    status: "succes",
    data: { typeContent },
  };
});