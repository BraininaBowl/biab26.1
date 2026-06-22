<template>
  <main class="container">
    <h1>Image upload</h1>
    <p class="description">
      Upload images (JPEG, PNG, WebP, AVIF) up to 5MB. Files are validated and
      sanitized for security.
    </p>

    <div class="upload-section">
      <div
        class="upload-zone"
        :class="{ dragover: isDragOver }"
        @drop="handleDrop"
        @dragover="handleDragOver"
        @dragleave="handleDragLeave"
      >
        <input
          ref="fileInput"
          type="file"
          multiple
          accept="image/*"
          @change="handleFileSelect"
          class="file-input"
        />

        <div class="upload-content">
          <svg
            class="upload-icon"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 48 48"
          >
            <path
              stroke-linecap="round"
              stroke-linejoin="round"
              stroke-width="2"
              d="M28 8H12a4 4 0 00-4 4v20m32-12v8m0 0v8a4 4 0 01-4 4H12a4 4 0 01-4-4v-4m32-4l-3.172-3.172a4 4 0 00-5.656 0L28 28M8 32l9.172-9.172a4 4 0 015.656 0L28 28m0 0l4 4m4-24h8m-4-4v8m-12 4h.02"
            />
          </svg>
          <h3>Drop images here or click to browse</h3>
          <p>Support for JPEG, PNG, WebP, AVIF (max 5MB each)</p>
        </div>
      </div>

      <button
        @click="triggerFileInput"
        class="upload-btn"
        :disabled="uploading"
      >
        {{ uploading ? "Uploading..." : "Choose Files" }}
      </button>
    </div>

    <div v-if="error" class="error-message">
      {{ error }}
    </div>

    <div v-if="uploading" class="progress-section">
      <div class="progress-bar">
        <div
          class="progress-fill"
          :style="{ width: uploadProgress + '%' }"
        ></div>
      </div>
      <p>Uploading {{ uploadProgress }}%</p>
    </div>

    <div v-if="uploadedFiles.length" class="results-section">
      <h2>Uploaded Files ({{ uploadedFiles.length }})</h2>
      <div class="file-grid">
        <div v-for="file in uploadedFiles" :key="file.url" class="file-card">
          <div class="image-container">
            <img 
              :src="`/images/${file.name}`"
              :alt="file.name"
              class="uploaded-image"
              :modifiers="{
                width: 300,
                height: 200,
                fit: 'cover',
                quality: 80,
              }"
            />
          </div>
          <div class="file-info">
            <h3>{{ file.name }}</h3>
            <p>{{ formatBytes(file.bytes) }} • {{ file.type }}</p>
            <div class="file-actions">
              <button @click="copyUrl(file.url)" class="copy-btn">
                Copy URL
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>

    <div class="stats-section">
      <h3>Upload Statistics</h3>
      <div class="stats-grid">
        <div class="stat-item">
          <span class="stat-value">{{ uploadedFiles.length }}</span>
          <span class="stat-label">Files Uploaded</span>
        </div>
        <div class="stat-item">
          <span class="stat-value">{{ formatBytes(totalBytes) }}</span>
          <span class="stat-label">Total Size</span>
        </div>
        <div class="stat-item">
          <span class="stat-value">{{ successRate }}%</span>
          <span class="stat-label">Success Rate</span>
        </div>
      </div>
    </div>
  </main>
</template>

<script setup>
definePageMeta({
  layout: 'admin',
})


const fileInput = ref();
const uploading = ref(false);
const uploadProgress = ref(0);
const uploadedFiles = ref([]);
const isDragOver = ref(false);
const error = ref("");
const uploadAttempts = ref(0);
const successfulUploads = ref(0);

const totalBytes = computed(() => {
  return uploadedFiles.value.reduce((sum, file) => sum + file.bytes, 0);
});

const successRate = computed(() => {
  return uploadAttempts.value === 0
    ? 100
    : Math.round((successfulUploads.value / uploadAttempts.value) * 100);
});

function triggerFileInput() {
  fileInput.value?.click();
}

function handleFileSelect(event) {
  const files = Array.from(event.target.files || []);
  if (files.length) {
    uploadFiles(files);
  }
}

function handleDragOver(event) {
  event.preventDefault();
  isDragOver.value = true;
}

function handleDragLeave(event) {
  event.preventDefault();
  isDragOver.value = false;
}

function handleDrop(event) {
  event.preventDefault();
  isDragOver.value = false;

  const files = Array.from(event.dataTransfer?.files || []);
  if (files.length) {
    uploadFiles(files);
  }
}

async function uploadFiles(files) {
  if (uploading.value) return;

  uploading.value = true;
  uploadProgress.value = 0;
  error.value = "";
  uploadAttempts.value++;

  try {
    const formData = new FormData();
    files.forEach((file) => {
      formData.append("files", file);
    });

    // Simulate progress
    const progressInterval = setInterval(() => {
      if (uploadProgress.value < 90) {
        uploadProgress.value += Math.random() * 20;
      }
    }, 200);

    const response = await $fetch("/api/imageStore/upload", {
      method: "POST",
      body: formData,
    });

    clearInterval(progressInterval);
    uploadProgress.value = 100;

    uploadedFiles.value.push(...response);
    successfulUploads.value++;

    // Reset file input
    if (fileInput.value) {
      fileInput.value.value = "";
    }

    // Success notification
    setTimeout(() => {
      uploadProgress.value = 0;
    }, 1000);
  } catch (err) {
    error.value = err.data?.message || "Upload failed. Please try again.";
    console.error("Upload failed:", err);
  } finally {
    uploading.value = false;
  }
}

