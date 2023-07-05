<script setup>
defineProps(['modelValue'])
defineEmits(['update:modelValue'])

let last = ""

// If CTRL + K is pressed, focus the search bar
window.addEventListener('keydown', (e) => {
    if (e.key == "Control" && last.toLowerCase() == "k" || e.key.toLowerCase() == "k" && last== "Control") {
        e.preventDefault()
        e.stopPropagation();
        document.querySelector('input').focus()
    }
    last = e.key
})

// If the search bar is focused and ESC is pressed, unfocus it
window.addEventListener('keydown', (e) => {
    if (e.key == "Escape") {
        e.preventDefault()
        e.stopPropagation();
        document.querySelector('input').blur()
    }
})

// If the search bar is focused, add active class to the search bar div else remove it
/*window.addEventListener('focusin', (e) => {
    if (e.target == document.querySelector('input')) {
        document.querySelector('#searchBar').classList.add('active')
    }
})
window.addEventListener('focusout', (e) => {
    if (e.target == document.querySelector('input')) {
        document.querySelector('#searchBar').classList.remove('active')
    }
})*/

</script>

<template>
    <div id="searchBar">
        <input
          :value="modelValue"
          @input="$emit('update:modelValue', $event.target.value)"
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