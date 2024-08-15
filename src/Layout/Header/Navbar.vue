<template>
    <div data-tauri-drag-region class="titlebar">
        <div class="titlebar-button" id="titlebar-minimize">
            <!-- <img src="https://api.iconify.design/mdi:window-minimize.svg" alt="minimize" /> -->
            <svg xmlns="http://www.w3.org/2000/svg" width="1em" height="1em" viewBox="0 0 24 24">
                <path fill="currentColor" d="M20 14H4v-4h16" />
            </svg>
        </div>
        <div class="titlebar-button" id="titlebar-maximize">
            <svg xmlns="http://www.w3.org/2000/svg" width="1em" height="1em" viewBox="0 0 24 24">
                <path fill="currentColor" d="M4 4h16v16H4zm2 4v10h12V8z" />
            </svg>
        </div>
        <div class="titlebar-button titlebar-button1" id="titlebar-close">
            <svg xmlns="http://www.w3.org/2000/svg" width="1em" height="1em" viewBox="0 0 24 24">
                <path fill="currentColor"
                    d="M19 6.41L17.59 5L12 10.59L6.41 5L5 6.41L10.59 12L5 17.59L6.41 19L12 13.41L17.59 19L19 17.59L13.41 12z" />
            </svg>
        </div>
    </div>
</template>

<script setup>
import { appWindow } from '@tauri-apps/api/window'
import { onMounted } from 'vue'
onMounted(() => {
    document.getElementById('titlebar-minimize').addEventListener('click', () => appWindow.minimize())
    document.getElementById('titlebar-maximize').addEventListener('click', () => appWindow.toggleMaximize())
    document.getElementById('titlebar-close').addEventListener('click', () => appWindow.close())
})
</script>

<style lang="scss" scoped>
.titlebar {
    height: 30px;
    background: #fff;
    user-select: none;
    display: flex;
    justify-content: flex-end;
    position: fixed;
    top: 0;
    left: 0;
    right: 0;
    z-index:0;
}

.titlebar-button {
    display: inline-flex;
    justify-content: center;
    align-items: center;
    width: 30px;
    height: 30px;
    transition: 0.3s all;
}

.titlebar-button:hover {
    background: #eaecf1;
}
.titlebar-button1:hover {
    background: #f92527;
    color:#fff;
}
</style>