function formatBytes(bytes) {
  if (bytes === 0) return "0 Bytes";
  const k = 1024;
  const sizes = ["Bytes", "KB", "MB", "GB"];
  const i = Math.floor(Math.log(bytes) / Math.log(k));
  return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + " " + sizes[i];
}

async function copyUrl(url) {
  try {
    const fullUrl = window.location.origin + url;
    await navigator.clipboard.writeText(fullUrl);
    addNotification("URL copied to clipboard:", fullUrl);
  } catch (err) {
    console.error("Failed to copy URL:", err);
  }
}

</script>

<style scoped>
.container {
  max-width: 1200px;
  margin: 0 auto;
  padding: 2rem;
}

h1 {
  font-size: 2.5rem;
  margin-bottom: 1rem;
  color: #1a202c;
}

.description {
  font-size: 1.1rem;
  color: #4a5568;
  margin-bottom: 2rem;
}

.upload-section {
  margin-bottom: 2rem;
}

.upload-zone {
  border: 2px dashed #cbd5e0;
  border-radius: 12px;
  padding: 3rem;
  text-align: center;
  background: #f7fafc;
  transition: all 0.3s ease;
  cursor: pointer;
  position: relative;
}

.upload-zone:hover,
.upload-zone.dragover {
  border-color: #3182ce;
  background: #ebf8ff;
  transform: translateY(-2px);
}

.file-input {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  opacity: 0;
  cursor: pointer;
}

.upload-content h3 {
  margin: 1rem 0 0.5rem;
  color: #2d3748;
}

.upload-content p {
  color: #718096;
}

.upload-icon {
  width: 64px;
  height: 64px;
  color: #a0aec0;
}

.upload-btn {
  background: #3182ce;
  color: white;
  border: none;
  padding: 0.75rem 1.5rem;
  border-radius: 8px;
  font-weight: 600;
  cursor: pointer;
  margin-top: 1rem;
  transition: background 0.2s;
}

.upload-btn:hover:not(:disabled) {
  background: #2c5aa0;
}

.upload-btn:disabled {
  background: #a0aec0;
  cursor: not-allowed;
}

.error-message {
  background: #fed7d7;
  color: #c53030;
  padding: 1rem;
  border-radius: 8px;
  margin-bottom: 1rem;
}

.progress-section {
  margin-bottom: 2rem;
}

.progress-bar {
  width: 100%;
  height: 8px;
  background: #e2e8f0;
  border-radius: 4px;
  overflow: hidden;
  margin-bottom: 0.5rem;
}

.progress-fill {
  height: 100%;
  background: #3182ce;
  transition: width 0.3s ease;
}

.results-section {
  margin-bottom: 2rem;
}

.file-grid {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(300px, 1fr));
  gap: 1.5rem;
  margin-top: 1rem;
}

.file-card {
  border: 1px solid #e2e8f0;
  border-radius: 12px;
  overflow: hidden;
  background: white;
  box-shadow: 0 1px 3px rgba(0, 0, 0, 0.1);
  transition: transform 0.2s;
}

.file-card:hover {
  transform: translateY(-2px);
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.15);
}

.image-container {
  position: relative;
  height: 200px;
  overflow: hidden;
}

.uploaded-image {
  width: 100%;
  height: 100%;
  object-fit: cover;
}

.file-info {
  padding: 1rem;
}

.file-info h3 {
  margin: 0 0 0.5rem;
  font-size: 1.1rem;
  color: #2d3748;
  word-break: break-word;
}

.file-info p {
  color: #718096;
  font-size: 0.9rem;
  margin: 0 0 1rem;
}

.file-actions {
  display: flex;
  gap: 0.5rem;
}

.copy-btn,
.delete-btn {
  padding: 0.5rem 1rem;
  border: none;
  border-radius: 6px;
  cursor: pointer;
  font-size: 0.9rem;
  transition: background 0.2s;
}

.copy-btn {
  background: #edf2f7;
  color: #4a5568;
}

.copy-btn:hover {
  background: #e2e8f0;
}

.delete-btn {
  background: #fed7d7;
  color: #c53030;
}

.delete-btn:hover {
  background: #fbb6ce;
}

.stats-section {
  background: #f7fafc;
  padding: 2rem;
  border-radius: 12px;
}

.stats-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(150px, 1fr));
  gap: 1.5rem;
  margin-top: 1rem;
}

.stat-item {
  text-align: center;
}

.stat-value {
  display: block;
  font-size: 2rem;
  font-weight: 700;
  color: #3182ce;
}

.stat-label {
  display: block;
  color: #718096;
  font-size: 0.9rem;
  margin-top: 0.25rem;
}

@media (max-width: 768px) {
  .container {
    padding: 1rem;
  }

  .upload-zone {
    padding: 2rem 1rem;
  }

  .file-grid {
    grid-template-columns: 1fr;
  }

  .stats-grid {
    grid-template-columns: repeat(3, 1fr);
  }
}
</style>
