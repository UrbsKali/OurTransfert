<script setup>
import axios from 'axios'
import Icon from '../components/Icon.vue';
import DownloadButton from '../components/DownloadButton.vue';
import { ref } from 'vue'
const props = defineProps(['src'])
console.log(props.src)

let active = ref(false)

let file = ref({
    name: '',
    size: '',
    type: '',
    date: '',
    id: '',
    url: '',
    isDir: false
})

axios.get(`/api/file_info/${props.src.split('download/')[1]}`)
    .then((response) => {
        file.value = {
            name: response.data.Name,
            size: response.data.Size,
            type: response.data.Type,
            date: response.data.Date.split(' ')[0],
            id: 0,
            url: response.data.Url,
            isDir: response.data.IsDir
        }
        console.log(file.value)
    })
    .catch((error) => {
        console.log(error)
    })

function downloadFile(file) {
    const link = document.createElement('a')
    link.href = `/api/download/${file.url}`
    link.download = file.name
    link.click()
    active.value = true
}
function formatBytes(bytes, decimals = 0) {
        if (!+bytes) return '0 Octet'

        const k = 1024
        const dm = decimals < 0 ? 0 : decimals
        const sizes = ['Octets', 'Ko', 'Mo', 'Go', 'To', 'Po', 'Eo', 'Zo', 'Yo']

        const i = Math.floor(Math.log(bytes) / Math.log(k))

        return `${parseFloat((bytes / Math.pow(k, i)).toFixed(dm))} ${sizes[i]}`
    }
</script>

<template>
    <div>
        <main>
            <h1>Prêt à Télécharger !</h1>
            <p>Vous pouvez télécharger le fichier en cliquant sur le bouton ci-dessous.</p>
            <div class="file-preview">
                <Icon :src="file.isDir ? `file-64/folder.png` : `file-64/${file.type.toLowerCase()}.png`"/>
                <h4>{{ file.name }}</h4>
                <h4>{{ formatBytes(file.size) }}</h4>
            </div>
            <div class="button" @click="downloadFile(file)"><span style="margin-left: 16px;">Télécharger</span><DownloadButton :active="active"/> </div>
            
            
        </main>
    </div>
</template>

<style scoped>
.file-preview {
    display: flex;
    flex-direction: row;
    align-items: center;
    justify-content: center;
    margin: 1rem 0;
    border-radius: .625rem;
    padding: 1rem 2rem;
    box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
}
.file-preview h4 {
    margin: 0 1rem;
}

div:has(> main){
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    height: 100%;
}

main {
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    margin: auto;
    padding: 5rem;
    background-color: #fff;
    border-radius: .625rem;
}
p {
    font-size: 1rem;
    margin: 1rem 0;
}
.button{
    display: flex;
    flex-direction: row;
    align-items: center;
    justify-content: center;

    border: solid 2px #56d170;

    color: #000000;
    border-radius: .625rem;
    padding: 1rem 2rem;
    font-size: 1rem;
    margin: 1rem 0;
    cursor: pointer;
}
.button:hover{
    /*background-color: #68ff92;*/
}
</style>