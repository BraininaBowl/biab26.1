export const useImages = () => {
  const images = useState("images", () => []);
  const status = useState("status", () => {});

  async function postImage(imageFormData) {
    await $fetch(`/api/images/upload`, {
      method: "POST",
      body: imageFormData,
    })
      .then((res) => {
        if (res && res.length > 0) {
          status.value.error = null;
          status.value.success = true;
          status.value.imageURL = res[0].url;
          status.value.imageName = res[0].name;
        } else {
          throw new Error("No files were uploaded.");
        }
      })
      .catch((error) => {
      });
  }

  async function postImageMetaData(imageMetaData) {
    await $fetch(`/api/images/writeMetaData`, {
      method: "POST",
      body: imageMetaData,
    }).then((res) => {
    });
  }

  async function fetchImages() {
    let response = [];
    try {
      response = await $fetch(`/api/images/all`);
    } catch (error) {
      images.value = [];
    } finally {
      images.value = response.data.keys;
    }
  }

  return {
    postImage,
    fetchImages,
    images,
    status,
  };
};
