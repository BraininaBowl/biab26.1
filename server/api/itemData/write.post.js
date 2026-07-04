export default defineEventHandler(async (event) => {
  const storage = useStorage("itemDataStore");
  const body = await readBody(event);
  let content = await storage.getItem(body.type + ".json");
  if (content) {
    if (!content.includes(body.value.value)) {
      content.push(body.value.value);
    } else {
      return "Value already exists.";
    }
  } else {
    content = new Array(body.value.value);
  }
  await storage.setItem(body.type + ".json", content);
  return;
});
