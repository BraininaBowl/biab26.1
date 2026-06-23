export default defineEventHandler(async (event) => {
  const storage = useStorage("itemDataStore");
  const body = await readBody(event);
  let typeContent = await storage.getItem(body.type + ".json");
  if (typeContent) {
    typeContent.append(body.value);
  } else {
    typeContent = new Array(body.value);
  }
  await itemStorage.setItem(body.type + ".json", body);
  return;
});
