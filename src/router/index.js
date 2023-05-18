import Vue from 'vue'
import VueRouter from 'vue-router'
import store from '@/store'
import Index from "@/views/Index";
import Home from "@/views/home/Home";
import Category from "@/views/category/Category";
import Tag from "@/views/tag/Tag";
import Blog from "@/views/blog/Blog";
import Login from "@/views/Login";

Vue.use(VueRouter)

const routes = [
	{
		path: '/login',
		component: Login,
		meta: {
			title: '登录'
		}
	},
	{
		path: '/',
		component: Index,
		redirect: '/home',
		children: [
			{
				path: '/home',
				name: 'home',
				component: Home,
				meta: {
					title: '首页'
				}
			},
			{
				path: '/blog/:id',
				name: 'blog',
				component: Blog,
				meta: {
					title: '博客'
				}
			},
			{
				path: '/category/:name',
				name: 'category',
				component: Category,
				meta: {
					title: '分类'
				}
			},
			{
				path: '/tag/:name',
				name: 'tag',
				component: Tag,
				meta: {
					title: '标签'
				}
			}
		]
	}
]

const router = new VueRouter({
	mode: 'history',
	base: process.env.BASE_URL,
	routes
})

//挂载路由守卫
router.beforeEach((to, from, next) => {
	if (to.meta.title) {
		if (store.state.siteInfo.webTitleSuffix) {
			document.title = to.meta.title + store.state.siteInfo.webTitleSuffix
		} else {
			document.title = to.meta.title
		}
	}
	next()
})

export default router
