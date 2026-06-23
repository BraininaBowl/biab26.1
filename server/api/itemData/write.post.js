export default defineEventHandler(async (event) => {
  
    async function getNewId() {
      const keys = await storage.keys();
      const promises = keys.map((key) => storage.getItem(key));
      const items = await Promise.all(promises);
  
      if (items === undefined || items.length == 0) {
        return 1
      } else {
        const itemWithHighestId = items.reduce(function (prev, current) {
          return prev && prev.id > current.id ? prev : current;
        });
        return itemWithHighestId.id === undefined ? 1 : itemWithHighestId.id + 1;
      }
    }
  
    const body = await readBody(event);
    const storage = useStorage("itemDataStore");


    await itemStorage.setItem(body.type + ".json", body);
    return;
  
  });