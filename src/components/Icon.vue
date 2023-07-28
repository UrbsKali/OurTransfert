<script setup>
const props = defineProps(['src'])

let file_type = [
  '3ds',
  'ai',
  'bin',
  'cad',
  'css',
  'dll',
  'dmg',
  'docx',
  'dwg',
  'eml',
  'exe',
  'folder',
  'gif',
  'html',
  'ini',
  'iso',
  'jpg',
  'js',
  'mdb',
  'mkv',
  'mov',
  'mp4',
  'pdf',
  'png',
  'pptx',
  'psd',
  'rar',
  'skp',
  'ttf',
  'txt',
  'vcf',
  'xlsx',
  'zip'
]
const requireImage = (link) => {
  if (!file_type.includes(link.split('/')[1].split('.')[0])) return `/assets/file-64/unknown.png`
  return `/assets/${link}`
}
</script>

<template>
  <img :src="requireImage(props.src)" width="32" height="32" />
</template>
