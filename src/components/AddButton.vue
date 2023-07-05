<template>
    <div>
        <img src="@/assets/upload.png">
    </div>
</template>

<script setup>

</script>

<style scoped>
    div {
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