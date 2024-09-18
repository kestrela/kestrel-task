import { createRouter, createWebHashHistory } from 'vue-router'
import Layout from '@/Layout/index.vue'
import baseRoute from './baseRoute'
export const asyncRoutes = [
    {
        path: '/',
        name: 'N01',
        redirect: '/N0101',
        component: Layout,
        meta: {
            title: '主页'
        },
        children: [
            {
                path: 'N0101',
                name: 'N0101',
                component: () => import('@/views/N0101/index.vue'),
                meta: {
                    title: '任务',
                    icon: '1',
                    noCache: true,
                    affix: true
                }
            },
            {
                path: 'N0102',
                name: 'N0102',
                component: () => import('@/views/N0102/index.vue'),
                meta: {
                    title: '日历',
                    icon: '99',
                    noCache: true,
                    affix: true
                }
            },
            {
                path: 'N0103',
                name: 'N0103',
                component: () => import('@/views/N0103/index.vue'),
                meta: {
                    title: '象限',
                    icon: '3',
                    noCache: true,
                    affix: true
                }
            },
            // {
            //     path: 'N0104',
            //     name: 'N0104',
            //     component: () => import('@/views/N0104/index.vue'),
            //     meta: {
            //         title: '专注',
            //         icon: '4',
            //         noCache: true,
            //         affix: true
            //     }
            // },
            {
                path: 'N0105',
                name: 'N0105',
                component: () => import('@/views/N0105/index.vue'),
                meta: {
                    title: '习惯',
                    icon: '4',
                    noCache: true,
                    affix: true
                }
            },
            {
                path: 'N0107',
                name: 'N0107',
                component: () => import('@/views/N0107/index.vue'),
                meta: {
                    title: '提醒',
                    icon: '11',
                    noCache: true,
                    affix: true
                }
            },
            {
                path: 'N0108',
                name: 'N0108',
                component: () => import('@/views/N0108/index.vue'),
                meta: {
                    title: '设置',
                    icon: '8',
                    noCache: true,
                    affix: true
                }
            }
        ]
    }
]

const router = createRouter({
    history: createWebHashHistory(),
    routes: asyncRoutes.concat(baseRoute),
    scrollBehavior: () => ({ left: 0, top: 0 })
})
export default router