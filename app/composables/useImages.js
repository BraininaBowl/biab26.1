export const useImages = () => {
  const images = useState("images", () => []);
  const status = useState("status", () => null);

  async function uploadImage(file) {
    const formData = new FormData();
    // const re = /(?:\.([^.]+))?$/;
    // const extention = re.exec("file")
    formData.append("file", file);
    // formData.append("type", extention)


    const response = await $fetch("/api/images/upload", {
      method: "post",
      body: file,
      // body: formData,
      enctype: "multipart/form-data",
    });

    status.value = response.status;
  }

  return {
    uploadImage,
    status,
  };
};
