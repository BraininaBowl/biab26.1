export default defineEventHandler(async (event) => {
  const storage = useStorage("itemDataStore");
  const body = await readBody(event);
  let content = await storage.getItem("imageMetaData.json");
  function newId() {
    let maxId = -1;
    if (content) {
      for (let key in content) {
        const item = content[key];
        if (item.id > maxId) {
          maxId = item.id;
        }
      }
    }
    return maxId + 1;
  }
  if (body.id === undefined || body.id === null || body.id === "") {
    body.id = newId();
  }
  content[body.id] = body;
  await storage.setItem("imageMetaData.json", content);
  return { status: "success", data: body };
});
