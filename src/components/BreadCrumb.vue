<script setup>
import { computed } from 'vue'
const props = defineProps(['path'])
const emit = defineEmits(['update:path'])

const pathArray = computed(() => props.path.split('/'))

function changePath(path) {
  // aggregate path array from start to path index
  path = pathArray.value.slice(0, pathArray.value.indexOf(path) + 1).join('/')
  console.log(path)
  emit('update:path', path)
}

</script>

<template>
  <div>
    <span v-for="(folder, index) in pathArray" :key="index">
      <a v-if="index != pathArray.length - 1" @click="changePath(folder)">{{ folder }}</a>
      <span v-else>{{ folder }}</span>
      <span v-if="index != pathArray.length - 1"> / </span>
    </span>
  </div>
</template>

<style scoped>
a {
  color: #000000;
  text-decoration: none;
  cursor: pointer;
}


</style>
