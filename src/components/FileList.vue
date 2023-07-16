<template>
    <table>
        <thead>
            <tr>
                <th v-if="!isMobile"></th>
                <th @click="sortByName(STATE.name)" style="cursor: pointer;" id="name">Name <span v-show="STATE.name === true">▲</span> <span v-show="STATE.name === null">▼</span></th>
                <th @click="sortBySize(STATE.size)" style="cursor: pointer;">Size <span v-show="STATE.size === true">▲</span> <span v-show="STATE.size === null">▼</span></th>
                <th @click="sortByType(STATE.type)" style="cursor: pointer;">Type <span v-show="STATE.type === true">▲</span> <span v-show="STATE.type === null">▼</span></th>
                <th @click="sortByDate(STATE.date)" style="cursor: pointer;">Date <span v-show="STATE.date === true">▲</span> <span v-show="STATE.date === null">▼</span></th>
                <th>Action</th>
            </tr>
        </thead>
        <tbody>
            <tr v-if="path !== ''"  @dblclick="changePath('..')">
                <td v-if="!isMobile">
                    <Icon :src="`file-64/folder.png`"/>
                </td>
                <td>..</td>
                <td></td>
                <td></td>
                <td></td>
                <td></td>
            </tr>
            <tr v-for="file in sortedFiles" :key="file.id" @dblclick="file.isDir ? changePath(file.url.split('/files/')[1]) : null">
                <td v-if="!isMobile">
                <Suspense>
                    <Icon :src="file.isDir ? `file-64/folder.png` : `file-64/${file.type.toLowerCase()}.png`"/>
                </Suspense>
                </td>
                <td>{{ file.name.length >= maxNameLength ? file.name.slice(0,maxNameLength) + '...' : file.name }}</td>
                <td>{{ file.isDir ? '' : formatBytes(file.size) }}</td>
                <td>{{ file.isDir ? 'Folder' : file.type }}</td>
                <td>{{ file.date }}</td>
                <td>
                    <div>
                        <svg class="delete" v-if="is_admin" viewBox="0 0 24 24"><path d="M6 19c0 1.1.9 2 2 2h8c1.1 0 2-.9 2-2V7H6v12zM8 9h8v10H8V9zm7.5-5-1-1h-5l-1 1H5v2h14V4z"></path></svg>
                        <svg @click="downloadFile(file)" v-if="!file.isDir" class="download" xmlns="http://www.w3.org/2000/svg" id="Layer_1" data-name="Layer 1" viewBox="0 0 24 24" width="512" height="512"><path d="M17.974,7.146c-.332-.066-.603-.273-.742-.569-1.552-3.271-5.143-5.1-8.735-4.438-3.272,.6-5.837,3.212-6.384,6.501-.162,.971-.15,1.943,.033,2.89,.06,.309-.073,.653-.346,.901-1.145,1.041-1.801,2.524-1.801,4.07,0,3.032,2.467,5.5,5.5,5.5h11c4.136,0,7.5-3.364,7.5-7.5,0-3.565-2.534-6.658-6.026-7.354Zm-2.853,7.562l-2.707,2.707c-.387,.387-.896,.582-1.405,.584l-.009,.002-.009-.002c-.509-.002-1.018-.197-1.405-.584l-2.707-2.707c-.391-.391-.391-1.023,0-1.414s1.023-.391,1.414,0l1.707,1.707v-5c0-.553,.448-1,1-1s1,.447,1,1v5l1.707-1.707c.391-.391,1.023-.391,1.414,0s.391,1.023,0,1.414Z"/></svg>
                    </div>
                </td>
            </tr>
        </tbody>
    </table>
</template>

