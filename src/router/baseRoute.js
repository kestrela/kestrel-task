// 基础配置路由信息
import Layout from '@/layout/index.vue'
export default [
    {
        path: '/redirect',
        name: 'Redirect',
        component: Layout,
        meta: {
            title: 'Redirect',
            hidden: true
        },
        children: [
            {
                path: '/redirect/:path(.*)',
                name: 'Redirect',
                component: () => import('@/views/redirect/index.vue'),
                meta: {
                    title: 'Redirect',
                    hidden: true
                }
            }
        ]
    },
    {
        path: '/login',
        name: 'login',
        component: () => import('@/views/login/index.vue'),
        meta: {
            hidden: true,
            title: '登录'
        }
    },
    {
        path: '/404',
        name: 'Error404',
        component: Layout,
        meta: {
            hidden: true,
            title: '404'
        }
    },
    {
        path: '/401',
        name: 'Error401',
        component: () => import('@/views/N0101/index.vue'),
        meta: {
            hidden: true,
            title: '401'
        }
    },
    {
        path: '/500',
        name: 'Error500',
        component: () => import('@/views/N0101/index.vue'),
        meta: {
            hidden: true,
            title: '500'
        }
    },
    {
        path: '/:pathMatch(.*)',
        redirect: '/N0101',
        name: 'Redirect404',
        meta: {
            title: '404',
            hidden: true
        }
    }
]
