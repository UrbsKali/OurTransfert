<script setup>
import axios from 'axios';

const props = defineProps({
  path: {
    type: String,
    required: true
  },
  hash_value: {
    type: String,
    required: true
  }
})

function addDir() {
  let name = prompt('Enter name of new directory')
  let formData = new FormData()
  formData.append('secret', props.hash_value)
  formData.append('name', name)
  formData.append('path', `${props.path}/`)
  axios
  .post(`/api/create_dir/`, formData)
  .then(() => {
    window.location.reload();
  }, (error) => {
    console.log(error);
  });
}


</script>

<template>
  <div @click="addDir()">
    <img src="@/assets/add-folder.png"> 
  </div>
</template>

<style scoped>
div {
  display: flex;
  width: 50px;
  height: 50px;
  border-radius: 0.625rem;
  background-color: #ffffff;
  cursor: pointer;
}
img {
    width: 32px;
    height: 32px;
    margin: auto;
    filter: invert(0.81);
}
</style>