export const useItemData = () => {
  const tags = useState("tags", () => []);
  const itemStatus = useState("itemStatus", () => null);

  async function fetchTypes(typeType) {
    let typeResponse = [];
    try {
      typeResponse = await $fetch(`/api/itemData/${typeType}`);
      if (typeResponse.data && typeResponse.data.content) {
        typeResponse.data.content.sort((a, b) => a - b);
        return typeResponse;
      }
    } catch (error) {
      types.value = [];
    } finally {
    }
  }

  async function fetchTags() {
    let tagResponse = [];
    try {
      tagResponse = await $fetch(`/api/itemData/tag`);
    } catch (error) {
      tags.value = [];
    } finally {
      if (tagResponse.data && tagResponse.data.content) {
        tagResponse.data.content.sort((a, b) => a - b);
        tags.value = tagResponse.data.content;
        itemStatus.value = tagResponse.itemStatus;
      }
    }
  }

  async function writeItemData(type, value) {
    const response = await $fetch("/api/itemData/write", {
      method: "POST",
      body: { type: type, value: value },
    });
  }

  async function removeItemData(type, value) {
    const response = await $fetch("/api/itemData/remove", {
      method: "POST",
      body: { type: type, value: value },
    });
  }

  return {
    fetchTypes,
    fetchTags,
    writeItemData,
    removeItemData,
    tags,
    itemStatus,
  };
};
