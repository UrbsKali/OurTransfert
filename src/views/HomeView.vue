<script setup>
import FileList from '../components/FileList.vue'
import AddButton from '../components/AddButton.vue';
import SearchBar from '../components/SearchBar.vue';
import Breadcrumb from '../components/Breadcrumb.vue';

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
cookies.forEach(cookie => {
    if (cookie.split('=')[0].trim() === 'hash_value') {
        hash_value.value = cookie.split('=')[1].trim()
        // check if hash value is correct
        axios.get(`/api/check_secret/${hash_value.value}`)
            .then((response) => {
                if (response.data.message == true) {
                    is_admin.value = true
                }
            })
    }
})

// watch for changes in path
watch(path, (newPath) => {
    fetchFiles(newPath)
})

function fetchFiles(path){
    axios
        .get(`/api/get_files/${path}`)
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
      <SearchBar v-model:input="search" v-model:is_admin="is_admin" v-model:hash_value="hash_value"/>
      <Breadcrumb :path="path"/>
      <FileList :is_admin="is_admin" :files="files" :searching="search" :hash_value="hash_value" v-model:path="path"/>
      <AddButton v-if="is_admin" :hash_value="hash_value" :path="path"/>
    </main>
  </template>