export const useImages = () => {
  const images = useState("images", () => []);
  const imageStatus = useState("imageStatus", () => new Object());

  async function postImage(imageFormData) {
    let res = await $fetch(`/api/images/upload`, {
      method: "POST",
      body: imageFormData,
    });

    imageStatus.value.error = null;
    imageStatus.value.success = true;
    imageStatus.value.imageURL = res[0].url;
    imageStatus.value.imageName = res[0].name;
  }

  async function postImageMetaData(imageMetaData) {
    console.log("in postImageMetaData in composable")
    await $fetch(`/api/images/writeMetaData`, {
      method: "POST",
      body: imageMetaData,
    });
  }

  async function fetchImages() {
    let response = [];
    try {
      response = await $fetch(`/api/images/metaData`);
      images.value = response.data ? Object.values(response.data) : [];
    } catch (error) {
      images.value = [];
    }
  }

  async function fetchImage(id) {
    let response = await $fetch(`/api/images/${id}`);
    imageStatus.value = response.imageStatus;
    return response.data;
  }

  return {
    postImage,
    postImageMetaData,
    fetchImages,
    fetchImage,
    images,
    imageStatus,
  };
};
