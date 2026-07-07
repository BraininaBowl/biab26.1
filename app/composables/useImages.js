export const useImages = () => {
  const images = useState("images", () => []);
  const status = useState("status", () => null);

  async function postImage(file) {
    console.log("file", file);
    await $fetch(`/api/images/upload`, {
      method: "POST",
      body: file,
    })
      .then((res) => {
        console.log("res", res);
        if (res && res.length > 0) {
          status.value.imageURL = res[0].url;
          status.value.imageId = res[0].id;
        } else {
          throw new Error("No files were uploaded.");
        }
      })
      .catch((error) => {
        console.error("Error uploading image:", error);
        status.value = { error: error.message };
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
