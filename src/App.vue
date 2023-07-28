<script setup>
import { RouterLink, RouterView } from 'vue-router'
import HomeView from './views/HomeView.vue'
import DownloadView from './views/DownloadView.vue'

import { ref, watch } from 'vue'

let url = ref('')
let isHome = ref(true)

document.addEventListener('DOMContentLoaded', () => {
    url.value = window.location.pathname
})

watch(() => url.value, () => {
    console.log(url.value)
    if (url.value.includes('download')) {
        console.log("Download page : " + url.value)
        isHome.value = false
    } else {
        console.log("Home page")
        isHome.value = true
    }
})


</script>

<template>
    <HomeView v-if="isHome"/>
    <DownloadView :src="url" v-if="!isHome"/>
</template>

<style scoped>

</style>
