export default defineEventHandler(async (event) => {
  const storage = useStorage("images");
  const maxFileSize = 3;
  const allowedTypes = [
    "image/jpeg",
    "image/png",
    "image/gif",
    "image/svg",
    "image/webp",
  ];

  function sanitizeBase(name) {
    // Remove extension and dangerous characters
    return name
      .toLowerCase()
      .replace(/\.[^/.]+$/, "")
      .replace(/[^a-z0-9-_]+/g, "-")
      .replace(/^-+|-+$/g, "");
  }

  function pickExt(filename, mime) {

    // Fallback to MIME type
    if (mime === "image/jpeg") return ".jpg";
    if (mime === "image/png") return ".png";
    if (mime === "image/webp") return ".webp";
    if (mime === "image/gif") return ".gif";
    if (mime === "image/svg") return ".svg";

    return ".bin";
  }

  const fileParts = await readMultipartFormData(event);
  if (!fileParts?.length) {
    throw createError({ statusCode: 400, statusMessage: "No file received" });
  }
  const files = fileParts.filter((part) => part.filename && part.data);
  if (files.length === 0) {
    throw createError({ statusCode: 400, statusMessage: "Missing files" });
  }

  const results = new Array();

  for (const p of files) {
    const { filename = "file", type, data } = p;
    const bytes = data.length;

    // Generate safe filename
    const base = sanitizeBase(filename) || "upload";
    const ext = pickExt(filename, type);
    const id = Date.now();
    const safeName = `${base}-${id}${ext}`;

    // Write file to disk
    // await writeFile(`${UPLOAD_DIR}/${safeName}`, data);

    results.push({
      name: filename,
      type: type,
      bytes: bytes,
      url: `/images/${safeName}`,
    });
    console.log("data", data)
    await storage.setItemRaw(`${safeName}`, data);


  }

  return results;
  // if (!formData || formData.length === 0) {
  //   throw createError({
  //     statusCode: 400,
  //     statusMessage: "No files uploaded",
  //   });
  // }

  // const file = formData[0];

  // if (Object.keys(file.data).length > maxFileSize * 1024 * 1024) {
  //   // in bytes
  //   throw createError({
  //     statusCode: 400,
  //     statusMessage: `File exceeds maximum size of ${maxFileSize}MB`,
  //   });
  // }
  // if (!file.type || !allowedTypes.includes(file.type)) {
  //   throw createError({
  //     statusCode: 400,
  //     statusMessage: `File type ${file.type || "unknown"} not allowed.
  //         Allowed types: ${allowedTypes.join(", ")}`,
  //   });
  // }

  // const fileName = `${Date.now()}.${file.type}`;
  // await storage.setItemRaw(`${fileName}`, file.data);

  // return fileName;
});
