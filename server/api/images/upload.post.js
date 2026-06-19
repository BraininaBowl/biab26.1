export default defineEventHandler(async (event) => {
  const formData = await readMultipartFormData(event);
  const storage = useStorage("uploads");
  const maxFileSize = 3;
  const allowedTypes = ["jpeg", "jpg", "png", "gif", "svg"];

  if (!formData || formData.length === 0) {
    throw createError({
      statusCode: 400,
      statusMessage: "No files uploaded",
    });
  }

  const file = formData[0];

  if (Object.keys(file.data).length > maxFileSize * 1024 * 1024) {
    // in bytes
    throw createError({
      statusCode: 400,
      statusMessage: `File exceeds maximum size of ${maxFileSize}MB`,
    });
  }
  if (!file.type || !allowedTypes.includes(file.type)) {
    throw createError({
      statusCode: 400,
      statusMessage: `File type ${file.type || "unknown"} not allowed.
          Allowed types: ${allowedTypes.join(", ")}`,
    });
  }

  const fileName = `${Date.now()}.${file.type}`;
  await storage.setItemRaw(`${fileName}`, file.data);

  return fileName;
});