<script setup>
    import { ref, computed, watch } from 'vue'
    import Icon from './Icon.vue';

    const props = defineProps(['files', 'is_admin', 'searching', 'path'])
    const emit = defineEmits(['update:path'])
    let sortedFiles = ref(props.files)
    let width = ref(document.body.clientWidth)
    const isMobile = computed(() => width.value < 500)
    let STATE = ref({name: false, size: false, type: false, date: false})
    window.addEventListener('resize', () => {
        width.value = document.body.clientWidth
        nameWidth.value = document.querySelector("#name").clientWidth
    })

    let nameWidth = ref(0)
    document.addEventListener('DOMContentLoaded', () => {
        nameWidth.value = document.querySelector("#name").clientWidth
    })

    const maxNameLength = computed(() => nameWidth.value / 10)

    watch(() => props.searching, () => {
        sortBySearch()
    })

    function changePath(path) {
        console.log(path)
        if (path === '..') {
            path = props.path.split('/').slice(0, -1).join('/')
        }
        emit('update:path', path)
    }

    function sortBySearch() {
        if (props.searching != '')  {
            console.log("Searching")
            sortedFiles.value = props.files.filter(file => file.name.toLowerCase().includes(props.searching.toLowerCase()))
            STATE.value = {name: false, size: false, type: false, date: false}
        } else {
            sortByID()
            STATE.value = {name: false, size: false, type: false, date: false}
        }
    }

    function formatBytes(bytes, decimals = 0) {
        if (!+bytes) return '0 Octet'

        const k = 1024
        const dm = decimals < 0 ? 0 : decimals
        const sizes = ['Octets', 'Ko', 'Mo', 'Go', 'To', 'Po', 'Eo', 'Zo', 'Yo']

        const i = Math.floor(Math.log(bytes) / Math.log(k))

        return `${parseFloat((bytes / Math.pow(k, i)).toFixed(dm))} ${sizes[i]}`
    }

    function sortByName(reverse = false) {
        if (reverse) {
            sortedFiles.value = sortedFiles.value.sort((a, b) => b.name.localeCompare(a.name))
            STATE.value = {name: null, size: false, type: false, date: false}
        } else if (reverse === null){
            sortBySearch()
            STATE.value = {name: false, size: false, type: false, date: false}
        } else {
            sortedFiles.value = sortedFiles.value.sort((a, b) => a.name.localeCompare(b.name))
            STATE.value = {name: true, size: false, type: false, date: false}
        }
    }
    function sortBySize(reverse = false) {
        if (reverse) {
            sortedFiles.value = sortedFiles.value.sort((a, b) => b.size - a.size)
            STATE.value = {name: false, size: null, type: false, date: false}
        } else if (reverse === null){
            sortBySearch()
            STATE.value = {name: false, size: false, type: false, date: false}
        } else {
            sortedFiles.value = sortedFiles.value.sort((a, b) => a.size - b.size)
            STATE.value = {name: false, size: true, type: false, date: false}
        }
    }
    function sortByDate(reverse = false) {
        if (reverse) {
            sortedFiles.value = sortedFiles.value.sort((a, b) => new Date(b.date) - new Date(a.date))
            STATE.value = {name: false, size: false, type: false, date: null}
        } else if (reverse === null){
            sortBySearch()
            STATE.value = {name: false, size: false, type: false, date: false}
        } else {
            sortedFiles.value = sortedFiles.value.sort((a, b) => new Date(a.date) - new Date(b.date))
            STATE.value = {name: false, size: false, type: false, date: true}
        }
        
    }
    function sortByType(reverse = false) {
        if (reverse) {
            sortedFiles.value = sortedFiles.value.sort((a, b) => a.type.localeCompare(b.type))
            STATE.value = {name: false, size: false, type: null, date: false}
        } else if (reverse === null){
            sortBySearch()
            STATE.value = {name: false, size: false, type: false, date: false}
        } else {
            sortedFiles.value = sortedFiles.value.sort((a, b) => b.type.localeCompare(a.type))
            STATE.value = {name: false, size: false, type: true, date: false}
        }
    }
    function sortByID() {
        console.log("Sorting by ID")
        if (props.searching != '')  {
            sortBySearch()
        } else {
            sortedFiles.value = props.files.sort((a, b) => a.id - b.id)
        }
    }

    function downloadFile(file) {
        const link = document.createElement('a')
        link.href = file.url
        link.download = file.name
        link.click()
    }

</script>

<style scoped>

    table {
        width: 100%;
        border-collapse: separate;
        border-spacing: 0 .5rem;
        margin-top: 1.5rem;
    }

    th, td {
        padding: 10px;
    }

    th {
        background: #ffffff;
        position: static; 
        font-weight: 700;
        color: rgb(107,114,128);
    }

    tr {
        border-radius: .625rem;
        text-align: center;
        background-color: white;
    }

    td svg {
        width: 1.5rem;
        height: 1.5rem;
        fill: rgb(107,114,128);
        cursor: pointer;
    }

    div:has(svg) {
        display: flex;
        justify-content: center;
        align-items: center;
        padding: 0;
        height: 100%;
        width: 100%;
    }  
    
    .delete:hover {
        fill: rgb(239,68,68);
    }
    .download:hover {
        fill: rgb(0, 0, 0);
    }


    tr td:last-child,
	tr th:last-child {
		border-radius: 0 .625rem .625rem 0;
	}
    tr td:first-child,
	tr th:first-child {
		border-radius: .625rem 0 0 .625rem;
	}
</style>