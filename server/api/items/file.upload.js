export default defineEventHandler(async (event) => {

const formData = await readMultipartFormData(event);
if (!formData || formData.length === 0) {
  throw createError({
    statusCode: 400,    statusMessage: "No files uploaded",  });
}
const file = formData[0];
});

