<script setup>

const props = defineProps(['input', 'is_admin', 'password'])
const emit = defineEmits(['update:input', 'update:is_admin'])

let last = ""

window.addEventListener('keydown', (e) => {
    if (e.key == "Control" && last.toLowerCase() == "k" || e.key.toLowerCase() == "k" && last== "Control") {
        e.preventDefault()
        e.stopPropagation();
        document.querySelector('input').focus()
    }
    if (e.key == "Escape") {
        e.preventDefault()
        e.stopPropagation();
        document.querySelector('input').blur()
    }
    if (e.key == " " && last == "Control" && document.querySelector('input').value == props.password) {
        e.preventDefault()
        e.stopPropagation();
        document.querySelector("input").value = ''
        emit('update:is_admin', true)
    }
    last = e.key
})


</script>

<template>
    <div id="searchBar">
        <input
          :value="input"
          @input="$emit('update:input', $event.target.value)"
            placeholder="Rechercher un fichier"
        />
        <svg xmlns="http://www.w3.org/2000/svg" id="Outline" viewBox="0 0 24 24" width="512" height="512"><path d="M23.707,22.293l-5.969-5.969a10.016,10.016,0,1,0-1.414,1.414l5.969,5.969a1,1,0,0,0,1.414-1.414ZM10,18a8,8,0,1,1,8-8A8.009,8.009,0,0,1,10,18Z"/></svg>

    </div>
</template>

<style scoped>
div {
    display: flex;
    justify-content: center;
    width: fit-content;
    align-items: center;
    height: 50px;
    border-radius: .625rem;
    background-color: #ffffff;
    cursor: pointer;
    color: #cecece;
    position: relative;
}
input {
    border: none;
    background-color: transparent;
    outline: none;
    width: 100%;
    height: 100%;
    padding: 0 10px;
    font-size: 1rem;
    font-weight: 500;
    color: #cecece;
}

input::placeholder {
    color: #cecece;
}

input:focus, input:active {
    color: #747474;
}

div:has(input:focus), div:has(input:active) {
    border-width: 1px;
    border-style: solid;
    border-color: aquamarine;
}

/*I want to add a ctrl + k text after my placeholder*/
input::after {
    content: "Ctrl + K";
    color: #cecece;
}


svg {
    width: 20px;
    height: 20px;
    fill: #cecece;
    margin-right: 10px;
}
</style>