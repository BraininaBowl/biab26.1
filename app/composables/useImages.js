export const useImages = () => {
  const images = useState("images", () => []);

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
    fetchImages,
    images,
  };
};
