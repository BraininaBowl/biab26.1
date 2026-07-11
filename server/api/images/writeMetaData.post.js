export default defineEventHandler(async (event) => {
  const storage = useStorage("itemDataStore");
  const body = await readBody(event);
  let content = await storage.getItem("imageMetaData.json");
  function newId() {
    let newId = 0;
    if (content) {
      for (let key in content) {
        const item = content[key];
        console.log("item", item.id)
        if (item.id >= newId) {
          newId = item.id + 1;
        }
      }
    }
    return newId;
  }
  if (!body.id) {
    body.id = newId();
  }
  if (!content) {
    content = new Object();
  }
  content[body.id] = body;
  console.log("content post-add", content);
  await storage.setItem("imageMetaData.json", content);
  return "success";
});
