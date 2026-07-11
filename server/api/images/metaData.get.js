export default defineEventHandler(async (event) => {
  const storage = useStorage("itemDataStore");
  const content = await storage.getItem("imageMetaData.json");
  return {
    status: "succes",
    data: { content },
  };
});