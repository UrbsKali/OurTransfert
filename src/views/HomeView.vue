<script setup>
import FileList from '../components/FileList.vue'
import AddButton from '../components/AddButton.vue';
import SearchBar from '../components/SearchBar.vue';
import Breadcrumb from '../components/breadcrumb.vue';

import { ref, watch } from 'vue'
import axios from 'axios'


let is_admin = ref(false)

let search = ref('')
let files = ref([])
let path = ref('')
  
fetchFiles(path.value)

// watch for changes in path
watch(path, (newPath) => {
    console.log("Path changed to " + newPath)
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
            console.log("Files loaded")
            console.log(files.value)
        })
}

</script>

<template>
    <main>
      <SearchBar v-model:input="search" v-model:is_admin="is_admin" password="test"/>
      <Breadcrumb :path="path"/>
      <FileList :is_admin="is_admin" :files="files" :searching="search"  v-model:path="path"/>
      <AddButton v-if="is_admin"/>
    </main>
  </template>