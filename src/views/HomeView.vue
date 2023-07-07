
<template>
  <main>
    <SearchBar v-model:input="search" v-model:is_admin="is_admin" password="test"/>
    <FileList :is_admin="is_admin" :files="files" :searching="search"/>
    <AddButton v-if="is_admin"/>
  </main>
</template>

<script setup>
  import FileList from '../components/FileList.vue'
  import AddButton from '../components/AddButton.vue';
  import SearchBar from '../components/SearchBar.vue';
  import { ref } from 'vue'

  let is_admin = ref(false)

  let search = ref('')

  let files = ref([
    {
        name: 'file1',
        size: '51651',
        type: 'PDF',
        date: '2023-01-01',
        id: 1,
        url: '/src/assets/file-512/pdf.png'
    },
    {
        name: 'file2',
        size: '161515000',
        type: 'PNG',
        date: '2021-01-01',
        id: 2
    },
    {
        name: 'file3',
        size: '950000',
        type: 'EXE',
        date: '2022-01-26',
        id: 3
    },
    {
        name: 'file4',
        size: '12000',
        type: 'DOCX',
        date: '2021-01-01',
        id: 4
    },
    {
        name: 'Terminator',
        size: '52000000000',
        type: 'MP4',
        date: '2022-12-24',
        id: 5
    },
    {
        name: 'VF-1S Valkyrie',
        size: '200000',
        type: 'PSD',
        date: '2015-01-01',
        id: 6
    },
    {
        name: 'file1',
        size: '12000',
        type: 'PDF',
        date: '2021-01-01',
        id: 7
    },
    {
        name: 'oh wow that a reaaaaaal long file name, so loooooooooooong we need to crop him before it gets out of hand',
        size: '12000',
        type: 'PDF',
        date: '2021-01-01',
        id: 8
    },
    {
        name: 'file3',
        size: '12000',
        type: 'PDF',
        date: '2021-01-01',
        id: 9
    },
    {
        name: 'file4',
        size: '12000',
        type: 'PDF',
        date: '2021-01-01',
        id: 10
    },
    {
        name: 'file5',
        size: '12000',
        type: 'PDF',
        date: '2021-01-01',
        id: 11
    },
    {
        name: 'file6',
        size: '12000',
        type: 'PDF',
        date: '2021-01-01',
        id: 12
    },
    {
        name: 'file1',
        size: '12000',
        type: 'PDF',
        date: '2021-01-01',
        id: 13
    },
    {
        name: 'file2',
        size: '12000',
        type: 'PDF',
        date: '2021-01-01',
        id: 14
    },
    {
        name: 'file3',
        size: '12000',
        type: 'PDF',
        date: '2021-01-01',
        id: 15
    },
    {
        name: 'file4',
        size: '12000',
        type: 'PDF',
        date: '2021-01-01',
        id: 16
    },
    {
        name: 'file5',
        size: '12000',
        type: 'PDF',
        date: '2021-01-01',
        id: 17
    },
    {
        name: 'file6',
        size: '12000',
        type: 'PDF',
        date: '2021-01-01',
        id: 18
    }
    ])
</script>