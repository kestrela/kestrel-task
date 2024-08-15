import { WebviewWindow } from '@tauri-apps/api/window'
import { emit } from '@tauri-apps/api/event'

// 创建新窗口
export async function createWin(args) {
    await emit('win-create', args)
}

// 获取窗口
export async function getWin(label) {
    return await WebviewWindow.getByLabel(label)
}

/**
 * @desc 设置窗口
 * @param type {string} 'show'|'hide'|'close'|'min'|'max'|'max2min'|'exit'|'relaunch'
 */
export async function setWin(type) {
    await emit('win-' + type)
}

// 登录窗口
export async function loginWin() {
    await createWin({
        label: 'Login',
        title: '登录',
        url: '/login',
        width: 320,
        height: 420,
        resizable: false,
        alwaysOnTop: true,
    })
}

// ...