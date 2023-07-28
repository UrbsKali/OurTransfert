<script setup lang="ts">
import { computed, ComputedRef, ref } from 'vue'
import { SelectedFile } from './types'
import FileItem from './FileItem.vue'
import axios from 'axios'

const props = defineProps<{
  path?: string
  hash_value?: string
}>()

// Data
const selectedFiles = ref([] as SelectedFile[])

const isUploading: ComputedRef<boolean> = computed(() =>
  selectedFiles.value.some((file) => file.status == 'uploading')
)

// Functions
const onSelectFiles = (event: Event) => {
  const target = event.target as HTMLInputElement
  if (target.files === null) {
    return
  }

  clearFiles()

  Array.from(target.files).forEach((file: File) => {
    selectedFiles.value.push({
      file: file,
      percentage: 0,
      status: 'pending'
    } as SelectedFile)
  })
}

const clearFiles = () => (selectedFiles.value = [])

const uploadSelectedFiles = () => {
  selectedFiles.value.forEach((file: SelectedFile) => {
    file.status = 'uploading'
    file.percentage = 0

    uploadFile(
      file.file,
      (event: any) => {
        file.percentage = Math.round((100 * event.loaded) / event.total)
      },
      props.path || ''
    )
      .then((response) => {
        file.status = 'success'
      })
      .catch(() => {
        file.status = 'failed'
      })
  })
}

function uploadFile(file: File, onUploadProgress: any, path: string) {
  // multipart/form-data" for uploading FormData
  const formData = new FormData()
  formData.append('files', file)
  formData.append('secret', props.hash_value || '')

  return new Promise((resolve, reject) => {
    axios
      .post(`/api/upload/${path}`, formData, {
        headers: {
          'Content-Type': 'multipart/form-data'
        },
        maxContentLength: Infinity,
        maxBodyLength: Infinity,
        onUploadProgress
      })
      .then((response) => {
        resolve(response)
      })
      .catch((error) => {
        reject(error)
      })
  })
}
</script>

<template>
  <main style="z-index: 101" id="uploadForm">
    <div class="wrapper">
      <!-- Files list -->
      <div class="files-list">
        <b v-if="selectedFiles.length">Fichiers ({{ selectedFiles.length }}):</b>
        <!-- File item -->
        <FileItem v-for="file in selectedFiles" :key="file.file.name" :file="file" />
      </div>
      <!-- Hidden file input -->
      <input id="selectBtn" type="file" multiple title="Upload file" @change="onSelectFiles" />
      <div class="hr" v-if="selectedFiles.length" />
      <!-- Buttons -->
      <div class="buttons" :class="{ centered: selectedFiles.length === 0 }">
        <label class="button" :class="{ disabled: isUploading }" for="selectBtn">
          Choisissez un fichier
        </label>
        <a
          class="button button-danger"
          :class="{ disabled: isUploading }"
          href="#"
          @click.prevent="clearFiles"
          v-if="selectedFiles.length"
          >Vider</a
        >
        <a
          class="button button-upload"
          :class="{ disabled: isUploading }"
          href="#"
          @click.prevent="uploadSelectedFiles"
          v-if="selectedFiles.length"
          >Uploader</a
        >
      </div>
    </div>
  </main>
</template>

<style scoped>
#selectBtn {
  display: none;
}
.hr {
  width: 100%;
  height: 1px;
  background-color: lightgray;
}
.wrapper {
  width: 40vw;
  min-width: 300px;
  padding: 2rem;

  border-radius: 0.625rem;
  display: flex;
  flex-direction: column;
  gap: 1rem;
  background-color: #fff;
}
.files-list {
  display: flex;
  flex-direction: column;
  gap: 1rem;
}
.buttons {
  display: flex;
  gap: 1rem;
}
.buttons.centered {
  justify-content: center;
}
.button {
  cursor: pointer;
  color: white;
  background: #809af0;
  text-decoration: none;
  width: fit-content;
  padding: 0.5rem 1rem;
  border-radius: 0.625rem;
}
.button:hover {
  background: #3f6cff;
}
.button.disabled {
  cursor: default;
  background: lightgray;
  pointer-events: none;
}
.button-danger {
  background: #f08080;
}
.button-danger:hover {
  background: #f65959;
}
.button-upload {
  background: #00d591;
}
.button-upload:hover {
  background: #02b97f;
}
</style>
