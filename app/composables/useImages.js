export const useImages = () => {
  const images = useState("images", () => []);
  const status = useState("status", () => null);

  async function postImage(data) {
    let response = [];
    try {
      response = await $fetch("/api/images/upload", {
        method: "POST",
        body: data,
      });
    } catch (error) {
      images.value = [];
    } finally {
      console.log("response", response);

      if (response && response.length > 0) {
        status.value.imageURL = response[0].url;
        status.value.imageId = response[0].id;
        applyMeta();
      } else {
        throw new Error("No files were uploaded.");
      }
    }
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
