<template>
  <div @click="toggleActive()">
    <img src="@/assets/upload.png" />
  </div>
  <div v-if="isActive" class="upld">
    <UploadField :path="path" :hash_value="hash_value" />
  </div>
</template>

<script setup>
import UploadField from './upload/UploadField.vue'
import { ref } from 'vue'

let isActive = ref(false)

function toggleActive() {
  setTimeout(() => {
    isActive.value = !isActive.value
    if (isActive.value) {
      window.addEventListener('click', function (e) {
        if (e.target.classList.contains('upld')) {
          isActive.value = false
        }
      })
    } else {
      window.removeEventListener('click', function (e) {
        if (e.target.classList.contains('upld')) {
          isActive.value = false
        }
      })
    }
  }, 10)
}

const props = defineProps({
  hash_value: {
    type: String,
    required: true,
    default: ''
  },
  path: {
    type: String,
    required: true,
    default: ''
  }
})

// if escape key is pressed
window.addEventListener('keydown', function (e) {
  if (isActive.value && e.key === 'Escape') {
    isActive.value = false
  }
})
</script>

<style scoped>
.upld {
  position: fixed;
  bottom: 0;
  right: 0;
  top: 0;
  left: 0;
  display: flex;
  justify-content: center;
  align-items: center;
  background-color: rgba(0, 0, 0, 0.2);
  z-index: 100;
}

div:has(img) {
  display: flex;
  justify-content: center;
  align-items: center;
  width: 50px;
  height: 50px;
  border-radius: 50%;
  position: fixed;
  bottom: 10px;
  right: 10px;
  background-color: #56d170;
  cursor: pointer;
  color: white;
}
div img {
  width: 32px;
  height: 32px;
  filter: invert(1);
}
</style>
