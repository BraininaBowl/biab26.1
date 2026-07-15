export default defineEventHandler(async (event) => {
  const storage = useStorage("itemDataStore");
  const id = getRouterParam(event, "id");
  const content = await storage.getItem("imageMetaData.json");
  const image = content ? content[id] : null;
  return {
    status: "succes",
    data: image,
  };
});
