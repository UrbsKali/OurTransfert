<script setup>
import FileList from '../components/FileList.vue'
import AddButton from '../components/AddButton.vue'
import SearchBar from '../components/SearchBar.vue'
import BreadCrumb from '../components/BreadCrumb.vue'
import AddDirButton from '../components/AddDirButton.vue'

import { ref, watch } from 'vue'
import axios from 'axios'

let is_admin = ref(false)

let search = ref('')
let hash_value = ref('')
let files = ref([])
let path = ref('')

fetchFiles(path.value)

// get cookies from browser to check if user is admin and hash value
let cookies = document.cookie.split(';')
cookies.forEach((cookie) => {
  if (cookie.split('=')[0].trim() === 'hash_value') {
    hash_value.value = cookie.split('=')[1].trim()
    // check if hash value is correct
    let formData = new FormData()
    formData.append('secret', hash_value.value)
    axios.post(`/api/check_secret/`, formData).then((response) => {
      if (response.data.message == true) {
        is_admin.value = true
      }
    })
  }
  if (cookie.split('=')[0].trim() === 'path') {
    path.value = cookie.split('=')[1].trim()
  }
})

// watch for changes in path
watch(path, (newPath) => {
  // create new cookie that last for 10 sec
  let date = new Date()
  date.setTime(date.getTime() + 10 * 1000)
  document.cookie = `path=${newPath}; expires=${date.toUTCString()}; path=/`
  fetchFiles(newPath)
})

function fetchFiles(path) {
  let formData = new FormData()
  formData.append('path', path)
  axios
    .post(`/api/get_files/`, formData, 
    { headers: { 'Content-Type': 'multipart/form-data' } }
    )
    .then((response) => {
    // add id to all file
    files.value.splice(0, files.value.length)
    response.data.forEach((file, index) => {
      files.value.push({
        name: file.Name,
        size: file.Size,
        type: file.Type,
        date: file.Date.split(' ')[0],
        id: index,
        url: file.Url,
        isDir: file.IsDir
      })
    })
  })
}
</script>

<template>
  <main>
    <div class="search-zone">
      <SearchBar v-model:input="search" v-model:is_admin="is_admin" v-model:hash_value="hash_value" />
      <AddDirButton v-if="is_admin" :hash_value="hash_value" :path="path" />
    </div>
    <BreadCrumb v-bind:path="path" />
    <FileList
      :is_admin="is_admin"
      :files="files"
      :searching="search"
      :hash_value="hash_value"
      v-model:path="path"
    />
    <AddButton v-if="is_admin" :hash_value="hash_value" :path="path" />
  </main>
</template>

<style scoped>
div.search-zone{
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 1rem;
}
</style>
