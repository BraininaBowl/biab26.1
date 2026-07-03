export default defineEventHandler(async (event) => {
  const storage = useStorage("itemDataStore");
  const body = await readBody(event);
  let typeContent = await storage.getItem(body.type + ".json");
  if (typeContent) {
    if (!typeContent.includes(body.value.value)) {
      typeContent.push(body.value.value);
    } else {
      return "Value already exists.";
    }
  } else {
    typeContent = new Array(body.value.value);
  }
  await storage.setItem(body.type + ".json", typeContent);
  return;
});
