export const useItemData = () => {
  const types = useState("types", () => []);
  const tags = useState("tags", () => []);
  const status = useState("status", () => null);

  async function fetchTypes() {
    let typeResponse = [];
    try {
      typeResponse = await $fetch(`/api/itemData/type`);
    } catch (error) {
      types.value = [];
    } finally {
      if (typeResponse.data && typeResponse.data.content) {
        typeResponse.data.content.sort((a, b) => a - b);
        types.value = typeResponse.data.content;
        status.value = typeResponse.status;
      }
    }
  }

  async function fetchTags() {
    let tagResponse = [];
    try {
      tagResponse = await $fetch(`/api/itemData/tag`);
    } catch (error) {
      tags.value = [];
    } finally {
      console.log("tagResponse in composable: ", tagResponse);
      if (tagResponse.data && tagResponse.data.content) {
        tagResponse.data.content.sort((a, b) => a - b);
        tags.value = tagResponse.data.content;
        status.value = tagResponse.status;
        console.log("tags in composable: ", tags);
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
    types,
    tags,
    status,
  };
};
