export const useImages = () => {
  const images = useState("images", () => []);
  const status = useState("status", () => new Object());

  async function postImage(imageFormData) {
    let res = await $fetch(`/api/images/upload`, {
      method: "POST",
      body: imageFormData,
    });

    status.error = null;
    status.success = true;
    status.imageURL = res[0].url;
    status.imageName = res[0].name;
  }

  async function postImageMetaData(imageMetaData) {
    await $fetch(`/api/images/writeMetaData`, {
      method: "POST",
      body: imageMetaData,
    }).then((res) => {});
  }

  async function fetchImages() {
    let response = [];
    try {
      response = await $fetch(`/api/images/metaData`);
    } catch (error) {
      images.value = [];
    } finally {
      images.value = response.data;
    }
  }

  async function fetchImage(id) {
    let response = [];
    try {
      response = await $fetch(`/api/images/${id}`);
    } catch (error) {
      images.value = [];
    } finally {
      images.value = response.data;
    }
  }
 
  
  return {
    postImage,
    postImageMetaData,
    fetchImages,
    fetchImage,
    images,
    status,
  };
};
