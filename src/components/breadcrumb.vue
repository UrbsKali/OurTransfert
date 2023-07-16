<script setup>
import { computed } from 'vue'
const props = defineProps(['path'])

const pathArray = computed(() => props.path.split('/'))

</script>

<template>
    <div>
        <span v-for="(folder, index) in pathArray" :key="index">
            <a v-if="index != pathArray.length - 1" @click="changePath(folder)">{{folder}}</a>
            <span v-else>{{folder}}</span>
            <span v-if="index != pathArray.length - 1"> / </span>
        </span>
    </div>
</template>

<style scoped>

</style>