export const useImages = () => {
  const images = useState("images", () => []);
  const image = useState("image", () => new Object);
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
      images.value = response.data ? Object.values(response.data) : [];
    } catch (error) {
      images.value = [];
    }
  }

  async function fetchImage(id) {
    let response = new Object();
    try {
      response = await $fetch(`/api/images/${id}`);
      image.value = response.data;
      status.value = response.status;
    } catch (error) {
      image.value = [];
    }
  }
 
  
  return {
    postImage,
    postImageMetaData,
    fetchImages,
    fetchImage,
    images,
    image,
    status,
  };
};
