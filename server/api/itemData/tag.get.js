export default defineEventHandler(async (event) => {
  const storage = useStorage("itemDataStore");
  const content = await storage.getItem("tag.json");
  return {
    status: "success",
    data: { content },
  };
});