<script setup>

const props = defineProps(['input', 'is_admin', 'password'])
const emit = defineEmits(['update:input', 'update:is_admin'])

let last = ""

function setActive() {
    document.querySelector('#searchBar').classList.add('active')
}
function setInactive() {
    document.querySelector('#searchBar').classList.remove('active')
}
function setFocus() {
    document.querySelector('input').focus()
}

window.addEventListener('keydown', (e) => {
    if (e.key == "Control" && last.toLowerCase() == "k" || e.key.toLowerCase() == "k" && last== "Control") {
        e.preventDefault()
        e.stopPropagation();
        setFocus()
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
        @focus="setActive()"
        @active="setActive()"
        @blur="setInactive()"
        
        id="searchBarInput"
          :value="input"
          @input="$emit('update:input', $event.target.value)"
            placeholder="Rechercher un fichier"
        />
        <div id="svg">
            <svg @click="setFocus()" xmlns="http://www.w3.org/2000/svg" id="Outline" viewBox="0 0 24 24" width="512" height="512"><path d="M23.707,22.293l-5.969-5.969a10.016,10.016,0,1,0-1.414,1.414l5.969,5.969a1,1,0,0,0,1.414-1.414ZM10,18a8,8,0,1,1,8-8A8.009,8.009,0,0,1,10,18Z"/></svg>
        </div>

    </div>
</template>

<style scoped>
#searchBar {
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
    overflow: hidden;
    transition: all .3s ease-in-out;
}
input {
    border: none;
    background-color: #ffffff;
    outline: none;
    width: 100%;
    height: calc(50px - var(--thickness)*2);
    padding: 0 10px;
    font-size: 1rem;
    font-weight: 500;
    color: #cecece;
    z-index: 2;
    margin-bottom: var(--thickness);
    margin-left: var(--thickness);
    margin-top: var(--thickness);
    border-top-left-radius: .625rem;
    border-bottom-left-radius: .625rem;
}

input::placeholder {
    color: #cecece;
}

input:focus, input:active {
    color: #747474;
}

.active::after {
    background: linear-gradient(
        90deg,
        #ff0000 0%,
        #2f00ff 100%
    );
    position: absolute;
    bottom: 0;
    left: 0;
    height: 50px;
    width: 200%;
    z-index: 1;
    animation: shine 1s linear infinite;
    content: "";
}

@keyframes shine {
    50% {
        /*background-position: 200% center;*/
        transform: translateX(-50%);
    }
    100% {
        /*background-position: -200% center;*/
        transform: translateX(0%);
    }
}

#svg{
    background-color: #ffffff;
    z-index: 2;
    display: flex;
    justify-content: center;    
    align-items: center;
    height: calc(50px - var(--thickness) * 2);
    margin-bottom: var(--thickness);
    margin-right: var(--thickness);
    margin-top: var(--thickness);
    width: 50px;
    border-bottom-right-radius: .625rem;
    border-top-right-radius: .625rem;
}
svg {
    width: 20px;
    height: 20px;
    fill: #cecece;
    margin-right: 10px;
}
</style>