export default defineEventHandler(async (event) => {
  const storage = useStorage("itemDataStore");
  const content = await storage.getItem("pageType.json");
  return {
    status: "succes",
    data: { content },
  };
});