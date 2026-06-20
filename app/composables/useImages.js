export const useImages = async () => {
  const images = useState("images", () => []);
  const status = useState("status", () => null);

  function uploadImage(file) {
    const formData = new FormData();
    // const re = /(?:\.([^.]+))?$/;
    // const extention = re.exec("file")
    formData.append("file", file);
    // formData.append("type", extention)


    const response = $fetch("/api/images/upload", {
      method: "post",
      // body: file,
      body: formData,
      enctype: "multipart/form-data",
    });

    status.value = response.status;
  }

  return {
    uploadImage,
    status,
  };
};
